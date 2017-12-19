import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';

const URL = '/users/';

@Injectable()
export class UserService{

  constructor(private api: ApiService) {
  }

  /**
   * Saves own profile
   */
  saveOwn(data: User): Observable<User> {
    return this.api.post<User>(URL + 'own', data);
  }
}
