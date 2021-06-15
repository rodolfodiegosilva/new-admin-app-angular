import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ConfigVariable } from '../shared/app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { reject } from 'q';
@Injectable()
export class ManageuserService {
  //baseUrl: string = 'https://www.gemstudent.com/API/';
  baseUrl: string = ConfigVariable.BASE_API_URL;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(
    private _http: Http, private http: HttpClient
  ) { }
  resendActivation(email){
    return this.http.post(this.baseUrl + 'Api/resentActivationLInk',email,this.httpOptions)
    .toPromise()
    .then(res => res)
    .catch(this.handleErrors);
  }

  getMentors(){
      return this.http.get(this.baseUrl + 'Mentor_Api/getmentoruser/', this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleErrors);
  }
  getPartners(){
    // return this.http.get(this.baseUrl + 'Partner_Api/getpartneruser/', this.httpOptions)
    //   .toPromise()
    //   .then(res => res)
    //   .catch(this.handleErrors);
      const headers = new Headers({'Content-Type':'application/json'});
      headers.append('token','');
      const options = new RequestOptions({headers:headers});
      return this._http.post(this.baseUrl + 'Partner_Api/getpartneruser/',headers,options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getCourses(inst_id:number){ 
    const headers = new Headers({'Content-Type':'application/json'});
      headers.append('token','');
      const options = new RequestOptions({headers:headers});
      return this._http.post(this.baseUrl + 'classification_Api/getCourses/?inst_id=2',headers,options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  getClasses(inst_id:any){
    const headers = new Headers({'Content-Type':'application/json'});
      headers.append('token','');
      const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'classification_Api/getClasses?inst_id=2',headers,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  educationUpdate(finaldata){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this.http.post(this.baseUrl+'Admin_Api/educationUpdate', finaldata,this.httpOptions)
    .toPromise()
    .then(res => res)
    .catch(this.handleErrors);
  }
  getAllRegisteredUsers(selectedValues) {
    const headers = new Headers();
    headers.append('token', '');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl + 'Admin_Api/getAllRegisteredUsers/', selectedValues, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleErrors)
  }
  getAllRegisteredMeetUsers(selectedValues) {
    const headers = new Headers();
    headers.append('token', '');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl + 'Admin_Api/getAllRegisteredUsers/', selectedValues, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleErrors)
  }
  // manageUserFilter(column1,values1){    const headers = new Headers();
  //   headers.append('token','');
  //   const options = new RequestOptions({headers:headers});
  //   // let string = '';
  //   //   if(column1){ string += 'column1='+column1+'&&values1='+values1; }

  //       return this._http.post( this.baseUrl + 'User_Api/manageUserFilter/',values1,options)

  //             .map(this.extractData)
  //             .catch(this.handleError);
  // }
  manageUserFilter(selectedvalues) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('token', '');
    const options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + 'classification_Api/getAllClassificationList/', selectedvalues, options)
      //return this._http.post(this.baseUrl + 'classification_Api/getAllClassificationList/?inst_id='+inst_id+'&&country='+country+'&&course='+course,headers,options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  // manageUserFilter(column,values){
  //   const headers = new Headers();
  //   headers.append('token','');
  //   const options = new RequestOptions({headers:headers});
  //   console.log(values); 
  //   return this._http.post(this.baseUrl+ 'User_Api/manageUserFilter',values,options)
  //               .map(this.extractData)
  //               .catch(this.handleError);

  // }
  getAllRegisteredUsersCount(body) {

    const headers = new Headers();
    headers.append('token', '');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl + 'Admin_Api/getDashboardCount/', body, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleErrors);

    // return this._http.get( this.baseUrl + 'User_Api/getAllRegisteredUsersCount')
    //           //.map((response: Response) =>response.json())
    //           .map(this.extractData)
    //           .catch(this.handleError);
  }
  fnameGroup(inst_id) {
    return this.http.get(this.baseUrl + 'Admin_Api/fnameGroup?inst_id='+inst_id, this.httpOptions)
      //.map((response: Response) =>response.json())
      .toPromise()
      .then(res => res)
      .catch(this.handleErrors);
  }
  dnameGroup(inst_id) {
    return this.http.get(this.baseUrl + 'Admin_Api/dnameGroup?inst_id='+inst_id, this.httpOptions)
      //.map((response: Response) =>response.json())
      .toPromise()
      .then(res => res)
      .catch(this.handleErrors);
  }
  dnameGroupTest(inst_id) {
    return this.http.get(this.baseUrl + 'Admin_Api/dnameGroupTest?inst_id='+inst_id, this.httpOptions)
      //.map((response: Response) =>response.json())
      .toPromise()
      .then(res => res)
      .catch(this.handleErrors);
  }
  lnameGroup(inst_id) {
    return this.http.get(this.baseUrl + 'Admin_Api/lnameGroup?inst_id='+inst_id, this.httpOptions)
      //.map((response: Response) =>response.json())
      .toPromise()
      .then(res => res)
      .catch(this.handleErrors);
  }
  userIdGroup(inst_id) {
    return this.http.get(this.baseUrl + 'Admin_Api/userIdGroup?inst_id='+inst_id, this.httpOptions)
      //.map((response: Response) =>response.json())
      .toPromise()
      .then(res => res)
      .catch(this.handleErrors);
  }
  snameGroup(inst_id) {
    return this.http.get(this.baseUrl + 'Admin_Api/snameGroup?inst_id='+inst_id, this.httpOptions)
      //.map((response: Response) =>response.json())
      .toPromise()
      .then(res => res)
      .catch(this.handleErrors);
  }
  cnameGroup(inst_id) {
    return this.http.get(this.baseUrl + 'Admin_Api/cnameGroup?inst_id='+inst_id, this.httpOptions)
      //.map((response: Response) =>response.json())
      .toPromise()
      .then(res => res)
      .catch(this.handleErrors);
  }
  schoolAccess() {
    return this._http.get(this.baseUrl + 'User_Api/schoolAccess')
      //.map((response: Response) =>response.json())
      .map(this.extractData)
      .catch(this.handleError);
  }
  showUser(userData) {
    const headers = new Headers();
    headers.append('token', '');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl + 'Admin_Api/showUser/', userData, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleErrors);
  }
  userProfileUpdateByAdmin(userProfile) {
    const headers = new Headers();
    headers.append('token', '');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl + 'Admin_Api/userProfileUpdateByAdmin/', userProfile, this.httpOptions)
    .toPromise()
    .then(res => res)
    .catch(this.handleErrors);
  }
  profilefieldUpdate(value, column, user_id) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('token', '');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl + 'Admin_Api/profilefieldUpdate/?value=' + value + '&&column=' + column + '&&user_id=' + user_id, this.httpOptions)
    .toPromise()
    .then(res => res)
    .catch(this.handleErrors);
  }
  useraddressUpdate(usad, usct, usst, uscn, user_id) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('token', '');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl + 'Admin_Api/useraddressUpdate/?user_address=' + usad + '&&user_city=' + usct + '&&user_state=' + usst + '&&user_country=' + uscn + '&&user_id=' + user_id, this.httpOptions)
    .toPromise()
    .then(res => res)
    .catch(this.handleErrors);
  }
  getSchools() {
    return this.http.get(this.baseUrl + 'Admin_Api/getSchools', this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleErrors);
  }
  getAllschoolinst() {
    return this.http.get(this.baseUrl + 'Admin_Api/getAllschoolinst', this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleErrors);
  }
  getAllmentorId() {
    return this.http.get(this.baseUrl + 'Admin_Api/getAllmentorId', this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleErrors);
  }
  getDlblReasons() {
    return this.http.get(this.baseUrl + 'Admin_Api/getDlblReasons')
      .toPromise()
      .then(res => res)
      .catch(this.handleErrors);
  }
  updateLogins(body) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('token', '');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl + 'Admin_Api/updateUserLogins/',body, this.httpOptions)
    .toPromise()
    .then(res => res)
    .catch(this.handleErrors);
  }
  changeAccess(body) {
    return this.http.post(this.baseUrl + 'Admin_Api/changeAccess/',body, this.httpOptions)
    .toPromise()
    .then(res => res)
    .catch(this.handleErrors);
  }
  profilephoneUpdate(pcvalue, pccolumn, pvalue, pcolumn, user_id) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('token', '');
    const options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + 'User_Api/updatePhone/?pcvalue=' + pcvalue + '&&pccolumn=' + pccolumn + '&&pvalue=' + pvalue + '&&pcolumn=' + pcolumn + '&&user_id=' + user_id, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  userRegConfirm(confirm, user_id, admintype_id) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('token', '');
    //alert(admintype_id);
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl + 'Admin_Api/userRegConfirm/?confirm=' + confirm + '&&user_id=' + user_id + '&&admintype_id=' + admintype_id, this.httpOptions)
    .toPromise()
    .then(res => res)
    .catch(this.handleErrors);
  }
  userRegVerified(verify, user_id, admintype_id) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('token', '');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl + 'Admin_Api/userRegVerified/?verify=' + verify + '&&user_id=' + user_id + '&&admintype_id=' + admintype_id, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleErrors);
  }
  userRegBlocked(blockedData) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('token', '');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl + 'Admin_Api/userRegBlocked/', blockedData, this.httpOptions)
      .toPromise()
      .then(res => res)
      .catch(this.handleErrors);
  }
  verifyMultipleUsers(checkedUsers) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('token', '');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl + 'Admin_Api/verifyMultipleUsers/', checkedUsers, this.httpOptions)
    .toPromise()
    .then(res => res)
    .catch(this.handleErrors);
  }
  userRegDeleted(delet, user_id, admintype_id, reson) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('token', '');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl + 'Admin_Api/userRegDeleted/?delet=' + delet + '&&user_id=' + user_id + '&&admintype_id=' + admintype_id + '&&reson=' + reson, this.httpOptions)
    .toPromise()
    .then(res => res)
    .catch(this.handleErrors);
  }
  filterUser(filteredData) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('token', '');

    const options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + 'User_Api/filterUser/', filteredData, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  changeAccessControls(accessControldata) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('token', '');

    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl + 'Admin_Api/changeAccessControls/', accessControldata, this.httpOptions )
    .toPromise()
    .then(res => res)
    .catch(this.handleErrors);
  }
  InstNoUserIdsGroup(){
    return this._http.get(this.baseUrl+'Institute_Api/getNoInstituteUser/')
    .map(this.extractData)
    .catch(this.handleError);
  }
  instAccess(column, user_id, value) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('token', '');
    const options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + 'Admin_Api/instAccess/?column=' + column + '&&user_id=' + user_id + '&&value=' + value, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  getbldlreasonid(reasonid) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('token', '');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl + 'Admin_Api/getbldlreasonid/?reasonid=' + reasonid, this.httpOptions)
    .toPromise()
    .then(res => res)
    .catch(this.handleErrors);
  }
  GeminstAccess(gemsdata) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('token', '');
    const options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + 'User_Api/GeminstAccess/', gemsdata, options)
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
      // localStorage.clear();
      return Promise.reject(error);
    }
    return Promise.reject(error.message || error);
  }
  SaveMentorUser(mentordata) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('token', '');
    const options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + '/Mentor_Api/registermentoruser', mentordata, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  EditMentorUser(mentorupdatedata) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('token', '');
    const options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + '/Mentor_Api/updatementoruser', mentorupdatedata, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  // showMentorUser() {
  //   const headers = new Headers({ 'Content-Type': 'application/json' });
  //   headers.append('token', '');
  //   const options = new RequestOptions({ headers: headers });
  //   return this._http.get('HTTP://localhost/CIBackend/Mentor_Api/getmentoruser')
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }
  SavePartnerUser(partnerdata) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('token', '');
    const options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + '/Partner_Api/registerpartneruser', partnerdata, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  EditPartnerUser(partnereditdata) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('token', '');
    const options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + '/Partner_Api/updatepartneruser', partnereditdata, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  // getMentorUser() {
  //   const headers = new Headers({ 'Content-Type': 'application/json' });
  //   headers.append('token', '');
  //   const options = new RequestOptions({ headers: headers });
  //   return this._http.post('HTTP://localhost/CIBackend/Mentor_Api/getmentoruser', MentorEditData, options)
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }
}
