import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, take} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SearchEngineService {

  showLoader = new BehaviorSubject(false);
  showLoaderText = new BehaviorSubject('');

  constructor(public http: HttpClient) {}

  updateLoader(value: boolean){
    this.showLoader.next(value);
  }

  updateLoaderText(value: any){
    this.showLoaderText.next(value);
  }

  /**
   * [GET] API to search products
   * @param requestBody
   */
  getSearchedProducts(requestBody: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/predict`, requestBody).pipe(
      take(1),
      map((response : any) => response),
      catchError((err) => {
        throw err
      })
    );
  }

}
