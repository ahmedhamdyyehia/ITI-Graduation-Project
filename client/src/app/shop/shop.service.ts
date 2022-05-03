import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagnation } from './../shared/models/IPagination';
import { Observable } from 'rxjs';
import { IBrand } from './../shared/models/IBrand';
import { IProductType } from './../shared/models/IProductType';
import { ShopParams } from './../shared/models/ShopParams';
import { IProduct } from '../shared/models/IProduct';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ShopService {
  
  baseUrl = environment.apiUrl;

  //private baseUrl = `https://localhost:44370/api/`;
  
  constructor(private http:HttpClient) { }

  getProducts(shopParams:ShopParams)
  {
    let params = new HttpParams();
    if(shopParams.brandId !==0){
      params = params.append("brandId",shopParams.brandId.toString());
    }
    if(shopParams.typeId !==0){
      params = params.append("typeId" , shopParams.typeId.toString());
    }

    if(shopParams.search){
      params =params.append("search",shopParams.search)
    }
   
    params = params.append("sort" , shopParams.sort);
    params = params.append("pageIndex",shopParams.pageNumber.toString());
    params = params.append("pageSize",shopParams.pageSize.toString());

    return this.http.get<IPagnation>(this.baseUrl+ `products` , {observe:"response",params})
  }

  getProduct(id:string)
  {
    return this.http.get<IProduct>(this.baseUrl + `products/${id}`);
  }

  getBrands():Observable<IBrand[]>
  {
    return this.http.get<IBrand[]>(this.baseUrl + `products/brands`)
  }

  getTypes():Observable<IProductType[]>
  {
    return this.http.get<IProductType[]>(this.baseUrl + `products/types`);
  }
}


