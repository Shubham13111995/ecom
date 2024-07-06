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
    this.product.localRemoveFromCart(id);
    this.itemInCart=false;
    console.log('hii shubham');
    
  }
}
