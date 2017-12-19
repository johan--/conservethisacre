import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as fromProfile from '../../reducers';
import * as profile from '../../actions/profile.actions';
import * as fromAuth from '../../../auth/reducers';
import { Store } from '@ngrx/store';
import { User } from '../../../core/models/user';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'conserve-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;

  profile$: Observable<Partial<User>>;

  constructor(fb: FormBuilder, private store: Store<fromProfile.ProfileState>) {
    this.form = fb.group({
      firstName: '',
      lastName: ''
    });

    this.profile$ = this.store.select(fromAuth.getUserDetails);
    this.profile$.take(1).subscribe(v => this.form.patchValue(v, {emitEvent: false}))
  }

  save(){
    this.store.dispatch(new profile.Save(this.form.value));
  }

  ngOnInit() {
  }
}
