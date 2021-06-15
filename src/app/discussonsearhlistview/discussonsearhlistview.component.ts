import { DefaultDataService }from '../default-data.service';
import { Component, OnInit, Inject, Input} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
//import {CalendarModule} from 'primeng/calendar';
import {MessageService} from 'primeng/api';
import { DiscussionlistviewService } from './discussionlistview.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { SelectItem } from 'primeng/api';
import * as moment from 'moment';
@Component({
  selector: 'app-discussonsearhlistview',
  templateUrl: './discussonsearhlistview.component.html',
  styleUrls: ['./discussonsearhlistview.component.css'],
  providers: [MessageService,DefaultDataService,DiscussionlistviewService]
})
export class DiscussonsearhlistviewComponent implements OnInit {
 /******* producation *******/
 
  cars:any[];
  selectedCars1: string[] = [];
  selectedCars2: string[] = [];         
  selectedOwner:any;
  selectedDelete:any;
  selectedBlocked:any;
  selectedVerifyedby: any;
  selectedVerify:any;
  selectedRating:any;
  selectedTopic:any;
  itemsPerPage: any = 10;
  currentPage: any; 
  TopicsList: any[];
  selectedTopicsList: any = ''; 
  DiscussionList: any[];
  selectedDiscussionList: any = '';
  TopicsVerifyList: any[];
  TopicsBlockList: any[];
  TopicsDeleteList : any[];
  /**** DFate picker------ */
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
    'Last Week (Mo-Su)':[	moment().subtract('days', 7).isoWeekday(1), moment().subtract('days', 7).isoWeekday(7) ],
    'Month to Date': [ moment().startOf('month'), moment() ],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    'Year to Date':[moment().startOf('year'), moment()]
};

isInvalidDate = (m: moment.Moment) =>  {
  return this.invalidDates.some(d => d.isSame(m, 'day') )
}
  Check_admin_id: string;
  admintype_id: string;
  inst_id: string;
  getDisc: any;
  discussions: any;
  length: any;
  alltopics: any;
  topicData: any;
  discData: any;
  allDiscu: any;
  selectedTopicsVerifyList: any;
  selectedTopicsBlockList : any;
  selectedTopicsDeleteList: any;
  selectedDiscVerifyList: any;
  selectedDiscBlockList: any;
  selectedDiscDeleteList: any;
  selectedDiscfDelList: any;
  discusn_date : any;
  sdate: any;
  smonth: any;
  syear: any;
  dfstartDt: string;
  dfendDt: string;
  edate: any;
  emonth: any;
  eyear: any;
  discus_date : any;
  dsendDt: string;
  dsstartDt: string;
  distopic_created_date: any;
  dtendDt: string;
  dtstartDt: string;
  checkedTopicid: Array<any> = [];
  checkedDiscid: Array<any> = [];
  checkedDfid: Array<any> = [];
  muvrdata: any;
  response: any;
  verify : any;
  verifyedby : any;
  block : any;
  alertmsgClass: string;
  summary: string;
  alertmsgSucc: string;
  
