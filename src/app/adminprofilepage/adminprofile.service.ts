import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ConfigVariable } from '../shared/app.config';
@Injectable()
export class AdminprofileService {
  baseUrl: string = ConfigVariable.BASE_API_URL;
  socketBaseUrl: string = ConfigVariable.SOCKET_API_URL;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  //baseUrl: string = 'https://www.gemstudent.com/API/';
  constructor(private _http: Http,private http:HttpClient) { }
  getAdminprofile(Check_admin_id,admintype_id){
    const headers = new Headers({'Content-type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this.http.post(this.baseUrl+'Admin_Api/getAdminprofile/?id='+Check_admin_id+'&&type='+admintype_id,this.httpOptions)
    .toPromise()
    .then(res=>res)
    .catch(this.handleErrors);
  }
  profilefieldUpdate(value,column,Check_admin_id){
      const headers =new Headers({'Content-Type':'application/json'});
      headers.append('token','');
      const options = new RequestOptions({headers: headers});
      return this.http.post(this.baseUrl+'Admin_Api/profilefieldUpdate/?value='+value+'&&column='+column+'&&admin_id='+Check_admin_id,options)
      .toPromise()
      .then(res=>res)
      .catch(this.handleErrors);
  }
  profilePhoneUpdate(valuec,columnc,value,column,Check_admin_id){
    const headers =new Headers({'Content-Type':'application/json'});
      headers.append('token','');
      const options = new RequestOptions({headers: headers});
      return this.http.post(this.baseUrl+'Admin_Api/profilePhoneUpdate/?value='+value+'&&column='+column+'&&valuec='+valuec+'&&columnc='+columnc+'&&admin_id='+Check_admin_id,options)
      .toPromise()
      .then(res=>res)
      .catch(this.handleErrors);
  }
  updateAdminProfile(finaldata){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    //alert(finaldata.admin_dname);
    return this.http.put(this.baseUrl+'Admin_Api/updateAdminProfile',finaldata,this.httpOptions)
    .toPromise()
    .then(res=>res)
    .catch(this.handleErrors)

  }
  passwordUpdate(finaldata){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this.http.post(this.baseUrl+'Admin_Api/passwordUpdate',finaldata,this.httpOptions)
    .toPromise()
    .then(res=>res)
    .catch(this.handleErrors)

  }
  updateLogins(value,column,Check_admin_id){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this.http.post(this.baseUrl+'Admin_Api/updateLogins/?value='+value+'&&column='+column+'&&admin_id='+Check_admin_id,this.httpOptions)
    .toPromise()
    .then(res=>res)
    .catch(this.handleErrors);
  }
  uploadFile(selectedFile){
    const fd = new FormData();
    fd.append('image',selectedFile, selectedFile.name)
    this._http.post(this.baseUrl,fd)
        .map(this.extractData)
        .catch(this.handleError)
  }
  useraddressUpdate(usad,usct,usst,uscn,Check_admin_id){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this.http.post(this.baseUrl+'Admin_Api/useraddressUpdate/?user_address='+usad+'&&user_city='+usct+'&&user_state='+usst+'&&user_country='+uscn+'&&admin_id='+Check_admin_id,this.httpOptions)
    .toPromise()
    .then(res => res)
    .catch(this.handleErrors);
  }
  uploadProfileimg(admin_id: string,fileToUpload: File){
  const endpoint = this.baseUrl+'Admin_Api/uploadProfilepic';
  const formData: FormData = new FormData();
  formData.append('admin_pic',fileToUpload,fileToUpload.name);
  formData.append('admin_id',admin_id);
  return this.http.post(endpoint,formData)
  .toPromise()
  .then(res=>res)
  .catch(this.handleErrors);
}
uploadTimelineimg(admin_id:string,fileToUpload: File){
  const endpoint = this.baseUrl+'Admin_Api/uploadTimelineimg';
  const formData: FormData = new FormData();
  formData.append('admin_timeline_pic',fileToUpload,fileToUpload.name);
  formData.append('admin_id',admin_id);
  return this.http.post(endpoint,formData)
  .toPromise()
  .then(res=>res)
  .catch(this.handleErrors);
}
//mmlabs from userpage
getUserProfile(data: any) {
  const headers = new Headers({'Content-Type': 'application/json'});
  // headers.append('token','');
  const options = new RequestOptions({headers: headers});
  return this.http.post(this.baseUrl + 'User_Api/getUserProfile/' , data , this.httpOptions )
                    .toPromise()
                    .then(res => res)
                    .catch(this.handleErrors);
}
// mmlabs for results from userpage.service
getReport(data: any) {
  const headers = new Headers({'Content-Type': 'application/json'});
  const options = new RequestOptions({headers: headers});
  return this._http.post(this.baseUrl + 'Discussion_Api/getReport', data, options)
  .map(this.extractData)
    .catch(this.handleError);
}
reportOnObject(data: any) {
  const headers = new Headers({'Content-Type': 'application/json'});
  const options = new RequestOptions({headers: headers});
  return this._http.post(this.socketBaseUrl + 'report/reportOnObject', data, options)
  .map(this.extractData)
    .catch(this.handleError);
}
blockedQuestion(data: any){
  const headers = new Headers({'Content-Type': 'application/json'});
  const options = new RequestOptions({headers: headers});
  return this._http.post(this.baseUrl + 'Questions_Api/blockedQuestion', data, options)
  .map(this.extractData)
    .catch(this.handleError)
}
createReward(data) {
  const headers = new Headers({'Content-Type': 'application/json'});
  headers.append('token', '');
  const options = new RequestOptions({headers: headers});
  return this._http.post(this.baseUrl + 'Reward_Api/createReward', data, options)
  .map(this.extractData)
    .catch(this.handleError);
}
rateForObject(data: any) {
  const headers = new Headers({'Content-Type': 'application/json'});
  const options = new RequestOptions({headers: headers});
  return this._http.post(this.socketBaseUrl + 'rating/rateForObject', data, options)
  .map(this.extractData)
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
