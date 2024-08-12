import { Component } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { cartDataType, checkoutDataType } from '../datatype';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent {
  myOrders:checkoutDataType[]|undefined;
 constructor(private product:ProductServiceService){};
 ngOnInit(){
  this.getMyOrderList();
 }
 cancelOrder(id:number|undefined){
    id && this.product.deleteOrder(id).subscribe((result)=>{
      if(result){
        this.getMyOrderList();
      }
    })
 }
 getMyOrderList(){
  this.product.getMyOrders().subscribe((result)=>{
    this.myOrders=result;
  })
 } 
}
