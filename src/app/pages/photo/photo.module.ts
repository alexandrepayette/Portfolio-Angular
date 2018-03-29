import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoComponent } from './photo.component';
import { HttpCacheService } from "../../shared/http-cache.service";
import { CacheInterceptor } from "../../shared/cache.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule({
  declarations: [
    PhotoComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true},
    HttpCacheService
  ]
})

export class PhotoModule { }
