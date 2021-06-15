import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ConfigVariable } from '../shared/app.config';
@Injectable()
export class QuestionsService {
  //baseUrl: string = 'https://www.gemstudent.com/API/';
  baseUrl: string = ConfigVariable.BASE_API_URL;
  constructor(private _http: Http) { }  
  getQuestionGrade(){
    return this._http.get(this.baseUrl + 'Questions_Api/getQuestionGrade')
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  // questionUpload(questions:any){    
  //   const headers = new Headers({"Content-Type":"application/json"});
  //   headers.append('token','');
  //   const options = new RequestOptions({headers:headers});
  //   return this._http.post(this.baseUrl + 'Questions_Api/questionUpload',questions,options)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  questionUpload(qns:any,fileToUpload: File,solfileToUpload: File){
    const endpoint = this.baseUrl + 'Questions_Api/questionUpload';
    const formData: FormData = new FormData();
    if(fileToUpload){
      formData.append("qnFile", fileToUpload, fileToUpload.name);
    }     
    formData.append("question_details",qns.question_details);
    formData.append("inst_ids", qns.inst_ids);
    formData.append("country", qns.country);
    formData.append("course_ids", qns.course_ids);
    formData.append("subject_ids", qns.subject_ids);
    formData.append("class_ids", qns.class_ids);
    formData.append("FileorText", qns.FileorText);
    formData.append("FileorTextsol", qns.FileorTextsol);
    formData.append("ans_id", qns.ans_id);
    formData.append("crOptn_1", qns.crOptn_1);
    formData.append("crOptn_2", qns.crOptn_2);
    formData.append("crOptn_3", qns.crOptn_3);
    formData.append("crOptn_4", qns.crOptn_4);
    formData.append("lesson_id", qns.lesson_id);
    formData.append("marks", qns.marks);
    formData.append("nmarks", qns.nmarks);
    formData.append("qnHr", qns.qnHr);
    formData.append("qnMn", qns.qnMn);
    if(solfileToUpload){
      formData.append("question_detailsFile", solfileToUpload, solfileToUpload.name);
    }    
    formData.append("t_f_crt_ans", qns.t_f_crt_ans);
    formData.append("question_grades", qns.question_grades);
    formData.append("question_admin", qns.question_admin);
    formData.append("question_solutionFile", qns.question_solutionFile);
    formData.append("question_solution", qns.question_solution);
    formData.append("question_type_id", qns.question_type_id);
    formData.append("selectedLessonIds", qns.selectedLessonIds);
    formData.append("subject_ids", qns.subject_ids);
    formData.append("wrOptn_1", qns.wrOptn_1);
    formData.append("wrOptn_2", qns.wrOptn_2);
    formData.append("wrOptn_3", qns.wrOptn_3);
    formData.append("wrOptn_4", qns.wrOptn_4);
    formData.append("wrOptn_5", qns.wrOptn_5);
    formData.append("wrOptn_6", qns.wrOptn_6);
    formData.append("wrOptn_7", qns.wrOptn_7);
    formData.append("wrOptn_8", qns.wrOptn_8);
    return this._http.post(endpoint, formData);
  }
  getQuestionSearchList(qnsReq:any){     
      const headers = new Headers({"Content-Type":"application/json"});
      headers.append('token','');
      const options = new RequestOptions({headers:headers});      
      return this._http.post(this.baseUrl + 'Questions_Api/getQuestionSearchList',qnsReq,options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  getQuestionSearchListCount(qnsReq:any){     
    const headers = new Headers({"Content-Type":"application/json"});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});      
    return this._http.post(this.baseUrl + 'Questions_Api/getQuestionSearchListCount',qnsReq,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
}
  getQuestionIds(qnReq:any){
    const headers = new Headers({"Content-Type":"application/json"});
      headers.append('token','');
      const options = new RequestOptions({headers:headers});      
      return this._http.post(this.baseUrl + 'Questions_Api/getQuestionIds',qnReq,options)
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
