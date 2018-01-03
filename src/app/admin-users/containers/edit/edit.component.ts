import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TwoButtonPreset } from 'ngx-modialog/plugins/bootstrap';
import { DialogRef } from 'ngx-modialog';
import { User } from '../../../core/models/user';
import * as users from '../../../admin-users/actions/users.actions';
import * as fromUsers from '../../../admin-users/reducers';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';

@Component({
  selector: 'conserve-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  form: FormGroup;

  @Input() data: User;

  constructor(public dialog: DialogRef<TwoButtonPreset>,
              private fb: FormBuilder,
              private store: Store<fromUsers.UserState>) {
    this.form = this.fb.group({
      id: '',
      email: new FormControl('', [Validators.required]),
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirm: '',
      isAdmin: ''
    });

    if (this.dialog.context['data']) {
      this.data = this.dialog.context['data'];

      this.form.patchValue(this.data);
    }
  }

  ngOnInit() {
  }

  /**
   * Saves user data
   */
  save() {
    if (!this.form.valid) {
      Object.keys(this.form.controls).forEach(name => this.form.get(name).markAsTouched());

    } else {
      this.store.dispatch(new users.Save(this.form.value));
      this.store.select(fromUsers.isUsersBusy).filter(v => !v).take(1).subscribe(() => this.dialog.close());
    }
    // this.store.dispatch(new parcels.Save(this.form.value));
    // this.store.select(fromParcel.isParcelBusy).filter(v => !v).take(1).subscribe(() => this.dialog.close());
  }

  /**
   * Tries to close modal dialog
   */
  close() {
    this.dialog.close();
  }
}
