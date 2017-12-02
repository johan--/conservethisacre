import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../reducers';
import * as auth from '../../actions/auth.actions';
import { FacebookService } from '../../services/facebook.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private store: Store<fromAuth.AuthState>,
              private facebookService: FacebookService) {
    this.form = fb.group({email: '', password: ''});
  }

  signin() {
    console.log(this.form.value);
    this.store.dispatch(new auth.Login(this.form.value));
  }

  facebookSignin() {
    this.facebookService.login()
      .take(1)
      // .switchMap(() => this.facebookService.getUserDetails())
      .subscribe(({authResponse}) => {
        this.store.dispatch(new auth.Login({accessToken: authResponse.accessToken}));
      });
  }
}
