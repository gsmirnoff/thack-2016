import {Component, View} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Router} from 'angular2/router';

@Component({
  selector: 'page',
  directives: [ROUTER_DIRECTIVES],
  templateUrl: 'page/page.html'
})

export class Page {

  constructor(router:Router) {
    this.router = router;
    console.info('Ui Component Mounted Successfully');
  }

  goToHost() {
    this.router.navigate(['HostStatus', {id: localStorage.getItem('currentUser')}])
  }

}
