import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ConfigVariable } from '../shared/app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class CreateadminprofileService {
  baseUrl: string = ConfigVariable.BASE_API_URL;
  //baseUrl: string = 'https://www.gemstudent.com/API/';
  private httpOptions =  {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor(private _http: Http, private http:HttpClient) { }
  createsAdmin(finaldata){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    //console.log('Service admin ' + finaldata);
    const options = new RequestOptions({headers:headers});
    //console.log(finaldata);
    return this.http.post(this.baseUrl + 'Admin_Api/createsAdmin',finaldata, this.httpOptions)
    .toPromise()
    .then(res => res)
    .catch(this.handleError);
  }
  private extractData(res: Response){
    const body = res.json();
    const userToken = res['headers'].get('token');
    window.localStorage.setItem('token', userToken);
    return body || {};
  }
  private handleError(error: Response | any)
  {
    return Observable.throw(error || 'Internal server error');
  }
  private handleErrors(error:any):Promise<any>{
    if(error.status === 401){
      return Promise.reject({error:error})
    }
    if(error.status === 500){
      return Promise.reject({error:error})
    }
    return Promise.reject({error: error.message || error})
  }
}
