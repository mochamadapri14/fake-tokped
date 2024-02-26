import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/product-catalog',
    pathMatch: 'full'
  },
  {
    path: 'product-catalog',
    loadChildren: (() => import('./module/product/product.module').then(m => m.ProductModule))
  },
  {
    path: 'cart',
    loadChildren: (() => import('./module/cart/cart.module').then(m => m.CartModule))
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
