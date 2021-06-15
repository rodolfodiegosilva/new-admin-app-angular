import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ConfigVariable } from '../shared/app.config';
@Injectable()
export class MeetcreateService {
  //baseUrl: string = 'https://www.gemstudent.com/API/';
  baseUrl: string = ConfigVariable.BASE_API_URL;
  socketBaseUrl: string = ConfigVariable.SOCKET_API_URL;
  //socketBaseUrl: string = 'http://localhost:8080/api/';
  constructor(private _http: Http) { }
  createMeet(ctForm:any){
    const headers = new Headers({"Content-Type":"application/json"});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'Meeting_Api/adminCreateMeet',ctForm,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
   }
   FriendListForAssignMeet(selectedValues: any) {
     const headers = new Headers({"Content-Type":"application/json"});
    // headers.append('token', '');
    const options = new RequestOptions({headers: headers});
        return this._http.post( this.baseUrl + 'Meeting_Api/FriendListForAssignMeet/', selectedValues,options)
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
   AssignMeettoUser(assndata:any){
    const headers = new Headers({"Content-Type":"application/json"});
    //headers.append('token','');
    const options = new RequestOptions({headers:headers});
    // return this._http.post(this.socketBaseUrl + 'test/AssignTesttoUser',assndata,options)
    return this._http.post(this.baseUrl + 'Meeting_Api/AssignMeetingtoParticipant',assndata,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
   }
   AssignMeettoModerator(assndata:any){
    const headers = new Headers({"Content-Type":"application/json"});
    //headers.append('token','');
    const options = new RequestOptions({headers:headers});
    // return this._http.post(this.socketBaseUrl + 'test/AssignTesttoUser',assndata,options)
    return this._http.post(this.baseUrl + 'Meeting_Api/AssignMeetingtoModerator',assndata,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
   }
   unAssignMeetforUser(unassndata:any){
    const headers = new Headers({"Content-Type":"application/json"});
    //headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'Meeting_Api/unAssigntestforUser',unassndata,options)
    // return this._http.post(this.socketBaseUrl + 'test/unAssigntestforUser',unassndata,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
   }
   getAssignedUserstoMeet(assigndata:any){
    const headers = new Headers({"Content-Type":"application/json"});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'Meeting_Api/AssignedUserstoMeeting',assigndata,options)
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
   AssignMeetSocket(assndata: any) {  
   const headers = new Headers({'Content-Type': 'application/json'});
   const options = new RequestOptions({headers: headers});
   return this._http.post(this.socketBaseUrl + 'meeting/AssignMeettoUser', assndata, options)
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
   getMeetids(data:any){
    const headers = new Headers({"Content-Type":"application/json"});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'Meeting_Api/getMeetids',data,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
   }
   getMeetSearchList(data:any){
    const headers = new Headers({"Content-Type":"application/json"});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'Meeting_Api/getMeetSearchList',data,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
   } 
   getMeetSearchListCount(data:any){
    const headers = new Headers({"Content-Type":"application/json"});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'Meeting_Api/getMeetSearchListCount',data,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
   } 
   VerifyMeet(data:any){
    const headers = new Headers({"Content-Type":"application/json"});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'Meeting_Api/VerifyMeet',data,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
   }
   getSingleMeet(data:any){
    const headers = new Headers({"Content-Type":"application/json"});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'Meeting_Api/getSingleMeet',data,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
   }
   CancelMeet(data:any){
    const headers = new Headers({"Content-Type":"application/json"});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'Meeting_Api/CancelMeet',data,options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
   }
   DeleteMeet(data:any){
    const headers = new Headers({"Content-Type":"application/json"});
    headers.append('token','');
    const options = new RequestOptions({headers:headers});
    return this._http.post(this.baseUrl + 'Meeting_Api/DeleteMeet',data,options)
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
