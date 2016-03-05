import {Component} from 'angular2/core';
import {FormBuilder, Validators} from 'angular2/common';
import {User} from '../models/user'
import {HTTP_PROVIDERS} from 'angular2/http'
import {Router} from 'angular2/router';
import {UserService} from '../services/UserService'


@Component({
  selector: 'registation',
  templateUrl: 'register/register.html',
  providers: [HTTP_PROVIDERS, UserService]
})

export class Register {
  constructor(fb: FormBuilder, userService:UserService, router:Router) {
    this.userService = userService;
    this.router = router;
    this.registrationForm = fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.registrationForm.valid) {
      this.userService.save(new User(this.registrationForm.value))
        .subscribe(() => this.router.navigate(['Map']));

    }
  }

}
