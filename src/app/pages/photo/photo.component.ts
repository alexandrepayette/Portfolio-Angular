import {Component, OnDestroy, OnInit} from '@angular/core';
import { PhotoService } from './photo.service';
import { PhotoItem } from './photo-item.model';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit, OnDestroy {

  public photosObservable: Observable<PhotoItem[]>;
  public numberOfPagesObservable: Observable<Array<number>>;
  public errorGetPhotos: string;
  public pageToDisplay = 1; // initial page
  public tags = 'best';

  // url_s = 160x240, url_t = 66x100, url_q = 150x150, url_m = 333x500
  private photoFormat = 'url_s';
  private perPage = 20;
  private numberOfPages: number;
  private ngUnsubscribe: Subject = new Subject();

  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    this.displayPhotos(this.pageToDisplay);
    this.getNumberOfPages();
  }

  displayPhotos(pageNumber: number) {
    this.errorGetPhotos = this.photoService.getErrorMessage();
    this.pageToDisplay = pageNumber;
    this.photosObservable = this.photoService.getPhotosArray(this.tags, this.photoFormat, this.perPage, pageNumber)

      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // Client-side or network error occurred.
            this.getErrorMessage();
            this.setHttpErrorMessage(err.message);
          } else {
            // Server-side error occurred.
            this.getErrorMessage();
            this.setHttpErrorMessage(err.message);
          }
          return Observable.throw(err);
        })
      );
  }

  getErrorMessage() {
    this.errorGetPhotos = this.photoService.getErrorMessage();
  }

  setHttpErrorMessage(message: string) {
    if (this.errorGetPhotos === 'noError') {
      this.errorGetPhotos = message;
    }
  }

  getNumberOfPages() {
    this.numberOfPagesObservable = this.photoService.getNumberOfPages(this.tags, this.photoFormat, this.perPage);
  }

  displayFormat(orientation: string) {
    this.tags = orientation;
    this.perPage = orientation === 'best' ? 20 : 21;
    this.getNumberOfPages();

    this.numberOfPagesObservable
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
      res => this.numberOfPages = res.length,
      err => console.error('Can not get the number of pages: ' + err),
      () => {
        if (this.pageToDisplay > this.numberOfPages) {
          this.pageToDisplay = this.numberOfPages;
        }
        this.displayPhotos(this.pageToDisplay);
      }
    );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
