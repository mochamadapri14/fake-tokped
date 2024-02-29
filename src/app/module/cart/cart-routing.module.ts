import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartListComponent } from './cart-list/cart-list.component';
import { CartOrderComponent } from './cart-order/cart-order.component';

const routes: Routes = [
  {
    path: '',
    component: CartListComponent
  },
  {
    path: 'buy/:id',
    component: CartOrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
