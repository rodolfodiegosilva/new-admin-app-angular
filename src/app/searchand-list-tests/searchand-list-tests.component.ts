import { Component, OnInit, Inject, Input,ViewChild,ElementRef,Pipe, PipeTransform,ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup,FormControl, Validators, NgForm } from '@angular/forms';
import { DefaultDataService } from '../default-data.service';
import {MessageService} from 'primeng/api';
import { ClassificationsService }  from '../classfications.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { TestcreateService } from '../test-create-page/testcreate.service'; 
import { ManageuserService } from '../manageuser/manageuser.service';
import * as moment from 'moment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Location } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { QuestiondetailedviewService } from '../questionsdetailedview/questiondetailedview.service';
import { Paginator } from 'primeng/paginator';
// import { $ } from 'protractor';
declare let $:any;
@Component({
  selector: 'app-searchand-list-tests',
  templateUrl: './searchand-list-tests.component.html',
  styleUrls: ['./searchand-list-tests.component.css'],
  providers: [MessageService,DefaultDataService,ManageuserService,ClassificationsService,Ng4LoadingSpinnerService,TestcreateService,QuestiondetailedviewService],
})
export class SearchandListTestsComponent implements OnInit {
 /********for producation *********** */
 @ViewChild('paginator') paginator:Paginator;
 cars:any;
 selectedCars1:any;
 selecteverfiydate:any;
 selecteblockdate: any;
 selectedeletedate:any;
 selectedatetime:any;
 test_created_date: any;
 alwaysShowCalendars: boolean;
 showRangeLabelOnInput: boolean;
 keepCalendarOpeningWithRange: boolean;
 maxDate: moment.Moment;
 minDate: moment.Moment;
 options: any = {
   autoApply: false,
   alwaysShowCalendars: false,
   linkedCalendars: true,
   singleDatePicker: false,
   showWeekNumbers: false,
   showISOWeekNumbers: false
 };
 Check_admin_id: any;
 admintype_id: any;
 inst_id: any;
 angularRoute: any;
 url    : string;
 domainAndApp  : string;
 testIdsList: any[];
 countryList: any[];
 courseList: any[];
 classList: any[];
 subjectList: any[];
 lessonsList: any[];
 testTypeList: any[];
 ownerList: any[];
 verify : any[];
 marksList : any[];
 nmarksList : any[];
 errorMessage: any;
 countries: any;
 allCourses: any;
 allClasses: any;
 allSubjects: any;
 lessdata: any;
 lessonsLists: any;
 response: any;
 data: any;
 marksData: { "inst_id": any; };
 yr: any;
 dt: any;
 mt: any;
 hr: any;
 mn: any;
 teststart_datetime: any = '';
 testend_datetime: any = '';
 testres_declared_date: any;
 searchList: any;
 currentPage: any;
 itemsPerPage: any = 10;  
 seltdtestIdsList: Array<any> = [];
 seltdCntryList: Array<any> = [];
 seltdCrsList: Array<any> = [];
 seltdClsList: Array<any> = [];
 seltdSubjList: Array<any> = [];
 seltdtestTypeList: Array<any> = [];
 seltdownerList: Array<any> = [];
 sdate: any;
 smonth: any;
 syear: any;
 edate: any;
 emonth: any;
 eyear: any;
 TcstartDate: string;
 TcendDate: string;
 seltdverifyList: Array<any> = [];
 tvendDate: string;
 tvstartDate: string;
 seltdverifybyList: Array<any> = [];
 seltdCancelList: Array<any> = [];
 tbstartDate: string;
 tbendDate: string;
 tdendDate: string;
 tdstartDate: string;
 seltdnqnMrksList: Array<any> = [];
 tsendDate: string;
 tsstartDate: string;
 teendDate: string;
 testartDate: string;
 trdendDate: string;
 trdstartDate: string;
 testStatus: any;
 is_test_cmpltd: Array<any> = [];
 resStatus: any;
 result_status: Array<any> = [];
 resDeclBy: any;
 test_is_res_declared_admin: Array<any> = [];
 selectedTestid: Array<any> = [];
 alertmsgClass: any;
 msgSummery: any;
 alertmsgSucc: any;
 showSubBtn: boolean;
 textonModel: string;
 seltdLesList: any;
 testend_datetimes : any; 
 teststart_datetimes : any;
 sminDate : any;
 showUsers : boolean;
 template : any;
 test_res_declared_date : any;
 deleted_date : any;
 seltddltList : any;
 cancelled_date : any;
 test_verified_date : any;
 limit: any = 10;
 offset: any = 0;
 totalTests: any = 1000;
 searchLoader: any = false;
 selectedUsersName: any = [];
 dNames: any = []; 
 userDname: any = [];
  tardstartDate: any;
  tardendDate: any;
  test_act_res_declared_date: any;
  test_rescheduled_date: any;
 constructor(
   @Inject(LOCAL_STORAGE) private storage: WebStorageService,    
   private _defaultDataService         : DefaultDataService,
   private _router                     : Router, 
   private messageService              : MessageService,
   private _activatedRoute             : ActivatedRoute,
   private formBuilder                 : FormBuilder,
   private loc                         : Location,
   private _classificationsService     : ClassificationsService,
   private spinnerService              : Ng4LoadingSpinnerService,
   private _testcreateService          : TestcreateService,
   private _manageuserService          : ManageuserService,
   public sanitizer                    : DomSanitizer,
   private _questiondetailedviewService : QuestiondetailedviewService,
   
 ) {
   this.maxDate = moment().add(2,  'weeks');
   this.minDate = moment().subtract(3, 'days');
   this.alwaysShowCalendars = true;
   this.keepCalendarOpeningWithRange = true;
   this.showRangeLabelOnInput = true;
}
rangeClicked(range) {
 
}

 invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];  
 ranges: any = {
      'Today': [new Date()],
     'Yesterday': [moment().subtract(1, 'days')],
     'Last 7 Days': [moment().subtract(6, 'days'), moment()],
     'Last Week (Mo-Su)':[	moment().subtract('days', 7).isoWeekday(1), moment().subtract('days', 7).isoWeekday(7) ],
     'Month to Date': [ moment().startOf('month'), moment() ],
     'This Month': [moment().startOf('month'), moment().endOf('month')],
     'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
     'Year to Date':[moment().startOf('year'), moment()]
 };

 isInvalidDate = (m: moment.Moment) =>  {
   return this.invalidDates.some(d => d.isSame(m, 'day') )
 }
 ngOnInit() {
   this.Check_admin_id = localStorage.getItem('admin_id');
   this.admintype_id = localStorage.getItem('admintype_id');
   this.inst_id = localStorage.getItem('inst_id');   
   if(this.Check_admin_id==null){
     this._router.navigate(['/']);
   }
   this.angularRoute = this.loc.path();
   this.url = window.location.href;
   this.domainAndApp = this.url.replace(this.angularRoute, '');
   this.getTestids();
   this.dnameGroup();
   this.getCountries();
   this.getCourses();
   this.getClasses();
   this.getSubjects();
  //  this.getLessons();
   this.getQuestionsnegMarks();
   this.getQuestionsMarks();
   this.getTestSearchList();
   this.getTestSearchListCount();
   this.testIdsList      = [];
   this.countryList      = [];
   this.courseList       = [];
   this.classList        = [];
   this.subjectList      = [];
   this.lessonsList      = [];
   this.testTypeList     = [
     {"value":1,"label":"Random Questions - User Specific"},
     {"value":2,"label":"Random Questions - Test Specific"},
     {"value":3,"label":"Manual Questions - User Specific"},
     {"value":4,"label":"Manual Questions - Test Specific"},
   ];
   this.ownerList    = [
     {"value": this.Check_admin_id, "label":"Admin"},
     {"value": 2, "label":"User"},
   ];
   this.verify = [
     {"value": 1, "label":"Yes"},
     {"value": 0, "label":"No"},
   ];
   this.testStatus = [
     {"value": 1, "label":"Completed"},
     {"value": 0, "label":"Not Completed"},
   ];
   this.resStatus = [
     {"value": 1, "label":"Declared"},
     {"value": 0, "label":"Not Declared"},
   ];
   this.resDeclBy = [
     {"value": 1, "label":"Admin"},
     {"value": 0, "label":"Auto"},
   ];
   this.marksList        = [];
   this.nmarksList       = [];
   
 }
 getTestids(){
   this.data = {
     "inst_id" : this.inst_id
   }
   this._testcreateService.getTestids(this.data).subscribe(
     data => {
       this.response = data.response;
       for (let tid of this.response) {
         this.testIdsList.push({ "label": tid.test_id, "value": tid.test_id });
         } 
     },
     error => {}
   );
 }
 getCountries(){
   this._defaultDataService.getcountryNamesforProfile().subscribe(
     data => {
       {this.countries = data;}
       for (let cnt of this.countries) {
         this.countryList.push({ "label": cnt.cntry_name, "value": cnt.cntry_id });
         }  
     },
     error => this.errorMessage = error
   );
 }
 getCourses(){
   this._classificationsService.getCourses(this.inst_id).subscribe(
     data => {
       {this.allCourses = data;}
       for (let crs of this.allCourses) {
         this.courseList.push({ "label": crs.course_fname, "value": crs.course_id });
         }        
     },
     error => {},
   );
 }
 getClasses(){    
   this._classificationsService.getClasses(this.inst_id).subscribe(
     data => {
       {this.allClasses = data;}
       if(data.length>0){
         for (let cls of this.allClasses) {
           this.classList.push({ "label": cls.class_fname, "value": cls.class_id });
           } 
       }                   
     },
     error => {},
   );
 }
 getSubjects(){ 
   this._classificationsService.getSubjects(this.inst_id).subscribe(
     data => {
       {this.allSubjects = data;}
       for (let sub of this.allSubjects) {
         this.subjectList.push({ "label": sub.subject_fname, "value": sub.subject_id });
       }            
     },
     error => {},
   );
 }
 getLessons(){
   this.lessdata = {
     "inst_id" : this.inst_id
   }
   this._classificationsService.getLessons(this.lessdata).subscribe(
     data => {
       {this.lessonsLists = data}       
       for(let lsn of this.lessonsLists){
         this.lessonsList.push({"label":lsn.lesson_name, "value":lsn.lesson_id});
       }
     },
     error => {}
   );
 }
 getLessonsonForSubj(num:any){
   if(num.length<1){
    this.lessonsList = [];
    return;
   }
   this.lessdata = {
     "inst_id"     : this.inst_id,
     "subject_id"  : num
   }
   this.lessonsList = [];
   //this.lessonsList = Array();
   this._classificationsService.getLessons(this.lessdata).subscribe(
     data => {
       {this.response = data;}        
       for(let lsn of this.response){
         this.lessonsList.push({"label":lsn.lesson_name, "value":lsn.lesson_id});
       }
     },
     error => {}
   );
 } 
 getQuestionsMarks(){
   this.marksData = {
     "inst_id" : this.inst_id
   }  
   this._questiondetailedviewService.getQuestionsMarks(this.marksData).subscribe(
     data => {
       {this.response = data.response;}
       for (let mrks of this.response) {
         this.marksList.push({ "label": mrks.question_marks, "value": mrks.question_marks });
       }      
     },
     error => {}
     
   );
 }
 getQuestionsnegMarks(){
   this.marksData = {
     "inst_id" : this.inst_id
   }  
   this._questiondetailedviewService.getQuestionsnegMarks(this.marksData).subscribe(
     data => {
       {this.response = data.response;}
       for (let mrks of this.response) {
         this.nmarksList.push({ "label": mrks.question_nmarks, "value": mrks.question_nmarks });
       }
       
     },
     error => {}
     
   );
 }  
 getDate(event:any,column:any){  
   this.sdate  = event.startDate._d.getDate();
   if(this.sdate.toString().length<2){ this.sdate = '0'+this.sdate; }
   this.smonth = event.startDate._d.getMonth()+1; 
   if(this.smonth.toString().length<2){ this.smonth = '0'+this.smonth; }
   this.syear  = event.startDate._d.getFullYear(); 
   this.edate  = event.endDate._d.getDate();
   if(this.edate.toString().length<2){ this.edate = '0'+this.edate; }
   this.emonth = event.endDate._d.getMonth()+1; 
   if(this.emonth.toString().length<2){ this.emonth = '0'+this.emonth; }   
   this.eyear  = event.endDate._d.getFullYear();
   if(column=='test_created_date'){
     this.TcstartDate = this.syear+'-'+this.smonth+'-'+this.sdate;
     this.TcendDate   = this.eyear+'-'+this.emonth+'-'+this.edate;
   }     
    if(column=='test_verified_date'){
      this.tvstartDate = this.syear+'-'+this.smonth+'-'+this.sdate;
      this.tvendDate   = this.eyear+'-'+this.emonth+'-'+this.edate;
    } 
    if(column=='cancelled_date'){
      this.tbstartDate = this.syear+'-'+this.smonth+'-'+this.sdate;
      this.tbendDate   = this.eyear+'-'+this.emonth+'-'+this.edate;
    }  
    if(column=='deleted_date'){
     this.tdstartDate = this.syear+'-'+this.smonth+'-'+this.sdate;
     this.tdendDate   = this.eyear+'-'+this.emonth+'-'+this.edate;
   }
   if(column=='teststart_datetime'){
     this.tsstartDate = this.syear+'-'+this.smonth+'-'+this.sdate;
     this.tsendDate   = this.eyear+'-'+this.emonth+'-'+this.edate;
   }
   if(column=='testend_datetime'){
     this.testartDate = this.syear+'-'+this.smonth+'-'+this.sdate;
     this.teendDate   = this.eyear+'-'+this.emonth+'-'+this.edate;
   }    
   if(column=='test_rescheduled_date'){
     this.trdstartDate = this.syear+'-'+this.smonth+'-'+this.sdate;
     this.trdendDate   = this.eyear+'-'+this.emonth+'-'+this.edate;
   }
   if(column=='test_act_res_declared_date'){
    this.tardstartDate = this.syear+'-'+this.smonth+'-'+this.sdate;
    this.tardendDate   = this.eyear+'-'+this.emonth+'-'+this.edate;
  }
   this.getTestSearchList(); 
   this.getTestSearchListCount(); 
   }
   dnameGroup() {
    this._manageuserService.dnameGroup(this.inst_id)
    .then((data: any)=> {
        { this.dNames  = data; }
        for (let usr of this.dNames) {
          this.userDname.push({ "label": usr.user_dname, "value": usr.user_id });
        }
      },
      error => { }
    );
  }
  onPageChange(event){
  if(event.rows){
    this.limit = event.rows;
    this.getTestSearchListCount();
  }
  this.offset = event.page*this.limit;
  this.getTestSearchList();
  }
