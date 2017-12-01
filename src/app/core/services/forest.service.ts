import { Injectable } from '@angular/core';
import { IForest } from '../models/forest';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';

const URL = '/forests/';

@Injectable()
export class ForestService {

  constructor(private api: ApiService) {
  }

  /**
   * Looks up all forests at server
   */
  find(): Observable<IForest[]> {
    return this.api.get<IForest[]>(URL);
  }

  /**
   * Deletes forest data from server
   * @param {IForest} forest
   */
  delete(forest: IForest): Observable<IForest[]> {
    return this.api.delete<IForest[]>(URL + forest.id);
  }

  /**
   * Saves data about forest to server
   * @param {Partial<IForest>} forest
   */
  save(forest: Partial<IForest>): Observable<IForest[]> {
    return this.api.post<IForest[]>(URL, forest);
  }
}
