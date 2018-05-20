import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationComponent } from './animation.component';
import { HttpCacheService } from '../../shared/http-cache.service';
import { CacheInterceptor } from '../../shared/cache.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UICarouselModule } from 'ui-carousel';

@NgModule({
  declarations: [
    AnimationComponent
  ],
  imports: [
    CommonModule,
    UICarouselModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true},
    HttpCacheService
  ]
})

export class AnimationModule { }
