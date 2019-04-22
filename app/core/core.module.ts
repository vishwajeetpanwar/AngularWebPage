import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataBaseService } from './data-base.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientInMemoryWebApiModule.forRoot(
      DataBaseService, { dataEncapsulation: false })
  ]
})
export class CoreModule { }
