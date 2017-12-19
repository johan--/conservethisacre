import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { ITransaction } from '../models/transaction';

const URL = '/transactions/';

@Injectable()
export class TransactionService{

  constructor(private api: ApiService) {
  }

  /**
   * Looks up own transactions
   */
  findOwn(): Observable<ITransaction[]> {
    return this.api.get<ITransaction[]>(URL + 'own');
  }
}
