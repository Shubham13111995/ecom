import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from '../services/product-service.service';
import { cartDataType, productData } from '../datatype';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productDetail:undefined|productData;
  cartvalue:number=1;
  itemInCart=false;
  CurrrentProductCartData:undefined|productData;
  constructor(private activeRoute:ActivatedRoute,private product:ProductServiceService){};
  ngOnInit(){
    let productId=this.activeRoute.snapshot.paramMap.get('productId');
    productId && this.product.getProductWithId(productId).subscribe((result)=>{
      this.productDetail=result;
    })
    let localCart =localStorage.getItem('localCart');
    if(productId && localCart){
      let localAddToCartArray=JSON.parse(localCart)
      let item =localAddToCartArray.filter((item:productData)=>productId==item.id.toString());
      if(item.length){
        this.itemInCart=true;
      }else{
        this.itemInCart=false;
      }
    }
    let userData=localStorage.getItem('user');
    if(userData){
      let userid =userData && JSON.parse(userData).id;
      this.product.getCart(userid);
      this.product.cartData.subscribe((result)=>{
        let Cartitem = result.filter((item:productData)=>productId?.toString()===item.productId?.toString());
        if(Cartitem.length){
          this.CurrrentProductCartData=Cartitem[0];
          this.itemInCart=true;
        }
    });
    }

  }
  handleQuentity(param:string){
    if(param=='min' && this.cartvalue>1){
      this.cartvalue--;
    }
    if(param=='plus' && this.cartvalue<20){
      this.cartvalue++;
    }
  }
  addToCart(){
    if(this.productDetail){
      this.productDetail.quantity=this.cartvalue;
      if(!localStorage.getItem('user')){
          this.product.localAddToCart(this.productDetail);
          this.itemInCart=true;
      }else{
        let userData=localStorage.getItem('user');
        let userid =userData && JSON.parse(userData).id;
        let cartData:cartDataType={
          ...this.productDetail,userid,productId:this.productDetail.id
        }
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((result)=>{
            if(result){
              this.product.getCart(userid);
              this.itemInCart=true;
            }
        });
      }
    }
  }
  removeFromCart(id:number){
    let userData=localStorage.getItem('user');
    if (!userData) {
      this.product.localRemoveFromCart(id);
    } else {
      let userid =userData && JSON.parse(userData).id;
      let CartId=this.CurrrentProductCartData?.id;
      this.CurrrentProductCartData && this.product.serverRemoveFromCart(this.CurrrentProductCartData.id)
      .subscribe((result)=>{
        if(result){
          this.product.getCart(userid);
        }
      })
    }
    this.itemInCart=false;
    
  }
}
