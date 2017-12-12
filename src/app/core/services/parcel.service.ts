import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IParcel } from '../models/parcel';
import { ApiService } from './api.service';

const URL = '/parcels/';

@Injectable()
export class ParcelService {


  constructor(private api: ApiService) {
  }

  /**
   * Looks up all parcels at server
   */
  find(): Observable<IParcel[]> {
    return this.api.get<IParcel[]>(URL);
  }

  /**
   * Finds parcel by id
   */
  findOneById(id: number): Observable<IParcel> {
    return this.api.get<IParcel>(URL + id);
  }

  /**
   * Deletes parcel data from server
   * @param {IParcel} forest
   */
  delete(forest: IParcel): Observable<IParcel[]> {
    return this.api.delete<IParcel[]>(URL + forest.id);
  }

  /**
   * Saves data about parcel to server
   * @param {Partial<IParcel>} forest
   */
  save(forest: Partial<IParcel>): Observable<IParcel[]> {
    return this.api.post<IParcel[]>(URL, forest);
  }

}
