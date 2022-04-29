import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { LatestProductsComponent } from './latest-products/latest-products.component';


@NgModule({
  declarations: [
    NavBarComponent,
    LatestProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    NavBarComponent,
    LatestProductsComponent
  ]
})
export class CoreModule { }