rangeClicked(range) {
 //console.log('range is : ', range); 
}
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,    
    private _defaultDataService: DefaultDataService,
    private _router: Router, private fb: FormBuilder,
    private messageService: MessageService,
    private _activatedRoute: ActivatedRoute,
    private _discussionlistviewService : DiscussionlistviewService
  ) {
    this.maxDate = moment().add(2,  'weeks');
    this.minDate = moment().subtract(3, 'days');
    this.alwaysShowCalendars = true;
    this.keepCalendarOpeningWithRange = true;
    this.showRangeLabelOnInput = true;

this.TopicsVerifyList = [
  {label : "Yes", value: "1"},
  {label : "No", value: "0"},
]; 
this.TopicsBlockList = [
  {label : "Yes", value: "1"},
  {label : "No", value: "0"},
] 
this.TopicsDeleteList = [
  {label : "Yes", value: "1"},
  {label : "No", value: "0"},
]
this.TopicsList = [];
this.DiscussionList = [];
 }

  ngOnInit() {
    this.Check_admin_id = localStorage.getItem('admin_id');
    this.admintype_id = localStorage.getItem('admintype_id');
    this.inst_id = localStorage.getItem('inst_id');    
    if(this.Check_admin_id==null){
    this._router.navigate(['home']);
  }
  
  this.getAllTopics(this.inst_id);
  this.getAllDiscussionNames(this.inst_id);
  this.getDiscussions();
  }

  getDiscussions(){
    this.getDisc = {
      "inst_id" : this.inst_id, 
      "topic_names" : this.selectedTopicsList,
      "discus_names" : this.selectedDiscussionList,
      "topic_verify" : this.selectedTopicsVerifyList,
      "topic_block" : this.selectedTopicsBlockList,
      "topic_del"   : this.selectedTopicsDeleteList,
      "desc_verify" : this.selectedDiscVerifyList,
      "desc_block"  : this.selectedDiscBlockList,
      "desc_del"    : this.selectedDiscDeleteList,
      "desc_fl_del" : this.selectedDiscfDelList,
      "dfstartDt"   : this.dfstartDt,
      "dfendDt"     : this.dfendDt,
      "dsstartDt"   : this.dsstartDt,
      "dsendDt"     : this.dsendDt,
      "dtstartDt"   : this.dtstartDt,
      "dtendDt"     : this.dtendDt
    } 
    
    this._discussionlistviewService.getDiscussions(this.getDisc).subscribe(
      data => {
        {this.discussions = data;}   
        //this.length = data.length;      
        //console.log('first row',data.slice(0, 1));
        //console.log('remaining rows',data.slice(1,this.length));          
      },
      error => {}
  
    );
  }
  selectItemsperpage(num){
    this.itemsPerPage = num;
    }
    getAllTopics(inst_id){
      this.topicData = {
        "inst_id" : inst_id
      }
      this._discussionlistviewService.getAllTopics(this.topicData).subscribe(
        data => {
          {this.alltopics = data;}
          for (let tpn of this.alltopics) {
            this.TopicsList.push({ "label": tpn.distopic_name, "value": tpn.distopic_id });
            }        
        },
        error => {},
      );
    }
    getAllDiscussionNames(inst_id){
      this.discData = {
        "inst_id" : inst_id
      }
      this._discussionlistviewService.getAllDiscussionNames(this.discData).subscribe(
        data => {
          {this.allDiscu = data;}
          for (let discn of this.allDiscu) {
            this.DiscussionList.push({ "label": discn.discus_desc, "value": discn.discus_id });
            }        
        },
        error => {},
      );
    }
    getDate(event:any,column:string){  
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
    if(column=='discusn_date'){
      this.dfstartDt = this.syear+'-'+this.smonth+'-'+this.sdate;
      this.dfendDt   = this.eyear+'-'+this.emonth+'-'+this.edate;
    } 
    if(column=='discus_date'){
      this.dsstartDt = this.syear+'-'+this.smonth+'-'+this.sdate;
      this.dsendDt   = this.eyear+'-'+this.emonth+'-'+this.edate;
    } 
    if(column=='distopic_created_date'){
      this.dtstartDt = this.syear+'-'+this.smonth+'-'+this.sdate;
      this.dtendDt   = this.eyear+'-'+this.emonth+'-'+this.edate;
    }
    this.getDiscussions();  
    }

    getCheckedcontentValues(did:number,tid:number,fid:number, isChecked: boolean){      
      if(isChecked) {
        this.checkedTopicid.push(tid);
        this.checkedDiscid.push(did);
        this.checkedDfid.push(fid);
      } else {
        let tindex = this.checkedTopicid.indexOf(tid);
        let dindex = this.checkedDiscid.indexOf(did);
        let findex = this.checkedDfid.indexOf(fid);
        this.checkedTopicid.splice(tindex,1);
        this.checkedDiscid.splice(dindex,1);
        this.checkedDfid.splice(findex,1);
      }   
      
    }
    multipleVerify(){
      this.muvrdata = {
        "inst_id"   : this.inst_id,
        "topics"    : this.checkedTopicid,
        "disc"      : this.checkedDiscid,
        "follw"     : this.checkedDfid,
        "admin_id"     : this.Check_admin_id
      }      
     this._discussionlistviewService.multipleVerify(this.muvrdata).subscribe(
       data => {
         this.response = data;
         this.alertmsgClass = 'success';
          this.summary = 'Success!';
          this.alertmsgSucc = 'Verified successfully!';
          this.showSuccess();
         this.getDiscussions();
       },
       error => {}
     );
    }
    showSuccess() {
      this.messageService.add({severity:this.alertmsgClass, summary: this.summary, detail:this.alertmsgSucc});
    }
    onReject(){
      
    }  
}
