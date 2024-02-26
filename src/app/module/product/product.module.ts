import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';
import { ProductCardModule } from 'src/app/shared/product-card/product-card.module';

@NgModule({
  declarations: [ProductCatalogComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ProductCardModule
  ],
  exports: [ProductCatalogComponent]
})
export class ProductModule { }
