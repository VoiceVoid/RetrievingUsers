import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  private authUrl = 'https://reqres.in/api';
  private loggedIn = false;
  constructor(private http: Http) {
    //look at localStorage to check if the user is logged in
    //!! means is it not auth token
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  //check if the user is logged in
  isLoggedIn() {
    return this.loggedIn;
  }
  

  login(username: string, password: string): Observable <string> {
    return this.http.post(`${this.authUrl}/login`, { username, password })
      .map(res => res.json())
      .do(res => {
        if (res.token) { 
          localStorage.setItem('auth_token', res.token);
          this.loggedIn = true;
        }
      })
      .catch(this.handleError);
  }


  logout(){
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }


  private handleError(err){
    let errMessage: string;
    if (err instanceof Response){
      let body = err.json() || '';
      let error = body.error || JSON.stringify(body);
      errMessage = `${err.status} - ${err.statusText || ''} ${error}`;
    } else {
      errMessage = err.message ? err.message : err.toString();
    }

    return Observable.throw(errMessage);
  }
}
