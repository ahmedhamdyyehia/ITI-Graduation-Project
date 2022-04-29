
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-latest-products',
  templateUrl: './latest-products.component.html',
  styleUrls: ['./latest-products.component.scss']
})
export class LatestProductsComponent implements OnInit , AfterViewInit {
  myInterval:any;
  @ViewChild("slider") slider?:ElementRef<any>
  constructor() { }
  ngAfterViewInit(): void {
    const maxScrollLeft = this.slider!.nativeElement.scrollWidth - this.slider!.nativeElement.clientWidth;
    let s = this.slider as ElementRef;
    this.myInterval = setInterval(()=>{this.autoPlaySlider(s,maxScrollLeft)}, 50);
  }

  ngOnInit(): void {
    
  }

  scrollLeft(event:any)
  {
    clearInterval(this.myInterval);
    this.slider!.nativeElement.scrollLeft -= 100;
  }
  scrollRight(event:any)
  { 
    clearInterval(this.myInterval);
    this.slider!.nativeElement.scrollLeft += 100;
  }

  autoPlaySlider(s:ElementRef , maxScrollLeft:number)
  {
    //console.log(s.nativeElement.scrollLeft)
    if (s.nativeElement.scrollLeft > (maxScrollLeft-1)) {
        s.nativeElement.scrollLeft -= maxScrollLeft;       
        clearInterval(this.myInterval);
    } else {
      s.nativeElement.scrollLeft += 20;
    }
  }
}
