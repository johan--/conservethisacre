import { Component, Input, OnInit } from '@angular/core';
import { DialogRef, ModalComponent } from 'ngx-modialog';
import { TwoButtonPreset } from 'ngx-modialog/plugins/bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IParcel } from '../../../core/models/parcel';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromParcel from '../../reducers';
import * as parcels from '../../actions/parcel.actions';
import 'rxjs/add/operator/filter';
import { IForest } from '../../../core/models/forest';

@Component({
  selector: 'conserve-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements ModalComponent<TwoButtonPreset> {
  form: FormGroup;

  @Input() data: IParcel;

  busy$: Observable<boolean>;
  forests$: Observable<IForest[]>;

  constructor(public dialog: DialogRef<TwoButtonPreset>,
              private fb: FormBuilder,
              private store: Store<fromParcel.ParcelState>) {

    this.busy$ = store.select(fromParcel.isParcelBusy);
    this.forests$ = store.select(fromParcel.getAllForests)
    this.form = this.fb.group({
      id: '',
      cost: '',
      area : '',
      forestId : ''
    });

    if (this.dialog.context['data']) {
      this.form.patchValue(this.dialog.context['data']);
    }
  }

  /**
   * Dispatches Save action with collected form data
   */
  save() {
    console.log(this.form.value);
    this.store.dispatch(new parcels.Save(this.form.value));
    this.store.select(fromParcel.isParcelBusy).filter(v => !v).take(1).subscribe(() => this.dialog.close());
  }

  /**
   * Tries to close modal dialog
   */
  close() {
    this.dialog.close();
  }
}
