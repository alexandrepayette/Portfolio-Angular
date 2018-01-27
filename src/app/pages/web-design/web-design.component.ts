import {Component, HostBinding, ViewEncapsulation} from '@angular/core';
import {NgOption} from '@ng-select/ng-select';

// ViewEncapsulation.None -> can not use :host {} in the scss file!
// Should use @HostBinding('class')...
@Component({
  selector: 'app-web-design',
  templateUrl: './web-design.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./web-design.component.scss']
})

export class WebDesignComponent {
  @HostBinding('class') displayBlockClass = 'd-block';

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
