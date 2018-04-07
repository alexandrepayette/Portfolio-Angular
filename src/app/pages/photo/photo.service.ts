import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PhotoItem } from './photo-item.model';
import { Observable } from 'rxjs/Observable';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class PhotoService {

  constructor(private http: HttpClient) { }

  private photoUrl: string;
  public errorMessage= 'noError';

  getPhotoUrl (tags: string, photoFormat: string, perPage: number, pageNumber?: number) {
    this.photoUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search\
&api_key=891afde0528d42592ceb04c5c7cef64f&user_id=7820426%40N03&\
tags=${tags}\
&content_type=1\
&extras=${photoFormat}\
&per_page=${perPage}\
&page=${pageNumber}\
&format=json&nojsoncallback=1`;
  }

  getPhotosArray(tags: string, photoFormat: string, perPage: number, pageNumber: number): Observable<any> {
    this.getPhotoUrl(tags, photoFormat, perPage, pageNumber);
    return this.http.get<any>(this.photoUrl)
      .pipe(
        tap(res => {
          if (res.stat === 'fail') {
            this.errorMessage = res.message;
          }
        }),
        map(res => {
            return res.photos.photo
              .map(item => {
                return {
                  title: item.title,
                  url: item[photoFormat]
                } as PhotoItem;
              });
          }
        )
      );
  }

  getNumberOfPages(tags: string, photoFormat: string, perPage: number): Observable<any> {
    this.getPhotoUrl(tags, photoFormat, perPage);
    return this.http.get<any>(this.photoUrl)
      .pipe(
        map(res => Array.from({length: res.photos.pages}, (x, i) => i + 1))
      );
  }

  getErrorMessage() {
    return this.errorMessage;
  }
}
