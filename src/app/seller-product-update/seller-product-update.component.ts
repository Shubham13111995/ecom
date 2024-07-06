import { Component } from '@angular/core';
import { productData } from '../datatype';
import { ProductServiceService } from '../services/product-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seller-product-update',
  templateUrl: './seller-product-update.component.html',
  styleUrls: ['./seller-product-update.component.css']
})
export class SellerProductUpdateComponent {
  constructor(private product:ProductServiceService,private route:ActivatedRoute ,private router:Router){};
  notificationMsg:string='';
  productdata:undefined | productData
  ngOnInit(){
    let id =this.route.snapshot.paramMap.get('id');
    id && this.product.getProductWithId(id).subscribe((result)=>{
      this.productdata=result;
      
    });
  }
  submit(data:productData){
    if(this.productdata){
      data.id=this.productdata.id
    }
    this.product.updateProduct(data).subscribe((result)=>{
      if(result){
        this.notificationMsg='Data Updated Successfully'
      }else{
        this.notificationMsg='Error Updating'
      }
      setTimeout(() => {
        this.notificationMsg='';
      }, 3000);
      this.router.navigate(['seller-home']);
    })
    
  }
}
