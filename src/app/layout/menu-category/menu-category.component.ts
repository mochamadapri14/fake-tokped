import { Component, EventEmitter, OnInit, Output } from '@angular/core';

const CATEGORY = [
  { key: '', label: 'Semua Kategori', badge: 'info' },
  { key: 'makanan,minuman', label: 'Makanan Minuman', badge: 'success' },
  { key: 'dapur', label: 'Bahan Dapur', badge: 'warning' },
  { key: 'otomotif', label: 'Otomotif', badge: 'primary' },
  { key: 'laptop,hp', label: 'Laptop Handphone', badge: 'info' },
  { key: 'tas', label: 'Tas Sekolah', badge: 'danger' },
];

@Component({
  selector: 'menu-category',
  templateUrl: './menu-category.component.html',
  styleUrls: ['./menu-category.component.scss']
})
export class MenuCategoryComponent implements OnInit {

  categoryMenu = CATEGORY;

  @Output() selectionCategory = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  protected onSelect(category: string): void {
    this.selectionCategory.emit(category);
  }

}
