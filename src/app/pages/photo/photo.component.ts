import {Component, HostBinding, HostListener, OnDestroy, OnInit} from '@angular/core';
import { PhotoService } from './photo.service';
import { PhotoItem } from './photo-item.model';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit, OnDestroy {
  @HostBinding('class') displayBlockClass = 'd-block';

  public photosObservable: Observable<PhotoItem[]>;
  public photosCarouselObservable: Observable<PhotoItem[]>;
  public originalOrderArray: PhotoItem[];
  public carouselArray: PhotoItem[];
  public numberOfPagesObservable: Observable<Array<number>>;
  public errorGetPhotos: string;
  public pageToDisplay = 1; // initial page
  public orientationTag = 'best'; // initial horizontal orientation
  public isCarouselVisible = false;
  public isCarouselHidden = false;

  // url_s = 160x240, url_t = 66x100, url_q = 150x150, url_m = 333x500
  private photoSmallFormat = 'url_s';
  private photoCarouselFormat = 'url_m';
  private perPage: number;
  private numberOfPages: number;
  private windowSize: number;
  private numberOfPagesUnsubscribe: Subject<void> = new Subject<void>();
  private photosCarouselUnsubscribe: Subject<void> = new Subject<void>();
  private timeout: number;

  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    this.getWindowSize();
    this.setPhotosPerPageOrientation();
    this.getNumberOfPages();
  }

  displayPhotos(pageNumber: number): void {
    this.errorGetPhotos = this.photoService.getErrorMessage();
    this.pageToDisplay = pageNumber;

    this.photosObservable = this.photoService.getPhotosArray(this.orientationTag, this.photoSmallFormat, this.perPage, pageNumber)
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
          return throwError(err);
        })
      );

    this.photosCarouselObservable = this.photoService.getPhotosArray(this.orientationTag, this.photoCarouselFormat, this.perPage, pageNumber)
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
          return throwError(err);
        })
      );

    this.photosCarouselObservable
      .pipe(takeUntil(this.photosCarouselUnsubscribe))
      .subscribe(res => this.originalOrderArray = res);
  }

  getErrorMessage(): void {
    this.errorGetPhotos = this.photoService.getErrorMessage();
  }

  setHttpErrorMessage(message: string): void {
    if (this.errorGetPhotos === 'noError') {
      this.errorGetPhotos = message;
    }
  }

  getNumberOfPages(): void {
    this.numberOfPagesObservable = this.photoService.getNumberOfPages(this.orientationTag, this.photoSmallFormat, this.perPage).pipe(
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
        return throwError(err);
      })
    );
  }

  displayFormat(orientation: string): void {
    this.orientationTag = orientation;
    this.setPhotosPerPageOrientation();
    this.getNumberOfPages();
    this.numberOfPagesObservable
      .pipe(takeUntil(this.numberOfPagesUnsubscribe))
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

  getWindowSize(): void {
    const windowWidth = window.innerWidth;

    if (windowWidth < 381) {
      this.windowSize = 3;
    } else if (windowWidth >= 381 && windowWidth < 575) {
      this.windowSize = 4;
    } else if (windowWidth < 767) {
      this.windowSize = 5;
    } else if (windowWidth < 991) {
      this.windowSize = 7;
    } else if (windowWidth <= 1199) {
      this.windowSize = 9;
    } else if (windowWidth >= 1200) {
      this.windowSize = 12;
    }

    this.displayFormat(this.orientationTag);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    window.clearTimeout(this.timeout);
    this.timeout = window.setTimeout(() => {
      this.getWindowSize();
    }, 750);
  }

  setPhotosPerPageOrientation(): void {
    if (this.windowSize === 3) {
      this.perPage = this.orientationTag === 'best' ? 20 : 18;
    } else if (this.windowSize === 4) {
      this.perPage = this.orientationTag === 'best' ? 21 : 18;
    } else if (this.windowSize === 5) {
      this.perPage = this.orientationTag === 'best' ? 21 : 20;
    } else if (this.windowSize === 7) {
      this.perPage = this.orientationTag === 'best' ? 24 : 20;
    } else if (this.windowSize === 9) {
      this.perPage = this.orientationTag === 'best' ? 25 : 28;
    } else if (this.windowSize === 12) {
      this.perPage = this.orientationTag === 'best' ? 20 : 21;
    }
  }

  openCarousel(index) {
    // Reordering the originalOrderArray from the clicked item index
    this.carouselArray = this.originalOrderArray.slice(index).concat(this.originalOrderArray.slice(0, index));
    this.isCarouselVisible = true;
  }

  closeCarousel() {
    // Apply fade-out css class to the carousel section
    this.isCarouselHidden = true;

    setTimeout(() => {
      this.isCarouselVisible = false;
      this.isCarouselHidden = false;
    }, 200);
  }

  ngOnDestroy() {
    this.photosCarouselUnsubscribe.next();
    this.photosCarouselUnsubscribe.complete();
    this.numberOfPagesUnsubscribe.next();
    this.numberOfPagesUnsubscribe.complete();
  }
}
