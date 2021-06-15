import { Component, OnInit,Inject, Input,ViewChild,ElementRef } from '@angular/core';
import { DefaultDataService }from '../default-data.service';
import { Router, ActivatedRoute} from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {MessageService} from 'primeng/api';
import { ContentsearchService } from './contentsearch.service';
import { ContentuploadmangeService } from './../contntuploadmanage/contentuploadmange.service';
import { from } from 'rxjs/observable/from';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TypeScriptEmitter } from '@angular/compiler';
import * as moment from 'moment';
import { ClassificationsService } from '../classfications.service';
import { Paginator } from 'primeng/paginator';
@Component({
  selector: 'app-contentsearch',
  templateUrl: './contentsearch.component.html',
  styleUrls: ['./contentsearch.component.css'],
  providers: [MessageService,ContentsearchService,ContentuploadmangeService,ClassificationsService]
})
export class ContentsearchComponent implements OnInit {
  @ViewChild('paginator') paginator: Paginator;
  myOwnContent: any ='';
  cancelCallCount: any = 0;
  [x: string]: any;
  /****producation*****/
  classification:any;
  selectedclasid:any;
 contentCount:any;
  itemList = [];
  itemList2 = [];
  selectedItems = [];
  settings = {};
  settings2 = {};
  onItemSelect:any;
  OnItemDeSelect:any;
  onSelectAll:any;
  onDeSelectAll:any;
/**** DFate picker------ */
selected: any;
delselected : any;
blselected: any;
vrfselected : any;
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
    'Last Week (Mo-Su)':[	moment().subtract('days', 7).isoWeekday(1), moment().subtract('days', 7).isoWeekday(7) ],
    'Month to Date': [ moment().startOf('month'), moment() ],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    'Year to Date':[moment().startOf('year'), moment()]
};

isInvalidDate = (m: moment.Moment) =>  {
  return this.invalidDates.some(d => d.isSame(m, 'day') )  
}

  Check_admin_id: any;
  admintype_id: any;
  inst_id: any;
  contentList: any;
  allCourses: any;
  courseList: any[];
  selectedValues: any;
  selectedcourseList: any = [];
  allClasses: any;
  classList: any[];
  selectedclassList: any=[];
  allSubjects: any;
  subjectList: any[];
  selectedsubjectList: any = '';
  countryList: any[];
  lessonsList: any[];
  selectedlessonList: any = [];
  selectedcountryList: any = [];
  content_id: any;
  allClassifications: any =[];
  ItemsSeleted : any;
  classificationList: { "classification": any; };
  allcontentids: any;
  contentIdList: any[];
  selectedcontentIdList: any = [];
  lessonsdata: any;
  getlessons: any;
  table : string = '';
  mediatypes: any;
  typesList: any[];
  selectedtypesList: any=[];
  contentVerify: any[];
  contentDelete: any[];
  selectedcontentVerify: any=[];
  selectedcontentBlock: any=[];
  selectedcontentDelete: any=[];
  rowsperpage : number;
  totalRecords: any; 
  smonth: any;
  sdate: any;
  syear: any;
  edate: any;
  emonth: any;
  eyear: any;
  dstartDate: any;
  dates: any;
  dendDate: any;
  bendDate: string;
  bstartDate: string;
  vendDate: string;
  vstartDate: string;
  cendDate: string;
  searchWords: string;
  cstartDate: string;
  checkedValues: any = 0;
  checkedContentid: any = [];
  verifyContentData : any;
  alertmsgClass : any;
  msgSummery : any;
  alertmsgSucc : any;
  response : any;
  selectedAll : any;
  itemsPerPage: any = 10;
  currentPage: any;
  classificationLoader: any = false;
  cancelCall: any = 0;
  limit: any = 10;
  offset:any = 0;
  totalContent:any = 0;
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private messageService: MessageService,
    private _defaultDataService: DefaultDataService,
    private _router: Router,
    private formBuilder: FormBuilder,
    private _contentsearchService : ContentsearchService,
    private _contentuploadmangeService : ContentuploadmangeService,
    private _classificationsService : ClassificationsService
  ) {  this.maxDate = moment().add(2,  'weeks');
  this.minDate = moment().subtract(3, 'days');
   this.alwaysShowCalendars = true;
   this.keepCalendarOpeningWithRange = true;
   this.showRangeLabelOnInput = true;
   
   //this.selected = {startDate: moment().subtract(1, 'days'), endDate: moment().subtract(1, 'days')};
   
}

