import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IParcel } from '../../../core/models/parcel';
import { Store } from '@ngrx/store';
import * as fromParcels from '../../reducers';
import * as fromAuth from '../../../auth/reducers';

@Component({
  selector: 'app-parcel',
  templateUrl: './parcel.component.html',
  styleUrls: ['./parcel.component.scss']
})
export class ParcelComponent implements OnInit {

  parcel$: Observable<IParcel>;
  isLogged$: Observable<boolean>;

  constructor(private store: Store<fromParcels.ParcelState>) {
    this.parcel$ = store.select(fromParcels.getParcel);
    this.isLogged$ = store.select(fromAuth.isLogged);
  }

  ngOnInit() {
  }

}
