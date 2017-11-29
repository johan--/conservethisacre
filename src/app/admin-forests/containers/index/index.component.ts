import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as fromForest from '../../reducers';
import { IForest } from '../../../core/models/forest';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  editMode = false;

  forests$: Observable<IForest[]>;

  constructor(private store: Store<fromForest.ForestState>) {
    this.forests$ = store.select(fromForest.selectAll);
  }

  ngOnInit() {
  }

}
