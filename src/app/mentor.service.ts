import { Injectable } from '@angular/core';
import { ConfigVariable } from './shared/app.config';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable()
export class MentorService {

  baseUrl: string = ConfigVariable.BASE_API_URL;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: Http) { }

  getCreateMentor(data: any){
    // console.log("create mentor");
    // const headers = new Headers({'Content-Type':'applicaiton/json'});
    // headers.append('token','');
    // const options = new RequestOptions({ headers: headers });
    //alert(country);
    // return this.http.post( this.baseUrl + 'Mentor_Api/getAllMentors/',data,options)
    //             .map(this.extractData)
    //             .catch(this.handleError);
    return this.http.post(this.baseUrl + 'Mentor_Api/getAllMentors', data)
    .map((response: Response) => response.json())
    .catch(this.handleError);

  }
  updateMentorAproveRejectStatus(data){
    // const headers = new Headers({ 'Content-Type': 'application/json' });
    // headers.append('token', '');
    // const options = new RequestOptions({ headers: headers });
    // return this.http.post(this.baseUrl + 'Mentor_Api/updateMentorAproveRejectStatus/', data, this.httpOptions)
    // .toPromise()
    // .then(res => res)
    // .catch(this.handleError);
    return this.http.post(this.baseUrl + 'Mentor_Api/updateMentorAproveRejectStatus', data)
    .map((response: Response) => response.json())
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

}
