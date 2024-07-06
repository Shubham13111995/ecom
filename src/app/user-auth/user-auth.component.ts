import { Component } from '@angular/core';
import { SignUp, cartDataType, logIn, productData } from '../datatype';
import { UserService } from '../services/user.service';
import { ProductServiceService } from '../services/product-service.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showLogin:boolean=true;
  InvalidCredentialError:string='';
  constructor(private users:UserService,private product:ProductServiceService){};
  ngOnInit(){
    this.users.userAuth();
  }
  signUp(data:SignUp){
    this.users.UserSignUp(data);
  }
  async login(data: logIn) {
    try {
      let isValid = await this.users.userlogin(data);
        if (!isValid) {
          this.InvalidCredentialError = 'Please enter valid details';
        } else if (isValid) {
          console.log("27");
          this.localToRemoteCart();
        }
    } catch (error) {
      console.error('Login failed:', error);
    }
  }
  
  openLogin(){ 
    this.showLogin=true;
  }
  openSignup(){
    this.showLogin=false;
  }
  localToRemoteCart(){
    let localCart=localStorage.getItem('localCart');
    let user =localStorage.getItem('user');
      let userid=user && JSON.parse(user).id;
    if(localCart){
       let localCartArray:productData[] =JSON.parse(localCart);
      localCartArray.forEach((product:productData,index) => {
        let CartData:cartDataType = {
          ...product,
          productId:product.id,
          userid
        }
        delete CartData.id;
          this.product.addToCart(CartData).subscribe((result)=>{
            if(result){
              console.log("added");
            }
          });
          if(localCartArray.length===index+1){
            localStorage.removeItem('localCart');
          }
      });
    }
    setTimeout(() => {
      this.product.getCart(userid);
    }, 1000);
  }
  
}
