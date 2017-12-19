import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IForest } from '../../../core/models/forest';
import { Observable } from 'rxjs/Observable';
import * as fromForests from '../../reducers';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { IParcel } from '../../../core/models/parcel';

@Component({
  selector: 'app-forest',
  templateUrl: './forest.component.html',
  styleUrls: ['./forest.component.scss']
})
export class ForestComponent {

  forest$: Observable<IForest>;

  constructor(private store: Store<fromForests.ForestState>, private router: Router) {
    this.forest$ = this.store.select(fromForests.getForest);
  }

  ngOnInit(){
  }

  /**
   * Handles click on parcel on the map
   */
  onParcelClick(parcel: IParcel) {
    this.router.navigate(['/parcels', parcel.id]);
  }

}
