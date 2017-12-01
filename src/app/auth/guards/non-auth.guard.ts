import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { TokenStorage } from '../services/token.storage';
import { AuthService } from '../services/auth.service';

@Injectable()
export class NonAuthGuard implements CanActivate {
  constructor(private tokenStorage: TokenStorage, private authService: AuthService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.tokenStorage.getToken()){
      this.router.navigate(['/admin']);
      return false;
    }

    return true;
  }
}
