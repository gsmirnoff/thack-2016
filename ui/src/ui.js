import {Component, View} from 'angular2/core';

@Component({
  selector: 'ui'
})

@View({
  templateUrl: 'ui.html'
})

export class Ui {

  constructor() {
    console.info('Ui Component Mounted Successfully');
  }

}
