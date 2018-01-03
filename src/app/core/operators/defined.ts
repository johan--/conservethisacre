import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';

Observable.prototype.defined = function <T>(this: Observable<T>, thisArg?: any): Observable<T> {
  return this.filter(value => value !== undefined);
};

declare module 'rxjs/Observable' {
  interface Observable<T> {
    defined: Function;
  }
}
