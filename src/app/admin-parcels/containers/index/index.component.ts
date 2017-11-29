import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as fromParcel from '../../reducers';
import { IParcel } from '../../../core/models/parcel';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  editMode = false;

  parcels$: Observable<IParcel[]>;

  constructor(private store: Store<fromParcel.ParcelState>) {
    this.parcels$ = store.select(fromParcel.selectAll);
  }

  ngOnInit() {
  }

}
