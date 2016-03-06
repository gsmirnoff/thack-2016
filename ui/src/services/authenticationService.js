import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Http, Headers} from 'angular2/http';

export class AuthenticationService {
  token:string;

  constructor(http:Http) {
    this.http = http;
    this.token = localStorage.getItem('token');
  }

  login(email:String, password:String) {
    return this.http.post('/api/auth', JSON.stringify({
        email: email,
        password: password
      }), {
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .map((res) => {
        let data = res.json();
        this.token = data.token;
        this.currentUser = data.id;
        localStorage.setItem('token', this.token);
        localStorage.setItem('currentUser', this.currentUser);
        return Observable.of(this.token);
      });
  }

  logout() {
    this.token = undefined;
    localStorage.removeItem('token');
    return Observable.of(true);
  }
}

export function isLoggedIn() {
  return !!localStorage.getItem('token');
}
