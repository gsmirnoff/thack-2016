import {Component} from 'angular2/core';
import {FormBuilder, Validators} from 'angular2/common';
import {User} from '../models/user'

@Component({
  selector: 'registation',
  templateUrl: 'register/register.html'
})

export class Register {
  constructor(fb: FormBuilder) {
    this.registrationForm = fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required]
    });
  }
  onSubmit() {
    console.log('register', new User(this.registrationForm.value));
  }

}
