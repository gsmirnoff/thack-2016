import {Component, View, provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {Location, RouteConfig, RouterLink, Router, HashLocationStrategy, LocationStrategy} from 'angular2/router';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {Ui} from 'ui';
import {Login} from 'login/login'
import {Register} from 'register/register'
import {Home} from 'home/home'

@Component({
  selector: 'main'
})

@View({
  directives: [Ui],
  template: `
    <ui></ui>
  `
})

@RouteConfig([
  { path: '/', redirectTo: ['/home'] },
  { path: '/home', component: Home, as: 'Home' },
  { path: '/register', component: Register, as: 'Register' },
  { path: '/login', component: Login, as: 'Login' }
])

class Main {
  constructor(router:Router) {
  }
}

bootstrap(Main, [ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy})]);
