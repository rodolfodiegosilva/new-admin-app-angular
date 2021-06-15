import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import Swal from 'sweetalert2';
import { PartnerService } from '../partner.service';
import * as moment from 'moment';
declare let $: any;

@Component({
  selector: 'app-user-partner-request',
  templateUrl: './user-partner-request.component.html',
  styleUrls: ['./user-partner-request.component.css'],
  providers: [PartnerService,Ng4LoadingSpinnerService]
})
export class UserPartnerRequestComponent implements OnInit {
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
  request_by: any;
  up_user_dname: any;
  up_user_email: any;
  up_user_id: any;
  up_user_phone: any;
  constructor(
    private partnerService: PartnerService,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  ngOnInit() {
    this.statusList =[{ "label": "Pending", "value": 0 },{ "label": "Approved", "value": 1 },{ "label": "Rejected", "value": 2 }];
    this.getAllUserPartners();
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
   this.getAllUserPartners();
  //  this.getNotificationListCount(this.pageCount, this.rowsPerPage);
  }

  setFilter(){
    this.getAllUserPartners();
  }

  resetFilter(){
    
    this.creationstartDate = "";
    this.creationendDate = "";
    this.selectedStatus = "";
   //  this.paginator.changePage(0);
    this.getAllUserPartners();
    // this.getNotificationListCount(this.pageCount, this.rowsPerPage);
 }

 getAllUserPartners(){
    let data ={
      "creationstartDate": this.creationstartDate,
      "creationendDate": this.creationendDate,
      "status": this.selectedStatus,
    }
    this.searchLoader = true;
    this.partnerService.getAllUserPartners(data).subscribe(
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
    this.mentor_req_id = mentor.upartner_id;
    this.user_id = mentor.user_id;
    this.usr_mentor_id = mentor.usr_parnter;
    this.user_name = mentor.user_dname;
    this.user_phone = mentor.user_phone;
    this.user_alt_phone = mentor.user_alt_phone;
    this.request_date = mentor.request_date;
    this.status = mentor.request_approved == 1 ? "Approved" : mentor.request_rejected == 1 ? "Rejected" : "Pending";
    this.mentor_id = mentor.partner_id;
    this.mentor_name = mentor.partner_name;
    this.mentor_user_id = mentor.partner_user_id;
    this.mentor_address = mentor.partner_address;
    this.mentor_phone = mentor.partner_phone;
    this.mentor_alt_phone = mentor.partner_alt_phone;
    this.mentor_fax = mentor.partner_fax;
    this.mentor_email = mentor.partner_email;
    this.request_by = mentor.request_by;
    this.up_user_dname = mentor.up_user_dname;
    this.up_user_email = mentor.up_user_email;
    this.up_user_id = mentor.up_user_id;
    this.up_user_phone = mentor.up_user_phone;
    
  }
  approve_reject_partner(value){
    if(value == 1){
      this.approve_status = 1;
      this.reject_status = 0;
    }else{
      this.approve_status = 0;
      this.reject_status = 1;
    }
    var data = {
      'user_id' : this.user_id,
      'upartner_id' : this.mentor_req_id,
      'request_by' : this.request_by,
      'admin_id' : localStorage.getItem('admin_id'),
      'request_approved' : this.approve_status,
      'request_rejected' : this.reject_status
    }
    this.partnerService.updateUserPartnerAproveRejectStatus(data)
      .subscribe(
        data => {
          if(data.status == 200){
            this.getAllUserPartners();
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
    this.getAllUserPartners();
  }
}

  