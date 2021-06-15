import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ConfigVariable } from '../shared/app.config';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class ManageinstituteService {
  baseUrl: string = ConfigVariable.BASE_API_URL;
  //baseUrl: string = 'https://www.gemstudent.com/API/';
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private _http: Http, public http: HttpClient) { }

  getInstitute(inst_id) {
    const headers = new Headers();
    headers.append('token', '');
    const options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + 'Institute_Api/getInstituteDetails/?inst_id=' + inst_id, options)
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
  getInstituteBranches(id) {
    return this.http.get(this.baseUrl + 'Institute_Api/getInstituteBranch?inst_id='+id, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleErrors);
  }
  createBranch(body) {
    return this.http.post(this.baseUrl + 'Institute_Api/createInstituteBranch', body, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleErrors);
  }
  
  updateBranch(body) {
    return this.http.post(this.baseUrl + 'Institute_Api/updateInstituteBranch', body, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleErrors);
  }
  updateAdminBranch(body) {
    return this.http.post(this.baseUrl + 'Admin_Api/updateAdminBranch', body, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleErrors);
  }
  getBranchsByAdmin(id){
    return this.http.get(this.baseUrl + 'Institute_Api/getAdminBranch?admin_id='+ id, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleErrors);
  }
  getBranchDetails(id){
    return this.http.get(this.baseUrl + 'Institute_Api/getBranch?branch_id='+ id, this.httpOptions)
    .toPromise()
    .then(res => res)
    .catch(this.handleErrors);
  }
  createsAdmin(finaldata) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('token', '');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl + 'Admin_Api/createsAdmin', finaldata, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleErrors);
  }
  getInstituteAdmins(instId) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('token', '');
    const options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + 'Institute_Api/getInstituteAdmins/?instId=' + instId, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  showAdmin(admin_id) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('token', '');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl + 'Admin_Api/showAdmin/?admin_id=' + admin_id, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }
  userRegConfirm(confirm, admin_id, instadmin_id) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('token', '');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl + 'Admin_Api/adminRegConfirm/?confirm=' + confirm + '&&admin_id=' + admin_id + '&&instadmin_id=' + instadmin_id, options)
      .toPromise()
      .then(res => res)
      .catch(this.handleErrors);
  }
  userRegBlocked(block, admin_id, instadmin_id) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('token', '');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl + 'Admin_Api/adminRegBlocked/?block=' + block + '&&admin_id=' + admin_id + '&&instadmin_id=' + instadmin_id, options)
      .toPromise()
      .then(res => res)
      .catch(this.handleErrors);
  }
  userRegDeleted(delet, admin_id, instadmin_id) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('token', '');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl + 'Admin_Api/adminRegDeleted/?delet=' + delet + '&&admin_id=' + admin_id + '&&instadmin_id=' + instadmin_id, options)
      .toPromise()
      .then(res => res)
      .catch(this.handleErrors);
  }
  CheckAdminAvailability(checkData) {
    // const headers = new Headers({'Content-Type':'application/json'});
    // headers.append('token','');
    // const options = new RequestOptions({headers: headers});
    return this.http.post(this.baseUrl + 'Admin_Authentication/CheckAdminAvailability/', checkData)
      .toPromise()
      .then(res => res)
      .catch(this.handleErrors);
  }
  updateInstitute(institute) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('token', '');
    const options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + 'Institute_Api/updateInstitute/', institute, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  updateinstSA(instSA) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('token', '');
    const options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + 'Institute_Api/updateinstSA/', instSA, options)
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
  private handleErrors(error: any): Promise<any> {
    if (error.status === 500) {
      return Promise.reject(error);
    }
    if (error.status === 401) {
      return Promise.reject(error);
    }
    return Promise.reject({ error: error.message || error })
  }
}
