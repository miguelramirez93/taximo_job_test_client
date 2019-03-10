import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
const mainPath = 'https://taximojobtest.herokuapp.com/';
@Injectable()
export class FishStoresApiServiceService {
  constructor(private httpClient: HttpClient) {}
  getService(endPoint: string): any {
    return this.httpClient.get(mainPath + endPoint).pipe(
      map(response => response),
      catchError(() => of('Services error'))
    );
  }
  postService(endPoint: string, data: any) {
    return this.httpClient.post(mainPath + endPoint, data).pipe(
      map(response => response),
      catchError(() => of('Services error'))
    );
  }
}
