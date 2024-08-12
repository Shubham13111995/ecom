import { Component } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { cartDataType, cartSummery } from '../datatype';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cartData:cartDataType[]|undefined;
  cartSummeryData:cartSummery={
    Price:0,
    Discount:0,
    Tax:0,
    Delevery:0,
    Total:0,
  }
  constructor(private product:ProductServiceService,private router:Router){};
  ngOnInit() : void{
    this.loadCart();
  }
  removeFromCart(cartID:number | undefined){
    let userData=localStorage.getItem('user');
    let userid =userData && JSON.parse(userData).id;
    cartID && this.product.serverRemoveFromCart(cartID)
      .subscribe((result)=>{
        if(result){
          this.product.getCart(userid);
          this.loadCart();
        }
      })
  }
  loadCart(){
    this.product.getUserCart().subscribe((result)=>{
      this.cartData=result;
      let Price=0;
      result.forEach((item)=>{
        Price += (+item.Price);
      })
      this.cartSummeryData.Price=Price;
      this.cartSummeryData.Discount=Price/10;
      this.cartSummeryData.Tax= Math.round(Price*0.025);
      this.cartSummeryData.Delevery=100;
      this.cartSummeryData.Total= Math.round(Price+(Price*0.025)+(100))-(Price/10);
      if(!this.cartData.length){
        this.router.navigate(['/']);
      }
    })
  }
  checkout(){
    this.router.navigate(['/checkout']);
  }
}
