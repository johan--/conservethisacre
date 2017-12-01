import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromAuth from '../reducers';
import * as auth from '../actions/auth.actions';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { TokenStorage } from '../services/token.storage';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromAuth.AuthState>, private tokenStorage: TokenStorage, private authService: AuthService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // this.store.dispatch(new auth.Verify(this.tokenStorage.getToken()));
    //
    // return this.store.select(fromAuth.isLogged)
    //   .do(v => console.log('guard', v))
    //   .filter(v => !!v);

    return this.authService.verify(this.tokenStorage.getToken())
      .do(data => {
        if (!data.user) {
          this.router.navigate(['/auth/signin']);
        }
      }).map(data => !!data.user);
  }
}
