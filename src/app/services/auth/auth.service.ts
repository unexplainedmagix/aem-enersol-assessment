import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(public jwtHelper: JwtHelperService,private http:HttpClient) {

  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');    // Check whether the token is expired and return
    // true or false
    if(token === null){
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }

  public login(user){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.post('http://test-demo.aem-enersol.com/api/account/login', user , httpOptions);
  }

}
