import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MentorService } from '../mentor.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as moment from 'moment';
import Swal from 'sweetalert2';
declare let $: any;

@Component({
  selector: 'app-mentorrequest',
  templateUrl: './mentorrequest.component.html',
  styleUrls: ['./mentorrequest.component.css'],
  providers: [MentorService,Ng4LoadingSpinnerService]
})
export class MentorrequestComponent implements OnInit {
  @ViewChild('mentorDetailModal') mentorDetailModal: ElementRef;
  
  searchLoader: any = false;

  createMentorList: any;
  request_rejected: any;
  user_id: any;
  user_name: any;
  user_phone: any;
  user_alt_phone: any;
  request_date: any;
  request_completed: any;
  approve_status: number;
  reject_status: number;
  mentor_req_id: any;
  status: string;
  usr_mentor_id: any;
  mentor_id: any;
  mentor_name: any;
  mentor_user_id: any;
  mentor_address: any;
  mentor_phone: any;
  mentor_alt_phone: any;
  mentor_fax: any;
  mentor_email: any;

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

  creationstartDate: any;
  creationendDate: any;
  sdate: any;
  smonth: any;
  syear: any;
  edate: any;
  emonth: any;
  eyear: any;
 

  statusList = [];
  selectedStatus: any;
  constructor(
    private mentorService: MentorService,
    private spinnerService              : Ng4LoadingSpinnerService
  ) { }

  ngOnInit() {
    this.statusList =[{ "label": "Pending", "value": 0 },
    { "label": "Approved", "value": 1 }];
    this.getCreateMentor();
  }

  getDate(event){  
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
    // if(column=='creationDate'){
     this.creationstartDate = this.syear+'-'+this.smonth+'-'+this.sdate;
     this.creationendDate   = this.eyear+'-'+this.emonth+'-'+this.edate;
  //  }
   this.getCreateMentor();
  //  this.getNotificationListCount(this.pageCount, this.rowsPerPage);
  }

  setFilter(){
    this.getCreateMentor();
  }

  resetFilter(){
    
    this.creationstartDate = "";
    this.creationendDate = "";
    this.selectedStatus = "";
   //  this.paginator.changePage(0);
    this.getCreateMentor();
    // this.getNotificationListCount(this.pageCount, this.rowsPerPage);
 }

  getCreateMentor(){
    let data ={
      "creationstartDate": this.creationstartDate,
      "creationendDate": this.creationendDate,
      "status": this.selectedStatus,
    }
    this.searchLoader = true;
    this.mentorService.getCreateMentor(data).subscribe(
      data => {
        console.log(data);
        this.searchLoader = false;
        if(data.status == 200){
          this.createMentorList = data.result;
        }else{
          this.createMentorList = [];
        }
      },
      error => { },
    );
  }
  mentorInfo(mentor){
    console.log(mentor);
    this.mentor_req_id = mentor.mentor_req_id;
    this.user_id = mentor.user_id;
    this.usr_mentor_id = mentor.usr_mentor_id;
    this.user_name = mentor.user_dname;
    this.user_phone = mentor.user_phone;
    this.user_alt_phone = mentor.user_alt_phone;
    this.request_date = mentor.request_date;
    // this.request_completed = mentor.request_completed;
    // this.request_rejected = mentor.request_rejected;
    this.status = mentor.request_completed == 1 ? "Approved" : mentor.request_rejected == 1 ? "Rejected" : "Pending";
    this.mentor_id = mentor.mentor_id;
    this.mentor_name = mentor.mentor_name;
    this.mentor_user_id = mentor.mentor_user_id;
    this.mentor_address = mentor.mentor_address;
    this.mentor_phone = mentor.mentor_phone;
    this.mentor_alt_phone = mentor.mentor_alt_phone;
    this.mentor_fax = mentor.mentor_fax;
    this.mentor_email = mentor.mentor_email;
    
  }
  approve_reject_mentor(value){
    if(value == 1){
      this.approve_status = 1;
      this.reject_status = 0;
    }else{
      this.approve_status = 0;
      this.reject_status = 1;
    }
    var data = {
      'user_id' : this.user_id,
      'admin_id' : localStorage.getItem('admin_id'),
      'mentor_req_id' : this.mentor_req_id,
      'request_completed' : this.approve_status,
      'request_rejected' : this.reject_status
    }
    this.mentorService.updateMentorAproveRejectStatus(data)
      .subscribe(
        data => {
          if(data.status == 200){
            this.getCreateMentor();
            $(this.mentorDetailModal.nativeElement).modal('hide');
            Swal.fire(
              "Success!",
               data.messages, 
              "success"
            );
          }
        },
        error => { },
      );
  }
  reload(){
    this.getCreateMentor();
  }
}
