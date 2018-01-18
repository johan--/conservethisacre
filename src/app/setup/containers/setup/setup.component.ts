import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { UserService } from '../../../core/services/user.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import { Router } from '@angular/router';

@Component({
  selector: 'conserve-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnDestroy {
  unsubscribe$ = new Subject<void>();
  form: FormGroup;
  busy = false;
  error = '';

  /**
   * Validator for internalTimeId field that checks if times field is defined and in case it does
   * requires internalTimeId not to be equal to 65534
   * @param name
   */
  validatePasswordMatch = (): ValidatorFn => (c: FormControl) => {
    return this.form && this.form.controls['password'].value != this.form.controls['passwordConfirm'].value ? {mismatch: true} : null;
  };

  constructor(fb: FormBuilder, private userService: UserService, private router: Router) {
    this.form = fb.group({
      username: ['', Validators.required],
      password: ['', [this.validatePasswordMatch(), Validators.required]],
      passwordConfirm: ['', [this.validatePasswordMatch(), Validators.required]]
    });

    this.form.valueChanges.takeUntil(this.unsubscribe$).subscribe(() => this.onValueChanges());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setup() {
    this.busy = true;
    this.userService.createAdmin(this.form.value)
      .take(1)
      .catch(e => {
        this.error = e.message;
        this.busy = false;
        return Observable.empty();
      })
      .subscribe(status => {
        this.busy = false;
        this.router.navigate(['/']);
    });
  }

  onValueChanges() {
    this.error = '';
    this.form.controls['passwordConfirm'].updateValueAndValidity({emitEvent: false});
    this.form.controls['password'].updateValueAndValidity({emitEvent: false});
  }
}
