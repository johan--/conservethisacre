import { Routes } from '@angular/router';
import { TransactionsComponent } from './containers/transactions/transactions.component';
import { TransactionsResolve } from './resolves/transactions.resolve';

export const routes: Routes = [
  {path: '', component: TransactionsComponent, resolve : {transactions: TransactionsResolve}}
];
