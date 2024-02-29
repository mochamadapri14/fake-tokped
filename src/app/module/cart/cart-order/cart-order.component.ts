import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-cart-order',
  templateUrl: './cart-order.component.html',
  styleUrls: ['./cart-order.component.scss']
})
export class CartOrderComponent implements OnInit {

  id!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private location: Location
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
          quantity: 1,
          discountPrice: this.calculateDisc(res.price, res.discount)
        }
        this.productDetail = this.productReference() ?? res;

        this.totalPrice = this.productDetail.discountPrice * this.productDetail.quantity;
      },
      error: () => { }
    });
  }

  totalPrice = 0;
  protected manageQuantity(action: string) {
    const increement = action === 'add';
    if (increement) {
      this.productDetail.quantity += 1;
    } else {
      if (this.productDetail.quantity > 1) {
        this.productDetail.quantity -= 1;
      }
    }

    this.totalPrice = this.productDetail.discountPrice * this.productDetail.quantity;

    let orders = this.cartService.getOrderProducts();
    orders.forEach(order => {
      if (order.id === this.productDetail.id) {
        order.quantity = this.productDetail.quantity;
      }
    });
    this.cartService.orderProduct(orders);
  }

  protected buyProduct(): void {
    const orders = this.cartService.getOrderProducts();
    const newOrders = orders.filter(p => p.id !== this.productDetail.id);
    this.cartService.orderProduct(newOrders);
    this.router.navigate(['/product']);
  }

  isChecked: boolean = false;
  protected addProtection(): void {
    this.isChecked = !this.isChecked;
    this.totalPrice = this.isChecked
      ? this.totalPrice + 2600
      : this.totalPrice - 2600;
  }

  private onLoadParam(): void {
    this.route.params.subscribe({
      next: (param) => {
        this.id = param['id'];
      },
      error: () => { }
    });
  }

  private productReference(): any {
    const orders = this.cartService.getOrderProducts();
    const findProduct = orders.find(p => p.id === this.id);
    return findProduct ?? null;
  }

  private calculateDisc(price: number, disc: number): number {
    const discount = (price * disc) / 100;
    return price - discount;
  }

  protected backPage() {
    this.location.back();
  }

  // get totalPrice(): number {
  //   return this.productDetail.discountPrice * this.productDetail.quantity;
  // }

}
