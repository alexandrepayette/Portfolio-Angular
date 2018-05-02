import {Component, HostListener, HostBinding, Input, OnInit, ViewEncapsulation} from '@angular/core';

import { WebProject } from '../web-design-project.model';

// ViewEncapsulation.None -> can not use :host {} in the scss file!
// Should use @HostBinding('class')...
@Component({
  selector: 'app-web-design-item',
  templateUrl: './web-design-item.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./web-design-item.component.scss']
})
export class WebDesignItemComponent implements OnInit {
  @HostBinding('class') displayBlockClass = 'd-block';

  @Input() inputProject: WebProject;

  imageUrl = 'url(http://acidvoice.com/portfolio_angular/assets/img/web_design_thumb/';
  public thumnailSize: string;

  getWindowSize(): void {
    if (window.innerWidth > 766) {
      this.thumnailSize = '_L';
    } else {
      this.thumnailSize = '_S';
    }
  }

  ngOnInit() {
    this.getWindowSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.getWindowSize();
  }
}

