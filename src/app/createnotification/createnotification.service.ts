import { Injectable } from '@angular/core';
import { ConfigVariable } from '../shared/app.config';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class CreatenotificationService {
  
//baseUrl: string = 'https://www.gemstudent.com/API/';
baseUrl: string = ConfigVariable.BASE_API_URL;
//socketBaseUrl: string = 'http://localhost:8080/api/'; 
socketBaseUrl : string = ConfigVariable.SOCKET_API_URL;
private httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}
constructor(private _http: Http,private http: HttpClient) { }

getNotificationList(qnsReq:any){     
  const headers = new Headers({"Content-Type":"application/json"});
  headers.append('token','');
  const options = new RequestOptions({headers:headers});      
  return this._http.post(this.baseUrl + 'Notification_Api/getNotificationList',qnsReq,options)
  .map((response: Response) => response.json())
  .catch(this.handleError);
}
getNotificationListCount(qnsReq:any){     
  const headers = new Headers({"Content-Type":"application/json"});
  headers.append('token','');
  const options = new RequestOptions({headers:headers});      
  return this._http.post(this.baseUrl + 'Notification_Api/getNotificationListCount',qnsReq,options)
  .map((response: Response) => response.json())
  .catch(this.handleError);
}

getCoursesUser(inst_id:number){ 
  const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'classification_Api/getCoursesUser/?inst_id='+inst_id,headers,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
}

getClassesUser(body) {
  const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('token', '');
    const options = new RequestOptions({headers: headers});
  return this._http.post(this.baseUrl + 'classification_Api/getClassesUser', body, options)
  .map((response: Response) => response.json())
  .catch(this.handleError);
}

getSubjectsUser(inst_id: any) {
  const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('token', '');
    const options = new RequestOptions({headers: headers});
  return this._http.post(this.baseUrl + 'classification_Api/getSubjectsUser?inst_id=' + inst_id, headers, options)
  .map((response: Response) => response.json())
  .catch(this.handleError);
}

contentFileUpload(fileToUpload: File): any {
  const endpoint = this.baseUrl+'Notification_Api/contentFileUpload';
  const formData : FormData = new FormData();
  formData.append('file_path',fileToUpload,fileToUpload.name);
  return this._http.post(endpoint,formData)
  .map((response: Response) => response.json())
            .catch(this.handleError);
}

checkFileExt(ext:any,size:any){
  const headers = new Headers({'Content-Type':'application/json'});
  headers.append('token','');
  const options = new RequestOptions({headers:headers});
  return this._http.post(this.baseUrl + 'Notification_Api/checkFileExt/?extension='+ext+'&&fileSize='+size,headers,options)
  .map((response: Response) => response.json())
  .catch(this.handleError);
}

createNotification(data){
  // const headers = new Headers({'Content-Type': 'application/json'});
  //   headers.append('token', '');
  //   const options = new RequestOptions({headers: headers});
  return this._http.post(this.baseUrl + 'Notification_Api/createNotification', data)
  .map((response: Response) => response.json())
  .catch(this.handleError);
}

DeleteNotification(data:any){
  const headers = new Headers({"Content-Type":"application/json"});
  headers.append('token','');
  const options = new RequestOptions({headers:headers});
  return this._http.post(this.baseUrl + 'Notification_Api/DeleteNotification',data,options)
  .map((response: Response) => response.json())
  .catch(this.handleError);
 }

private handleError(error: Response | any){
  return Observable.throw(error || 'Internal server error');
}
private handleErrors(error:any):Promise<any>{
  if(error.status === 401){
    return Promise.reject({error:error});
  }
  if(error.status === 500){
    return Promise.reject({error:error});
  }
  return Promise.reject({error:error.message || error});  
  }
}
