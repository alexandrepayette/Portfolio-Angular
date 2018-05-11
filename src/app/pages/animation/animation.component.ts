import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { AnimationService } from './animation.service';
import { AnimationProject } from './animation-project.model';

// ViewEncapsulation.None -> can not use :host {} in the scss file!
// Should use @HostBinding('class')...
@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./animation.component.scss']
})
export class AnimationComponent implements OnInit {
  @HostBinding('class') displayBlockClass = 'd-block';

  animationProjets: AnimationProject[] = [];

  constructor( private animationService: AnimationService) { }

  ngOnInit() {
    this.getAnimationProjets();
  }

  getAnimationProjets(): void {
    this.animationProjets = this.animationService.getProjects();
  }
}
