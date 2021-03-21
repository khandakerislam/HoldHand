import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private httpClient: HttpClient) { }
  // baseURL = 'http://localhost:8080/ScholarshipService/';
  baseURL = 'http://ec2-18-211-221-248.compute-1.amazonaws.com:8081/ScholarshipService/';
  // postapi(parameter,url){
  //   var urls = url;
  //   return this.http.get(urls,parameter);
  // }

  postAPICallImg(params: any, url: string): Observable<any> {
    const reqURL = this.baseURL + url;
    const httpOptions = { headers: new HttpHeaders({ observe: 'response' }) };
    return this.httpClient.post<any>(reqURL, params, httpOptions);
  }

  postAPICall(params: any, url: string): Observable<any> {
    const reqURL = this.baseURL + url;
    // Note
    const corsHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*' //. // edit
      });
    // const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const httpOptions = { headers: corsHeaders};
    return this.httpClient.post<any>(reqURL, params, httpOptions);
  }
  /****************GET API CALL (DO NOT CHANGE)*********************/
  getAPICall(url: string): Observable<any[]> {
    const reqURL = this.baseURL + url;
    // const reqURL = url;
    const httpOptions = { headers: new HttpHeaders( { observe: 'response', responseType: 'arraybuffer' } ) };
    return this.httpClient.get<any>(reqURL, httpOptions);
  }
}
