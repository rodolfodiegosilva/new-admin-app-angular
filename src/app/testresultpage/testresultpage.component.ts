import { Component, OnInit, Inject, Input, ViewChild, ElementRef, Pipe, PipeTransform, ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { DefaultDataService } from '../default-data.service';
import {MessageService} from 'primeng/api';
//import { ClassificationsService }  from '../classfications.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
//import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { TestcreateService } from '../test-create-page/testcreate.service';
//import { ManageuserService } from '../manageuser/manageuser.service';
import * as moment from 'moment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Location } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AdminprofileService } from '../adminprofilepage/adminprofile.service';
import { TimelineService } from '../timeline.service';
import Swal from 'sweetalert2';
import { ContentuploadmangeService } from '../contntuploadmanage/contentuploadmange.service';
declare var $: any;
@Component({
  selector: 'app-testresultpage',
  templateUrl: './testresultpage.component.html',
  styleUrls: ['./testresultpage.component.css'],
  providers: [MessageService, DefaultDataService, TestcreateService, AdminprofileService, TimelineService, ContentuploadmangeService],
})
export class TestresultpageComponent implements OnInit {
  @Input() name: string;
  Check_admin_id : any;
  inst_id: any;
  testSession: any;
  admintype_id: any;
  domainAndApp: any;
  Check_user_id:any;
  filesUrl: any;
  angularRoute: any;
  nowurl: any;
  firstParam: any;
  test_id: any;
  data: any;
  testDetails: any;
  /**use for get total test users */
  totalTestUsers: any;
  totalTestUsersLength : number;
  testTitle: any;
  testDesc: any;
  totalUsers: any;
  test_start_datetime: any;
  test_end_datetime: any;
  qnsDetails: any;
  question_marks: any;
  atmQnsCnt: any;
  test_duration: any;
  timeTaken: any;
  test_total_ques: any;
  userProfile: any;
  user_dname: any;
  course_sname: any;
  inst_name: any;
  class_sname: any;
  totalMarksSc: any;
  totalAssgnedQnsTothisTest: any;
  crrctAnsQnsCount: any;
  incrrctAnsQnsCount: any;
  asgnSTLabelA: any;
  asgnSTLabelB: any;
  asgnSTLabelC: any;
  asgnSTLabelD: any;
  response: any;
  incrtGrdLabelA: any;
  incrtGrdLabelB: any;
  incrtGrdLabelC: any;
  incrtGrdLabelD: any;
  crtGrdLabelA: any;
  crtGrdLabelB: any;
  crtGrdLabelC: any;
  crtGrdLabelD: any;
  lesson_id: any =[];
  discFeedbackstypes: any =[];
  discFeedbacks: any = [];
  disc_id_report: any;
  timeline_disc_id_report: any;
  disc_feedback_id: any;
  desc_feedback: any = '';
  id_fdbaktyp_desc: any = 12;
  column : string;
  /* tcolumn varible is use for column name for reward table */
  tcolumn : string;
  /* reward_type varible is use for check the type is refer, rate, review.... */
  reward_type : string;
  /* type varible is use for check the type is content, discus, test.... */
  type : string;
  timeline_action_id:any = '';
  timeline_contant_name:any= '';
  rate_timeline_id: any;
  rating_val:any;
  attendedTestUser: any = [];
  test_holder = false;
  test_details = false;
  subject_details = false;
  marks_details = false;
  public show = false;
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private _defaultDataService: DefaultDataService,
    private _router: Router,
    private messageService: MessageService,
    private _activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private loc: Location,
    //private spinnerService              : Ng4LoadingSpinnerService,
    public sanitizer: DomSanitizer,
    public _testcreateService: TestcreateService,
    public _adminprofileService: AdminprofileService,
    private _timelineService: TimelineService,
    private _contentuploadmangeService: ContentuploadmangeService
  ) {

   }

  ngOnInit() {
    this.angularRoute = this.loc.path();
    this.nowurl = window.location.href;
    this.domainAndApp = this.nowurl.replace(this.angularRoute, '');

    this.Check_admin_id  = localStorage.getItem('admin_id');
    this.inst_id = localStorage.getItem('inst_id');
    this.admintype_id = localStorage.getItem('admintype_id');
 
    this.testSession = localStorage.getItem('testSession');
    if (this.Check_admin_id == null) {
      this._router.navigate(['/']);
    }
    this.firstParam = this._activatedRoute.paramMap
    .subscribe(params => { 
      this.test_id = params.get('test_id'); 
      this.Check_user_id = params.get('user_id');
    });
    this.getSingleTest();
    this.getQuestionsAnsForTestAttend();
    this.getTestresultAggregation();
    this.getUserProfile();
    this.getGradesforCharts();
  }
  public pieChartLabels: string[] = ['correct Answer', 'Wrong Answers', 'skip questions'];
  public pieChartData: number[] = [15, 5, 5];
  public pieChartType = 'pie';

  // events
  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }
  getSingleTest() {
    this.data = {
      'inst_id' : this.inst_id,
      'test_id' : this.test_id,
      'user_id' : this.Check_user_id
    };
    //console.log('data',this.data);
    this._testcreateService.getSingleTest(this.data).subscribe(
        data => {
          {
            this.testDetails = data.response;
            var totalTestUsers = data.totalUsers;
            this.totalTestUsers = totalTestUsers.filter(user => user['is_test_completed'] == 1);
            this.totalTestUsersLength = this.totalTestUsers.length;
            console.log(this.totalTestUsers);
            this.testTitle = this.testDetails.map(function(a: any) {return a['test_title']; });
            this.testDesc = this.testDetails.map(function(a: any) {return a['test_desc']; });
            this.totalUsers = data.totalUsers;
            this.totalUsers = this.totalUsers.map(function(a: any) {return a['total']; });
            this.test_start_datetime = this.testDetails.map(function(a: any) {return a['test_start_datetime']; });
            this.test_end_datetime = this.testDetails.map(function(a: any) { return a['test_end_datetime']; });
           this.test_total_ques = this.testDetails.map(function(a: any) { return a['test_total_ques']; });
           this.lesson_id = this.testDetails.map(function(a: any) { return a['lesson_id']; });
            //this.d_hrs = this.testDetails.map(function(a:any) {return a["d_hrs"];});
           // this.d_mnts = this.testDetails.map(function(a:any) {return a["d_mnts"];});
            //this.d_sec = this.testDetails.map(function(a:any) {return a["d_sec"];});
            //this.d_total_sec = this.testDetails.map(function(a:any) {return a["d_total_sec"];});
           // this.showTimer(this.d_total_sec,this.d_hrs,this.d_mnts,this.d_sec,this.isPaused);
          }

        },
        error => {}
    );
  }
  getQuestionsAnsForTestAttend() {
    this.data = {
      'inst_id' : this.inst_id,
      'test_id' : this.test_id,
      'user_id' : this.Check_user_id,
      'filesUrl' : this.filesUrl
    };
    //console.log('klsajdflsd',this.data);
    this._testcreateService.getQuestionsAnsForTestAttend(this.data).subscribe(
      data => {
        {this.qnsDetails = data.questions;
          console.log('test dets', this.qnsDetails);
        }
        this.question_marks = data.totalMarks;
        this.totalMarksSc = data.totalMarksSc;
        //this.showCounter = true;
        //console.log('surendra hiiii ', data);
        for(let data of this.qnsDetails){
          if(data.question_id != null){
            this.getRatingCount('question_id',data.question_id,data.timeline_id);
            this.getRatingAverage('question_id',data.question_id,data.timeline_id);
            this.getUserRating('question_id',data.question_id,data.timeline_id);
          }
        }
      },
      error => {}
    );
  }
  showDetails(item){
    this.test_holder = this.test_details = this.subject_details = this.marks_details = false;
    this[item] = !this.show;
  }
  hideDetails(item){
    this.show = false;
    this[item] = this.show;
  }
  getTestresultAggregation() {
    this.data = {
      'inst_id' : this.inst_id,
      'test_id' : this.test_id,
      'user_id' : this.Check_user_id
    };
    //console.log('aggregation == ', this.data);
    this._testcreateService.getTestresultAggregation(this.data).subscribe(
      data => {
        {
          this.atmQnsCnt = data.atmQnsCnt.length;
          this.test_duration = data.getTestduration.test_duration;
          this.timeTaken = data.timeTaken;
        }
        //console.log('timeTaken = ', data.timeTaken);
      },
      error => {}
    );
  }
  getUserProfile() {
    this.data = {
      'inst_id' : this.inst_id,
      'user_id' : this.Check_user_id
    };
    this._adminprofileService.getUserProfile(this.data).then(
     (data: any)   => {
       console.log("get user profile data",data);
       {this.userProfile = data; }
        this.user_dname = this.user_dname.map(function(a) { return a['user_dname']; });
        this.class_sname = this.userProfile.map(function(a) { return a['class_sname']; });
        this.course_sname = this.userProfile.map(function(a) { return a['course_sname']; });
        this.inst_name = this.userProfile.map(function(a) { return a['inst_name']; });
      },
     error  => {}
    );
}
getGradesforCharts() {
  this.data = {
    'inst_id'   : this.inst_id,
    'test_id'   : this.test_id,
    'user_id'   : this.Check_user_id,
    'lesson_id' : this.lesson_id
  };
  this._testcreateService.getGradesforCharts(this.data).subscribe(
    data => {
      { this.response = data; }
        if (data.attemptedQnsCount) {
          this.asgnSTLabelA = this.asgnSTLabelB = this.asgnSTLabelC = this.asgnSTLabelD = 0;
          for (const qnsGrd of data.attemptedQnsCount) {
            if (qnsGrd.question_grade == 1) {
              this.asgnSTLabelA = qnsGrd.count;
            }
            if (qnsGrd.question_grade == 2) {
              this.asgnSTLabelB = qnsGrd.count;
            }
            if (qnsGrd.question_grade == 3) {
              this.asgnSTLabelC = qnsGrd.count;
            }
            if (qnsGrd.question_grade == 4) {
              this.asgnSTLabelD = qnsGrd.count;
            }
          }
        }
        if (data.crrctAnsQnsCount) {
        for (const crtGrd of data.crrctAnsQnsCount) {
          if (crtGrd.question_grade == 1) {
            this.crtGrdLabelA = crtGrd.count;
          }
          if (crtGrd.question_grade == 2) {
            this.crtGrdLabelB = crtGrd.count;
          }
          if (crtGrd.question_grade == 3) {
            this.crtGrdLabelC = crtGrd.count;
          }
          if (crtGrd.question_grade == 4) {
            this.crtGrdLabelD = crtGrd.count;
          }
        }
      }
        if (data.incrrctAnsQnsCount) {
          for (const icrtGrd of data.incrrctAnsQnsCount) {
            if (icrtGrd.question_grade == 1) {
              this.incrtGrdLabelA = icrtGrd.count;
            }
            if (icrtGrd.question_grade == 2) {
              this.incrtGrdLabelB = icrtGrd.count;
            }
            if (icrtGrd.question_grade == 3) {
              this.incrtGrdLabelC = icrtGrd.count;
            }
            if (icrtGrd.question_grade == 4) {
              this.incrtGrdLabelD = icrtGrd.count;
            }
          }
        }
        this.showCharts();
    },
    error => {}
  );
}
showCharts() {
  this.totalAssgnedQnsTothisTest = {
    labels: ['A', 'B', 'C', 'D'],
    datasets: [
        {
            data: [this.asgnSTLabelA, this.asgnSTLabelB, this.asgnSTLabelC, this.asgnSTLabelD],
            backgroundColor: [ '#2ECC40',  '#FFDC00',    '#01FF70',   '#FF851B'  ],
          hoverBackgroundColor: ['#2ECC40',  '#FFDC00',   '#01FF70',    '#FF851B' ]
        }],
    };
    this.crrctAnsQnsCount  = {
      labels: ['A', 'B', 'C', 'D'],
      datasets: [
          {
              data: [this.crtGrdLabelA, this.crtGrdLabelB, this.crtGrdLabelC, this.crtGrdLabelD],
              backgroundColor: [ '#2ECC40', '#FFDC00', '#01FF70', '#FF851B' ],
              hoverBackgroundColor: ['#2ECC40',  '#FFDC00',   '#01FF70',   '#FF851B' ]
          }],
    };
    this.incrrctAnsQnsCount  = {
      labels: ['A', 'B', 'C', 'D'],
      datasets: [
          {
              data: [this.incrtGrdLabelA, this.incrtGrdLabelB, this.incrtGrdLabelC, this.incrtGrdLabelD],
              backgroundColor: [ '#2ECC40',  '#FFDC00',    '#01FF70',   '#FF851B'  ],
          hoverBackgroundColor: ['#2ECC40',  '#FFDC00',   '#01FF70',    '#FF851B' ]
          }],
    };
  }
  colExpand(id,object_type,object_id: any, timeline_id: any,object_name){
    $('.collapse').collapse('hide');
    this.getReport(object_type,object_id,timeline_id,object_name);
    $(id).collapse('show');
  }
  getReport(type: any,id: any, timeline_id: any,objtyp_name) {
    this.data = {
      'inst_id': this.inst_id,
      'user_id': this.Check_user_id,
      'id'      : id,
      'type'    : type,
      'timeline_id': timeline_id,
      'objtyp_name': objtyp_name
    };
    this.disc_id_report = id;
    this.timeline_disc_id_report = timeline_id;
    this._adminprofileService.getReport(this.data).subscribe(
      data => {
        this.discFeedbackstypes = data.feedbacktypes;
        this.discFeedbacks = data.feedbacks;
      },
      error => { }
    );
  }
  reportOnObject(Report: NgForm,type,object_name) {
    // if(Report.value.feedback_desc ==''){
    //   return
    // }
    let data = {
      'inst_id': this.inst_id,
      'user_id': this.Check_user_id,
      'fdbaktyp_id': Report.value.fdbaktyp_id,
      'feedback_desc': Report.value.feedback_desc,
      'timeline_id'   : null,
      'is_general': 0,
      'is_reported': 1,
      'id': Report.value.report_disc_id,
      'type': type
    };
    // console.log(data);
    // return;
    if(Report.valid){
      this._adminprofileService.reportOnObject(data).subscribe(
        data => {
          this.timeline_action_id = data.id;
          this.reward_type = "report";
          if(type == 'question_id'){
            this.timeline_contant_name = 'AC_REPORT_QUES';
            this.tcolumn = "reward_qustion_id";
            this.column = "reward_report_id";
            this.type = 'question'
          }
         
          
          if(data.response == 'Blocked'){
            
            var blockedData= {
              'inst_id': this.inst_id,
              'question_id' : Report.value.report_disc_id
            }
            if(type == 'question_id'){
              this._adminprofileService.blockedQuestion(blockedData).subscribe(
                data => {
                  this.desc_feedback = '';
                  Swal.fire(
                    'Error!',
                    'This record has been blocked!',
                    'error'
                  );
                },
                error => { }
              );
            }            
          }else{
            this.createReward();
            { this.disc_feedback_id = data.id; }
            this.desc_feedback = '';
          }
          this.getReport(type,this.disc_id_report,this.timeline_disc_id_report,object_name);
          // Report.resetForm();
          // this.TimelineForDiscReport();
        },
        error => { }
      );
    }
  }
  // deleteReport(feedback_id,question_id){
  //   let data = {
  //     'feedback_id' : feedback_id
  //   }
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'You will not be able to recover this record!',
  //     type: 'warning',
  //     // showCancelButton: true,
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, delete it!',
  //     cancelButtonText: 'No, keep it'
  //   }).then((result) => {
  //     if (result.value) {
  //       this._contentuploadmangeService.deleteReport(data)
  //       .then((data: any) => {
  //       if(data.status == 200){
  //         Swal.fire(
  //           'Success!',
  //           data.message,
  //           'success'
  //         );
  //         this.getReport('question_id',question_id,'','Question');				
  //       }else{
  //         Swal.fire(
  //           'Error!',
  //           data.message,
  //           'error'
  //         );			   
  //       }
  //     },error => {
  //       });				
  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //       Swal.fire(
  //         'Cancelled',
  //         'Your record is safe :)',
  //         'error'
  //       )
  //     }
  //   })
  // }
  createReward(){
    this.data = {
      'inst_id': this.inst_id,
      'column_id': this.timeline_action_id,
      'user_id': this.Check_user_id,
      'activity': this.timeline_contant_name,
      'tcolumn': this.tcolumn,
      'column': this.column,
      'reward_type':this.reward_type,
      'type': this.type
    };
    this._adminprofileService.createReward(this.data).subscribe(
      data => {
        { this.response = data.respnse; }
      },
      error => { }
    );
  }

  rating(question_id){
    return $("#ratval_"+question_id).val()==undefined || $("#ratval_"+question_id).val()==''?"0":$("#ratval_"+question_id).val();
  }

  ratingAvg(question_id){
    return $("#avgrate_"+question_id).val()==undefined || $("#avgrate_"+question_id).val()==''?"0":$("#avgrate_"+question_id).val();
  }

  getUserRating(type,id,timeline_id){
    var body = {
      "inst_id": this.inst_id,
      "type": type,
      "id": id,
      "user_id":this.Check_user_id,
      "timeline_id":null
    }
     this._timelineService.getUserRating(body).subscribe((data: any)=>{
      $("#ratval_"+id).val(data.response.rating_val);
    })
  }

  getRatingAverage(type,id,timeline_id){
    var body = {
      "inst_id": this.inst_id,
      "type": type,
      "id": id,
      "timeline_id":null
    }
     this._timelineService.getRatingAverage(body).subscribe((data: any)=>{
      $("#avgrate_"+id).val(data.response.average_rating); 
    })
  }

  getRatingCount(type,id,timeline_id){
    var body = {
      "inst_id": this.inst_id,
      "type": type,
      "id": id,
      "user_id":this.Check_user_id,
      "timeline_id":timeline_id
    }
     this._timelineService.getRatingCount(body).subscribe((data: any)=>{
      $("#rateid_"+id).html(data.response.rating_count); 
    })
  }
  rateForObject(event: any, id: any, timeline_id: any,column) {
    this.rating_val = event.target.title;
    // return;

    this.data = {
      'inst_id': this.inst_id,
      'user_id': this.Check_user_id,
      'rating_val':this.rating_val,
      'timeline_id':null,
      'column': column,
      'id': id
      // "rating_type_id" : event.target.title,
      
    };
    // this.timeline_src_id = timeline_id;
    // this.timeline_discus_id = id;
    this._adminprofileService.rateForObject(this.data).subscribe(
      data => {
        { this.response = data.response; }
        if(data.response[0].rating_id){
          this.rate_timeline_id = data.response[0].rating_id;
          this.timeline_action_id = this.rate_timeline_id;
          this.reward_type = 'rate';
          // this.timeline_contant_name = 'AC_RATING_DIS';
          // if(column == 'discus_id'){
          //   this.timeline_contant_name = 'AC_REFER_DIS';
          // }
          if(column == 'question_id'){
            this.timeline_contant_name = 'AC_RATE_QUES';
            this.tcolumn = 'reward_qustion_id';
            this.column = 'reward_rating_id';
            this.type = "question"; 
          }
          this.createReward();
        }
        this.getRatingAverage(column,id,timeline_id);
        // this.getTimelineObjects();
      },
      error => { }
    );
  }
  showAttendedStudents(){
    console.log(this.totalTestUsers);
    // var attendedUser = [];
    this.attendedTestUser = this.totalTestUsers.map(function (user:string) {
        return user['user_dname'];
    });
    console.log(this.attendedTestUser);
    console.log("mouse hover event call");
  }
}
