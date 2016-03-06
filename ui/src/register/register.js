import {Component} from 'angular2/core';
import {FormBuilder, Validators} from 'angular2/common';
import {User} from '../models/user'
import {HTTP_PROVIDERS} from 'angular2/http'
import {Router} from 'angular2/router';
import {UserService} from '../services/userService'
import {AuthenticationService} from  '../services/authenticationService'


@Component({
  selector: 'registation',
  templateUrl: 'register/register.html',
  providers: [HTTP_PROVIDERS, UserService, AuthenticationService]
})

export class Register {
  constructor(fb:FormBuilder, userService:UserService, authenticationService:AuthenticationService, router:Router) {
    this.userService = userService;
    this.authenticationService = authenticationService;
    this.router = router;
    this.interests = [
      {value: 'Architecture', fg: 'formgroup', inputClass: 'input', textClass: 'text10'},
      {value: 'Bars', fg: 'formgroup1', inputClass: 'input1', textClass: 'text11'},
      {value: 'Clubs', fg: 'formgroup2', inputClass: 'input2', textClass: 'text12'},
      {value: 'Museums', fg: 'formgroup3', inputClass: 'input3', textClass: 'text13'}
    ];
    this.registrationForm = fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      interests: fb.group(
        {'Architecture': [], 'Bars': [], 'Clubs': [], 'Museums': []}
      )
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      navigator.geolocation.getCurrentPosition(this.saveNewUser.bind(this, this.registrationForm.value));
    }
  }

  saveNewUser(fields, position) {
    fields.position = [
      position.coords.latitude + 0.000001,
      position.coords.longitude - 0.000004
    ];
    fields.interests = Object.keys(fields.interests)
      .map((i) => !!fields.interests[i] ? i : null)
      .filter((i) => !!i);
    fields.interests = fields.interests.map((a, b) => console.log(a, b));
    this.userService.save(new User(fields))
      .subscribe((user) => {
        this.authenticationService.login(user.email, user.password);
        this.router.navigate(['Map']);
      });
  }
}
