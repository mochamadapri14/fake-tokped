import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private productService: ProductService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.onLoad();
  }

  protected onLoad(): void {
    this.productService.getAllProducts().subscribe({
      next: (collections) => {
        collections = collections.map(val => {
          val.discountPrice = this.calculateDisc(val.price, val.discount);
          return val;
        });
        this.productCalatogs = collections;
        console.log(this.productCalatogs);
      },
      error: () => { }
    })
  }

  protected onDetail(dataRef: any): void {
    this.router.navigate(['/product/detail/' + dataRef.id]);
  }

  private calculateDisc(price: number, disc: number): number {
    const discount = (price * disc) / 100;
    return price - discount;
  }
}
