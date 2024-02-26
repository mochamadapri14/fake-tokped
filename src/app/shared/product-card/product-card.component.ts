import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/core/interface/ProductInterface';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input() item!: any;

  @Output() cartOrder = new EventEmitter<any>();

  constructor() {

  }

}
