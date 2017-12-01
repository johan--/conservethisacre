import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { ApiResponse } from '../interfaces/api.response';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

const headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');

/**
 * Handler that checks response for an error and if so - throws erorr from Observable stream
 * @param {ApiResponse} ares
 */
const checkErrorResponse = (ares: ApiResponse<any>) => {
  // console.log('checking response', ares);
  if (!ares.ok) {
    throw new Error(ares.message);
  }
};


@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {
  }

  /**
   * Performs request via get method
   * @param {string} url
   * @param {{params: HttpParams}} options
   * @returns {Observable<ApiResponse>}
   */
  get<T>(url: string, options?: { params: HttpParams }): Observable<T> {
    return this.http.get(this.url(url), {headers, ...options})
      .do(checkErrorResponse)
      .map(d => (d as ApiResponse<T>).data);
  }

  /**
   * Performs request via post method
   * @param {string} url
   * @param {{params: HttpParams}} options
   * @returns {Observable<ApiResponse>}
   */
  post<T>(url: string, body: any, options?: { params: HttpParams }): Observable<T> {
    return this.http.post(this.url(url), body, {headers, ...options})
      .do(checkErrorResponse)
      .map(d => (d as ApiResponse<T>).data);
  }

  /**
   * Performs request via delete method
   * @param {string} url
   * @param {{params: HttpParams}} options
   * @returns {Observable<ApiResponse>}
   */
  delete<T>(url: string, options?: { params: HttpParams }): Observable<T> {
    return this.http.delete(this.url(url), {headers, ...options})
      .do(checkErrorResponse)
      .map(d => (d as ApiResponse<T>).data);
  }

  /**
   * Builds qualified URL to API endpoint
   * @param url
   * @return {string}
   */
  private url(url: string) {
    const apiUrl = environment.apiUrl;
    // hack
    if (url.length && url[0] != '/') {
      url = '/' + url;
    }

    return apiUrl + url;
  }
}
