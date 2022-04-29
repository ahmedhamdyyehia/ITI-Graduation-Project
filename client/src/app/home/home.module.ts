import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CatigoriesComponent } from './catigories/catigories.component';

import { CoreModule } from './../core/core.module';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    HomeComponent,
    CarouselComponent,
    CatigoriesComponent,
    FooterComponent
  ],
  imports: [
  CommonModule,
    CoreModule
  ],
  exports:[
    HomeComponent
  ]
})
export class HomeModule { }
