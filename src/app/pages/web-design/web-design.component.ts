import { Component, OnInit, HostBinding, ViewEncapsulation } from '@angular/core';
import { NgOption } from '@ng-select/ng-select';

import { HttpErrorResponse } from '@angular/common/http';
import { WebDesignService} from './web-design.service';

import { ArraySortPipe } from './sort.pipe';
import { WebProject } from './web-design-project.model';

import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// ViewEncapsulation.None -> can not use :host {} in the scss file!
// Should use @HostBinding('class')...
@Component({
  selector: 'app-web-design',
  templateUrl: './web-design.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./web-design.component.scss']
})

export class WebDesignComponent implements OnInit {
  @HostBinding('class') displayBlockClass = 'd-block';

  categories: NgOption[] = [
    {id: 'Color', name: 'Color'},
    {id: 'Date', name: 'Date'},
    {id: 'Category', name: 'Category'},
    {id: 'Title_En', name: 'Name'}
  ];

  public selectedValue = 'Order';
  public sortInverse = false;
  private selectedTemp = 'Order';

  public projectsObservable: Observable<WebProject[]>;
  public carouselArray: WebProject[];
  public errorGetProjects = 'noError';
  private sortedArray: WebProject[];
  public isCarouselVisible = false;
  public isCarouselHidden = false;

  constructor(private webDesignService: WebDesignService,
              private sortPipe: ArraySortPipe) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.projectsObservable = this.webDesignService.getProjects()

      .pipe(
        map(res => this.sortedArray = res),
        catchError((err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // Client-side or network error occurred.
            this.errorGetProjects = 'network';
            console.log('An error occurred:', err.error.message);
          } else {
            // Server-side error occurred.
            this.errorGetProjects = 'server';
            console.log('Server-side error: ' + err.message);
          }
          return throwError(err);
        })
      );
  }

  onChange() {
    // if we select twice the same value & toggle the sortInverse
    if ( this.selectedTemp === this.selectedValue ) {
      this.sortInverse = !this.sortInverse;
    }
    this.selectedTemp = this.selectedValue;

    // Reordering the sortedArray from the select value & inverse
    this.sortPipe.transform(this.sortedArray, this.selectedValue, this.sortInverse);
  }

  openCarousel(index) {
    // Reordering the sortedArray from the clicked item index
    this.carouselArray = this.sortedArray.slice(index).concat(this.sortedArray.slice(0, index));
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
}
