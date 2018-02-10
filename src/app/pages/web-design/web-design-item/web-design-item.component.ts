import { Component, Input } from '@angular/core';

import { WebProject } from '../web-design-project.model';

@Component({
  selector: 'app-web-design-item',
  templateUrl: './web-design-item.component.html',
  styleUrls: ['./web-design-item.component.scss']
})
export class WebDesignItemComponent {
  @Input() inputProject: WebProject;
}
