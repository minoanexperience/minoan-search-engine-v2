import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, take} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Brand, Product} from "./type";

@Injectable({
  providedIn: 'root'
})
export class SearchEngineService {

  showLoader = new BehaviorSubject(false);
  showLoaderText = new BehaviorSubject('');
  promptLoader = false;
  modalLoader: boolean = false;
  pageNumber = 1;

  RESULT_PRODUCT_COUNT : number = 0;

  RESULT_PRODUCT_LIST = new BehaviorSubject<Product[]>([]);

  RESULT_BRAND_LIST = new BehaviorSubject<Brand[]>([]);

  constructor(public http: HttpClient) {}

  get resultProductList(){
    return this.RESULT_PRODUCT_LIST.getValue();
  }

  set resultProductList(value: any) {
    this.RESULT_PRODUCT_LIST.next(value);
  }

  get resultBrandList(){
    return this.RESULT_BRAND_LIST.getValue();
  }

  set resultBrandList(value: any) {
    this.RESULT_BRAND_LIST.next(value);
  }

  updateLoader(value: boolean){
    this.showLoader.next(value);
  }

  updateLoaderText(value: any){
    this.showLoaderText.next(value);
  }

  /**
   * [POST] API to search products
   * @param requestBody
   */
  getSearchedProducts(requestBody: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/predict_re_products`, requestBody).pipe(
      take(1),
      map((response : any) => response),
      catchError((err) => {
        throw err
      })
    );
  }

  /**
   * [POST] API to search brands
   */
  getSearchedBrands(requestBody: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/predict_brands`, requestBody).pipe(
      take(1),
      map((response : any) => response),
      catchError(err => {
        throw err;
      })
    )
  }

}
