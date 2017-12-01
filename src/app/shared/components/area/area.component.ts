import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Area } from '../../../core/models/area';
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
export class AreaComponent implements ControlValueAccessor {
  /**
   * Stream when some data is changed from UI
   * @type {Subject<void>}
   */
  change = new Subject<any[]>();

  /**
   * Inner representation of value
   */
  _value: Area;

  /**
   * Function is called whenever view is changed to propagate this changes outside
   * @param any
   */
  propogateChanges = (...any) => {
  }

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

  constructor() {
    this.change.subscribe(([index, prop, value]) => {
      value = parseFloat(value);

      if (!this._value) {
        this._value = new Area([[]]);
      }

      if (!this._value.boundary[index]) {
        this._value.boundary[index] = {x: 0, y: 0};
      }

      this._value.boundary[index][prop] = isNaN(value) ? 0 : value;
      this.propogateChanges(this.value);
    });
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.propogateChanges = fn;
  }

  registerOnTouched(fn: any): void {
  }
}
