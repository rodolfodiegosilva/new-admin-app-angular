import { Component, OnInit, Inject, Input,ViewChild,ElementRef,Pipe, PipeTransform,ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup,FormControl, Validators, NgForm } from '@angular/forms';
import { DefaultDataService } from '../default-data.service';
import {MessageService} from 'primeng/api';
import { ClassificationsService }  from '../classfications.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MeetcreateService } from '../meet-create-page/meetcreate.service'; 
import { ManageuserService } from '../manageuser/manageuser.service';
import * as moment from 'moment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Location } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { QuestiondetailedviewService } from '../questionsdetailedview/questiondetailedview.service';

declare let $: any;
@Component({
  selector: 'app-managemeet',
  templateUrl: './managemeet.component.html',
  styleUrls: ['./managemeet.component.css'],
  providers: [MessageService,DefaultDataService,ManageuserService,ClassificationsService,Ng4LoadingSpinnerService,MeetcreateService,QuestiondetailedviewService],
})
export class ManagemeetComponent implements OnInit {
  @ViewChild('assignConfirm') assignConfirm: ElementRef;
  @ViewChild('unassignConfirm') unassignConfirm: ElementRef;
  @ViewChild('assignQnsConfirm') assignQnsConfirm: ElementRef;
  @ViewChild('unassignQnsConfirm') unassignQnsConfirm: ElementRef;
  @ViewChild('rescheduledate') rescheduledate: ElementRef;
  @ViewChild('unassignUserConfirm') unassignUserConfirm: ElementRef;
  Check_admin_id: any;
  admintype_id: any;
  inst_id: any;
  firstParam: any;
  meeting_id: any ='';
  data: any;
  meetDetails: any;
  titleEdit: boolean = false;
  descEdit: boolean = false;
  oldvalue: any;
  title_test: any;
  desc_test: any;
  response: any;
  alertmsgClass: string;
  msgSummery: string;
  alertmsgSucc: string;
  sdntEdit: boolean;
  edntEdit: boolean;
  showSubBtn: boolean;
  oldStart: any;
  oldEnd: any;
  yr: any;
  dt: any;
  mt: any;
  hr: any;
  mn: any;
  teststart_datetime: any;
  testend_datetime: any;
  testres_declared_dates: any;
  requData: any;
  is_test_nmarks          : number;
  showResDecDate: boolean;
  test_is_res_declared_admin: number;
  showDecRes: boolean;
  act_result_date: any;
  textonModel: string;
  is_cancel_val: any;
  showBtnTxt: string;
  is_delete_val: number;
  testend_datetimes : any; 
  teststart_datetimes : any;
  sminDate : any;
  showUsers : boolean;
  template : any;
  test_res_declared_date : any;
  deleted_date : any;
  seltddltList : any;
  cancelled_date : any;
  allUsers: any = [];
  assignedUsers: any = [];
  selectedValues:any = [];
  selectedUserType: any;
  selectedUsercountry: any;
  selectedDisplayNames: any;
  selectedSchoolNames: any;
  selectedClasses: any;
  selectedStates: any;
  selectedCities: any;
  userType: any =[];
  allCities: any= [];
  cityNames: any= [];
  stateNames: any= [];
  allStates: any= [];
  errorMessage: any= [];
  userCountries: any= [];
  haveModerator: boolean = false;
  countries: any= [];
  Schoolname: any= [];
  sNames: any= [];
  Classname: any= [];
  cNames: any= [];
  userDname: any= [];
  dNames: any= [];
  type3Show: any = false;
  testtype_id: any = '';
  selectedAssignedUsers: any = [];
  selectedQuestionUsers_1: any = [];
  selectedQuestionUsers_2: any = [];
  selectedQuestionUsers_3: any = [];
  selectedQuestionUsers_4: any = [];
  selectedQuestionUsers_5: any = [];
  selectedUsersunassign: any = [];
  totalQuestions: any;
  alqLabelA: any = 0;
  alqLabelB: any = 0;
  alqLabelC: any = 0;
  alqLabelD: any = 0;
  //alqLabelE : any = 0;
  asgnSTLabelA: any = 0;
  asgnSTLabelB: any = 0;
  asgnSTLabelC: any = 0;
  asgnSTLabelD: any = 0;
  totalAssgnedQnsTothisTest: any;
  totalAssgnedQnsToAnyTest: any;
  questionsLength: any = 0;
  selectedQuestionIds: any = [];
  asgnATLabelA: any;
  asgnATLabelB: any;
  asgnATLabelC: any;
  asgnATLabelD: any;
  //asgnATLabelE: any;
  totalAttemptedQnsToAnyTest: any;
  attmptdLabelA: any = 10;
  attmptdLabelB: any = 1;
  attmptdLabelC: any = 1;
  attmptdLabelD: any = 1;
  //attmptdLabelE: any = 1;
  crtGrdLabelE: any = 1;
  crtGrdLabelD: any = 10;
  crtGrdLabelC: any = 1;
  crtGrdLabelB: any = 1;
  crtGrdLabelA: any = 1;
  crrctAnsQnsCount: any;
  incrrctAnsQnsCount: any;
  //incrtGrdLabelE: any = 1;
  incrtGrdLabelD: any = 1;
  incrtGrdLabelC: any = 10;
  incrtGrdLabelB: any = 1;
  incrtGrdLabelA: any = 1;
  questions: any;
  qunsReq: any ;
  showRes: any;
  country_ids: any;
  course_values: any;
  class_ids: any;
  subject_ids: any;
  assignedQnsIds: any = [];
  selectedlessonList: any =[];
  assignedQuestions: any =[];
  selectedUsers: any = [];
  assigndata: any;
  classf_id: any;
  unassigndata: any;
  assigned_user_id: any;
  sectdusersQns: number;
  assignedUserstoQns: any = [];
  user_id: any;
  allLessons: any[];
  lessnsList: any[];
  lessData: any;
  qnsType: any = [];
  qnsTypeList: any =[];
  seltdLesList: Array<any> = [];
  seltdqntList: Array<any> = [];
  selectedOwners: Array<any> = [];
  seltdqnsvList: Array<any> = [];
  seltdqnGrdList: Array<any> = [];
  seltdqnMrksList: Array<any> = [];
  seltdqnnMrksList: Array<any> = [];
  ownersList: any = [];
  qnsGrade: any = [];
  qnsVerify: any = [];
  marksList: any = [];
  nmarksList: any = [];
  assignedQnsNum: any;
  total_ques: any;
  selectedQnid: any;
  userTypeNeme:any;
  removeUserId:any = '';
  removeQuestionIds:any = '';
  sectdQns: any;
  location: any;
  ansData: any;
  answers: any =[];
  // mmlabs
  totalUsers:any = [];
  index:any = '';
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
    private _meetcreateService          : MeetcreateService,
    private _manageuserService          : ManageuserService,
    public sanitizer                    : DomSanitizer,
    private _questiondetailedviewService : QuestiondetailedviewService,
  ) { 
    this.userType = [
      { "value": 1, "label": "Student" },
      { "value": 2, "label": "Faculty" },
      { "value": 3, "label": "Parent" },
      { "value": 4, "label": "School" }
    ];
    this.userTypeNeme = {
      "1": "Student",
      "2": "Faculty",
      "3": "Parent",
      "4": "School"
    }
this.ownersList = [
      { "label": "Admin", "value": "1" },
      { "label": "User", "value": "2" }
    ];
    this.qnsGrade = [
      { "label": "A", "value": "1" },
      { "label": "B", "value": "2" },
      { "label": "C", "value": "3" },
      { "label": "D", "value": "4" }

    ];
    this.qnsVerify = [
      { "label": "No", "value": 0 },
      { "label": "Yes", "value": 1 }
    ];
  }
  checkedAll($event){
    
    if($event == true){
      for(let user of this.assignedUsers){
        this.selectedUsersunassign.push(user.user_id);
      }
    }else{
      this.selectedUsersunassign = [];
    }
  }
  checkedAllUser($event){
    if($event == true){
      for(let user of this.allUsers){
        this.selectedUsers.push(user.UserId);
      }
    }else{
      this.selectedUsers = [];
    }
  }
  ngOnInit() {
    this.Check_admin_id = localStorage.getItem('admin_id');
    this.admintype_id = localStorage.getItem('admintype_id');
    this.inst_id = localStorage.getItem('inst_id');   
    if(this.Check_admin_id==null){
      this._router.navigate(['/']);
    }
    
    this.firstParam = this._activatedRoute.paramMap
    .subscribe(params => { this.meeting_id = params.get('meeting_id'); });
    this.getSingleTest();

    this.dnameGroup();
    this.cnameGroup(this.inst_id);
    this.getAllStates();
    this.getAllCities();
    this.getQuestionsMarks();
    this.getQuestionsType();
    this.getQuestionsnegMarks();
    this.getQuestionsMarks();
    this.getAllRegisteredUsers();
  }
   // For checked test types ends
  // For getting user display name starts
  showQuestions() {
      this.type3Show = true;
      this.setSelectedUsersIds();
      this.getQuestions();
    

  }
  // Assign Questions for Test Starts
  AssignQnsforConfirm(qnid: any) {
    //console.log(this.selectedqnsassign);  
    $(this.assignQnsConfirm.nativeElement).modal('show');
    if (this.testtype_id == 4 || this.testtype_id == 2) {
      if (this.assignedQnsIds.length >= this.total_ques) {
        this.showSubBtn = false;
        this.textonModel = 'You can only assign ' + this.total_ques + ' questions to this test';
      } else {
        this.showSubBtn = true;
        this.textonModel = 'Do you really want to assign this question to this test?';
        this.selectedQnid = qnid;
      }
    } else {
      if(this.selectedUsersunassign.length>0){
        this.showSubBtn = true;
        this.textonModel = 'Do you really want to assign this question to this test?';
        this.selectedQnid = qnid;
      }else{
        this.showSubBtn = false;
        this.textonModel = "Please select user's to assign";
      }
    }

  }
  getQuestionsMarks() {
    var marksData = {
      "iznst_id": this.inst_id
    }
    this._questiondetailedviewService.getQuestionsMarks(marksData).subscribe(
      data => {
        { this.response = data.response; }
        for (let mrks of this.response) {
          this.marksList.push({ "label": mrks.question_marks, "value": mrks.question_marks });
        }
      },
      error => { }

    );
  }
  // For getting question marks to show in filters ends
  // For getting question neg.marks to show in filters starts
  getQuestionsnegMarks() {
    var marksData = {
      "inst_id": this.inst_id
    }
    this._questiondetailedviewService.getQuestionsnegMarks(marksData).subscribe(
      data => {
        { this.response = data.response; }
        for (let mrks of this.response) {
          this.nmarksList.push({ "label": mrks.question_nmarks, "value": mrks.question_nmarks });
        }

      },
      error => { }
    );
  }
  getAllLessons() {
    this.allLessons = [];
    this.lessnsList = [];
    this.lessData  = {
      "inst_id": this.inst_id,
      "subject_id": this.subject_ids,
      "lesson_id": this.selectedlessonList
    }
    this._classificationsService.getOnlySelectedLessons(this.lessData).subscribe(
      data => {
        { this.allLessons = data.response; }
        for (let lsns of this.allLessons) {
          this.lessnsList.push({ "label": lsns.lesson_name, "value": lsns.lesson_id });
        }
      },
      error => { }
    );
  }
  getUserName(id,i){

    if(this['selectedQuestionUsers_'+(i+1)].indexOf(id) == -1){
      this['selectedQuestionUsers_'+(i+1)].push(id);
    }else{
      return;
    }
    console.log("ssssssssssssssssssssssssss",this['selectedQuestionUsers_'+(i+1)],(i+1),id);
    for(let usr of this.dNames){
      if(this['selectedQuestionUsers_'+(i+1)].indexOf(usr.user_id) != -1){
        this.selectedAssignedUsers.push(usr);
      }
    }
  }
  removeQuestion(user_id,question_id,i){
    this.removeAssignUserConf(question_id,user_id);
    this.index = i;
  }

  checkedUserEvent(event,user_id){
    if(event){
      this.getAssignedQuestionsforTest();
    }else{
      if(this.selectedUsersunassign.length<1){
        this.assignedQuestions = [];
        return;
      }
      let i =0;
      for(let id of this.assignedQuestions){
        if(id.user_id == user_id){
           this.assignedQuestions.splice(this.assignedQuestions.indexOf(i));
        }
        i++;
      }
      return;
    }
  }
  getAssignedQuestionsforTest() {
    var getData = {
      "inst_id": this.inst_id,
      "meeting_id": this.meeting_id,
      "lesson_id": this.selectedlessonList,
      "test_type": this.testtype_id
    }
    if(this.testtype_id == 1 || this.testtype_id == 3){
      var selectedUsersunassign = this.selectedUsersunassign;
    if(selectedUsersunassign.indexOf('0') != -1){
     selectedUsersunassign.splice(selectedUsersunassign.indexOf('0'), 1);
    }
      getData['user_id'] = selectedUsersunassign[selectedUsersunassign.length-1];
      this.selectedUsersunassign =selectedUsersunassign;
      if(selectedUsersunassign.length<1){
        this.assignedQuestions = [];
        return;
      }
    }
    this.assignedQnsIds = [];
    this._meetcreateService.getAssignedQuestionsforTest(getData).subscribe(
      data => {
        { this.assignedQuestions = data.response; }
        for(let id of data.response){
          this.assignedQnsIds.push(id.question_id);
          // this.assignedQuestions.id);
        }
        console.log("sssssssssssssssssssssssss",this.assignedQuestions);
        for (let qnsGrd of data.assignedQnsThisTest) {
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
          // if(qnsGrd.question_grade==5){
          //   this.asgnSTLabelE = qnsGrd.count;          
          // }
        }
        for (let aqnsATGrd of data.getAssQnsGrdWisetoAny) {

          if (aqnsATGrd.question_grade == 1) {
            this.asgnATLabelA = aqnsATGrd.count;
          }
          if (aqnsATGrd.question_grade == 2) {
            this.asgnATLabelB = aqnsATGrd.count;
          }
          if (aqnsATGrd.question_grade == 3) {
            this.asgnATLabelC = aqnsATGrd.count;
          }
          if (aqnsATGrd.question_grade == 4) {
            this.asgnATLabelD = aqnsATGrd.count;
          }
          // if(aqnsATGrd.question_grade==5){
          //   this.asgnATLabelE = aqnsATGrd.count;            
          // }
        }
        this.showCharts();

      },
      error => { }
    );
  }
  getQuestions() {
    var selectedUsersunassign = this.selectedUsersunassign;
    if(selectedUsersunassign.indexOf('0') != -1){
     selectedUsersunassign.splice(selectedUsersunassign.indexOf('0'), 1);
    }
    this.qunsReq = {
      "inst_id": this.inst_id,
      "user_id": null,
      "selectedUsersunassign": selectedUsersunassign,
      "meeting_id": this.meeting_id,
      "contries": this.country_ids,
      "courses": this.course_values,
      "classes": this.class_ids,
      "subjects": this.subject_ids,
      "lessons": this.selectedlessonList,
      "test_type": this.testtype_id,
      "qntypes": this.seltdqntList,
      "qnGrdList": this.seltdqnGrdList,
      "owners": this.selectedOwners,
      "marks": this.seltdqnMrksList,
      "nmarks": this.seltdqnnMrksList,
      "verify": this.seltdqnsvList,
    }
    // this.spinnerService.show();
    //return false;
    this._questiondetailedviewService.getQuestionsTest(this.qunsReq).subscribe(
      data => {
        
        { this.questions = data.questions;
          this.selectedAssignedUsers = [];
          for(let usr of this.dNames){
            if(selectedUsersunassign.indexOf(usr.user_id) != -1){
              this.selectedAssignedUsers.push(usr);
            }
          }
          if(this.testtype_id ==2 || this.testtype_id == 4){
            this.getAssignedQuestionsforTest();

          }
        if (data.questions == 0) {
          this.showRes = false;
          // this.spinnerService.hide();
        } else {
          this.showRes = true;
          // this.spinnerService.hide();
        }
        if (data.getQnsGrdWise) {

          for (let qnsGrd of data.getQnsGrdWise) {
            if (qnsGrd.question_grade == 1) {
              this.alqLabelA = qnsGrd.count;
            }
            if (qnsGrd.question_grade == 2) {
              this.alqLabelB = qnsGrd.count;
            }
            if (qnsGrd.question_grade == 3) {
              this.alqLabelC = qnsGrd.count;
            }
            if (qnsGrd.question_grade == 4) {
              this.alqLabelD = qnsGrd.count;
            }
          }
        }
        this.showCharts();
        }}
    );
  }
  showCharts() {
    this.totalQuestions = {
      labels: ['A', 'B', 'C', 'D'],
      datasets: [
        {
          data: [this.alqLabelA, this.alqLabelB, this.alqLabelC, this.alqLabelD],
          backgroundColor: ["#2ECC40", "#FFDC00", "#01FF70", "#FF851B"],
          hoverBackgroundColor: ["#2ECC40", "#FFDC00", "#01FF70", "#FF851B"]
        }],
    };
    this.totalAssgnedQnsTothisTest = {
      labels: ['A', 'B', 'C', 'D'],
      datasets: [
        {
          data: [this.asgnSTLabelA, this.asgnSTLabelB, this.asgnSTLabelC, this.asgnSTLabelD],
          backgroundColor: ["#2ECC40", "#FFDC00", "#01FF70", "#FF851B"],
          hoverBackgroundColor: ["#2ECC40", "#FFDC00", "#01FF70", "#FF851B"]
        }],
    };

    this.totalAssgnedQnsToAnyTest = {
      labels: ['A', 'B', 'C', 'D'],
      datasets: [
        {
          data: [this.asgnATLabelA, this.asgnATLabelB, this.asgnATLabelC, this.asgnATLabelD],
          backgroundColor: ["#2ECC40", "#FFDC00", "#01FF70", "#FF851B"],
          hoverBackgroundColor: ["#2ECC40", "#FFDC00", "#01FF70", "#FF851B"]
        }],
    };
    this.totalAttemptedQnsToAnyTest = {
      labels: ['A', 'B', 'C', 'D'],
      datasets: [
        {
          data: [this.attmptdLabelA, this.attmptdLabelB, this.attmptdLabelC, this.attmptdLabelD],
          backgroundColor: ["#2ECC40", "#FFDC00", "#01FF70", "#FF851B"],
          hoverBackgroundColor: ["#2ECC40", "#FFDC00", "#01FF70", "#FF851B"]
        }],
    }
    this.crrctAnsQnsCount = {
      labels: ['A', 'B', 'C', 'D'],
      datasets: [
        {
          data: [this.crtGrdLabelA, this.crtGrdLabelB, this.crtGrdLabelC, this.crtGrdLabelD],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#800080"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#800080"]
        }],
    }
    this.incrrctAnsQnsCount = {
      labels: ['A', 'B', 'C', 'D'],
      datasets: [
        {
          data: [this.incrtGrdLabelA, this.incrtGrdLabelB, this.incrtGrdLabelC, this.incrtGrdLabelD],
          backgroundColor: ["#2ECC40", "#FFDC00", "#01FF70", "#FF851B"],
          hoverBackgroundColor: ["#2ECC40", "#FFDC00", "#01FF70", "#FF851B"]
        }],
    }

  }
  setSelectedUsersIds(){

    this.selectedQuestionUsers_1 = this.selectedUsersunassign;
    this.selectedQuestionUsers_2 = this.selectedUsersunassign;
    this.selectedQuestionUsers_3 = this.selectedUsersunassign;
    this.selectedQuestionUsers_4 = this.selectedUsersunassign;
    this.selectedQuestionUsers_5 = this.selectedUsersunassign;
  }
  dnameGroup() {
    this._manageuserService.dnameGroupTest(this.inst_id)
    .then((data: any)=> {
        { this.dNames = data; }
        for (let usr of this.dNames) {
          this.userDname.push({ "label": usr.user_dname, "value": usr.user_dname });
        }
      },
      error => { }
    );
  }
  // For getting user display name ends
  // For getting user class starts
  cnameGroup(id) {
    this._manageuserService.cnameGroup(id)
    .then((data: any) => {
        { this.cNames = data; }
        for (let usr of this.cNames) {
          this.Classname.push({ "label": usr.user_class, "value": usr.user_class });
        }
      },
      error => { }
    );
  }
  // For getting user class ends
  // For getting user school starts
  snameGroup(id) {
    this._manageuserService.snameGroup(id)
    .then((data: any) => {
        { this.sNames = data; }
        for (let usr of this.sNames) {
          this.Schoolname.push({ "label": usr.schoolNames, "value": usr.user_school });
        }
      },
      error => { }
    );
  }
  // For getting user school ends
  // For getting getuserCountries starts
  getuserCountries() {
    this._defaultDataService.getcountryNamesforProfile().subscribe(
      data => {
        { this.countries = data; }
        for (let ctry of this.countries) {
          this.userCountries.push({ "label": ctry.cntry_name, "value": ctry.cntry_id });
        }
      },
      error => this.errorMessage = error
    );
  }
  // For getting getuserCountries ENDS
  // For getting states starts
  getAllStates() {
    this._defaultDataService.getAllStates().subscribe(
      data => {
        { this.allStates = data; }
        for (let ast of this.allStates) {
          this.stateNames.push({ "label": ast.state_name, "value": ast.state_id });
        }
      },
      error => { }
    );
  }
  creatQuestionPaper(data: any) {
    //console.log('all data = ',data);
    this._meetcreateService.creatQuestionPaper(data).subscribe(
      data => {
        { this.response = data; }
        this.alertmsgClass = 'success';
        this.msgSummery = 'Success';
        this.alertmsgSucc = 'Assigned Successfully!';
        this.showSuccess();
        //console.log(data);
      },
      error => { }
    );
  }
  AssignQnsforTest() {
    this.assigndata = {
      "inst_id": this.inst_id,
      "meeting_id": this.meeting_id,
      "question_id": this.selectedQnid,
      "assigned_by_user": null,
      "assigned_by_admin": this.Check_admin_id,
      "test_type": this.testtype_id,
      "qstnclsf_clsf_id": this.classf_id
    }

    if (this.testtype_id == 3 ||this.testtype_id == 1) {
      var selectedUsersunassign = this.selectedUsersunassign;
    if(selectedUsersunassign.indexOf('0') != -1){
     selectedUsersunassign.splice(selectedUsersunassign.indexOf('0'), 1);
    }
      this.assigndata = {
        "inst_id": this.inst_id,
        "meeting_id": this.meeting_id,
        "question_id": this.selectedQnid,
        "assigned_by_user": null,
        "assigned_by_admin": this.Check_admin_id,
        "test_type": this.testtype_id,
        "user_id": selectedUsersunassign,
        "qstnclsf_clsf_id": this.classf_id
      }
      this.creatQuestionPaper(this.assigndata);
    }
    this._meetcreateService.AssignQnsforTest(this.assigndata).subscribe(
      data => {
        { this.response = data.response }
        if (data.response == 1) {
          this.assignedQnsNum++;
          // this.alertmsgClass = 'success';
          // this.msgSummery = 'Success';
          // this.alertmsgSucc = 'Question no. ' + this.selectedQnid + ' is assigned to test no. ' + this.meeting_id + ' Successfully!';
          // this.showSuccess();
          if (this.testtype_id == 3 || this.testtype_id == 1 ) {
            let i =0;
      // for(let id of this.assignedQuestions){
      //   if(id.user_id == selectedUsersunassign[selectedUsersunassign.length-1]){
      //      this.assignedQuestions.splice(this.assignedQuestions.indexOf(i));
      //   }
      //   i++;
      // }
      this.assignedQuestions = [];
            this.getAssignedUserstoTest();
            this.showQuestions();
          }
          this.getAssignedQuestionsforTest();
          if (data.assignedQnsThisTest) {
            this.asgnSTLabelA = this.asgnSTLabelB = this.asgnSTLabelC = this.asgnSTLabelD = 0;
            for (let qnsGrd of data.assignedQnsThisTest) {
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
          if (data.getAssQnsGrdWisetoAny) {
            this.asgnATLabelA = this.asgnATLabelB = this.asgnATLabelC = this.asgnATLabelD = 0;
            for (let aqnsATGrd of data.getAssQnsGrdWisetoAny) {

              if (aqnsATGrd.question_grade == 1) {
                this.asgnATLabelA = aqnsATGrd.count;
              }
              if (aqnsATGrd.question_grade == 2) {
                this.asgnATLabelB = aqnsATGrd.count;
              }
              if (aqnsATGrd.question_grade == 3) {
                this.asgnATLabelC = aqnsATGrd.count;
              }
              if (aqnsATGrd.question_grade == 4) {
                this.asgnATLabelD = aqnsATGrd.count;
              }
            }
          }
          this.showCharts();
          //console.log(data.response);
        } else {
          this.alertmsgClass = 'error';
          this.msgSummery = 'Error';
          this.alertmsgSucc = 'Question no. ' + this.selectedQnid + ' is already assigned to test no. ' + this.meeting_id + '. Please try with another!';
          this.showSuccess();
        }

        this.showQuestions();

      },
      error => { }
    );
  }
  // Assign Questions for Test Ends

  // unAssign Questions for Test Starts
  unAssignQnsforConfirm(qnid: any) {
    $(this.unassignQnsConfirm.nativeElement).modal('show');
    if (this.testtype_id == 4 || this.testtype_id == 2) {
      if (this.assignedQnsNum > this.total_ques) {
        this.showSubBtn = false;
        this.textonModel = 'You can only assign ' + this.total_ques + ' questions to this test';
      } else {
        this.showSubBtn = true;
        this.textonModel = 'Do you really want to assign this question to this test?';
        this.selectedQnid = qnid;
      }
    } else if(this.selectedUsersunassign.length<1){

      this.showSubBtn = false;
      this.textonModel = 'Please select any user';
      }else{
        this.showSubBtn = true;
        this.textonModel = 'Do you really want to assign this question to this test?';
        this.selectedQnid = qnid;

      }
  }
  unAssignQnsforTest() {
    var selectedUsersunassign = this.selectedUsersunassign;
    if(selectedUsersunassign.indexOf('0') != -1){
     selectedUsersunassign.splice(selectedUsersunassign.indexOf('0'), 1);
    }
    this.assigndata = {
      "inst_id": this.inst_id,
      "meeting_id": this.meeting_id,
      "question_id": this.selectedQnid,
      "assigned_by_user": null,
      "assigned_by_admin": this.Check_admin_id,
      "test_type": this.testtype_id,
      "user_id": selectedUsersunassign,
      "lesson_id": this.selectedlessonList
    }
    this._meetcreateService.unAssignQnsforTest(this.assigndata).subscribe(
      data => {
        { this.response = data.response }
        if (this.testtype_id == 3|| this.testtype_id ==1) {
          this.assignedQuestions =[];
          this.getAssignedUserstoTest();
          this.showQuestions();
        }
        if (data.response == 1) {
          if (data.assignedQnsThisTest) {
            this.asgnSTLabelA = this.asgnSTLabelB = this.asgnSTLabelC = this.asgnSTLabelD = 0;
            for (let qnsGrd of data.assignedQnsThisTest) {
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
              // if(qnsGrd.question_grade==5){
              //   this.asgnSTLabelE = qnsGrd.count;                 
              // }
            }
          }
          if (data.getAssQnsGrdWisetoAny) {
            this.asgnATLabelA = this.asgnATLabelB = this.asgnATLabelC = this.asgnATLabelD = 0;
            for (let aqnsATGrd of data.getAssQnsGrdWisetoAny) {

              if (aqnsATGrd.question_grade == 1) {
                this.asgnATLabelA = aqnsATGrd.count;
              }
              if (aqnsATGrd.question_grade == 2) {
                this.asgnATLabelB = aqnsATGrd.count;
              }
              if (aqnsATGrd.question_grade == 3) {
                this.asgnATLabelC = aqnsATGrd.count;
              }
              if (aqnsATGrd.question_grade == 4) {
                this.asgnATLabelD = aqnsATGrd.count;
              }
              // if(aqnsATGrd.question_grade==5){
              //   this.asgnATLabelE = aqnsATGrd.count;            
              // }
            }
          }
          this.getAssignedQuestionsforTest();
          this.showCharts();
          this.assignedQnsNum--;
          this.alertmsgClass = 'success';
          this.msgSummery = 'Success';
          this.alertmsgSucc = 'Question no. ' + this.selectedQnid + ' is unassigned for the test no. ' + this.meeting_id + ' Successfully!';
          this.showSuccess();

        } else {
          this.alertmsgClass = 'error';
          this.msgSummery = 'Error';
          this.alertmsgSucc = 'Question no. ' + this.selectedQnid + ' is not assigned to test no. ' + this.meeting_id + '. Please try with another!';
          this.showSuccess();
        }
      },
      error => { }
    );
  }
  removeAssignUserConf(user_id,question_id){
    this.removeUserId = user_id.split();
    this.removeQuestionIds = question_id;
    $(this.unassignUserConfirm.nativeElement).modal('show');
      this.showSubBtn = true;
      this.textonModel = 'Do you really want to unAssign this user to this question?';
    
  }
  removeAssignUser(){
    this.assigndata = {
      "inst_id": this.inst_id,
      "meeting_id": this.meeting_id,
      "question_id": this.removeQuestionIds,
      "assigned_by_user": null,
      "assigned_by_admin": this.Check_admin_id,
      "test_type": this.testtype_id,
      "user_id":  this.removeUserId,
      "lesson_id": this.selectedlessonList
    }
    this._meetcreateService.unAssignQnsforTest(this.assigndata).subscribe(
      data => {
        { this.response = data.response }
        if (this.testtype_id == 3 ||this.testtype_id == 1) {
          this.getAssignedUserstoTest();
          this.showQuestions();
          this.assignedQuestions.splice(this.assignedQuestions.indexOf(this.index));
        }
        if (data.response == 1) {
          if (data.assignedQnsThisTest) {
            this.asgnSTLabelA = this.asgnSTLabelB = this.asgnSTLabelC = this.asgnSTLabelD = 0;
            for (let qnsGrd of data.assignedQnsThisTest) {
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
              // if(qnsGrd.question_grade==5){
              //   this.asgnSTLabelE = qnsGrd.count;                 
              // }
            }
          }
          if (data.getAssQnsGrdWisetoAny) {
            this.asgnATLabelA = this.asgnATLabelB = this.asgnATLabelC = this.asgnATLabelD = 0;
            for (let aqnsATGrd of data.getAssQnsGrdWisetoAny) {

              if (aqnsATGrd.question_grade == 1) {
                this.asgnATLabelA = aqnsATGrd.count;
              }
              if (aqnsATGrd.question_grade == 2) {
                this.asgnATLabelB = aqnsATGrd.count;
              }
              if (aqnsATGrd.question_grade == 3) {
                this.asgnATLabelC = aqnsATGrd.count;
              }
              if (aqnsATGrd.question_grade == 4) {
                this.asgnATLabelD = aqnsATGrd.count;
              }
              // if(aqnsATGrd.question_grade==5){
              //   this.asgnATLabelE = aqnsATGrd.count;            
              // }
            }
          }
          // this.getAssignedQuestionsforTest();
          // this.showCharts();
          // this.assignedQnsNum--;
          this.alertmsgClass = 'success';
          this.msgSummery = 'Success';
          this.alertmsgSucc = 'Question no. ' + this.removeQuestionIds + ' is unassigned for the test no. ' + this.meeting_id + ' Successfully!';
          this.showSuccess();
          // this.showQuestions();

        } else {
          this.alertmsgClass = 'error';
          this.msgSummery = 'Error';
          this.alertmsgSucc = 'Question no. ' + this.removeQuestionIds + ' is not assigned to test no. ' + this.meeting_id + '. Please try with another!';
          this.showSuccess();
        }
      },
      error => { }
    );
  }
  // For getting states ends
  // For getting cities starts
  getAllCities() {
    this._defaultDataService.getAllCities().subscribe(
      data => {
        { this.allCities = data; }
        for (let act of this.allCities) {
          this.cityNames.push({ "label": act.city_name, "value": act.city_id });
        }
        //console.log(this.cityNames);
      },
      error => { }
    );
  }
   // Assign Test To A user Ends
  // Unassign Test for a user Starts
  unAssignTestforUserConfirm() {
    $(this.unassignConfirm.nativeElement).modal('show');
    if (this.selectedUsersunassign && this.selectedUsersunassign.length > 0) {
      this.showSubBtn = true;
      this.textonModel = 'Do you really want to unAssign this test to selected users?';
    } else {
      this.showSubBtn = false;
      this.textonModel = 'Please select users for unassign the test';
    }
  }
  unAssignTestforUser() {
    var selectedUsersunassign = this.selectedUsersunassign;
    if(selectedUsersunassign.indexOf('0') != -1){
     selectedUsersunassign.splice(selectedUsersunassign.indexOf('0'), 1);
    }
    this.unassigndata = {
      "inst_id": this.inst_id,
      "meeting_id": this.meeting_id,
      "user_id": selectedUsersunassign,
    }
    this._meetcreateService.unAssignMeetforUser(this.unassigndata).subscribe(
      data => {
        { this.response = data.response }
        this.alertmsgClass = 'success';
        this.msgSummery = 'Success';
        this.alertmsgSucc = 'Test unassigned Successfully';
        this.showSuccess();
        this.getAssignedUserstoTest();
        this.user_id = this.user_id.concat(selectedUsersunassign);
        this.selectedUsersunassign = [];
        this.getAllRegisteredUsers();
      },
      error => { }
    );
  }
  // To get user data ends
  // Assign Test To A user Starts
  AssignTesttoUserConfirm() {
    $(this.assignConfirm.nativeElement).modal('show');
    if (this.selectedUsers && this.selectedUsers.length > 0) {
      this.showSubBtn = true;
      this.textonModel = 'Do you really want to Assign this test to selected users?';
    } else {
      this.showSubBtn = false;
      this.textonModel = 'Please select users to assign this test';
    }
  }
  
AssignMeettoUser() {
     var selectedUsers = this.selectedUsers;
     if(selectedUsers.indexOf('0') != -1){
      selectedUsers.splice(this.selectedUsers.indexOf('0'), 1);
     }
    this.assigndata = {
      "inst_id": this.inst_id,
      "meeting_id": this.meeting_id,
      "user_id": selectedUsers,
      "assigned_by_user": null,
      "assigned_by_admin": this.Check_admin_id,
    }
    this._meetcreateService.AssignMeettoUser(this.assigndata).subscribe(
      data => {
        { this.response = data.response; }
        this.alertmsgClass = 'success';
        this.msgSummery = 'Success';
        this.alertmsgSucc = 'Test assigned Successfully';
        this.showSuccess();
        this.getAssignedUserstoTest();
        this.assigned_user_id = selectedUsers;
        this.selectedUsers = [];
        this.getAllRegisteredUsers();
        this.showQuestions();
      },
      error => { }
    );
  }
  getAssignedUserstoThisQns(qnsId: number) {
    this.sectdusersQns = qnsId;
    this.assignedUserstoQns = [];
    this.data = {
      "inst_id": this.inst_id,
      "question_id": qnsId,
      "meeting_id": this.meeting_id
    }
    this._meetcreateService.getAssignedUserstoThisQns(this.data).subscribe(
      data => {
        {  var assignedUsers1 = data.assignedUsers; }
        for(let usr of assignedUsers1){
          this.assignedUserstoQns.push({ "label": usr.user_dname, "value": usr.UserId });
        }
      },
      error => { }
    );
  }
  getAssignedUserstoTest() {
    this.assignedUserstoQns = [];
    this.assigndata = {
      "inst_id": this.inst_id,
      "meeting_id": parseInt(this.meeting_id)
    }
    this._meetcreateService.getAssignedUserstoMeet(this.assigndata).subscribe(
      data => {
        { this.assignedUsers = data.response }
        for(let usr of this.assignedUsers){
          if(this.selectedUsersunassign.indexOf(usr.UserId) == -1){
            // this.selectedUsersunassign.push(usr.UserId);
          }
        }
        this.showQuestions();
      },
      error => { }
    );
  }
  getAllRegisteredUsers() {
    this.selectedValues = {
      "inst_id": this.inst_id,
      "meeting_id": parseInt(this.meeting_id),
      "usertype_id": this.selectedUserType,
      "user_country": this.selectedUsercountry,
      "user_dname": this.selectedDisplayNames,
      "user_school": this.selectedSchoolNames,
      "user_class": this.selectedClasses,
      "user_states": this.selectedStates,
      "user_cities": this.selectedCities,
    }
    this._manageuserService.getAllRegisteredMeetUsers(this.selectedValues)
    .then((data: any) => {
        { this.allUsers = data.response }
         { 
          if(data.moderator > 0)
          {
            this.haveModerator = true;
          }else
          {
            this.haveModerator = false;
          }
        }
      },
      error => { }
    );
  }
   // Get Answers for questions starts
   getAnsforQuestion(qnsId: number, loc: any) {
    this.sectdQns = qnsId;
    this.location = loc;
    this.ansData = {
      "inst_id": this.inst_id,
      "question_id": qnsId,
      "location": loc
    }
    //console.log(' Req == ', this.ansData);
    this._questiondetailedviewService.getAnsforQuestion(this.ansData).subscribe(
      data => {
        { this.answers = data.answers; }
      },
      error => { }
    );
  }
  AssignMeettoUserConfirm() {
    $(this.assignConfirm.nativeElement).modal('show');
    if (this.selectedUsers && this.selectedUsers.length > 0) {
      this.showSubBtn = true;
      this.textonModel = 'Do you really want to Assign this meeting to selected users?';
    } else {
      this.showSubBtn = false;
      this.textonModel = 'Please select users to assign this meeting';
    }
  }
  getSingleTest(){
    this.data = {
      "inst_id" : this.inst_id,
      "meeting_id" : this.meeting_id,
      "user_id" : null
    }    
    //console.log('data',this.data);
    this._meetcreateService.getSingleMeet(this.data).subscribe(
        data => {
          this.showUsers = true;
          {this.meetDetails = data.response};
          //mmlabs
          {this.totalUsers = data.totalUsers};
          this.getAssignedUserstoTest();
          this.testtype_id  = this.meetDetails[0].test_type;
          this.class_ids  = this.meetDetails[0].classf_class_id;
          this.country_ids  = this.meetDetails[0].classf_country_id;
          this.course_values  = this.meetDetails[0].classf_course_id;
          this.subject_ids  = this.meetDetails[0].classf_subject_id;
          this.seltddltList  = this.meetDetails[0].lesson_id;
          this.total_ques = this.meetDetails[0].test_total_ques;
          this.selectedlessonList = this.meetDetails[0].lesson_id;
          //console.log('response == ',data.response);
          this.getAllLessons();
        },
        error => {}
    );
  }
  getQuestionsType() {
    this._defaultDataService.getQuestionsType().subscribe(
      data => {
        { this.qnsType = data; }
        for (let qnt of this.qnsType) {
          this.qnsTypeList.push({ "label": qnt.questntyp_name, "value": qnt.questntyp_id });
        }
      },
      error => { }
    );
  }
 /*--Edit files starts--*/
 editTestFields(field:any,oldValue:any,column:any){
  this.oldvalue =  oldValue;  
  this[field] = true;
  this[field+'_show'] = true;
  this[column] = oldValue;  
}
/*--Edit files ends--*/
isResultDeclaredByAdmin(isChecked:boolean){
  if(isChecked){     
    this.showResDecDate = true;
    this.test_is_res_declared_admin = 1;
  }else{     
    this.showResDecDate = false;
    this.test_is_res_declared_admin = 0;
  }
}
updateTestSpecResAdmin(t_id:any,val:any,col:any,field:any){
  this.data = {
    "meeting_id" : t_id,
    "value"   : val,
    "column"  : col,
    "inst_id" : this.inst_id,
    "is_res_by_admin" : this.test_is_res_declared_admin

  }
  //return false;
  this._meetcreateService.updateTestSpec(this.data).subscribe(
    data => {
      {this.response = data.response;}
      this[field] = false;
      this[field+'_show'] = false;
      this.alertmsgClass  = 'success';
      this.msgSummery     = 'Success';
      this.alertmsgSucc   = 'Updated Successfully';
      this.showSuccess();
      this.getSingleTest();
      //console.log(data);
    },
    error => {}
  );
}
/*--Close edited field starts--*/
closeTestEdit(field:any,col:any){
  this[col] = this.oldvalue;
  this[field] = false;
  this[field+'_show'] = false;  
}
/*--Close edited field ends--*/
  /*--Update field starts--*/
  updateTestSpec(t_id:any,val:any,col:any,field:any){
    this.data = {
      "meeting_id" : t_id,
      "value"   : val,
      "column"  : col,
      "inst_id" : this.inst_id,
      "is_res_by_admin" : 2
    }
    //return false;
    this._meetcreateService.updateTestSpec(this.data).subscribe(
      data => {
        {this.response = data.response;}
        this[field] = false;
        this[field+'_show'] = false;
        this.alertmsgClass  = 'success';
        this.msgSummery     = 'Success';
        this.alertmsgSucc   = 'Updated Successfully';
        this.showSuccess();
        this.getSingleTest();
        //console.log(data);
      },
      error => {}
    );
  }
  /*--Update field Ends--*/ 
  // For Get Time & Date starts
getDateTime(event:any,num:any){  
  this.yr = event.getFullYear();
  this.dt = event.getDate();
  if(this.dt<10){ this.dt = '0'+this.dt; }
  this.mt = event.getMonth()+1;
  if(this.mt<10){ this.mt = '0'+this.mt; }
  this.hr = event.getHours();
  if(this.hr<10){ this.hr = '0'+this.hr; }
  this.mn = event.getMinutes();  
  if(this.mn<10){ this.mn = '0'+this.mn; }
  if(num==1){ 
    this.teststart_datetime =  (this.yr+'-'+this.mt+'-'+this.dt+' '+this.hr+':'+this.mn+':00');    
  }
  if(num==2){ 
    this.testend_datetime =  (this.yr+'-'+this.mt+'-'+this.dt+' '+this.hr+':'+this.mn+':00'); 
  }
  if(num==3){ this.testres_declared_dates =  (this.yr+'-'+this.mt+'-'+this.dt+' '+this.hr+':'+this.mn+':00'); }   
}
// For Get Time & Date ends
  rescheduledatesConfirm(sdate:any,edate:any){    
    this.showSubBtn = true;
    //this.oldStart = this.teststart_datetime;
    //this.oldEnd   = this.testend_datetime;
    this.teststart_datetime = sdate;
    this.testend_datetime = edate;

  }
  rescheduleTestdates(){    
    this.requData = {
      "inst_id"                 : this.inst_id,
      "meeting_id"                 : this.meeting_id,
      "test_start_datetime"     : this.teststart_datetime,
      "test_end_datetime"       : this.testend_datetime,
      "test_rescheduled_userid" : null,
      "test_rescheduled_adminid": this.Check_admin_id
    }
    this._meetcreateService.rescheduleTestdates(this.requData).subscribe(
      data  =>{
        {this.response = data.response;}
        if(data.response==1){
          this.alertmsgClass  = 'success';
          this.msgSummery     = 'Success';
          this.alertmsgSucc   = 'Test re-scheduled Successfully';         
        }else{
          this.alertmsgClass  = 'error';
          this.msgSummery     = 'Error';
          this.alertmsgSucc   = data.response;
        }
        this.showSuccess();
        this.getSingleTest();
      },
      error   =>{}
    );    
  }
  rescheduleTestdatesConfirmClose(){
    this.teststart_datetime = this.oldStart;
    this.testend_datetime   = this.oldEnd;
  }
  declareResult(){   
    this.requData = {
      "inst_id" : this.inst_id,
      "meeting_id" : this.meeting_id
    }    
    this._meetcreateService.declareResult(this.requData).subscribe(
      data => {
        {this.response = data.response;}
        if(data.response!=2){
          this.showDecRes = false;
          this.act_result_date = data.response.act_result_date;
          this.alertmsgClass  = 'success';
          this.msgSummery     = 'Success';
          this.alertmsgSucc   = 'Result declared Successfully';
          this.showSuccess();
        }
      },
      error => {}
    );
  }
  VerifyTestConfirm(val:any){
    if(val==1){
      this.showSubBtn = false;
      this.textonModel = 'This test is already verified!'; 
    }else{
      this.showSubBtn = true;
      this.textonModel = 'Do you really want to verify this test? This process cannot be undone!'; 
    }       
  }
  VerifyMeet(){
    this.data = {
      "inst_id" : this.inst_id,
      "meeting_id" : this.meeting_id,
      "test_verified_by" : this.Check_admin_id
    }    
    //console.log('checked data ==', this.data);
    //return false;
    this._meetcreateService.VerifyMeet(this.data).subscribe(
      data  => {
        {this.response = data.response;}
        //console.log(data.response);
        if(data.response==1){          
          this.alertmsgClass = 'success';
          this.msgSummery = 'Success';
          this.alertmsgSucc = 'Verified Successfully';                                    
        }else{
          this.alertmsgClass = 'error';
          this.msgSummery = 'Error';
          this.alertmsgSucc = data.response;          
        }
        this.showSuccess();
        this.getSingleTest();
      },
      error => {}
    );
  }  
  CancelTestConfirm(val:any){
    if(val==1){
      this.showSubBtn = true;
      this.showBtnTxt = 'Approve';
      this.textonModel = 'Do you really want to approve this test?'; 
      this.is_cancel_val = 0;
    }else{
      this.showSubBtn = true;
      this.showBtnTxt = 'Cancel';
      this.textonModel = 'Do you really want to cancel this test?';
      this.is_cancel_val = 1; 
    }       
  }
  CancelMeet(){
    this.data = {
      "inst_id"       : this.inst_id,
      "meeting_id"       : this.meeting_id,
      "cancelled_by"  : this.Check_admin_id,
      "is_cancel"     : this.is_cancel_val
    }    
    this._meetcreateService.CancelMeet(this.data).subscribe(
      data  => {
        {this.response = data.response;}             
        if(data.response==1){          
          this.alertmsgClass = 'success';
          this.msgSummery = 'Success';
          if(this.is_cancel_val==1){
            this.alertmsgSucc = 'Cancelled Successfully';
          }else{
            this.alertmsgSucc = 'Approve Successfully';
          }                                              
        }else{
          this.alertmsgClass = 'error';
          this.msgSummery = 'Error';
          this.alertmsgSucc = data.response;          
        }
        this.showSuccess();
        this.getSingleTest();
      },
      error => {}
    );
  }
  DeleteTestConfirm(val:any){
    if(val==1){
      this.showSubBtn = true;
      this.showBtnTxt = 'Activate';
      this.textonModel = 'Do you really want to activate this test?'; 
      this.is_delete_val = 0;
    }else{
      this.showSubBtn = true;
      this.showBtnTxt = 'Delete';
      this.textonModel = 'Do you really want to delete this test?';
      this.is_delete_val = 1; 
    }       
  }
  DeleteMeet(){
    this.data = {
      "inst_id"       : this.inst_id,
      "meeting_id"       : this.meeting_id,
      "deleted_by"    : this.Check_admin_id,
      "is_delete"     : this.is_delete_val
    }    
    this._meetcreateService.DeleteMeet(this.data).subscribe(
      data  => {
        {this.response = data.response;}             
        if(data.response==1){          
          this.alertmsgClass = 'success';
          this.msgSummery = 'Success';
          if(this.is_cancel_val==1){
            this.alertmsgSucc = 'Activated Successfully';
          }else{
            this.alertmsgSucc = 'Deleted Successfully';
          }                                              
        }else{
          this.alertmsgClass = 'error';
          this.msgSummery = 'Error';
          this.alertmsgSucc = data.response;          
        }
        this.showSuccess();
        this.getSingleTest();
      },
      error => {}
    );
  }
  showSuccess() {  
    this.messageService.add({severity:this.alertmsgClass, summary: this.msgSummery, detail:this.alertmsgSucc});
  }
  /* For Production */
  onReject(){}
}
