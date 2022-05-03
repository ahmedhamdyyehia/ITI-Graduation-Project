import { BasketService } from './../../basket/basket.service';
import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from './../../shared/models/IProduct';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product:IProduct;
  constructor(private basketService:BasketService) {
    this.product = {
      id:0,
      name:"",
      description:"",
      price:0,
      pictureUrl:"",
      productType:"",    
      productBrand:""
    }
   }

  ngOnInit(): void {
  }

  addItemToBasket(){
    this.basketService.addItemToBasket(this.product);
  }

}
