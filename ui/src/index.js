let Pusher: any;
import {Component, View, provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {Location, RouteConfig, RouterLink, Router, HashLocationStrategy, LocationStrategy} from 'angular2/router';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Page} from 'page/page';
import {Login} from 'login/login';
import {Register} from 'register/register';
import {Home} from 'home/home';
import {Map} from 'map/map';
import {GuideInfo} from 'guide_info/guideInfo';
import {Chat} from 'chat/chat';
import {HostStatus} from 'host/host';

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
  {path: '/login', component: Login, as: 'Login'},
  {path: '/map', component: Map, as: 'Map'},
  {path: '/chat', component: Chat, as: 'Chat'},
  {path: '/host/:id', component: HostStatus, as: 'HostStatus'},
  {path: '/guideInfo/:id', component: GuideInfo, as: 'GuideInfo'}
])

class Main {
  constructor(router:Router) {
  }
}

bootstrap(Main, [ROUTER_PROVIDERS, HTTP_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy})]);
