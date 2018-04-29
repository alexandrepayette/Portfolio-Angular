import { Component, HostBinding, OnInit } from '@angular/core';
import { AnimationService } from './animation.service';
import { AnimationProject } from './animation-project.model';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
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
