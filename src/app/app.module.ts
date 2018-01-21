import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HeaderNavComponent } from './header-nav/header-nav.component';
import { AnimationComponent } from './pages/animation/animation.component';
import { PhotoComponent } from './pages/photo/photo.component';
import { TechnicalSkillsComponent } from './pages/technical-skills/technical-skills.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { ContactComponent } from './pages/contact/contact.component';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { FooterComponent } from './footer/footer.component';

import { AppRoutingModule } from './app-routing.module';
import { WebDesignModule } from './pages/web-design/web-design.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderNavComponent,
    AnimationComponent,
    PhotoComponent,
    TechnicalSkillsComponent,
    ExperienceComponent,
    ContactComponent,
    PageNotFoundComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebDesignModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
