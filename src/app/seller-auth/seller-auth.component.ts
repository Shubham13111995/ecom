import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp, logIn } from '../datatype';


@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
  
  constructor(private seller:SellerService, private router:Router){}
  ngOnInit():void {
    this.seller.reloadSeller();
  }
  showLogin=true;
  authError:string ='';
  signUp(data:SignUp):void{
    this.seller.UsersignUp(data)
  }
  loginIn(data:logIn):void{
    this.seller.userLogin(data)
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError='Incorrect Username or password';
      }
      setTimeout(() => {
        this.authError='';
      },2000);
    })
    
  }
  openLogin(){
    this.showLogin=true;
  }
  openSignUp(){
    this.showLogin=false;
  }
}