rangeClicked(range) {
}
  ngOnInit() {
    this.Check_admin_id = localStorage.getItem('admin_id');
    this.admintype_id = localStorage.getItem('admintype_id');
    this.inst_id = localStorage.getItem('inst_id');   
    if(this.Check_admin_id==null){
      this._router.navigate(['/']);
    }
    this.rowsperpage = 5;
    this.getAllContentIds(this.inst_id);
    this.getCourses(this.inst_id);
    this.getClasses(this.inst_id);
    this.getSubjects(this.inst_id);
    this.getCountry(this.inst_id);
    this.getMediaTypes(this.inst_id);
    this.getAllContent(this.inst_id,this.table);
    this.getAllContentCount(this.inst_id,this.table);
    this.itemList = [
      { "id": 1, "itemName": "Lession/Topic" },
      { "id": 2, "itemName": "" },
     
  ];
  this.itemList2 = [
    { "id": 1, "itemName": "India" },
    { "id": 2, "itemName": "Usa" },   
];
this.courseList = [];
this.classList = [];
this.subjectList = [];
this.countryList = [];
this.lessonsList = [];
this.typesList = [];
this.contentIdList = [];
this.contentVerify = [
  { "label" : "No", "value": 0 },
  { "label" : "Yes", "value" : 1 }
];
this.contentDelete = [
  { "label" : "No", "value": 0 },
  { "label" : "Yes", "value" : 1 }
];
// this.getContentCount();
  }
  public my_Class = 'style1';
  isClass1Visible: false;
  isClass2Visible: false;

  manageClassificationFilter(table){
    if(table=="course"){ this.selectedValues =this.selectedcourseList; }
    if(table=="class"){ this.selectedValues =this.selectedclassList; }
    if(table=="subject"){ this.selectedValues =this.selectedsubjectList; }
    if(table=="country"){ this.selectedValues =this.selectedcountryList; }
    //this.getAllContent(this.inst_id,this.selectedValues);
    //alert(this.selectedValues);
  }
  getAllContentIds(inst_id){
    var body={
      inst_id: inst_id
    }
    this._contentsearchService.getAllContentIds(body).subscribe(
      data => {
        {this.allcontentids = data;}
        for (let ctid of this.allcontentids) {
          this.contentIdList.push({ "label": ctid.content_id, "value": ctid.content_id });
          }        
      },
      error => {},
    );
  }
  getCourses(inst_id:any){
    this._classificationsService.getCourses(inst_id).subscribe(
      data => {
        {this.allCourses = data;}
        for (let crs of this.allCourses) {
          this.courseList.push({ "label": crs.course_fname, "value": crs.course_id });
          }        
      },
      error => {},
    );
  }
  getClasses(inst_id:any){    
    this._classificationsService.getClasses(inst_id).subscribe(
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
  getSubjects(inst_id:any){   
    this._classificationsService.getSubjects(inst_id).subscribe(
      data => {
        {this.allSubjects = data;}
        for (let sub of this.allSubjects) {
          this.subjectList.push({ "label": sub.subject_fname, "value": sub.subject_id });
          }            
      },
      error => {},
    );
  }
  getCountry(inst_id:number){    
    this._defaultDataService.getcountryNamesforProfile().subscribe(
      data => {
        {this.allSubjects = data;}
        for (let cnt of this.allSubjects) {
          this.countryList.push({ "label": cnt.cntry_name, "value": cnt.cntry_id });
          }            
      },
      error => {},
    );
  }
  myContent(){
    if ($('#contentCheck').is(":checked"))
  {
    this.myOwnContent = this.Check_admin_id ;
    this.getAllContent(this.inst_id, '');
    this.getAllContentCount(this.inst_id,'');
  }else {
    this.myOwnContent = '';
    this.getAllContent(this.inst_id, '');
    this.getAllContentCount(this.inst_id,'');
  }
  }
  onPageChange(event) {
    if (event.rows) {
      this.limit = event.rows;
    }
    this.offset = event.page * this.limit;
    this.getAllContent(this.inst_id,'');
  }
  getAllContent(inst_id:number,table:any){  
    this.classificationLoader = true;
    this.selectedValues = {
      'inst_id'       : inst_id,
      // 'call_by_user'  : this.Check_user_id,
      'search_words'  : this.searchWords,
      'dstartDate'    : this.dstartDate,
      'dendDate'      : this.dendDate,
      'bstartDate'    : this.bstartDate,
      'bendDate'      : this.bendDate,
      'vstartDate'    : this.vstartDate,
      'vendDate'      : this.vendDate,
      'cstartDate'    : this.cstartDate,
      'cendDate'      : this.cendDate,
      'limit'         : this.limit.toString(),
      'offset'        : this.offset.toString()
    };
    if(this.myOwnContent != ''){
      this.selectedValues['created_by_admin']=this.Check_admin_id ;
    }
    if(this.selectedcontentIdList.length >0){
      this.selectedValues['contentIds'] =  this.selectedcontentIdList
    }
    if(this.selectedcontentDelete.length >0){
      this.selectedValues['cntdelete'] =  this.selectedcontentDelete
    }
    if(this.selectedcontentVerify.length >0){
      this.selectedValues['cntverify'] =  this.selectedcontentVerify
    }
    if(this.selectedtypesList.length >0){
      this.selectedValues['types'] =  this.selectedtypesList
    }
    if(this.selectedlessonList.length >0){
      this.selectedValues['lesson'] =  this.selectedlessonList
    }
    if(this.selectedsubjectList.length >0){
      this.selectedValues['subject'] =  this.selectedsubjectList
    }
    if(this.selectedclassList.length >0){
      this.selectedValues['class'] =  this.selectedclassList
    }
    if(this.selectedcourseList.length >0){
      this.selectedValues['course'] =  this.selectedcourseList 
    }
    if(this.selectedcountryList.length >0){
      this.selectedValues['country'] =  this.selectedcountryList 
    }
   
    if(this.selectedcontentBlock.length >0){
      this.selectedValues['cntblock'] =  this.selectedcontentBlock
    }
    if(table=='subject'){
      this.getLessons(inst_id,this.selectedsubjectList);
    }        
    if (this.cancelCall !== 0) {
      this.cancelCall.unsubscribe();
      this.cancelCall = 0;
    }

    this.cancelCall = this._contentsearchService.getAllContent(this.selectedValues).subscribe(
      data => {
        {this.allClassifications = data;}  
        console.log("this.allClassifications ",this.allClassifications)  
        this.classificationLoader = false;
        //alert(data.length);  
      },
      error => {},
    );
  }
  getAllContentCount(inst_id:number,table:any){        
    if (this.cancelCallCount !== 0) {
      this.cancelCallCount.unsubscribe();
      this.cancelCallCount = 0;
    }

    this.cancelCallCount = this._contentsearchService.getAllContentCount(this.selectedValues).subscribe(
      data => {
        {this.totalContent = data;}   
        //alert(data.length);  
      },
      error => {},
    );
  }
  searchContent(value:any,inst_id:number){
    this.searchWords = value;
    this.getAllContent(inst_id,'');

  }
  getDate(inst_id:number,table:any,event:any,column:string){
    
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
    if(column=='content_deleted_date')    {
      this.dstartDate = this.syear+'-'+this.smonth+'-'+this.sdate;
      this.dendDate   = this.eyear+'-'+this.emonth+'-'+this.edate;
    }
    if(column=='content_blocked_date')    {
      this.bstartDate = this.syear+'-'+this.smonth+'-'+this.sdate;
      this.bendDate   = this.eyear+'-'+this.emonth+'-'+this.edate;
    } 
    if(column=='content_verified_date')    {
      this.vstartDate = this.syear+'-'+this.smonth+'-'+this.sdate;
      this.vendDate   = this.eyear+'-'+this.emonth+'-'+this.edate;
    }
    if(column=='content_created_date'){
      this.cstartDate = this.syear+'-'+this.smonth+'-'+ this.sdate;
      this.cendDate   = this.eyear+'-'+this.emonth+'-'+ this.edate;
    }
    
    this.dates = {
      "dstartDate"  : this.dstartDate,
      "dendDate"    : this.dendDate,
      "bstartDate"  : this.bstartDate,
      "bendDate"    : this.bendDate,
      "vstartDate"  : this.vstartDate,
      "vendDate"    : this.vendDate,
      "cstartDate"  : this.cstartDate,
      "cendDate"    : this.cendDate
    } 
    //console.log(this.dates);
   this.getAllContent(inst_id,table);
   this.getAllContentCount(this.inst_id,this.table);
  }
  getLessons(inst_id:any,subjects:any){
    this.lessonsList = [];
    this.lessonsdata = {
      "inst_id" : inst_id,
      "subject_id" : subjects
    }
    this._classificationsService.getLessonsonForSubj(this.lessonsdata).subscribe(
      data => {
        {this.getlessons = data;}      
        for (let lsn of this.getlessons) {
          this.lessonsList.push({ "label": lsn.lesson_name, "value": lsn.lesson_id });
          }            
      },
      error => {},
    );
  }
  getMediaTypes(inst_id){
    this._defaultDataService.getMediaTypes().subscribe(
      data => {
        {this.mediatypes = data;}
        for(let mts of this.mediatypes){
          this.typesList.push({"label":mts.mediatyp_extnsn, "value":mts.mediatyp_id});
        }
      },
      error => {}
    );
  }
  getCheckedcontentValues(id:number, isChecked: boolean){
    if(isChecked) {
      this.checkedContentid.push(id);
    } else {
      let index = this.checkedContentid.indexOf(id);
      this.checkedContentid.splice(index,1);
    }    
  }

verifyContent(inst_id){  
  this.verifyContentData = {
    "inst_id" : inst_id,
    "checkedValues" : this.checkedContentid,
    "admin_id" : this.Check_admin_id
  }
  this._contentsearchService.verifyContent(this.verifyContentData).subscribe(
    data => {
      {this.response = data;}
      this.alertmsgClass = 'success';
            this.msgSummery = 'Success';
            this.alertmsgSucc = 'Verified Successfully';
            this.showSuccess();
            this.getAllContent(this.inst_id,'');
    },
    error => {}
  );
}
resetFilters(){
  this.selectedValues ={
    'inst_id'       : this.inst_id,
  }
  $('#contentCheck').prop('checked', false);
  this.myOwnContent = '';
  this.selectedcontentIdList=[];
  this.selectedcontentVerify=[];
  this.selectedtypesList = [];
  this.selectedlessonList = [];
  this.selectedsubjectList = [];
  this.selectedcountryList = [];
   this.selectedcourseList  = [];
    this.selectedclassList  = [];
    this.selectedcontentBlock = [];
    this.searchWords = '';
    this.checkedContentid = [];
    this.selectedcontentDelete = '';
    this.dstartDate = '';
    this.dendDate = '';
    this.bstartDate = '';
    this.bendDate = '';
    this.vstartDate = '';
    this.limit = 10;
    this.offset = 0;
    this.paginator.changePage(0);
    this.getAllContent(this.inst_id,'');
    this.getAllContentCount(this.inst_id,this.table);
  }
getContentCount(){
  this._contentsearchService.getContentCount(this.inst_id).subscribe(
    data => {
      {this.contentCount = data;}
      //alert(data);
    },
    error => {}
  );
}
addDateCss() {
  setTimeout(() => {
   $('.md-drppicker.shown.drops-down-right ').css('color', 'black');
   $('.md-drppicker.shown.drops-down-right ').css('display', 'flex');
   $('.md-drppicker.shown.drops-down-right ').css('height', '280px');
   $('.md-drppicker.shown.drops-down-right ').css('top', '26% !impotant');
   $('.md-drppicker.shown.drops-down-right ').css('left', '56%'); 
   $('.md-drppicker').css('z-index', '13000');
   $('.ranges').css('overflow-x', 'hidden');
   $('.ranges').css('width', '135px');
   $('.md-drppicker .buttons .buttons_input .btn').css('top', '90px');
   $('.md-drppicker .buttons .buttons_input .btn').css('border-radius', '10px');
   $('.md-drppicker .buttons .buttons_input .btn-default').css('top', '175px');
   $('.md-drppicker .buttons .buttons_input .btn-default').css('border-radius', '10px');
   $('.md-drppicker .buttons .buttons_input .clear').css('top', '2px');
  }, 100);
 }
selectItemsperpage(num:number){
  this.itemsPerPage = num;
  }
selectAll() {
  for (var i = 0; i < this.allClassifications.length; i++) {
    //this.allClassifications[i].content_id = this.selectedAll;
    //(<HTMLInputElement>radionGroups[i]).checked = (i === 0 ? true : false);
    this["check_"+(i+1)].checked =  true;
    //this.checkedContentid.push(id);
  }
}
showSuccess() {
  //alert('success toast');
  this.messageService.add({severity:this.alertmsgClass, summary: this.msgSummery, detail:this.alertmsgSucc});
}
/* For Production */
onReject(){

}
}
