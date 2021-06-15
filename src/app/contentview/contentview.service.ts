import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ConfigVariable } from '../shared/app.config';
@Injectable()
export class ContentviewService {
//baseUrl: string = 'https://www.gemstudent.com/API/';
baseUrl: string = ConfigVariable.BASE_API_URL;

  constructor(private _http: Http) { }

  getContent(contentData: any): any {
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'contentUpload_Api/contentSearchList/',contentData,options)
    //return this._http.post(this.baseUrl + 'classification_Api/getAllClassificationList/?inst_id='+inst_id+'&&country='+country+'&&course='+course,headers,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  private extractData(res: Response){
    const body = res.json();
    const userToken = res['headers'].get('token');
    window.localStorage.setItem('token',userToken);
    return body || {};
  }
  getbldlReasonValues(resonid: any): any {
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'contentUpload_Api/getbldlReasonValues/?resonid='+resonid,headers,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  getBlockReasons(value): any {
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'contentUpload_Api/getBlockReasons/?value='+value,headers,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  deleteContent(body){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'contentUpload_Api/deleteContentAdmin',body,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  is_ContentVerifications(value: any, column: any, content_id, admin_id,a_column,date,rsnid,rsncol): any {
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'contentUpload_Api/isContentVerifications/?value='+value+'&&column='+column+'&&content_id='+content_id+'&&admin_id='+admin_id+'&&a_column='+a_column+'&&date='+date+'&&rsnid='+rsnid+'&&rsncol='+rsncol,headers,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  private handleError(error: Response | any){
    return Observable.throw(error || 'Internal server error');
  }

}
