import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss']
})
export class ProductCatalogComponent implements OnInit {

  productCalatogs: any[] = [];

  totalOrders: number = 0;
  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.onLoad();
  }

  protected onLoad(): void {
    this.productService.getAllProducts().subscribe({
      next: (collections) => {
        this.productCalatogs = collections;
        console.log('PRODUCT:', collections);
      },
      error: () => { }
    })
  }

}
