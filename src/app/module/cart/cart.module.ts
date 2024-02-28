import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartListComponent } from './cart-list/cart-list.component';
import { LayoutModule } from 'src/app/layout/layout.module';

@NgModule({
  declarations: [
    CartListComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    LayoutModule
  ]
})
export class CartModule { }
