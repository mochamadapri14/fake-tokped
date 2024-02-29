import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/core/interface/ProductInterface';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input() product!: any;
  @Input() showRating: boolean = true;

  @Output() selectProduct = new EventEmitter<any>();

  constructor() {
  }

  onDetail() {
    this.selectProduct.emit(this.product);
  }

}
