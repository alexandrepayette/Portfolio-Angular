import {Component, HostListener, Input, OnInit} from '@angular/core';

import { WebProject } from '../web-design-project.model';

@Component({
  selector: 'app-web-design-item',
  templateUrl: './web-design-item.component.html',
  styleUrls: ['./web-design-item.component.scss']
})
export class WebDesignItemComponent implements OnInit {
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

