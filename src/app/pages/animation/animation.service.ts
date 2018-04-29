import { Injectable } from '@angular/core';
import { AnimationProject } from './animation-project.model';
import { ANIMATIONPROJECTS } from './animation-project-data';

@Injectable()
export class AnimationService {

  getProjects(): AnimationProject[] {
    return ANIMATIONPROJECTS;
  }
}
