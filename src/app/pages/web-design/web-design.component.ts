import {Component} from '@angular/core';
import {NgOption} from '@ng-select/ng-select';

@Component({
  selector: 'app-web-design',
  templateUrl: './web-design.component.html',
  styleUrls: ['./web-design.component.scss']
})

export class WebDesignComponent {
  categories: NgOption[] = [
    {id: 1, name: 'Color'},
    {id: 2, name: 'Date'},
    {id: 3, name: 'Category'},
    {id: 4, name: 'Name'}
  ];

  selectedValue: any;

  onChange() {
    console.log('Sort by: ' + this.selectedValue);
  }
}
