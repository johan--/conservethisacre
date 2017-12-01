import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../reducers';
import * as auth from '../../actions/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<fromAuth.AuthState>) {
    this.form = fb.group({email: '', password: ''});
  }

  signin() {
    console.log(this.form.value);
    this.store.dispatch(new auth.Login(this.form.value));
  }
}
