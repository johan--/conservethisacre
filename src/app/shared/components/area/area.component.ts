import { Component, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Area, Point } from '../../../core/models/area';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'conserve-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AreaComponent),
      multi: true
    }
  ]
})
export class AreaComponent implements ControlValueAccessor, OnDestroy {
  /**
   * Handler for unsubscribing observers
   */
  unsubscribe$ = new Subject<void>();
  /**
   * Stream when some data is changed from UI
   * @type {Subject<void>}
   */
  change = new Subject<any[]>();

  form: FormGroup;

  /**
   * Function is called whenever view is changed to propagate this changes outside
   * @param any
   */
  propogateChanges = (value: Point[][]) => {
  }

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      'top': '',
      'bottom': '',
      'left': '',
      'right': ''
    });

    // this.change.takeUntil(this.unsubscribe$).subscribe(([index, prop, value]) => {
    //   value = parseFloat(value);
    //
    //   if (!this._value) {
    //     this._value = new Area([[]]);
    //   }
    //
    //   if (!this._value.boundary[index]) {
    //     this._value.boundary[index] = {x: 0, y: 0};
    //   }
    //
    //   this._value.boundary[index][prop] = isNaN(value) ? 0 : value;
    //   this.propogateChanges(this.value);
    // });

    this.form.valueChanges.takeUntil(this.unsubscribe$).subscribe(value => {
      const {top, bottom, left, right} = value;

      this.propogateChanges([[
        {x: left, y: top},
        {x: right, y: top},
        {x: right, y: bottom},
        {x: left, y: bottom},
        {x: left, y: top}
      ]]);
    });
  }

  /**
   * Inner representation of value
   */
  _value: Area;

  /**
   * Getter for inner value representation
   * @returns {Area}
   */
  get value() {
    return this._value.asPolygon();
  }

  /**
   * Setter for inner value
   * @param v
   */
  set value(v: any) {
    this._value = v ? new Area(v) : null;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  writeValue(obj: Point[][]): void {
    if (!obj || !obj.length || obj[0].length < 3) {
      return;
    }

    const points = obj[0];

    const topLeft = points[0];
    const bottomRight = points[2];

    this.form.patchValue({
      top: topLeft.y,
      bottom: bottomRight.y,
      left: topLeft.x,
      right: bottomRight.x
    });
  }

  registerOnChange(fn: any): void {
    this.propogateChanges = fn;
  }

  registerOnTouched(fn: any): void {
  }
}
