import { Component, OnInit } from '@angular/core';
import * as auth from '../../../auth/actions/auth.actions';
import * as fromAuth from '../../../auth/reducers';
import { Store } from '@ngrx/store';

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

  constructor(private store: Store<fromAuth.AuthState>) {
  }

  ngOnInit() {
  }

  logout(){
    this.store.dispatch(new auth.Logout());
  }

  /**
   * Handles click on the menu icons
   */
  onMenuClick() {
    this.enlarged = !this.enlarged;
  }
}
