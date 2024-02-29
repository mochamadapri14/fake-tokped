import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartListComponent } from './cart-list/cart-list.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { CartOrderComponent } from './cart-order/cart-order.component';

@NgModule({
  declarations: [
    CartListComponent,
    CartOrderComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    LayoutModule
  ]
})
export class CartModule { }
