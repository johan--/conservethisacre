import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as fromAuth from '../../auth/reducers';
import { Store } from '@ngrx/store';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../core/models/user';

@Injectable()
export class AuthAdminGuard implements CanActivate {
  user$: Observable<User>;

  constructor(private store: Store<fromAuth.AuthState>,
              private authService: AuthService,
              private router: Router) {
    this.user$ = this.store.select(fromAuth.getUserDetails);
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.user$
      .filter(v => !!v)
      .map(user => user.role == 'admin')
      .do(isAdmin => !isAdmin && this.router.navigate(['/']));
  }


}
