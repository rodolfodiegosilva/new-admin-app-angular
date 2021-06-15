import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ConfigVariable } from '../shared/app.config';
@Injectable()
export class DiscussionlistviewService {
  //baseUrl: string = 'https://www.gemstudent.com/API/';
  baseUrl: string = ConfigVariable.BASE_API_URL;
  constructor(private _http: Http) { }
  getDiscussions(getDisc){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.baseUrl+'Discussion_Api/getDiscussions',getDisc,options)
    .map(this.extractData)
      .catch(this.handleError);
  }
  getsingleDiscussions(getDisc){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.baseUrl+'Discussion_Api/getsingleDiscussions',getDisc,options)
    .map(this.extractData)
      .catch(this.handleError);
  }
  getDiscussionFollow(getFollow){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.baseUrl+'Discussion_Api/getDiscussionFollow',getFollow,options)
    .map(this.extractData)
      .catch(this.handleError);
  }
  deleteDiscussionComment(flwdldata){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.baseUrl+'Discussion_Api/deleteDiscussionComment',flwdldata,options)
    .map(this.extractData)
      .catch(this.handleError);
  }
  updateComment(updateData){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.baseUrl+'Discussion_Api/updateComment',updateData,options)
    .map(this.extractData)
      .catch(this.handleError);
  }
  deleteDescussion(deltdesc){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.baseUrl+'Discussion_Api/deleteDescussion',deltdesc,options)
    .map(this.extractData)
      .catch(this.handleError);
  }
  updateDescussion(updateData){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.baseUrl+'Discussion_Api/updateDescussion',updateData,options)
    .map(this.extractData)
      .catch(this.handleError);
  }
  getAllTopics(topicData){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.baseUrl+'Discussion_Api/getAllTopics',topicData,options)
    .map(this.extractData)
      .catch(this.handleError);
  }
  getAllDiscussionNames(discData){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.baseUrl+'Discussion_Api/getAllDiscussionNames',discData,options)
    .map(this.extractData)
      .catch(this.handleError);
  }
  verifyDiscussions(verifydata){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.baseUrl+'Discussion_Api/verifyDiscussions',verifydata,options)
    .map(this.extractData)
      .catch(this.handleError);
  }
  verifyTopics(verifydata){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.baseUrl+'Discussion_Api/verifyTopics',verifydata,options)
    .map(this.extractData)
      .catch(this.handleError);
  }
  createDiscussionFollow(createFollow){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.baseUrl+'Discussion_Api/createDiscussionFollow',createFollow,options)
    .map(this.extractData)
      .catch(this.handleError);
  }
  updateTopic(topicdata){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.baseUrl+'Discussion_Api/updateTopic',topicdata,options)
    .map(this.extractData)
      .catch(this.handleError);
  }  
  closeDiscussions(descData){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.baseUrl+'Discussion_Api/closeDiscussions',descData,options)
    .map(this.extractData)
      .catch(this.handleError);
  }
  multipleVerify(muvrdata){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this.baseUrl+'Discussion_Api/multipleVerify',muvrdata,options)
    .map(this.extractData)
      .catch(this.handleError);
  }
  private extractData(res: Response) {
    const body = res.json();
    const userToken = res['headers'].get('token');
    window.localStorage.setItem('token', userToken);
    return body || {};
  }
  private handleError(error: Response | any) {
    return Observable.throw(error);
  }
}
