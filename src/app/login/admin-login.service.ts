import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ConfigVariable } from '../shared/app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AdminLoginService {
  baseUrl: string = ConfigVariable.BASE_API_URL;
  //baseUrl: string = 'https://www.gemstudent.com/API/';
  private httpOptions = {
    Headers :new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: Http, private _http:HttpClient) { }

  sendLogins(admindata){
    const headers = new Headers();
    headers.append('token', '');
    const options = new RequestOptions({ headers: headers });   
    return this.http.post( this.baseUrl+'Admin_Authentication/adminLogin', admindata)
        .map(this.extractData)
        .catch(this.handleError);
  }
  getadminUser(id,type){
    const headers = new Headers();
    headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.baseUrl+'Admin_Authentication/getadminUser/'+id+'/'+type,options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  createAdmin(finaldata){
    const headers = new Headers();
    headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.baseUrl+'Admin_Authentication/createAdmin',finaldata,options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  adminUsernameAvailability(body){
    const headers = new Headers();
    headers.append('token','');
    const options = new RequestOptions({headers: headers});
    
    return this.http.post(this.baseUrl+'Admin_Authentication/CheckAdminAvailability/',body,options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  sendforgotPasswordEmail(forgotData){
    const headers = new Headers();
    headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.baseUrl+'Admin_Authentication/sendforgotPasswordEmail',forgotData,options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
     /*---- To extract json data ----*/
     private extractData(res: Response) { 
      const body = res.json();
      const userToken = res['headers'].get('token');
      window.localStorage.setItem('token', userToken);
      return body || {};
  }

  /*----- To handle error message ----*/
  private handleError(error: Response | any) {
      return Observable.throw(error);
  }
}
