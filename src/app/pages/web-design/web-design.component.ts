import { Component, OnInit, HostBinding, ViewEncapsulation } from '@angular/core';
import { NgOption } from '@ng-select/ng-select';
import { HttpErrorResponse } from '@angular/common/http';
import { WebDesignService} from './web-design.service';
import { WebProject } from './web-design-project.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

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

  selectedValue = 'Order';
  selectedTemp = 'Order';
  sortInverse = false;

  projectsObservable: Observable<WebProject[]>;
  errorGetProjects = 'noError';

  constructor(private webDesignService: WebDesignService) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.projectsObservable = this.webDesignService.getProjects()

      .catch((err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          this.errorGetProjects = 'network';
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          this.errorGetProjects = 'server';
          console.log('Backend returned status code: ', err.status);
          console.log('Response body:', err.error);
        }
        return Observable.throw(err);
      });
  }

  onChange() {
    if ( this.selectedTemp === this.selectedValue ) {
      this.sortInverse = !this.sortInverse;
    }
    this.selectedTemp = this.selectedValue;
  }
}
