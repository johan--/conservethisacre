import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as auth from '../../../auth/actions/auth.actions';
import * as fromAuth from '../../../auth/reducers';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  isLogged$: Observable<boolean>;
  user$: Observable<Partial<User>>;

  constructor(private store: Store<fromAuth.AuthState>) {
    this.isLogged$ = store.select(fromAuth.isLogged);
    this.user$ = store.select(fromAuth.getUserDetails);
  }

  ngOnInit() {

  }

  logout() {
    this.store.dispatch(new auth.Logout());
  }
}
