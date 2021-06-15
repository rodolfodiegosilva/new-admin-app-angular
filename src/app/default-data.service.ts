import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ConfigVariable } from './shared/app.config';

@Injectable()

export class DefaultDataService {
  //baseUrl: string = 'https://www.gemstudent.com/API/';
  baseUrl: string = ConfigVariable.BASE_API_URL;
  constructor(private _http: Http) { }
 /*
  getSessions(){
    return this._http.get( this.baseUrl + 'Default_Api/getSessions')
    .map((response: Response) =>response.json())
    .catch(this.handleError);
  }
  */
 getuserTypes(){
  return this._http.get(this.baseUrl + 'Default_Api/getuserTypes')
                   .map((response: Response) => response.json())
                   .catch(this.handleError);
}

  getCountries(){
    return this._http.get( this.baseUrl + 'api/getcountryNames')
    .map((response: Response) =>response.json())
    .catch(this.handleError);
  }
  getCountriesLimit(limit,offset,search){
    return this._http.get( this.baseUrl + 'Default_Api/getAllCountryLimit?limit='+limit+'&offset='+offset+'&search='+search)
    .map((response: Response) =>response.json())
    .catch(this.handleError);
  }
  getAllStatesLimit(limit,offset,search){
    
    return this._http.get( this.baseUrl + 'Default_Api/getAllStatesLimit?limit='+limit+'&offset='+offset+'&search='+search)
    .map((response: Response) =>response.json())
    .catch(this.handleError);
  }
  getAllCityLimit(limit,offset,search){
    return this._http.get( this.baseUrl + 'Default_Api/getAllCityLimit?limit='+limit+'&offset='+offset+'&search='+search)
    .map((response: Response) =>response.json())
    .catch(this.handleError);
  }
  getCountryCode(country) {
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token', '');
    const options = new RequestOptions({ headers: headers });
    //alert('this is serveice----'+country);
    return this._http.get(  this.baseUrl + 'Default_Api/getCountrycode/'+country, options)
        .map(this.extractData)
        .catch(this.handleError);
  }
  getcountryNamesforProfile(){
    return this._http.get( this.baseUrl + 'Default_Api/getcountryNamesforProfile')
    .map((response: Response) =>response.json())
    .catch(this.handleError);
  }
  getStatesoncountries(country){
    const headers = new Headers({'Content-Type':'applicaiton/json'});
    headers.append('token','');
    const options = new RequestOptions({ headers: headers });
    //alert(country);
    return this._http.post( this.baseUrl + 'Default_Api/getStatesoncountries/'+country,options)
                .map(this.extractData)
                .catch(this.handleError);

  }
  getCitiesonstates(state){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({ headers: headers });
    return this._http.post( this.baseUrl + 'Default_Api/getCitiesonstates/' +state,options)
                .map(this.extractData)
                .catch(this.handleError);
  }
  getStateonState(state){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({ headers: headers });
    return this._http.post( this.baseUrl + 'Default_Api/getStateonState/' +state,options)
                .map(this.extractData)
                .catch(this.handleError);
  }
  getCitiesoncity(city){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({ headers: headers });
    return this._http.post( this.baseUrl + 'Default_Api/getCitiesoncity/' +city,options)
                .map(this.extractData)
                .catch(this.handleError);
  }
  getCities(){
    return this._http.get(this.baseUrl + 'Default_Api/getcityNames')
                      .map((response: Response) => response.json())
                      .catch(this.handleError);
  }
  getAmdinTypes(){
    return this._http.get(this.baseUrl + 'Default_Api/getAmdinTypes')
                      .map((response: Response) => response.json())
                      .catch(this.handleError);
  }
  getMediaTypes(){
    return this._http.get(this.baseUrl + 'Default_Api/getMediaType')
                      .map((response: Response) => response.json())
                      .catch(this.handleError);
  }
  getAllStates(){
    return this._http.get(this.baseUrl + 'Default_Api/getAllStates')
                      .map((response: Response) => response.json())
                      .catch(this.handleError);
  }
  getAllCities(){
    return this._http.get(this.baseUrl + 'Default_Api/getAllCities')
                      .map((response: Response) => response.json())
                      .catch(this.handleError);
  }
  getAllCourseGroup(){
    return this._http.get(this.baseUrl + 'Default_Api/getAllCourseGroup')
                      .map((response: Response) => response.json())
                      .catch(this.handleError);
  } 
  getAllSubjectGroup(){
    return this._http.get(this.baseUrl + 'Default_Api/getsubGroups')
                      .map((response: Response) => response.json())
                      .catch(this.handleError);
  }
  getQuestionsType(){
    return this._http.get(this.baseUrl + 'Default_Api/getQuestionsType')
                      .map((response:Response) => response.json())
                      .catch(this.handleError);
  }
  checkFileExt(fileData:any){
    const headers = new Headers({'Content-Type':'application/json'});
    headers.append('token','');
    const options = new RequestOptions({ headers: headers });
    return this._http.post( this.baseUrl + 'Default_Api/checkFileExt/',fileData,options)
                .map(this.extractData)
                .catch(this.handleError);
  }
  private extractData(res: Response){
    const body = res.json();
    const userToken = res['headers'].get('token');
    window.localStorage.setItem('token', userToken);
    return body || {};
  }
  private handleError(error: Response | any)
  {
    return Observable.throw(error || 'Internal server error');
  }
}
