import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';

const URL = '/users/';

@Injectable()
export class UserService {

  constructor(private api: ApiService) {
  }

  /**
   * Saves own profile
   */
  saveOwn(data: User): Observable<User> {
    return this.api.post<User>(URL + 'own', data);
  }

  /**
   * Saves user data
   * @param {User} data
   * @returns {Observable<User>}
   */
  save(data: User): Observable<User[]> {
    return this.api.post<User[]>(URL, data);
  }

  /**
   * Finds all users
   * @param {User} data
   * @returns {Observable<User>}
   */
  find(): Observable<User[]> {
    return this.api.get<User[]>(URL);
  }

  /**
   * Finds user by provided id
   */
  findOneById(id: number): Observable<User> {
    return this.api.get<User>(URL + id);
  }

  /**
   * Deletes user
   * @param {User} data
   * @returns {Observable<User>}
   */
  delete(data: User): Observable<User[]> {
    return this.api.delete<User[]>(URL + data.id);
  }
}
