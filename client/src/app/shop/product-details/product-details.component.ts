import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from './../../shared/models/IProduct';
import { ShopService } from './../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product?:IProduct;
  constructor(private shopService:ShopService ,private activatedRoute:ActivatedRoute, private basketService:BasketService) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct()
  {
    let id = this.activatedRoute.snapshot.paramMap.get("id") as string;
    this.shopService.getProduct(id).subscribe(response=>{
      this.product = response;
    });
  }

  addItemToBasket(){
    this.basketService.addItemToBasket(this.product);
  }
}
