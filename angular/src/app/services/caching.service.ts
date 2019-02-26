import { Observable } from "rxjs";
import { share } from 'rxjs/operators';

export abstract class CachingServiceBase {
  protected cache<T>(getter: () => Observable<T>,
    setter: (val: Observable<T>) => void,
    retreive: () => Observable<T>): Observable<T> {
    const cached = getter();
    if (cached !== undefined) {
      return cached;
    } else {
      const val = retreive().pipe(share());
      setter(val);
      return val;
    }
  }
}