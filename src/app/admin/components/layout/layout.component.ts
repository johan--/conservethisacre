import { Component, OnInit } from '@angular/core';
import * as auth from '../../../auth/actions/auth.actions';
import * as fromAuth from '../../../auth/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  /**
   * Left menu state
   * @type {boolean}
   */
  enlarged = false;

  user$: Observable<Partial<User>>;

  constructor(private store: Store<fromAuth.AuthState>) {
    this.user$ = this.store.select(fromAuth.getUserDetails);
  }

  ngOnInit() {
  }

  logout() {
    this.store.dispatch(new auth.Logout());
  }

  /**
   * Handles click on the menu icons
   */
  onMenuClick() {
    this.enlarged = !this.enlarged;
  }
}
