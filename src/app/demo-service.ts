import { Injectable } from '@angular/core';
import { throwError, delay, Observable, of } from 'rxjs';
import { ApiModel } from './models';

@Injectable({
  providedIn: 'root',
})
export class DemoService {
  public get(id: number): Observable<ApiModel> {
    switch (id) {
      case 1:
        return of(new ApiModel(1, 'Angular is cool')).pipe(delay(1000));
      case 2:
        return of(new ApiModel(2, 'RxJS is cooler')).pipe(delay(1500));
      default:
        throwError(() => new Error('404'));
    }
  }
}
