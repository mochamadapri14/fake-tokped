import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  protected id!: string;

  protected totalOrders: number = this.cartService.countOfCart();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.onLoadParam();
  }

  ngOnInit(): void {
    this.onLoadDetail();
  }

  productDetail: any;
  protected onLoadDetail() {
    this.productService.getDetailProduct(this.id).subscribe({
      next: (res) => {
        res = {
          ...res,
          discountPrice: this.calculateDisc(res.price, res.discount)
        }
        this.productDetail = res;
      },
      error: () => { }
    });
  }

  protected addToCart(): void {
    const { id } = this.productDetail;
    let refOrders = this.cartService.getOrderProducts();
    const find = refOrders.find(val => val.id === id);
    if (find) {
      refOrders.map((val) => {
        if (val.id === id) {
          val.quantity = val.quantity + 1;
        }
      });
    } else {
      refOrders = [...refOrders, { ...this.productDetail, quantity: 1 }];
    }
    this.cartService.orderProduct(refOrders);
    this.goToCart();
  }

  protected goToCart(): void {
    this.router.navigate(['/cart']);
  }

  protected goToOrder(id: string): void {
    this.router.navigate(['/cart/buy/' + id]);
  }

  private onLoadParam(): void {
    this.route.params.subscribe({
      next: (param) => {
        this.id = param['id'];
      },
      error: () => { }
    });
  }

  private calculateDisc(price: number, disc: number): number {
    const discount = (price * disc) / 100;
    return price - discount;
  }
}
