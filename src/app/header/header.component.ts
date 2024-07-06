import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ProductServiceService } from '../services/product-service.service';
import { productData } from '../datatype';
import { query } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuType :string='default';
  sellerName:string='';
  userName:string='';
  searchResult:undefined|productData[];
  cartItem:number=0;
  constructor(private route:Router ,private product:ProductServiceService){}
  ngOnInit(): void{
    this.route.events.subscribe((val:any)=>{
      if(val.url){
          if (localStorage.getItem('seller') && val.url.includes('seller')) {
            this.menuType="seller";
            let sellerData:any=localStorage.getItem('seller');
            sellerData = localStorage.getItem('seller') && JSON.parse(sellerData);
            this.sellerName=sellerData[0].name;
          }else if(localStorage.getItem('user')){
              let userData:any=localStorage.getItem('user');
              userData =localStorage.getItem('user') && JSON.parse(userData);
              this.menuType="user";
              console.log(userData);
              
              this.userName=userData.Name;
          } else {
            this.menuType='default'              
          }
      }
    })
    let cartData=localStorage.getItem('localCart');
    if(cartData){
      this.cartItem=JSON.parse(cartData).length;
    }
    this.product.cartData.subscribe((items)=>{
      this.cartItem=items.length;
    })
  }
  logOut(){
    localStorage.removeItem('seller');
    this.route.navigate(['/'])
  }
  logOutUser(){
    localStorage.removeItem('user');
    this.route.navigate(['/'])
  }
  searchProduct(query:KeyboardEvent){
    if(query){
      const element =query.target as HTMLInputElement;
      if(element.value){
        this.product.getsearchProduct(element.value).subscribe((result)=>{
          if(result.length>5){
            result.length=5;
          }
          this.searchResult=result;
        });
      }
      
    }
  }
  hideSerch(){
    this.searchResult=undefined;
  }
  search(pram:any){
    this.route.navigate([`/search/${pram}`]);
  }
  openDetails(pram:any){
    this.route.navigate([`/details/${pram}`]);

  }
}
