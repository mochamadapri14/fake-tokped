import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss']
})
export class ProductCatalogComponent implements OnInit {

  productCalatogs: any[] = [];
  productDiscount: any[] = [];

  totalOrders: number = this.cartService.countOfCart();

  @ViewChild('header_content') headerTemplate!: TemplateRef<any>
  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.onLoad();
    this.onLoadOnlyDiscount();
  }

  protected selectedCategory: string = '';
  protected messageError = '';
  protected onLoad(): void {

    const allProducts = this.productService.getAllProducts(this.selectedCategory);

    allProducts.subscribe({
      next: (productCollections) => {

        productCollections = productCollections.map(val => {
          val.discountPrice = this.calculateDisc(val.price, val.discount);
          return val;
        });

        this.productCalatogs = productCollections;
        this.messageError = '';
      },
      error: (err) => {
        this.messageError = err.error;
      }
    });
    this.productService.getAllProducts(this.selectedCategory).subscribe()
  }

  protected onLoadOnlyDiscount(): void {
    const allProductDiscount = this.productService.getAllProductDiscount();
    allProductDiscount.subscribe({
      next: (productDisc) => {
        productDisc = productDisc.map(val => {
          val.discountPrice = this.calculateDisc(val.price, val.discount);
          return val;
        });
        this.productDiscount = productDisc.filter(p => p.discount > 0);
      },
      error: (_) => {
      }
    });
  }

  protected onDetail(dataRef: any): void {
    this.router.navigate(['/product/detail/' + dataRef.id]);
  }

  protected goToCart(): void {
    this.router.navigate(['/cart']);
  }

  protected onSelectCategory(category: string): void {
    this.selectedCategory = category;
    this.onLoad();
  }

  private calculateDisc(price: number, disc: number): number {
    const discount = (price * disc) / 100;
    return price - discount;
  }
}
