import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ConfigVariable } from './shared/app.config';

@Injectable()
export class ClassificationsService {
 //baseUrl: string = 'https://www.gemstudent.com/API/';
 baseUrl: string = ConfigVariable.BASE_API_URL;
  constructor(private _http: Http) { }  
  getCourses(inst_id:number){ 
    const headers = new Headers({'Content-Type':'application/json'});
      headers.append('token','');
      const options = new RequestOptions({headers:headers});
      return this._http.post(this.baseUrl + 'classification_Api/getCourses/?inst_id='+inst_id,headers,options)
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
      return this._http.post(this.baseUrl + 'Classification_Api/getClassesUser/' , body, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  getSubjectsUser(inst_id) {
    const headers = new Headers({'Content-Type': 'application/json'});
      headers.append('token', '');
      const options = new RequestOptions({headers: headers});
      return this._http.post(this.baseUrl + 'Classification_Api/getSubjectsUser/?inst_id=' + inst_id, headers, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  getCourseslimit(inst_id,limit,offset,block,verify,search){ 
    const headers = new Headers({'Content-Type':'application/json'});
      headers.append('token','');
      const options = new RequestOptions({headers:headers});
      return this._http.post(this.baseUrl + 'classification_Api/getCourses/?inst_id='+inst_id+'&limit='+limit+'&offset='+offset+'&block='+block+'&verify='+verify+'&search='+search,headers,options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  updateCourse(body){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'classification_Api/updateCourse/',body)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  getCoursesCount(inst_id,block,verify,search){ 
    const headers = new Headers({'Content-Type':'application/json'});
      headers.append('token','');
      const options = new RequestOptions({headers:headers});
      return this._http.post(this.baseUrl + 'classification_Api/getCoursesCount/?inst_id='+inst_id+'&block='+block+'&verify='+verify+'&search='+search,headers,options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  verifyCourses(body){ 
    const headers = new Headers({'Content-Type':'application/json'});
      headers.append('token','');
      const options = new RequestOptions({headers:headers});
      return this._http.post(this.baseUrl + 'classification_Api/verifyCourse/',body)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  blockunblockCourse(body){ 
    const headers = new Headers({'Content-Type':'application/json'});
      headers.append('token','');
      const options = new RequestOptions({headers:headers});
      return this._http.post(this.baseUrl + 'classification_Api/blockunblockCourse/',body)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  getClasses(inst_id:any){
    const headers = new Headers({'Content-Type':'application/json'});
      headers.append('token','');
      const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'classification_Api/getClasses?inst_id='+inst_id,headers,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  getClasseslimit(inst_id,limit,offset,block,verify,search){ 
    const headers = new Headers({'Content-Type':'application/json'});
      headers.append('token','');
      const options = new RequestOptions({headers:headers});
      return this._http.post(this.baseUrl + 'classification_Api/getClasses/?inst_id='+inst_id+'&limit='+limit+'&offset='+offset+'&block='+block+'&verify='+verify+'&search='+search,headers,options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  updateClasses(body){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'classification_Api/updateClasses/',body)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  getClassesCount(inst_id,block,verify,search){ 
    const headers = new Headers({'Content-Type':'application/json'});
      headers.append('token','');
      const options = new RequestOptions({headers:headers});
      return this._http.post(this.baseUrl + 'classification_Api/getClassesCount/?inst_id='+inst_id+'&block='+block+'&verify='+verify+'&search='+search,headers,options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  verifyClass(body){ 
    const headers = new Headers({'Content-Type':'application/json'});
      headers.append('token','');
      const options = new RequestOptions({headers:headers});
      return this._http.post(this.baseUrl + 'classification_Api/verifyClasses/',body)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  blockunblockClass(body){ 
    const headers = new Headers({'Content-Type':'application/json'});
      headers.append('token','');
      const options = new RequestOptions({headers:headers});
      return this._http.post(this.baseUrl + 'classification_Api/blockunblockClasses/',body)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  getSubjects(inst_id:any){
    const headers = new Headers({'Content-Type':'application/json'});
      headers.append('token','');
      const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'classification_Api/getSubjects?inst_id='+inst_id,headers,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  getSubjectslimit(inst_id,limit,offset,block,verify,search){ 
    const headers = new Headers({'Content-Type':'application/json'});
      headers.append('token','');
      const options = new RequestOptions({headers:headers});
      return this._http.post(this.baseUrl + 'classification_Api/getSubjectslimit/?inst_id='+inst_id+'&limit='+limit+'&offset='+offset+'&block='+block+'&verify='+verify+'&search='+search,headers,options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  updateSubjects(body){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'classification_Api/updateSubjects/',body)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  getSubjectsCount(inst_id,block,verify,search){ 
    const headers = new Headers({'Content-Type':'application/json'});
      headers.append('token','');
      const options = new RequestOptions({headers:headers});
      return this._http.post(this.baseUrl + 'classification_Api/getSubjectsCount/?inst_id='+inst_id+'&block='+block+'&verify='+verify+'&search='+search,headers,options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  verifySubjects(body){ 
    const headers = new Headers({'Content-Type':'application/json'});
      headers.append('token','');
      const options = new RequestOptions({headers:headers});
      return this._http.post(this.baseUrl + 'classification_Api/verifySubjects/',body)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  blockunblockSubjects(body){ 
    const headers = new Headers({'Content-Type':'application/json'});
      headers.append('token','');
      const options = new RequestOptions({headers:headers});
      return this._http.post(this.baseUrl + 'classification_Api/blockunblockSubjects/',body)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  deleteClassification(body){
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('token', '');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.baseUrl + 'classification_Api/deleteClassification/', body, options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  
  }
  verifyClassification(body){
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('token', '');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.baseUrl + 'classification_Api/verifyClassification/', body, options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  
  }
  getLessons(lessonsdata:any): any {
    const headers = new Headers({"Content-Type":"application/json"});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'classification_Api/getAllLessons',lessonsdata,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  getLessonsonForSubj(lessData:any){
    const headers = new Headers({"Content-Type":"application/json"});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'classification_Api/getAllLessons',lessData,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  getLessonsonForSubjlimit(inst_id,subject_id,limit,offset,block,verify,search){ 
    const headers = new Headers({'Content-Type':'application/json'});
      headers.append('token','');
      const options = new RequestOptions({headers:headers});
      return this._http.post(this.baseUrl + 'classification_Api/getAllLessonsForSubject/?inst_id='+inst_id+'&subject_id='+subject_id+'&limit='+limit+'&offset='+offset+'&block='+block+'&verify='+verify+'&search='+search,headers,options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  updateLessonsonForSubj(body){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'classification_Api/updateLesson/',body)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  getLessonsonForSubjCount(inst_id,subject_id,block,verify,search){ 
    const headers = new Headers({'Content-Type':'application/json'});
      headers.append('token','');
      const options = new RequestOptions({headers:headers});
      return this._http.post(this.baseUrl + 'classification_Api/getAllLessonsForSubjectCount/?inst_id='+inst_id+'&subject_id='+subject_id+'&block='+block+'&verify='+verify+'&search='+search,headers,options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  verifyLessonsonForSubj(body){ 
    const headers = new Headers({'Content-Type':'application/json'});
      headers.append('token','');
      const options = new RequestOptions({headers:headers});
      return this._http.post(this.baseUrl + 'classification_Api/verifyLesson/',body)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  blockunblockLessonsonForSubj(body){ 
    const headers = new Headers({'Content-Type':'application/json'});
      headers.append('token','');
      const options = new RequestOptions({headers:headers});
      return this._http.post(this.baseUrl + 'classification_Api/blockunblockLesson/',body)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  getClassificationValue(clsfData:any){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'classification_Api/getClassificationValue/',clsfData,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  getAllClassifications(clsfData:any){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'classification_Api/getAllClassifications/',clsfData,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  verifyClassifications(body){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'classification_Api/verifyClassifications/',body)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  blockunblockClassification(body){
    const headers = new Headers({'Content-Type':'application/json'});
      headers.append('token','');
      const options = new RequestOptions({headers:headers});
      return this._http.post(this.baseUrl + 'classification_Api/blockunblockClassification/',body)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  getAllClassificationsCount(clsfData:any){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'classification_Api/getAllClassificationsCount/',clsfData,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  createCourse(values:any){
    const headers = new Headers({'Content-Type':'application/json'}); //,file: File
    headers.append('token','');
    const options = new RequestOptions({headers:headers});    
    return this._http.post(this.baseUrl + 'classification_Api/createCourse/',values,options)
    // const endpoint = this.baseUrl+'classification_Api/createCourse';
    // const formData: FormData = new FormData();
    // //formData.append('course_logo',file,file.name);
    // formData.append('course_fname',values.course_fname);
    // formData.append('course_sname',values.course_sname);
    // formData.append('inst_id',values.inst_id);
    // formData.append('crs_search_id',values.crs_search_id);
    //return this._http.post(endpoint,formData)
                      .map(this.extractData)
                      .catch(this.handleError)
  }
  createClass(values:any){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'classification_Api/createClass/',values,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  createSubject(values:any){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'classification_Api/createSubject/',values,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  createLesson(lessData:any){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'classification_Api/createLesson/',lessData,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  CreatenewClassification(clsfData:any){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});    
    return this._http.post(this.baseUrl + 'classification_Api/CreatenewClassification/',clsfData,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  getOnlySelectedLessons(lessData:any){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});    
    return this._http.post(this.baseUrl + 'classification_Api/getOnlySelectedLessons/',lessData,options)
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
