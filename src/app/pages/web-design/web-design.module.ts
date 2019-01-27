import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule, NgSelectConfig } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { WebDesignComponent } from './web-design.component';
import { WebDesignItemComponent } from './web-design-item/web-design-item.component';
import { ArraySortPipe } from './sort.pipe';
import { UICarouselModule } from 'ui-carousel';

import { HttpCacheService } from '../../shared/http-cache.service';
import { CacheInterceptor } from '../../shared/cache.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    WebDesignComponent,
    WebDesignItemComponent,
    ArraySortPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    UICarouselModule
  ],
  providers: [
    {
      provide: NgSelectConfig,
      useValue: {
        notFoundText: 'This category doesn\'t exist'
      }
    },
    {provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true},
    HttpCacheService,
    ArraySortPipe
  ]
})

export class WebDesignModule { }
