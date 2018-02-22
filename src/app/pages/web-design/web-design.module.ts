import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule, NG_SELECT_DEFAULT_CONFIG } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { WebDesignComponent } from './web-design.component';
import { WebDesignItemComponent } from './web-design-item/web-design-item.component';
import { ArraySortPipe } from './sort.pipe';

@NgModule({
  declarations: [
    WebDesignComponent,
    WebDesignItemComponent,
    ArraySortPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule
  ],
  providers: [
    {
      provide: NG_SELECT_DEFAULT_CONFIG,
      useValue: {
        notFoundText: 'This category doesn\'t exist'
      }
    }
  ]
})

export class WebDesignModule { }
