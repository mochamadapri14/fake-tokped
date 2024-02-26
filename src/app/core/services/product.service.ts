import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ENVIRONMENT } from 'src/env/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private PROUDCT_URL = ENVIRONMENT.baseUrl + '/product';

  constructor(
    private http: HttpClient
  ) { }

  public getAllProducts(): Observable<any[]> {
    return <Observable<any[]>>this.http.get(this.PROUDCT_URL);
  }

}
