import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ConfigVariable } from './shared/app.config';

@Injectable()
export class TimelineService {
baseUrl: string = ConfigVariable.BASE_API_URL;
//baseUrl: string = 'http://localhost/gemService/';
//socketBaseUrl: string = 'http://localhost:8080/api/';
socketBaseUrl: string = ConfigVariable.SOCKET_API_URL;
  constructor(private _http: Http) { }
  createTimeline(data: any) {
    const headers = new Headers({'Content-Type': 'application/json'});
    //headers.append('token','');
    const options = new RequestOptions({headers: headers});
    //return this._http.post(this.baseUrl + 'classification_Api/createCourse/?value='+value+'&&inst_id='+inst_id,headers,options)
    return this._http.post(this.socketBaseUrl + 'timeline/createTimeline/', data, options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  checkActivityTypeTimeline(data: any) {
    const headers = new Headers({'Content-Type': 'application/json'});
    //headers.append('token','');
    const options = new RequestOptions({headers: headers});
    //return this._http.post(this.baseUrl + 'classification_Api/createCourse/?value='+value+'&&inst_id='+inst_id,headers,options)
    return this._http.post(this.baseUrl + 'Activity_Index_Api/checkActivityTypeTimeline/', data, options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  createTimelineForDiscussion(data: any) {
    const headers = new Headers({'Content-Type': 'application/json'});
    //headers.append('token','');
    const options = new RequestOptions({headers: headers});
    //return this._http.post(this.baseUrl + 'classification_Api/createCourse/?value='+value+'&&inst_id='+inst_id,headers,options)
    return this._http.post(this.socketBaseUrl + 'timeline/createTimelineForDiscussion/', data, options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  createTimelineForContent(data: any) {
    const headers = new Headers({'Content-Type': 'application/json'});
    //headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.socketBaseUrl + 'timeline/createTimelineForContent/', data, options)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  createTimelineForTest(data: any) {
    const headers = new Headers({'Content-Type': 'application/json'});
    //headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.socketBaseUrl + 'timeline/createTimelineForTest', data, options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
  }
  getTimelineObjects(data: any) {
    const headers = new Headers({'Content-Type': 'application/json'});
    //headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.baseUrl + 'Timeline_Api/getTimelineObjects', data, options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
  }
  TimelineForreferDiscussion(data: any) {
    const headers = new Headers({'Content-Type': 'application/json'});
    //headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.socketBaseUrl + 'timeline/TimelineForreferDiscussionRefer', data, options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
  }
  TimelineForreferTest(data: any) {
    const headers = new Headers({'Content-Type': 'application/json'});
    //headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.socketBaseUrl + 'timeline/TimelineForreferTestRefer', data, options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
  }
  TimelineForreferContent(data: any) {
    const headers = new Headers({'Content-Type': 'application/json'});
    //headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.socketBaseUrl + 'timeline/TimelineForreferContent', data, options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
  }
  TimelineForviewContent(data: any) {
    const headers = new Headers({'Content-Type': 'application/json'});
    //headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.socketBaseUrl + 'timeline/TimelineForviewContent', data, options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
  }
  TimelineForViewDiscussion(data: any) {
    const headers = new Headers({'Content-Type': 'application/json'});
    //headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.socketBaseUrl + 'timeline/TimelineForViewDiscussion', data, options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
  }
  TimelineForRateDiscussion(data: any) {
    const headers = new Headers({'Content-Type': 'application/json'});
    //headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.socketBaseUrl + 'timeline/TimelineForRateDiscussion', data, options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
  }
  getRatingCount(data){
    const headers = new Headers({'Content-Type': 'application/json'});
    //headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.socketBaseUrl + 'rating/getRatingCount', data, options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
  }
  getReferCount(data){
    const headers = new Headers({'Content-Type': 'application/json'});
    //headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.socketBaseUrl + 'refer/getReferCount', data, options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
  }
  getReferStatus(data){
    const headers = new Headers({'Content-Type': 'application/json'});
    //headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.socketBaseUrl + 'refer/getReferStatus', data, options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
  }
  getUserRating(data){
    const headers = new Headers({'Content-Type': 'application/json'});
    //headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.socketBaseUrl + 'rating/getUserRating', data, options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
  }
  getRatingAverage(data){
    const headers = new Headers({'Content-Type': 'application/json'});
    //headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.socketBaseUrl + 'rating/getRatingAverage', data, options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
  }
  TimelineForDiscReport(data: any) {
    const headers = new Headers({'Content-Type': 'application/json'});
    //headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.socketBaseUrl + 'timeline/TimelineForDiscReport', data, options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
  }
  private extractData(res: Response) {
    const body = res.json();
    const userToken = res['headers'].get('token');
    window.localStorage.setItem('token', userToken);
    return body || {};
  }
  private handleError(error: Response | any) {
    return Observable.throw(error || 'Internal server error');
  }
}