resetFilter(){
      this.seltdtestIdsList = [];
       this.seltdCntryList = [];
       this.seltdCrsList = [];
       this.seltdClsList = [];
       this.seltdSubjList = [];
       this.seltdLesList = [];
       this.seltdtestTypeList = [];
       this.seltdownerList = [];
       this.TcstartDate ='';
       this.TcendDate ='';
       this.seltdverifyList = [];
       this.testend_datetime = '';
       this.tvstartDate = '';
       this.tvendDate = '';
       this.seltdverifybyList = [];
       this.seltdCancelList = [];
       this.tbstartDate = '';
       this.tbendDate = '';
       this.teststart_datetime = ' ';
       this.tdstartDate = '';
       this.tdendDate = '';
       this.seltdnqnMrksList = [];      
       this.tsstartDate = '';
       this.tsendDate = '';
       this.testartDate = '';
       this.teendDate = '';
       this.trdstartDate = '';
       this.trdendDate = '';
       this.is_test_cmpltd = [];
       this.result_status = [];
       this.seltddltList = [];
       this.selectedUsersName = [];
       this.test_is_res_declared_admin = [];
       this.limit = '10';
       this.offset = '0';
       this.test_act_res_declared_date = ''
       this.paginator.changePage(0);
       $("#teststart_datetime").val('');
       $("#testend_datetime").val('');
       $("#test_rescheduled_date").val('');
       $("#teststart_datetime").val('');
}
setFilter(){
  this.getTestSearchList();
  this.getTestSearchListCount();
}
 getTestSearchList(){
   this.data = {
     "inst_id"         : this.inst_id,
     "user_id"         : this.selectedUsersName,
     "test_id"         : this.seltdtestIdsList,
     "contries"        : this.seltdCntryList,
     "courses"         : this.seltdCrsList,
     "classes"         : this.seltdClsList,
     "subjects"        : this.seltdSubjList,
     "lesson_id"       : this.seltdLesList,
     "test_type"       : this.seltdtestTypeList,
     "test_owner"      : this.seltdownerList,
     "TcstartDate"     : this.TcstartDate,
     "TcendDate"       : this.TcendDate,
     "verifyList"      : this.seltdverifyList,
     "tvstartDate"     : this.tvstartDate,
     "tvendDate"       : this.tvendDate,
     "verifybyList"    : this.seltdverifybyList,
     "cancel"          : this.seltdCancelList,
     "tbstartDate"     : this.tbstartDate,
     "tbendDate"       : this.tbendDate,
     "tdstartDate"     : this.tdstartDate,
     "tdendDate"       : this.tdendDate,
     "is_negmarks"     : this.seltdnqnMrksList,      
     "tsstartDate"     : this.tsstartDate,
     "tsendDate"       : this.tsendDate,
     "testartDate"     : this.testartDate,
     "teendDate"       : this.teendDate,
     "trdstartDate"    : this.trdstartDate,
     "trdendDate"      : this.trdendDate,
     "is_test_cmpltd"  : this.is_test_cmpltd,
     "result_status"   : this.result_status,
     "is_delete"       : this.seltddltList,
     "tardstartDate"    : this.tardstartDate,
     "tardendDate"      : this.tardendDate,
     "resDeclBy"       : this.test_is_res_declared_admin,
     "limit"           : this.limit,
     "offset"          : this.offset
   }
   this.searchLoader = true;
   this._testcreateService.getTestSearchList(this.data).subscribe(
     data  => {
       {this.searchList = data.response}
       this.searchLoader = false ;
     },
     error => {}
   );
 }
 getTestSearchListCount(){
  this._testcreateService.getTestSearchListCount(this.data).subscribe(
    data  => {
      {this.totalTests = data.response}
    },
    error => {}
  );
 }
 VerifyTestConfirm(){
   if(this.selectedTestid && this.selectedTestid.length>0){
     this.showSubBtn = true;
     this.textonModel = 'Do you really want to verify these records? This process cannot be undone!';
    }else{
      this.showSubBtn = false;
      this.textonModel = 'Please select test to verify!';
    }
 }
 deleteTestConfirm(){
  if(this.selectedTestid && this.selectedTestid.length>0){
    this.showSubBtn = true;
    this.textonModel = 'Do you really want to verify these records? This process cannot be undone!';
   }else{
     this.showSubBtn = false;
     this.textonModel = 'Please select test to delete!';
   }
}
cancelTestConfirm(){
  if(this.selectedTestid && this.selectedTestid.length>0){
    this.showSubBtn = true;
    this.textonModel = 'Do you really want to verify these records? This process cannot be undone!';
   }else{
     this.showSubBtn = false;
     this.textonModel = 'Please select test to block!';
   }
}
cancelTest(){
  this.data = {
    "inst_id" : this.inst_id,
    "test_id" : this.selectedTestid,
    "cancelled_by": this.Check_admin_id,
    "is_cancel"	: '1'
  }    
  //return false;
  this._testcreateService.CancelTest(this.data).subscribe(
    data  => {
      {this.response = data.response;}
      if(data.response==1){          
        this.alertmsgClass = 'success';
        this.msgSummery = 'Success';
        this.alertmsgSucc = 'Cancel Successfully';
        this.showSuccess();          
        this.getTestSearchList();          
      }else{
        this.alertmsgClass = 'error';
        this.msgSummery = 'Error';
        this.alertmsgSucc = data.response;
      }
      
    },
    error => {}
  );
}
deleteTest(){
  this.data = {
    "inst_id" : this.inst_id,
    "test_id" : this.selectedTestid,
    "deleted_by": this.Check_admin_id,
    "is_delete": "1"
  }    
  //return false;
  this._testcreateService.DeleteTest(this.data).subscribe(
    data  => {
      {this.response = data.response;}
      if(this.response==1){          
        this.alertmsgClass = 'success';
        this.msgSummery = 'Success';
        this.alertmsgSucc = 'Deleted Successfully';
        this.showSuccess();          
        this.getTestSearchList();          
      }else{
        this.alertmsgClass = 'error';
        this.msgSummery = 'Error';
        this.alertmsgSucc = data.response;
      }
      
    },
    error => {}
  );
}
 VerifyTest(){
   this.data = {
     "inst_id" : this.inst_id,
     "test_id" : this.selectedTestid,
     "test_verified_by": this.Check_admin_id
   }    
   //return false;
   this._testcreateService.VerifyTest(this.data).subscribe(
     data  => {
       {this.response = data.response;}
       if(data.response==1){          
         this.alertmsgClass = 'success';
         this.msgSummery = 'Success';
         this.alertmsgSucc = 'Verified Successfully';
         this.showSuccess();          
         this.getTestSearchList();          
       }else{
         this.alertmsgClass = 'error';
         this.msgSummery = 'Error';
         this.alertmsgSucc = data.response;
       }
       
     },
     error => {}
   );
 }
 showSuccess() {  
   this.messageService.add({severity:this.alertmsgClass, summary: this.msgSummery, detail:this.alertmsgSucc});
 }
 /* For Production */
 onReject(){
 
 }

}
