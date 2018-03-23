import { Component, OnInit } from '@angular/core';
import { PhotoService } from './photo.service';
import { PhotoItem } from './photo-item.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  public photosObservable: Observable<PhotoItem[]>;
  public errorGetPhotos = 'noError';

  private tags = 'best';
  // url_s = 160x240, url_t = 66x100, url_q = 150x150, url_m = 333x500
  private photoFormat = 'url_s';
  private perPage = 60;
  private page = 1;

  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    this.displayPhotos();
  }

  displayPhotos() {
    this.photosObservable = this.photoService.getPhotos(this.tags, this.photoFormat, this.perPage, this.page)

      .map(res => {
        return res.photos.photo
          .map(item => {
              return {
                title: item.title,
                url: item.url_s
              };
            }
          );
      })

      .catch((err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          this.errorGetPhotos = 'network';
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          this.errorGetPhotos = 'server';
          console.log('Backend returned status code: ', err.status);
          console.log('Response body:', err.error);
        }
        return Observable.throw(err);
      });

    this.photosObservable.subscribe(res => { console.log(res); });
  }
}
