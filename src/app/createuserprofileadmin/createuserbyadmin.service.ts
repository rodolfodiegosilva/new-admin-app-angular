import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ConfigVariable } from '../shared/app.config';

@Injectable()
export class CreateuserbyadminService {
  //baseUrl: string = 'https://www.gemstudent.com/API/';
  baseUrl: string = ConfigVariable.BASE_API_URL;
  constructor(private _http: Http) { }
  getuserTypes(){
    return this._http.get(this.baseUrl + 'Default_Api/getuserTypes')
                     .map((response: Response) => response.json())
                     .catch(this.handleError);
  }
  createUserbyAdmin(finaldata){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'Authentication/registerUser',finaldata, options)
                      .map((response: Response) => response.json())
                      .catch(this.handleError);

  }
  uniqueEmail(value,column){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'Api/uniqueEmail?email='+value, options)
                      .map((response: Response) => response.json())
                      .catch(this.handleError);

  }
  uniqueUsername(value,column){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'Api/uniqueUsername?username='+value, options)
                      .map((response: Response) => response.json())
                      .catch(this.handleError);

  }
  
  private extractData(res: Response) {
    const body = res.json();
    const userToken = res['headers'].get('token');
    window.localStorage.setItem('token', userToken);
    return body || {};
  }
  private handleError(error: Response | any) {
    return Observable.throw(error);
  }
}
