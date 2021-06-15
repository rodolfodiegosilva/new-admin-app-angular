import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ConfigVariable } from '../shared/app.config';
@Injectable()
export class QuestiondetailedviewService {
 //baseUrl: string = 'https://www.gemstudent.com/API/';
 baseUrl: string = ConfigVariable.BASE_API_URL;
 constructor(private _http: Http) { }

 getQuestions(qunsReq:any){   
  const headers = new Headers({"Content-Type":"application/json"});
  headers.append('token','');
  const options = new RequestOptions({headers:headers});
  return this._http.post(this.baseUrl + 'Questions_Api/getQuestions',qunsReq,options)
  .map((response: Response) => response.json())
  .catch(this.handleError);
 }
 getQuestionsTest(qunsReq:any){   
  const headers = new Headers({"Content-Type":"application/json"});
  headers.append('token','');
  const options = new RequestOptions({headers:headers});
  return this._http.post(this.baseUrl + 'Test_Api/getQuestionTest',qunsReq,options)
  .map((response: Response) => response.json())
  .catch(this.handleError);
 }
 getHtmlFile(url){
  const headers = new Headers({"Content-Type":"text/html"});
  headers.append('token','');
  const options = new RequestOptions({headers:headers});
  return this._http.get(url,options)
  .map((response) => response)
  .catch(this.handleError);
 }
 getAnsforQuestion(ansData:any){
  const headers = new Headers({"Content-Type":"application/json"});
  headers.append('token','');
  const options = new RequestOptions({headers:headers});
  return this._http.post(this.baseUrl + 'Questions_Api/getAnsforQuestion',ansData,options)
  .map((response: Response) => response.json())
  .catch(this.handleError);
 }
 verifyQuestion(qnVefyData:any){  
  const headers = new Headers({"Content-Type":"application/json"});
  headers.append('token','');
  const options = new RequestOptions({headers:headers});
  return this._http.post(this.baseUrl + 'Questions_Api/verifyQuestion',qnVefyData,options)
  .map((response: Response) => response.json())
  .catch(this.handleError);
 } 
 blockQuestion(qnBlkData:any){  
  const headers = new Headers({"Content-Type":"application/json"});
  headers.append('token','');
  const options = new RequestOptions({headers:headers});
  return this._http.post(this.baseUrl + 'Questions_Api/blockQuestion',qnBlkData,options)
  .map((response: Response) => response.json())
  .catch(this.handleError);
 }  
 deleteQuestion(qnDeltData:any){  
  const headers = new Headers({"Content-Type":"application/json"});
  headers.append('token','');
  const options = new RequestOptions({headers:headers});
  return this._http.post(this.baseUrl + 'Questions_Api/deleteQuestion',qnDeltData,options)
  .map((response: Response) => response.json())
  .catch(this.handleError);
 }
 updateQstnSol(qnSol:any, fileToUpload: File){
  const endpoint = this.baseUrl + 'Questions_Api/updateQstnSol';
  const formData: FormData = new FormData();
  if(fileToUpload){
    formData.append("qnFile", fileToUpload, fileToUpload.name);
  }
  formData.append('fileName',qnSol.fileName);
  formData.append('location',qnSol.location);
  formData.append("inst_id",qnSol.inst_id);
  formData.append("question_id", qnSol.question_id);
  formData.append("description", qnSol.description);
  formData.append("column", qnSol.column);
  formData.append("by", qnSol.by);
  formData.append("type",qnSol.type);
  formData.append("oldName",qnSol.oldName);
  return this._http.post(endpoint, formData);
  // .map((response: Response) => response.json())
  //  .catch(this.handleError);
  // const headers = new Headers({"Content-Type":"application/json"});
  // headers.append('token','');
  // const options = new RequestOptions({headers:headers});
  // return this._http.post(this.baseUrl + 'Questions_Api/updateQstnSol',qnSoldata,options)
  // .map((response: Response) => response.json())
  // .catch(this.handleError);
 }
 updateAnswer(ansData:any){
  const headers = new Headers({"Content-Type":"application/json"});
  headers.append('token','');
  const options = new RequestOptions({headers:headers});
  return this._http.post(this.baseUrl + 'Questions_Api/updateAnswer',ansData,options)
  .map((response: Response) => response.json())
  .catch(this.handleError);
 }
 getQuestionsMarks(marksData:any){
  const headers = new Headers({"Content-Type":"application/json"});
  headers.append('token','');
  const options = new RequestOptions({headers:headers});
  return this._http.post(this.baseUrl + 'Questions_Api/getQuestionsMarks',marksData,options)
  .map((response: Response) => response.json())
  .catch(this.handleError);
 } 
 getQuestionsnegMarks(marksData:any){
  const headers = new Headers({"Content-Type":"application/json"});
  headers.append('token','');
  const options = new RequestOptions({headers:headers});
  return this._http.post(this.baseUrl + 'Questions_Api/getQuestionsnegMarks',marksData,options)
  .map((response: Response) => response.json())
  .catch(this.handleError);
 }
 getClsfctnforQuestion(clsfReq:any){
  const headers = new Headers({"Content-Type":"application/json"});
  headers.append('token','');
  const options = new RequestOptions({headers:headers});
  return this._http.post(this.baseUrl + 'Questions_Api/getClsfctnforQuestion',clsfReq,options)
  .map((response: Response) => response.json())
  .catch(this.handleError);
 }
 submitMoreAns(moreAnsData:any){
  const headers = new Headers({"Content-Type":"application/json"});
  headers.append('token','');
  const options = new RequestOptions({headers:headers});
  return this._http.post(this.baseUrl + 'Questions_Api/submitMoreAns',moreAnsData,options)
  .map((response: Response) => response.json())
  .catch(this.handleError);
 }
 getansCountForQns(getansCount:any){
  const headers = new Headers({"Content-Type":"application/json"});
  headers.append('token','');
  const options = new RequestOptions({headers:headers});
  return this._http.post(this.baseUrl + 'Questions_Api/getansCountForQns',getansCount,options)
  .map((response: Response) => response.json())
  .catch(this.handleError);
 }
 deleteAnswer(delansData:any){
  const headers = new Headers({"Content-Type":"application/json"});
  headers.append('token','');
  const options = new RequestOptions({headers:headers});
  return this._http.post(this.baseUrl + 'Questions_Api/deleteAnswer',delansData,options)
  .map((response: Response) => response.json())
  .catch(this.handleError);
 }
 updateQnsSpec(update:any){
  const headers = new Headers({"Content-Type":"application/json"});
  headers.append('token','');
  const options = new RequestOptions({headers:headers});
  return this._http.post(this.baseUrl + 'Questions_Api/updateQnsSpec',update,options)
  .map((response: Response) => response.json())
  .catch(this.handleError);
 }
 verifydlblQuestionclsf(qnVefyData:any){
  const headers = new Headers({"Content-Type":"application/json"});
  headers.append('token','');
  const options = new RequestOptions({headers:headers});
  return this._http.post(this.baseUrl + 'Questions_Api/verifydlblQuestionclsf',qnVefyData,options)
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
