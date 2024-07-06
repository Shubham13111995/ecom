import { Component } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { productData } from '../datatype';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(private product:ProductServiceService){};
  displayProduct:undefined|productData[];
  TrendyProduct:undefined|productData[];
  ngOnInit(){
    this.product.getProductsInLimit().subscribe((result)=>{
      this.displayProduct=result;
    })
    this.product.getTrendyProduct().subscribe((result)=>{
      this.TrendyProduct=result;
    })
  }
}
