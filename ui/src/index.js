import {Component, View} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {Ui} from 'ui';

@Component({
  selector: 'main'
})

@View({
  directives: [Ui],
  template: `
    <ui></ui>
  `
})

class Main {

}

bootstrap(Main);
