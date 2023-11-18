import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/types/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.less']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;

  
  constructor() { }
  
  ngOnInit(): void {
  }

}
