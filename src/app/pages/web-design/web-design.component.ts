import { Component, OnInit, HostBinding, ViewEncapsulation } from '@angular/core';
import { NgOption } from '@ng-select/ng-select';
import 'rxjs/add/operator/retry';
import { HttpErrorResponse } from '@angular/common/http';
import { WebDesignService} from './web-design.service';
import { WebProject } from './web-design-project.model';

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
    {id: 1, name: 'Color'},
    {id: 2, name: 'Date'},
    {id: 3, name: 'Category'},
    {id: 4, name: 'Name'}
  ];

  selectedValue: any;

  projectList: WebProject[] = [];
  errorGetProjects = 'noError';

  constructor(private webDesignService: WebDesignService) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.webDesignService.getProjects().retry(1).subscribe(
      data => {
        this.projectList = data;
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred.
          this.errorGetProjects = 'network';
          console.log('An error occurred:', err.error.message);
        } else {
          // Backend returns unsuccessful response codes such as 404, 500 etc.
          this.errorGetProjects = 'server';
          console.log('Backend returned status code: ', err.status);
          console.log('Response body:', err.error);
        }
      }
    );
  }

  onChange() {
    console.log('Sort by: ' + this.selectedValue);
  }
}
