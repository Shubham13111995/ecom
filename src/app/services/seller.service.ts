import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUp, logIn } from '../datatype';
import { BehaviorSubject, observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}
  UsersignUp(data: SignUp) {
    this.http
      .post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((result) => {
        this.isSellerLoggedIn.next(true);
        this.router.navigate(['seller-home']);
        localStorage.setItem('seller', JSON.stringify(result.body));
      });
  }
  reloadSeller() {
    if (localStorage.getItem('seller')) {
      console.log('25 reloadSeller');
      
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }
  userLogin(data: logIn) {
    this.http
      .get(
        `http://localhost:3000/seller?Email=${data.Email}`,
        { observe: 'response' }
      )
      .subscribe((result:any) => {
        if (result && result.body && result.body.length) {
          this.isSellerLoggedIn.next(true);
          this.router.navigate(['seller-home']);
          localStorage.setItem('seller', JSON.stringify(result.body));
        } else {
          this.isLoginError.emit(true);
        }
      });
  }
}
