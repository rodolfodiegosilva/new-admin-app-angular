import { Injectable } from '@angular/core';
import { ConfigVariable } from './shared/app.config';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable()
export class PartnerService {


  baseUrl: string = ConfigVariable.BASE_API_URL;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: Http) { }

  getAllPartners(data: any){
    // const headers = new Headers({'Content-Type':'applicaiton/json'});
    // headers.append('token','');
    // const options = new RequestOptions({ headers: headers });
    // //alert(country);
    // return this.http.post( this.baseUrl + 'Partner_Api/getAllPartners/',options)
    //             .map(this.extractData)
    //             .catch(this.handleError);
    return this.http.post(this.baseUrl + 'Partner_Api/getAllPartners', data)
    .map((response: Response) => response.json())
    .catch(this.handleError);

  }
  getAllUserPartners(data: any){
    return this.http.post(this.baseUrl + 'Partner_Api/getAllUserPartners', data)
    .map((response: Response) => response.json())
    .catch(this.handleError);

  }
  updatePartnerAproveRejectStatus(data){
    return this.http.post(this.baseUrl + 'Partner_Api/updatePartnerAproveRejectStatus', data)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  updateUserPartnerAproveRejectStatus(data){
    return this.http.post(this.baseUrl + 'Partner_Api/updateUserPartnerAproveRejectStatus', data)
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

