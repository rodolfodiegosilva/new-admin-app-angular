import { Component, OnInit, ViewChild } from '@angular/core';
import { CreatenotificationService } from '../createnotification/createnotification.service';
import { Paginator } from 'primeng/paginator';
import { DefaultDataService } from '../default-data.service';
import { ClassificationsService } from '../classfications.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
@Component({
  selector: 'app-notificationmanage',
  templateUrl: './notificationmanage.component.html',
  styleUrls: ['./notificationmanage.component.css'],
  providers: [CreatenotificationService,ClassificationsService,DefaultDataService,Ng4LoadingSpinnerService]
})
export class NotificationmanageComponent implements OnInit {
  /******for producation******/
  @ViewChild('p') paginator: Paginator;
  // showPaginator: boolean = true;
  paginatorRefresh: any = true;
  limit: any = 10;
  offset: any = 0;

  searchLoader: any = false;

  selected: any;
  alwaysShowCalendars: boolean;
  showRangeLabelOnInput: boolean;
  keepCalendarOpeningWithRange: boolean;
  maxDate: moment.Moment;
  minDate: moment.Moment;
  invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];
  ranges: any = {
    'Today': [new Date()],
    'Yesterday': [moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last Week (Mo-Su)': [moment().subtract('days', 7).isoWeekday(1), moment().subtract('days', 7).isoWeekday(7)],
    'Month to Date': [moment().startOf('month'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    'Year to Date': [moment().startOf('year'), moment()]
  };

  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some(d => d.isSame(m, 'day'))
  }

  classification:any;
  clascountry:any;
  clascourse:any;
  clasclass:any;
  classubject:any;
  clasverify:any;
  crationdate:any;
  clasverifyedadmin:any;
  clasnocontent:any;
  clasnoquest:any;
  verifydate:any;
  selecteclasnoquest:any;
  selecteclasnocontent:any;
  selecteclasverifyadmin:any;
  selecteclasverify:any;
  selecteclassubject:any;
  selecteclasclass:any;
  selecteclascourse:any;
  selecteclascountry:any;
  selectedclasid:any;
  
  countryList = [];
  courseList= [];
  classList= [];
  subjectList= [];
  lessonsList= [];
  countries: any;
  allCourses: any;
  allClasses: any;
  allSubjects: any;
  lessdata: any;
  errorMessage: any;
  response: any;
  seltdCntryList: Array<any> = [];
  seltdCrsList: Array<any> = [];
  seltdClsList: Array<any> = [];
  seltdSubjList: Array<any> = [];
  seltdLesList: Array<any> = [];
  creationDate: string;

  selectedNotifyid: Array<any> = [];
  showSubBtn: boolean;
  textonModel: string;

  selectedValues: any;
  usersPage: number;
  pageCount: number = 1;
  pageNum: any;
  totalPages: any;
  rowsPerPage: any;
  pageNumText: any;
  page: string;
  pagePrev: any;
  itemsPerPage: any = 10;
  currentPage: any;

  
  creationstartDate: any;
  creationendDate: any;
  deletionstartDate: any;
  deletionendDate: any;
  sdate: any;
  smonth: any;
  syear: any;
  edate: any;
  emonth: any;
  eyear: any;

  qnsReq: any;
  searchLlist: any = [];
  showData: boolean;
  inst_id: any;
  Check_admin_id: any;
  data: {
    inst_id: any, 
    notify_id: any[],
    deleted_by: any,
    is_delete: string
  };

  deletednotificationList: Array<any> = [];
  notificationDelete: { "label": string; "value": number; }[];
  totalNotification: any;

  constructor(
    private _createnotificationService : CreatenotificationService,
    private _defaultDataService: DefaultDataService,
    private _classificationsService     : ClassificationsService,
    private spinnerService              : Ng4LoadingSpinnerService,
  ) { 
    this.maxDate = moment().add(2, 'weeks');
    this.minDate = moment().subtract(3, 'days');
  }

  ngOnInit() {
    this.rowsPerPage = 10;
    this.inst_id = localStorage.getItem('inst_id');   
    this.Check_admin_id = localStorage.getItem('admin_id');
    this.notificationDelete = [
      { "label": "No", "value": 0 },
      { "label": "Yes", "value": 1 }
    ];
    this.getNotificationList(this.pageCount, this.rowsPerPage);
    this.getNotificationListCount(this.pageCount, this.rowsPerPage);
    this.getCountries();
    this.getCourses();
    this.getClasses();
    this.getSubjects();
    this.countryList      = [];
    this.courseList       = [];
    this.classList        = [];
    this.subjectList      = [];
    this.lessonsList      = [];
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
  resetFilter(){
     this.seltdCntryList = [];
     this.seltdCrsList = [];
     this.seltdClsList = [];
     this.seltdSubjList = [];
     this.seltdLesList = [];
     this.creationstartDate = "";
     this.creationendDate = "";
     this.deletionstartDate = "";
     this.deletionendDate = "";
     this.deletednotificationList = [];
    //  this.paginator.changePage(0);
     this.getNotificationList(this.pageNum, this.rowsPerPage);
     this.getNotificationListCount(this.pageCount, this.rowsPerPage);
  }
  getDate(pageNum, rowsPerPage,inst_id, event,column:any){  
    console.log(event.startDate._d.getDate());
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
    if(column=='creationDate'){
     this.creationstartDate = this.syear+'-'+this.smonth+'-'+this.sdate;
     this.creationendDate   = this.eyear+'-'+this.emonth+'-'+this.edate;
   }
   if(column=='deleteNotificationDate'){
    this.deletionstartDate = this.syear+'-'+this.smonth+'-'+this.sdate;
    this.deletionendDate   = this.eyear+'-'+this.emonth+'-'+this.edate;
  }
   this.getNotificationList(this.pageNum, this.rowsPerPage);
   this.getNotificationListCount(this.pageCount, this.rowsPerPage);
  }
  setFilter(){
    this.getNotificationList(this.pageNum, this.rowsPerPage);
    this.getNotificationListCount(this.pageCount, this.rowsPerPage);
    // this.getTestSearchListCount();
  }

  // onPageChange($event) {
  //   this.rowsPerPage = this.itemsPerPage;
  //   this.currentPage = $event.page + 1;
  //   this.getNotificationList(this.currentPage, this.rowsPerPage);
  // }
  // selectItemsperpage(num) {
  //   this.rowsPerPage = num;
  //   // this.paginator.changePage(0);
  //   this.getNotificationList(this.currentPage, this.rowsPerPage);
  // }

  onPageChange(event) {
    if (event.rows) {
      this.limit = event.rows;
    }
    this.offset = event.page * this.limit;
    this.getNotificationList(this.pageNum, this.rowsPerPage);
  }
  getNotificationList(pageNum, rowsPerPage) {
    
    // this.selectedValues['rowsPerPage'] = rowsPerPage;
    // this.selectedValues['pageNum'] = pageNum;
    this.qnsReq = {
      'limit': this.limit.toString(),
      'offset': this.offset.toString(),
      "inst_id": this.inst_id,
    //   "question_id": this.seltdqnsidsList,
      "contries": this.seltdCntryList,
      "courses": this.seltdCrsList,
      "classes": this.seltdClsList,
      "subjects": this.seltdSubjList,
      "lesson_id": this.seltdLesList,
      "creationstartDate": this.creationstartDate,
      "creationendDate": this.creationendDate,
      "deletionstartDate": this.deletionstartDate,
      "deletionendDate": this.deletionendDate,
      "deletednotificationList": this.deletednotificationList
    //   "owners": this.selectedOwners,
    //   "block": this.seltdqnsbList,
    //   "delete": this.seltdqnsdList,
    //   "cstartDate": this.cstartDate,
      // "lessons": this.selectedLssnList,
    }
    // this.spinnerService.show();
    // this.getLessonsonForSubj(this.seltdSubjList);
    this.searchLoader = true;
    this._createnotificationService.getNotificationList(this.qnsReq).subscribe(
      data => {
        {
          // this.totalNotification = data.response.length;
          console.log(this.totalNotification);
           this.searchLlist = data.response; 
          //  this.totalNotification = this.searchLlist.length();
          //  console.log(this.totalNotification);
           this.searchLoader = false;
        }
        if (data.response.length > 0) {
          this.showData = true;
        } else {
          this.showData = false;
        }
        // this.spinnerService.hide();
      },

      error => { }
    );
  }
  getNotificationListCount(pageNum, rowsPerPage) {
    
    // this.selectedValues['rowsPerPage'] = rowsPerPage;
    // this.selectedValues['pageNum'] = pageNum;
    this.qnsReq = {
      'limit': this.limit.toString(),
      'offset': this.offset.toString(),
      "inst_id": this.inst_id,
    //   "question_id": this.seltdqnsidsList,
      "contries": this.seltdCntryList,
      "courses": this.seltdCrsList,
      "classes": this.seltdClsList,
      "subjects": this.seltdSubjList,
      "lesson_id": this.seltdLesList,
      "creationstartDate": this.creationstartDate,
      "creationendDate": this.creationendDate,
      "deletionstartDate": this.deletionstartDate,
      "deletionendDate": this.deletionendDate,
      "deletednotificationList": this.deletednotificationList
    //   "owners": this.selectedOwners,
    //   "block": this.seltdqnsbList,
    //   "delete": this.seltdqnsdList,
    //   "cstartDate": this.cstartDate,
      // "lessons": this.selectedLssnList,
    }
    // this.spinnerService.show();
    // this.getLessonsonForSubj(this.seltdSubjList);
    // this.searchLoader = true;
    this._createnotificationService.getNotificationListCount(this.qnsReq).subscribe(
      data => {
        {
          // this.totalNotification = data.response.length;
          console.log( data.response.length);
           this.totalNotification = data.response.length; 
          //  this.totalNotification = this.searchLlist.length();
          //  console.log(this.totalNotification);
          //  this.searchLoader = false;
        }
        // if (data.response.length > 0) {
        //   this.showData = true;
        // } else {
        //   this.showData = false;
        // }
        // this.spinnerService.hide();
      },

      error => { }
    );
  }
  deleteTestConfirm(){
    if(this.selectedNotifyid && this.selectedNotifyid.length>0){
      this.showSubBtn = true;
      this.textonModel = 'Do you really want to verify these records? This process cannot be undone!';
     }else{
       this.showSubBtn = false;
       this.textonModel = 'Please select test to delete!';
     }
  }
  deleteNotification(){
    this.data = {
      "inst_id" : this.inst_id,
      "notify_id" : this.selectedNotifyid,
      "deleted_by": this.Check_admin_id,
      "is_delete": "1"
    }    
    //return false;
    this._createnotificationService.DeleteNotification(this.data).subscribe(
      data  => {
        {this.response = data.response;}
        if(this.response==1){          
          // this.alertmsgClass = 'success';
          // this.msgSummery = 'Success';
          // this.alertmsgSucc = 'Deleted Successfully';
          // this.showSuccess();
          Swal.fire("Success!", "Notification deleted successfully!", "success");   
          // $('#delete').hide('modal');   
          // $("#myModal").modal('hide');  
          this.getNotificationList(this.pageNum, this.rowsPerPage);  
          this.getNotificationListCount(this.pageCount, this.rowsPerPage);    
        }else{
          // this.alertmsgClass = 'error';
          // this.msgSummery = 'Error';
          // this.alertmsgSucc = data.response;
          Swal.fire("Error!", data.response, "error");          
        }
        
      },
      error => {}
    );
  }
}
