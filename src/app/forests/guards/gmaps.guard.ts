import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { GapiService } from '../../gapi/services/gapi.service';
import 'rxjs/add/operator/do';

@Injectable()
export class GmapsGuard implements CanActivate {
  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.gapi.loadMapsApi();
  }

  constructor(private gapi: GapiService) {
  }
}
