import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromAuth from '../reducers';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { TokenStorage } from '../services/token.storage';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  isLogged$: Observable<boolean>;

  constructor(private store: Store<fromAuth.AuthState>, private tokenStorage: TokenStorage, private authService: AuthService, private router: Router) {
    this.isLogged$ = this.store.select(fromAuth.getIsLogged);
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.isLogged$
      .filter(v => v !== null)
      .do(isLoggedIn => !isLoggedIn && this.router.navigate(['/']))
  }
}
