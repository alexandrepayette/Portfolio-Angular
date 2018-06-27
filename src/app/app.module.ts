import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { WebDesignModule } from './pages/web-design/web-design.module';
import { PhotoModule } from './pages/photo/photo.module';
import { AnimationModule } from './pages/animation/animation.module';

import { AppComponent } from './app.component';

import { HeaderNavComponent } from './header-nav/header-nav.component';
import { WebDesignComponent } from './pages/web-design/web-design.component';
import { AnimationComponent } from './pages/animation/animation.component';
import { PhotoComponent } from './pages/photo/photo.component';
import { TechnicalSkillsComponent } from './pages/technical-skills/technical-skills.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { FooterComponent } from './footer/footer.component';

import { WebDesignService } from './pages/web-design/web-design.service';
import { PhotoService } from './pages/photo/photo.service';
import { AnimationService } from './pages/animation/animation.service';

const routes: Routes = [
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
  declarations: [
    AppComponent,
    HeaderNavComponent,
    TechnicalSkillsComponent,
    ExperienceComponent,
    ContactComponent,
    PageNotFoundComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
    HttpClientModule,
    WebDesignModule,
    PhotoModule,
    AnimationModule
  ],
  providers: [
    WebDesignService,
    PhotoService,
    AnimationService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
