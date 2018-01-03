import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as fromUsers from '../reducers';
import * as users from '../actions/users.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class UsersGuard implements CanActivate {
  constructor(private store: Store<fromUsers.UserState>) {

  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.store.dispatch(new users.Find());
    return true;
  }
}
