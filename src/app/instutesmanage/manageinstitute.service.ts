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
export class ManageinstituteService {
  baseUrl: string = ConfigVariable.BASE_API_URL;
 //baseUrl: string = 'https://www.gemstudent.com/API/';
 private httpOptions = {
   headers: new HttpHeaders({
     'Content-Type':'application/json'
   })
 }
  constructor(private _http: Http, private http:HttpClient) { }
  getSchooluser(){
    // alert('service');
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.get('/assets/dt/sample.json', options)
                      .map(this.extractData)
                      .catch(this.handleError);
  }

  getSchoolusersearch(item){
    // alert('service');
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    //return this._http.get('/assets/dt/sample.json', options)
    //alert('service '+ item);
    return this._http.post(this.baseUrl + 'Admin_api/searchforInstitute/'+item, options)
                      .map(this.extractData)
                      .catch(this.handleError);
  }

  getSchoolid(item){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'api/getSchoolid/'+item, options)
                      .map(this.extractData)
                      .catch(this.handleError);
  }
  getInstid(item,column){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    //alert('Service '+column);
    return this._http.post(this.baseUrl + 'Institute_Api/getInstid/?value='+item+'&&column='+column, options)
                      .map(this.extractData)
                      .catch(this.handleError);
  }
  showUser(id){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl +'api/showUser/'+id,options)
                      .map(this.extractData)
                      .catch(this.handleError);
  }
resendActivation(email){
  return this.http.post(this.baseUrl + 'Institute_Api/activationLink',email,this.httpOptions)
  .toPromise()
  .then(res => res)
  .catch(this.handleErrors);
}
  createSuperadmininstitue(superadminData){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'Institute_Api/createSuperadmininstitue',superadminData,options)
                      .map(this.extractData)
                      .catch(this.handleError);
  }

  showInstitute(item){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    //alert('Service '+item);
    return this._http.post(this.baseUrl + 'Institute_Api/editInstitute/'+item, options)
                      .map(this.extractData)
                      .catch(this.handleError);
  }
  updateInstitute(institute){
      const headers = new Headers({'Content-Type':'application/json'});
      headers.append('token','');
      const options = new RequestOptions({headers: headers});
      return this._http.post(this.baseUrl + 'Institute_Api/updateInstitute/',institute, options )
                        .map(this.extractData)
                        .catch(this.handleError);
  }
  updateinstSA(instSA){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.baseUrl + 'Institute_Api/updateinstSA/',instSA, options )
                      .map(this.extractData)
                      .catch(this.handleError);
  }
  getAllInstitutes(pageNum,rowsPerPage){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.baseUrl + 'Institute_Api/getAllInstitutes/?page='+pageNum+'&&rowsPerPage='+rowsPerPage,options)
                .map(this.extractData)
                .catch(this.handleError);
  }
  getAllInstitutesCount(){
    return this._http.get(this.baseUrl + 'Institute_Api/getAllInstitutesCount/')
                .map(this.extractData)
                .catch(this.handleError);
  }
  manageUserFilter(column1,values1){
    const headers = new Headers();
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    let string = '';
      if(column1){ string += 'column1='+column1+'&&values1='+values1; }     
        return this._http.post( this.baseUrl + 'Institute_Api/manageUserFilter/?'+string,options)
              .map(this.extractData)
              .catch(this.handleError);
  }
  getAllStates(){
    return this._http.get(this.baseUrl+'Institute_Api/getState')
    .map(this.extractData)
    .catch(this.handleError);
  }
  getAllCity(){
    return this._http.get(this.baseUrl+'Institute_Api/getCity')
    .map(this.extractData)
    .catch(this.handleError);
  }
  InstNoUserIdsGroup(){
    return this._http.get(this.baseUrl+'Institute_Api/getNoInstituteUser/')
    .map(this.extractData)
    .catch(this.handleError);
  }
  InstUserIdsGroup(){
    return this._http.get(this.baseUrl+'Institute_Api/InstUserIdsGroup/')
    .map(this.extractData)
    .catch(this.handleError);
  }
  UserNameGroup(){
    return this._http.get(this.baseUrl+'Institute_Api/UserNameGroup/')
    .map(this.extractData)
    .catch(this.handleError);
  }
  InstIdsGroup(){
    return this._http.get(this.baseUrl+'Institute_Api/InstIdsGroup/')
    .map(this.extractData)
    .catch(this.handleError);
  }
  InstNamesGroup(){
    return this._http.get(this.baseUrl+'Institute_Api/InstNamesGroup/')
    .map(this.extractData)
    .catch(this.handleError);
  }
  ContactNamesGroup(){
    return this._http.get(this.baseUrl+'Institute_Api/ContactNamesGroup/')
    .map(this.extractData)
    .catch(this.handleError);
  }
  getUniqueInstitute(){
    return this._http.get(this.baseUrl+'Institute_Api/getUniqueInstitute/')
                .map(this.extractData)
                .catch(this.handleError);
  }
  searchForInstitute(item){
    const headers = new Headers({'Content-Type':'application/json'});
      headers.append('token','');
      const options = new RequestOptions({headers: headers});
      return this.http.post(this.baseUrl + 'Admin_Api/searchforInstitute/'+item, this.httpOptions )
      .toPromise()
      .then(res => res)
      .catch(this.handleErrors);
  }
  CheckAdminAvailability(checkData){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.baseUrl + 'Admin_Authentication/CheckAdminAvailability/',checkData, options )
                      .map(this.extractData)
                      .catch(this.handleError);
  }
  instituteAccessUpdateform(accessdata){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.baseUrl + 'Institute_Api/instituteAccessUpdateform/',accessdata, options )
                      .map(this.extractData)
                      .catch(this.handleError);
  }
  instDefaultUpdate(defaultedit){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.baseUrl + 'Institute_Api/instDefaultUpdate/',defaultedit, options )
                      .map(this.extractData)
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
  private handleErrors(error: any):Promise<any>{
    if(error.status === 401){
      return
    }
   return Promise.reject({error:error.message || error})
  }
}
