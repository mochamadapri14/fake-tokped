import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
  ) { }

  public getOrderProducts(): any[] {
    const orders = localStorage.getItem('ORDERS');
    return orders ? JSON.parse(orders) : [];
  }

  public orderProduct(newProducts: any[]): void {
    localStorage.setItem('ORDERS', JSON.stringify(newProducts));
  }

}
