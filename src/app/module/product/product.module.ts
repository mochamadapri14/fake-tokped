import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';
import { ProductCardModule } from 'src/app/shared/product-card/product-card.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { LayoutModule } from 'src/app/layout/layout.module';

@NgModule({
  declarations: [ProductCatalogComponent, ProductDetailComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ProductCardModule,
    LayoutModule
  ],
  exports: [ProductCatalogComponent]
})
export class ProductModule { }
