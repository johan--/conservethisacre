import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';

function notNull<T>(this: Observable<T>, thisArg?: any): Observable<T> {
  return this.filter(value => !!value);
}

Observable.prototype.notNull = notNull;

declare module 'rxjs/Observable' {
  interface Observable<T> {
    notNull: Function;
  }
}
