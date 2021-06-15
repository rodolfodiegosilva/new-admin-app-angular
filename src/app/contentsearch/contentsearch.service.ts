import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ConfigVariable } from '../shared/app.config';
@Injectable()
export class ContentsearchService {  
//baseUrl: string = 'https://www.gemstudent.com/API/';
baseUrl: string = ConfigVariable.BASE_API_URL;
constructor(private _http: Http) { }
getAllContent(selectedvalues){
  const headers = new Headers({'Content-Type':'application/json'});
  headers.append('token','');
  const options = new RequestOptions({headers:headers});
  return this._http.post(this.baseUrl + 'contentUpload_Api/contentSearchList/',selectedvalues,options)
  //return this._http.post(this.baseUrl + 'classification_Api/getAllClassificationList/?inst_id='+inst_id+'&&country='+country+'&&course='+course,headers,options)
  .map((response: Response) => response.json())
  .catch(this.handleError);
}
getAllContentCount(contentData: any): any {
  const headers = new Headers({'Content-Type':'application/json'});
  headers.append('token','');
  const options = new RequestOptions({headers:headers});
  return this._http.post(this.baseUrl + 'contentUpload_Api/contentSearchListCount/',contentData,options)
  //return this._http.post(this.baseUrl + 'classification_Api/getAllClassificationList/?inst_id='+inst_id+'&&country='+country+'&&course='+course,headers,options)
  .map((response: Response) => response.json())
  .catch(this.handleError);
}
getAllContentIds(body): any {
  const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'contentUpload_Api/getAllContentIds/',body)
    .map((response: Response) => response.json())
    .catch(this.handleError);
} 
getLessons(lessonsdata): any {
  const headers = new Headers({"Content-Type":"application/json"});
  headers.append('token','');
  const options = new RequestOptions({headers:headers});
  return this._http.post(this.baseUrl + 'classification_Api/getAllLessons',lessonsdata,options)
  .map((response: Response) => response.json())
  .catch(this.handleError);
} 
verifyContent(verifyContentData: any): any {
  const headers = new Headers({"Content-Type":"application/json"});
  headers.append('token','');
  const options = new RequestOptions({headers:headers});
  return this._http.post(this.baseUrl + 'contentUpload_Api/verifyContentData',verifyContentData,options)
  .map((response: Response) => response.json())
  .catch(this.handleError);
}
getContentCount(inst_id){
  const headers = new Headers({"Content-Type":"application/json"});
  headers.append('token','');
  const options = new RequestOptions({headers:headers});
  return this._http.post(this.baseUrl + 'contentUpload_Api/getContentCount/?inst_id='+inst_id,headers,options)
  .map((response: Response) => response.json())
  .catch(this.handleError);
}
private extractData(res: Response){
  const body = res.json();
  const userToken = res['headers'].get('token');
  window.localStorage.setItem('token',userToken);
  return body || {};
}
private handleError(error: Response | any){
  return Observable.throw(error || 'Internal server error');
}
}
