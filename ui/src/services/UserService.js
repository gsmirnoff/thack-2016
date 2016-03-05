import {Http, Headers} from 'angular2/http';
import {User} from '../models/user';
import 'rxjs/Rx';

export class UserService {
  constructor(http:Http) {
    this.http = http;
  }

  save(user:User) {
    let endpoint = '/api/users';
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(endpoint, JSON.stringify(user), {headers: headers});
  }

}
