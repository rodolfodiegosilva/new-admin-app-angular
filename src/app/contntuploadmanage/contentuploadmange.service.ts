import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ConfigVariable } from '../shared/app.config';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class ContentuploadmangeService { 
  
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
  uploadContentimg(fileToUpload: File){
    const endpoint = this.baseUrl+'contentUpload_Api/uploadContentimg';
    const formData: FormData = new FormData();
    formData.append('content_file',fileToUpload,fileToUpload.name);    
                      return this._http.post(endpoint,formData)
                      .map(this.extractData)
                      .catch(this.handleError)
  }
  getContent(content_id: any) {
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'contentUpload_Api/getContent/?content_id='+content_id,headers,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  checkFileExt(ext:any,size:any){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'contentUpload_Api/checkFileExt/?extension='+ext+'&&fileSize='+size,headers,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  getClassificationValue(inst_id,value,sname,fname,table){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'classification_Api/getClassificationValue/?value='+value+'&&sname='+sname+'&&fname='+fname+'&&table='+table+'&&inst_id='+inst_id,headers,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  createCourse(values){
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
    return this._http.post(this.baseUrl + 'classification_Api/getClassesUser/'  , body, options)
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
  getSubjectsUser(inst_id: any) {
    const headers = new Headers({'Content-Type': 'application/json'});
      headers.append('token', '');
      const options = new RequestOptions({headers: headers});
    return this._http.post(this.baseUrl + 'classification_Api/getSubjectsUser?inst_id=' + inst_id, headers, options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  createSubject(values){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'classification_Api/createSubject/',values,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  
  createClass(values){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'classification_Api/createClass/',values,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  insertContent(content){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    const formData: FormData = new FormData();
    //content.append('content_file',fileToUpload,fileToUpload.name);
    //console.log('Service '+ content.content_title);
    return this._http.post(this.baseUrl +'contentUpload_Api/insertContent',content,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
    // const endpoint = this.baseUrl+'contentUpload_Api/insertContent';
    // const formData: FormData = new FormData();
    // formData.append('content_file',fileToUpload,fileToUpload.name);
    // //formData.append('content',content);
    // return this._http.post(endpoint,formData);
  }
  updateClassificationLesson(body){
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('token', '');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.baseUrl + 'ContentUpload_Api/updateContentClassfLesson/', body, options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  
  }
  uploadContent(cnt:any,fileToUpload:File,inst_id:any){
    const endpoint = this.baseUrl + 'contentUpload_Api/uploadContents';
    const formData: FormData = new FormData();
    formData.append('content_file',fileToUpload,fileToUpload.name);
    formData.append('content_title',cnt.content_title);
    formData.append('content_desc',cnt.content_desc);
    formData.append('content_search',cnt.content_search);
    formData.append('classf_country_id',cnt.classf_country_id);
    formData.append('classf_course_id_vlaue',cnt.classf_course_id_vlaue);
    formData.append('classf_class_id_value',cnt.classf_class_id_value);
    formData.append('classf_subject_id_vlaue',cnt.classf_subject_id_vlaue);
    formData.append('lesson_name',cnt.lesson_name);
    formData.append('inst_id',inst_id);
    formData.append('lesson_id',cnt.lesson_name);
    formData.append('content_owner_column',cnt.content_owner_column);
    formData.append('content_owner',cnt.content_owner);
    formData.append('content_media_type',cnt.content_media_type);
    formData.append('content_sizemb',cnt.content_sizemb);    
    formData.append('originalFileName',cnt.originalFileName);
    formData.append('uploadUrl',cnt.uploadUrl);
    return this._http.post(endpoint, formData)
    .map((response: Response) => response.json())
     .catch(this.handleError);
    
  }
  createTimelineForContent(data:any){
    const headers = new Headers({'Content-Type':'application/json'});
    //headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.socketBaseUrl + 'timeline/createTimelineForContent/',data,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  uploadContenImage(content,fileToUpload: File){
    const endpoint = this.baseUrl+'contentUpload_Api/uploadContenImage';
    const formData: FormData = new FormData();
    formData.append('content_file',fileToUpload,fileToUpload.name);
    formData.append('classf_country_id',content.classf_country_id);
    formData.append('classf_course_id',content.classf_course_id);
    formData.append('classf_subject_id',content.classf_subject_id);
    formData.append('classf_class_id',content.classf_class_id);
    formData.append('inst_id',content.inst_id);
    formData.append('content_owner',content.content_owner);
    formData.append('content_title',content.content_title);
    formData.append('content_desc',content.content_desc);
    formData.append('content_search',content.content_search);
    formData.append('lesson_id',content.lesson_id);
    formData.append('content_media_type',content.content_media_type);
    formData.append('content_sizemb',content.content_sizemb);
    formData.append('selectedLessonId',content.selectedLessonId);
    return this._http.post(endpoint,formData);
    // return this._http.post(endpoint,formData)
    // .map((response: Response) => response.json())
    //           .catch(this.handleError);
  }
  contentFileUpload(fileToUpload: File): any {
    const endpoint = this.baseUrl+'contentUpload_Api/contentFileUpload';
    const formData : FormData = new FormData();
    formData.append('content_file',fileToUpload,fileToUpload.name);
    return this._http.post(endpoint,formData)
    .map((response: Response) => response.json())
              .catch(this.handleError);
  }
  getClassifications(clsfdata:any){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'classification_Api/getCntntClassifications/',clsfdata,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  getCourses(){
    return this._http.get(this.baseUrl + 'classification_Api/getCourses')
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }  
  getSubjects(){
    return this._http.get(this.baseUrl + 'classification_Api/getSubjects')
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  getClasses(){
    return this._http.get(this.baseUrl + 'classification_Api/getClasses')
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  getLessons(subj_id:any,value:any){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'classification_Api/getLessons/?subj_id='+subj_id+'&&value='+value,headers,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  createLesson(body){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'classification_Api/createLesson/',body,)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  createNewClassificationforOldContent(newClassification:any){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'classification_Api/createNewClassificationforOldContent',newClassification,options)
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
  deleteContent(body){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'contentUpload_Api/deleteContentAdmin',body,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  getAdminProfile(admin_id, admintype_id): any {
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this.http.post(this.baseUrl + 'Admin_Api/getAdminprofile/?id='+admin_id+'&&type='+admintype_id,headers,this.httpOptions)
    .toPromise()
    .then(res=>res)
    .catch(this.handleErrors)
  }
  getBlockReasons(value): any {
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'contentUpload_Api/getBlockReasons/?value='+value,headers,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  getbldlReasonValues(resonid: any): any {
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'contentUpload_Api/getbldlReasonValues/?resonid='+resonid,headers,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  getSingleFiletypes(typeid: any): any {
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'contentUpload_Api/getSingleFiletypes/?typeid='+typeid,headers,options)
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
