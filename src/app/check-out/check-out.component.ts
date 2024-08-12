import { Component } from '@angular/core';
import { cartDataType, checkoutDataType } from '../datatype';
import { ProductServiceService } from '../services/product-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {
  TotalAmount:number|undefined;
  userCart:cartDataType[]|undefined;
  myOrderMsg:string|undefined;
  constructor(private product:ProductServiceService,private router:Router){}
  ngOnInit(){
    this.product.getUserCart().subscribe((result)=>{
        this.userCart=result;
        let Price=0;
        result.forEach((item)=>{
          Price += (+item.Price);
        })
        this.TotalAmount = Math.round(Price+(Price*0.025)+(100))-(Price/10);
    })
  }
  orderNow(data:{email:string,address:string,contact:string},){
    let userData:any=localStorage.getItem('user');
    let userId =localStorage.getItem('user') && JSON.parse(userData).id;
    if(this.TotalAmount){
      let orderData:checkoutDataType={
        ...data,
        TotalPrice:this.TotalAmount,
        userId:userId,
        id:undefined
      }
      this.userCart?.forEach(item => {
        setTimeout(() => {
             item.id && this.product.serverRemoveFromCartBulk(item.id) 
        }, 600);
      });
      this.product.placeOrder(orderData).subscribe((result)=>{
        if(result){
          this.myOrderMsg='Your order has been place';
          setTimeout(() => {
            this.router.navigate(['/myorders']);
            this.myOrderMsg=undefined;
          }, 2000);
        }
      })
    }
  }
  
}
