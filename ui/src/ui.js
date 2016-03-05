import {Component, View} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'ui',
  directives: [ROUTER_DIRECTIVES],
  templateUrl: 'ui.html'
})

export class Ui {

  constructor() {
    console.info('Ui Component Mounted Successfully');
  }

}
