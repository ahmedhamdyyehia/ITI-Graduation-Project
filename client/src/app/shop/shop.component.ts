import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopService } from './shop.service';
import { IProduct } from './../shared/models/IProduct';
import { IBrand } from './../shared/models/IBrand';
import { IProductType } from './../shared/models/IProductType';
import { ShopParams } from '../shared/models/ShopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm?:ElementRef;

  products:IProduct[];
  brands:IBrand[];
  types:IProductType[];
  shopParams:ShopParams;
  totalCount:number;
  sortOptions:any[];
  constructor(private shopService:ShopService) {
    this.products = [];
    this.brands = [];
    this.types =[];
    this.shopParams = new ShopParams();
    this.totalCount =0;

    this.sortOptions =[
      {name:"Alphpetical" , value:"name"},
      {name:"Price: low to high" , value:"priceAsc"},
      {name:"Price: high to low" , value:"priceDesc"},
    ]
   }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts()
  {
    this.shopService.getProducts(this.shopParams)
      .subscribe(response=>{
        this.products = response.body!.data;
        this.shopParams.pageNumber =response.body!.pageIndex;
        this.shopParams.pageSize =response.body!.pageSize;
        this.totalCount =response.body!.count;
      });
  }

  getBrands()
  {
    this.shopService.getBrands().subscribe(response=>{
      this.brands = [{id:0 , name:"All"},...response];
    });
  }

  getTypes()
  {
    this.shopService.getTypes().subscribe(response=>{
      this.types = [{id:0 , name:"All"},...response];     
    });
  }

  onBrandSelected(brandId:any)
  {
    this.shopParams.brandId = Number(brandId.value);
    this.getProducts();
  }

  onTypeSelected(typeId:any)
  {
    this.shopParams.typeId = Number(typeId.value);
    this.getProducts();
  }

  onSortSelected(sort:any)
  {
    this.shopParams.sort = sort.value;
    this.getProducts();
  }

  onPageChange(event:any)
  {
    this.shopParams.pageNumber = event.page;
    this.getProducts();
  }


  onSearch()
  {
    this.shopParams.search = this.searchTerm?.nativeElement.value;
    this.getProducts();
  }

  onReset()
  {
    this.searchTerm!.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
