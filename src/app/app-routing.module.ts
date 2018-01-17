import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebDesignComponent } from './pages/web-design/web-design.component';
import { AnimationComponent } from './pages/animation/animation.component';
import { PhotoComponent } from './pages/photo/photo.component';
import { TechnicalSkillsComponent } from './pages/technical-skills/technical-skills.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { ContactComponent } from './pages/contact/contact.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', component: WebDesignComponent },
  { path: 'animation', component: AnimationComponent },
  { path: 'photo', component: PhotoComponent },
  { path: 'technical-skills', component: TechnicalSkillsComponent },
  { path: 'experience', component: ExperienceComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
