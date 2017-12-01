import { Component, Input } from '@angular/core';
import { DialogRef, ModalComponent } from 'ngx-modialog';
import { TwoButtonPreset } from 'ngx-modialog/plugins/bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IForest } from '../../../core/models/forest';
import { Store } from '@ngrx/store';
import * as fromForest from '../../reducers';
import * as forests from '../../actions/forest.actions';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'conserve-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements ModalComponent<TwoButtonPreset> {
  form: FormGroup;

  @Input() data: IForest;

  busy$: Observable<boolean>;

  constructor(public dialog: DialogRef<TwoButtonPreset>,
              private fb: FormBuilder,
              private store: Store<fromForest.ForestState>) {
    this.busy$ = store.select(fromForest.isForestsBusy);

    this.form = this.fb.group({
      id: '',
      description: ''
    });

    if (this.dialog.context['data']) {
      this.form.patchValue(this.dialog.context['data']);
    }
  }

  /**
   * Dispatches Save action with collected form data
   */
  save() {
    this.store.dispatch(new forests.Save(this.form.value));
    this.store.select(fromForest.isForestsBusy).filter(v => !v).take(1).subscribe(() => this.dialog.close());
  }

  /**
   * Tries to close modal dialog
   */
  close() {
    this.dialog.close();
  }
}
