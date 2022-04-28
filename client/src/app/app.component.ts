
import { Component, OnInit } from '@angular/core';

// import { error } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Ecommerce';

  // Products:IProduct[];
  constructor()
  {

  }
  ngOnInit(): void {
    // this.http.get('https://localhost:7225/api/products?PageSize=50').subscribe((Response:IPagination)=> {
    //   this.Products=Response.data;
    //   console.log(Response);
    // },error=>{
    //   console.log(error);
    // });

  }
}
