import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from './routes';
import { RouterModule } from '@angular/router';
import { TransactionsComponent } from './containers/transactions/transactions.component';
import { TransactionsResolve } from './resolves/transactions.resolve';
import { TransactionsEffects } from './effects/transactions.effects';
import { reducers } from './reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('transactions', reducers),
    EffectsModule.forFeature([TransactionsEffects])
  ],
  providers: [TransactionsResolve],
  declarations: [TransactionsComponent]
})
export class TransactionsModule { }
