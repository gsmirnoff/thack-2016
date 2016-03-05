import {Component, View, provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {Location, RouteConfig, RouterLink, Router, HashLocationStrategy, LocationStrategy} from 'angular2/router';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Page} from 'page/page';
import {Login} from 'login/login'
import {Register} from 'register/register'
import {Home} from 'home/home'

@Component({
  selector: 'main'
})

@View({
  directives: [Page],
  template: '<page></page>'
})

@RouteConfig([
  {path: '/', redirectTo: ['/Home']},
  {path: '/home', component: Home, as: 'Home'},
  {path: '/register', component: Register, as: 'Register'},
  {path: '/login', component: Login, as: 'Login'}
])

class Main {
  constructor(router:Router) {
  }
}

bootstrap(Main, [ROUTER_PROVIDERS, HTTP_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy})]);
