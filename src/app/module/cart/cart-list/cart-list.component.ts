import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  orderCollections: any[] = this.cartService.getOrderProducts();

  selectedCollections: any[] = [];

  constructor(private cartService: CartService, private router: Router) {
    this.orderCollections = this.orderCollections.map(val => {
      val.discountPrice = this.calculateDisc(val.price, val.discount);
      val.checked = false;
      val.totalPrice = 0;
      return val;
    });
  }

  ngOnInit(): void {

  }

  protected goToProductCatalog(): void {
    this.router.navigate(['/product']);
  }

  totalPrice: number = 0;
  totalSelected: number = 0;
  protected selectOrder(order: any) {
    order.checked = !order.checked;
    const { discountPrice, quantity } = order;
    order.totalPrice = this.calculateSum(discountPrice, quantity);
    this.selectedCollections = this.orderCollections.filter(p => p.checked);
    this.totalSelected = this.selectedCollections.length;
    this.sumTotalPrice();
    this.isChecked = this.totalSelected === this.orderCollections.length;
  }


  protected manageQuantity(order: any, action: string): void {
    const increement = action === 'add';
    if (increement) {
      order.quantity = order.quantity + 1;
    } else {
      if (order.quantity > 1) {
        order.quantity = order.quantity - 1;
      } else {
        const newOrders = this.orderCollections.filter(p => p.id !== order.id);
        this.reloadOrders(newOrders);
      }
    }

    if (order.checked) {
      const { discountPrice, quantity } = order;
      order.totalPrice = this.calculateSum(discountPrice, quantity);
      this.sumTotalPrice();
    }
  }

  isChecked: boolean = false;
  protected checkAll(): void {
    this.isChecked = !this.isChecked;

    this.orderCollections.forEach(val => {
      val.checked = this.isChecked;
    });
    this.selectedCollections = this.orderCollections.filter(p => p.checked);
    this.selectedCollections.forEach(val => {
      val.totalPrice = this.calculateSum(val.discountPrice, val.quantity);
    });
    this.totalSelected = this.selectedCollections.length;
    this.sumTotalPrice();
  }

  protected removeOrder(): void {
    const collectionId = this.selectedCollections.map(val => val.id);

    collectionId.forEach(id => {
      const newOrders = this.orderCollections.filter(p => p.id !== id);
      this.reloadOrders(newOrders);
    });
  }

  private reloadOrders(newOrders: any[]): void {
    this.cartService.orderProduct(newOrders);

    this.orderCollections = this.cartService.getOrderProducts();
    this.selectedCollections = this.orderCollections.filter(p => p.checked);
    this.totalSelected = this.selectedCollections.length;

    this.sumTotalPrice();
  }

  private sumTotalPrice(): void {
    this.totalPrice = this.selectedCollections.reduce(
      (prev, curr) => prev + curr.totalPrice, 0
    );
  }

  private calculateSum(discPrice: number, qty: number): number {
    return discPrice * qty;
  }

  private calculateDisc(price: number, disc: number): number {
    const discount = (price * disc) / 100;
    return price - discount;
  }

}
