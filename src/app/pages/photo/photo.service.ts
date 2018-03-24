import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PhotoItem } from './photo-item.model';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class PhotoService {

  constructor(private http: HttpClient) { }

  getPhotos(tags: string, photoFormat: string, prePage: number, pageNumber: number): Observable<any> {
    const photoUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search'
      + '&api_key=891afde0528d42592ceb04c5c7cef64f'
      + '&user_id=7820426%40N03&'
      + 'tags='
      + tags
      + '&content_type=1&'
      + 'extras='
      + photoFormat
      + '&per_page='
      + prePage
      + '&page='
      + pageNumber
      + '&format=json&nojsoncallback=1';

    return this.http.get<any>(photoUrl)
      .pipe(
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
}
