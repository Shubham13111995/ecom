import { Component } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { productData } from '../datatype';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
  constructor(private product:ProductServiceService){}
  productList:undefined | productData[];
  deleteMsg:string='';
  faTrash = faTrash;  
  faEdit = faEdit;  
  ngOnInit(){
    this.productListing();
  }
  deleteProduct(id:number){
    this.product.deleteProduct(id).subscribe((result)=>{
      if (result) {
        this.deleteMsg='Product Deleted'
        this.productListing();
      }
      setTimeout(() => {
        this.deleteMsg='';
      }, 2000);
      
    })
  }
  productListing(){
    this.product.productList().subscribe((result)=>{
      this.productList=result;
    })

  }

}
