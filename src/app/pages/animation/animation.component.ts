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

  public animationProjets: AnimationProject[] = [];
  public carouselArray: AnimationProject[];
  public isCarouselVisible = false;
  public isCarouselHidden = false;

  constructor( private animationService: AnimationService) { }

  ngOnInit() {
    this.getAnimationProjets();
  }

  getAnimationProjets(): void {
    this.animationProjets = this.animationService.getProjects();
  }

  openCarousel(index) {
    // Reordering the originalOrderArray from the clicked item index
    this.carouselArray = this.animationProjets.slice(index).concat(this.animationProjets.slice(0, index));
    this.isCarouselVisible = true;
  }

  closeCarousel() {
    // Apply fade-out css class to the carousel section
    this.isCarouselHidden = true;

    setTimeout(() => {
      this.isCarouselVisible = false;
      this.isCarouselHidden = false;
    }, 200);
  }
}
