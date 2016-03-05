import {Http, Headers, HTTP_PROVIDERS, URLSearchParams} from 'angular2/http'
import {User} from '../models/user'

export class UserService {
  constructor(http:Http) {
    this.http = http;
  }

  save(user:User) {
    let endpoint = '/api/users';
    let headers = new Headers({'Content-Type': 'application/json'});
    this.http.post(endpoint, JSON.stringify(user), headers);
  }

}
