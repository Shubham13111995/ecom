import { EventEmitter, Injectable, Query } from '@angular/core';
import { cartDataType, productData } from '../datatype';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  cartData=new EventEmitter<productData[]|[]>();
  constructor(private http:HttpClient) { }
  addproduct(data:productData){
    return this.http.post('http://localhost:3000/products',data);
  }
  productList(){
    return this.http.get<productData[]>('http://localhost:3000/products');
  }
  deleteProduct(id:number){
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
  getProductWithId(id:string){
    return this.http.get<productData>(`http://localhost:3000/products/${id}`);
  }
  updateProduct(data:productData){
    return this.http.put<productData>(`http://localhost:3000/products/${data.id}`,data)
  }
  getProductsInLimit(){
    return this.http.get<productData[]>('http://localhost:3000/products?_offset=2&_limit=3')
  }
  getTrendyProduct(){
    return this.http.get<productData[]>('http://localhost:3000/products?_limit=8')
  }
  getsearchProduct(query:string){
    return this.http.get<productData[]>(`http://localhost:3000/products?Category=${query}`)
  }
  localAddToCart(data:productData){
    let cart=[];
    let localCart = localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart',JSON.stringify([data]));
      this.cartData.emit([data]);
    }else{
      cart=JSON.parse(localCart);
      cart.push(data);
      localStorage.setItem('localCart',JSON.stringify(cart));
      this.cartData.emit(cart);
    }

  }
  localRemoveFromCart(id:number){
    let localData=localStorage.getItem('localCart');
    if(localData && id){
      let localDataArray=JSON.parse(localData);
      let items =localDataArray.filter((item:productData)=>id!==item.id);
      localStorage.setItem('localCart',JSON.stringify(items));
      this.cartData.emit(items);
    }
  }
  addToCart(cartData:cartDataType){
    return this.http.post('http://localhost:3000/cartData',cartData);
  }
  getCart(userId:any){
    return this.http.get<productData[]>(`http://localhost:3000/cartData?userid=${userId}`,{ observe: 'response' })
    .subscribe((result)=>{
      if(result && result.body){
          this.cartData.emit(result.body)
      }
    })
  }
}
