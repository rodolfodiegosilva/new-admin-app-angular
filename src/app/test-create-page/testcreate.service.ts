import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ConfigVariable } from '../shared/app.config';
@Injectable()
export class TestcreateService {
  //baseUrl: string = 'https://www.gemstudent.com/API/';
  baseUrl: string = ConfigVariable.BASE_API_URL;
  socketBaseUrl: string = ConfigVariable.SOCKET_API_URL;
  //socketBaseUrl: string = 'http://localhost:8080/api/';
  constructor(private _http: Http) { }
  createTest(ctForm:any){
    const headers = new Headers({"Content-Type":"application/json"});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'Test_Api/createTest',ctForm,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
   }
   createTimelineForTest(data:any){
     const headers = new Headers({"Content-Type":"application/json"});
     //headers.append('token','');
     const options = new RequestOptions({headers:headers});
     return this._http.post(this.socketBaseUrl + 'timeline/createTimelineForTest',data,options)
                .map((response: Response) => response.json())
                .catch(this.handleError);
   }
   AssignTesttoUser2(assndata:any){
    const headers = new Headers({"Content-Type":"application/json"});
    //headers.append('token','');
    const options = new RequestOptions({headers:headers});
    // return this._http.post(this.socketBaseUrl + 'test/AssignTesttoUser',assndata,options)
    return this._http.post(this.socketBaseUrl + 'test/AssignTesttoUser',assndata,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
   }
   unAssigntestforUser(unassndata:any){
    const headers = new Headers({"Content-Type":"application/json"});
    //headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.socketBaseUrl + 'test/unAssigntestforUser',unassndata,options)
    // return this._http.post(this.socketBaseUrl + 'test/unAssigntestforUser',unassndata,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
   }
   getAssignedUserstoTest(assigndata:any){
    const headers = new Headers({"Content-Type":"application/json"});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'Test_Api/getAssignedUserstoTest',assigndata,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
   }
   updateTestSpec(update:any){
    const headers = new Headers({"Content-Type":"application/json"});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'Test_Api/updateTestSpec',update,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
   }
   AssignQnsforTest(assigndata:any){
    const headers = new Headers({"Content-Type":"application/json"});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'Test_Api/AssignQnsforTest',assigndata,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
   }
   unAssignQnsforTest(assigndata:any){
    const headers = new Headers({"Content-Type":"application/json"});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'Test_Api/unAssignQnsforTest',assigndata,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
   }
   getAssignedQuestionsforTest(getData:any){
    const headers = new Headers({"Content-Type":"application/json"});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'Test_Api/getAssignedQuestionsforTest',getData,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
   }
   rescheduleTestdates(requData:any){
    const headers = new Headers({"Content-Type":"application/json"});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'Test_Api/rescheduleTestdates',requData,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
   }
   declareResult(reqData:any){
    const headers = new Headers({"Content-Type":"application/json"});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'Test_Api/declareResult',reqData,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
   }
   creatQuestionPaper(data:any){
    const headers = new Headers({"Content-Type":"application/json"});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'Test_Api/creatQuestionPaper',data,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
   }
   getAssignedUserstoThisQns(data:any){
    const headers = new Headers({"Content-Type":"application/json"});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'Test_Api/getAssignedUserstoaQuestionInATest',data,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
   }
   getTotalAvailabaleQnsGradewise(data:any){
    const headers = new Headers({"Content-Type":"application/json"});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'Test_Api/getTotalAvailabaleQnsGradewise',data,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
   } 
   getTestids(data:any){
    const headers = new Headers({"Content-Type":"application/json"});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'Test_Api/getTestids',data,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
   }
   getTestSearchList(data:any){
    const headers = new Headers({"Content-Type":"application/json"});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'Test_Api/getTestSearchList',data,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
   } 
   getTestSearchListCount(data:any){
    const headers = new Headers({"Content-Type":"application/json"});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'Test_Api/getTestSearchListCount',data,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
   } 
   VerifyTest(data:any){
    const headers = new Headers({"Content-Type":"application/json"});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'Test_Api/VerifyTest',data,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
   }
   getSingleTest(data:any){
    const headers = new Headers({"Content-Type":"application/json"});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'Test_Api/getSingleTest',data,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
   }
   CancelTest(data:any){
    const headers = new Headers({"Content-Type":"application/json"});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'Test_Api/CancelTest',data,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
   }
   DeleteTest(data:any){
    const headers = new Headers({"Content-Type":"application/json"});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'Test_Api/DeleteTest',data,options)
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
  // mmlabs
  getQuestionsAnsForTestAttend(data: any) {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('token', '');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.baseUrl + 'Test_Api/getQuestionsAnsForTestAttend', data, options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
   }
   getTestresultAggregation(data: any) {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('token', '');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.baseUrl + 'Test_Api/getTestresultAggregation', data, options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
   }
   getGradesforCharts(data: any) {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('token', '');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.baseUrl + 'Test_Api/getGradesforCharts', data, options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
   }
}
