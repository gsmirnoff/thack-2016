import {Component} from 'angular2/core';
import {FormBuilder, Validators} from 'angular2/common';
import {User} from '../models/user'
import {HTTP_PROVIDERS} from 'angular2/http'
import {UserService} from '../services/UserService'


@Component({
  selector: 'registation',
  templateUrl: 'register/register.html',
  providers: [HTTP_PROVIDERS, UserService]
})

export class Register {
  constructor(fb: FormBuilder, userService:UserService) {
    this.userService = userService;
    this.registrationForm = fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required]
    });
  }
  onSubmit() {
    this.userService.save(new User(this.registrationForm.value));
  }

}
