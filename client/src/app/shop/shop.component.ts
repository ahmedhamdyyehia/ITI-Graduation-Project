import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search',{static:true}) searchTerm :ElementRef;
  Products:IProduct[];
  brands:IBrand[];
  types:IType[];
  shopParams = new ShopParams();
  totalCount:Number;
  sortOptions=[
    {name:'Alphabetical',value:'name'},
    {name:'Price: Low to High',value:'priceAsc'},
    {name:'Price: High to Low',value:'priceDesc'}
  ];

  constructor(private shopService :ShopService ) { }

  ngOnInit(): void {
    this.getproducts();
    this.getBrands();
    this.getTypes();


  }
  getproducts(){
    this.shopService.getProducts(this.shopParams).subscribe(Response=>{
      this.Products=Response.data;
      this.shopParams.pageNumber=Response.pageIndex;
      this.shopParams.pageSize=Response.pageSize;
      this.totalCount=Response.count;
    },error=>{
      console.log(error);
    });
  }
  getBrands()
  {
    this.shopService.getBrands().subscribe(Response=>{
      this.brands=[{id:0,name:"All"},...Response];
    },error=>{
      console.log(error);
    });
  }
  getTypes()
  {
    this.shopService.getTypes().subscribe(Response=>{
      this.types=[{id:0,name:"All"},...Response];
    },error=>{
      console.log(error);
    });
  }
  onBrandSelected(brandId:number){
    this.shopParams.brandId=brandId;
    this.shopParams.pageNumber=1;
    this.getproducts();
  }
  onTypeSelected(typeId:number){
    this.shopParams.typeId=typeId;
    this.shopParams.pageNumber=1;
    this.getproducts();
  }
  onSortSelected(Sort:string){
    this.shopParams.sort=Sort;
    this.getproducts();
  } 
  

  onPageChanged(event:any){
    if(this.shopParams.pageNumber !== event){
      this.shopParams.pageNumber=event;
      this.getproducts();
    }

  }
  onSearch(){
    this.shopParams.search=this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber=1;
    this.getproducts();
  }
  onReset(){
    this.searchTerm.nativeElement.value='';
    this.shopParams=new ShopParams(); 
    this.getproducts();
  }
}

