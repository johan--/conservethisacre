import { Component, Injector, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as fromParcel from '../../reducers';
import * as parcels from '../../actions/parcel.actions';

import { IParcel } from '../../../core/models/parcel';
import { Store } from '@ngrx/store';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { EditComponent } from '../edit/edit.component';
import { overlayConfigFactory } from 'ngx-modialog';

const DELETE_TITLE = 'Delete Parcel?';
const DELETE_TEXT = 'Are you sure you want to delete this parcel?';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {

  parcels$: Observable<IParcel[]>;
  busy$: Observable<boolean>;

  constructor(private store: Store<fromParcel.ParcelState>, private modal: Modal, private injector: Injector) {
    this.parcels$ = store.select(fromParcel.selectAll);
    this.busy$ = store.select(fromParcel.isParcelBusy);
  }

  /**
   * Handles when user clicks delete button
   */
  onDeleteClick(item: IParcel) {
    this.modal.confirm().title(DELETE_TITLE).body(DELETE_TEXT).open().result
      .then((result) => {
        this.store.dispatch(new parcels.Delete(item));
      })
      .catch(err => err);
  }

  /**
   * Handles when user clicks edit button
   * @param {IForest} parcel
   */
  onEditClick(parcel: IParcel) {
    const data = {...parcel, forestId : parcel.forest ? parcel.forest.id : null};
    this.modal.open(EditComponent, overlayConfigFactory({data}, null, {injector: this.injector}));
  }

  /**
   * Handles when user clicks Add data
   * @param {IForest} forest
   */
  onAddClick() {
    this.modal.open(EditComponent, overlayConfigFactory({}, null, {injector: this.injector}));
  }
}
