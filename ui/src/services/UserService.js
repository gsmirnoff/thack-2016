import {Http, Headers} from 'angular2/http';
import {User} from '../models/user';

export class UserService {
  constructor(http:Http) {
    this.http = http;
  }

  save(user:User) {
    let endpoint = '/api/users';
    let headers = new Headers({'Content-Type': 'application/json'});
    this.http.post(endpoint, JSON.stringify(user), {headers: headers}).subscribe(function(e) {console.log(e)},function(e) {console.log(e)}, function(e) {console.log(e)});
  }

}
