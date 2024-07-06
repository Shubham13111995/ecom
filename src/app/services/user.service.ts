import { EventEmitter, Injectable } from '@angular/core';
import { SignUp, logIn } from '../datatype';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  InvalidCredential = new EventEmitter<boolean>(false)
  constructor(private route:Router,private http:HttpClient) { }
  UserSignUp(data:SignUp){
    this.http.post('http://localhost:3000/users',data,{observe:'response'})
    .subscribe((result)=>{
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body));
        this.route.navigate(['/']);

      }
    });
  }
  userAuth(){
    if(localStorage.getItem('user')){
      this.route.navigate(['/']);
    }
  }
  userlogin(data: logIn): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.get<SignUp[]>(`http://localhost:3000/users?Email=${data.Email}`, { observe: 'response' })
        .subscribe((result: any) => {
          if (result && result.body && result.body.length) {
            this.InvalidCredential.emit(false);
            localStorage.setItem('user', JSON.stringify(result.body[0]));
            this.route.navigate(['/']);
            resolve(true);
          } else {
            this.InvalidCredential.emit(true);
            resolve(false);
          }
        }, error => {
          reject(error);
        });
    });
  }
  
}
