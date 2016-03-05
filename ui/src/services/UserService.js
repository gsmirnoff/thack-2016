import {Http, Headers} from 'angular2/http';
import {User} from '../models/user';

export class UserService {
  constructor(http:Http) {
    this.http = http;
  }

  save(user:User) {
    let endpoint = 'http://localhost:8080/api/users';
    let headers = new Headers({'Content-Type': 'application/json'});
    this.http.post(endpoint, JSON.stringify(user), headers).subscribe(function(e) {console.log(e)},function(e) {console.log(e)}, function(e) {console.log(e)});
  }

}
