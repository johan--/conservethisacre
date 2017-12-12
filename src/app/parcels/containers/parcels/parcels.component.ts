import { Component, OnInit } from '@angular/core';
import { IParcel } from '../../../core/models/parcel';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromParcels from '../../reducers';

@Component({
  selector: 'app-parcels',
  templateUrl: './parcels.component.html',
  styleUrls: ['./parcels.component.scss']
})
export class ParcelsComponent implements OnInit {

  parcels$: Observable<IParcel[]>;

  constructor(private store: Store<fromParcels.ParcelState>) {
    this.parcels$ = store.select(fromParcels.selectAll);
  }

  ngOnInit() {
  }

}
