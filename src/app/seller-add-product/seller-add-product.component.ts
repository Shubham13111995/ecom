import { Component } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { productData } from '../datatype';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  constructor(private product:ProductServiceService){}
  notificationMsg:string='';
  ngOnInit():void {
    
  }
  submit(data:productData){
    this.product.addproduct(data).subscribe((result)=>{
      if(result){
        this.notificationMsg='Product added successfully';
      }else{
        this.notificationMsg='Error adding product';
      }
      setTimeout(() => {
        this.notificationMsg ='';
      }, 2000);
    });
  }
}
