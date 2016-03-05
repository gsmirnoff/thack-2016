import {Component} from 'angular2/core';
import {FormBuilder, Validators} from 'angular2/common';
import {HTTP_PROVIDERS} from 'angular2/http'
import {AuthenticationService} from '../services/authenticationService';
import {Router} from 'angular2/router';

@Component({
  selector: 'login',
  templateUrl: 'login/login.html',
  providers: [HTTP_PROVIDERS, AuthenticationService]
})

export class Login {
  constructor(fb:FormBuilder, authenticationService:AuthenticationService, router:Router) {
    this.authenticationService = authenticationService;
    this.router = router;
    this.loginForm = fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      let fields = this.loginForm.value;
      this.authenticationService.login(fields.name, fields.password)
        .subscribe(
          (token) => this.router.navigate(['Map']),
          () => this.router.navigate(['Home'])
        );
    }
  }


}
