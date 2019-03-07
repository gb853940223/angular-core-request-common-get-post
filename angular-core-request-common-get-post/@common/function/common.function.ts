import {
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';


export function POST(url: string) {
  return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor['value'] = function (param?: HttpParams): Observable<any> {
      return this.http.post(url, param).pipe(
        tap(res => ThrowError(res)),
        // map(res => res)
      );
    };
  };
}

export function GET(url: string) {
  return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor['value'] = function (param?: HttpParams): Observable<any> {
      return this.http.get(url, param).pipe(
        tap(res => ThrowError(res)),
        // map(res => res)
      );
    };
  };
}

function ThrowError(res: any) {
  if (
    res !== null &&
    res.success &&
    res.message !== undefined
  ) {
    throw res;
  }
  if (res === null) {
    throw {
      msg: '数据异常'
    };
  }
}

