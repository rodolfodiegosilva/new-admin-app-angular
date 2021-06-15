
import { Component, OnInit, Inject, Input, ViewChild, ElementRef, Pipe, PipeTransform, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { DefaultDataService } from '../default-data.service';
import { MessageService } from 'primeng/api';
import { ClassificationsService } from '../classfications.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MeetcreateService } from '../meet-create-page/meetcreate.service';
import { ManageuserService } from '../manageuser/manageuser.service';
import * as moment from 'moment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Location } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { QuestiondetailedviewService } from '../questionsdetailedview/questiondetailedview.service';
import { ConfigVariable } from '../shared/app.config';
declare let $: any;
@Component({
  selector: 'app-meet-create-page',
  templateUrl: './meet-create-page.component.html',
  styleUrls: ['./meet-create-page.component.css'],
  providers: [MessageService, DefaultDataService, ManageuserService, QuestiondetailedviewService, ClassificationsService, Ng4LoadingSpinnerService, MeetcreateService],
})
export class MeetCreatePageComponent implements OnInit {
  @Input() name: string;
  @ViewChild('assignConfirm') assignConfirm: ElementRef;
  @ViewChild('assignmoderatorConfirm') assignmoderatorConfirm: ElementRef;
  @ViewChild('unassignConfirm') unassignConfirm: ElementRef;
  @ViewChild('assignQnsConfirm') assignQnsConfirm: ElementRef;
  @ViewChild('unassignQnsConfirm') unassignQnsConfirm: ElementRef;
  @ViewChild('rescheduledate') rescheduledate: ElementRef;
  @ViewChild('unassignUserConfirm') unassignUserConfirm: ElementRef;
  lessiontopic: any;
  lestopic: any;
  createtestdate: any;
  endcreatetestdate: any;
  options: any = {
    autoApply: false,
    alwaysShowCalendars: false,
    linkedCalendars: true,
    singleDatePicker: false,
    showWeekNumbers: false,
    showISOWeekNumbers: false
  };
  urlSafe: SafeResourceUrl;
  countrieslist: any;
  errorMessage: any;
  Check_admin_id: string;
  admintype_id: string;
  inst_id: string;
  allCourses: any;
  allClasses: any;
  allSubjects: any;
  noLessonsmsg: boolean;
  noLessons: boolean;
  lessonsList: any[];
  selectedlessonList: any = '';
  subject_values: any;
  lessData: any;
  allLessons: any;
  mErrMsg_1: any;
  mErrMsg_2: any;
  title_test: any;
  desc_test: any;
  country_ids: Array<any> = [];
  country_id: any;
  course_value: any;
  course_values: Array<any> = [];
  is_course_notavailable: any;
  class_value: any;
  is_class_notavailable: any;
  is_subject_notavailable: any;
  lessSlct: any;
  total_ques: any;
  teststart_datetime: any;
  testend_datetime: any;
  testtype_id: any = 1;
  getClassificationValue: any;
  getLessons: any;
  setQuestionsType: any;
  testCrtForm: FormGroup;
  hr: any;
  mn: any;
  yr: any;
  dt: any;
  mt: any;
  currentYear: any = '2019';
  response: any;
  template: string = '<img src="https://www.vedantaresources.com/SiteAssets/Images/loading.gif" />';
  test_owner_ids: any = null;
  alertmsgClass: string;
  msgSummery: string;
  alertmsgSucc: string;
  teststart_datetimes: any;
  testend_datetimes: any;
  test_type_1: boolean = false;
  dNames: any;
  userType: any;
  qnsGrade: any;
  userDname: any[];
  cNames: any;
  Classname: any = [];
  userCountries: any = [];
  countries: any;
  Schoolname: any[];
  stateNames: any[];
  cityNames: any[];
  sNames: any;
  allCities: any;
  allStates: any;
  selectedValues: any;
  selectedUserType: any;
  selectedUsercountry: any;
  selectedDisplayNames: any;
  selectedSchoolNames: any;
  selectedClasses: any;
  selectedStates: any;
  selectedCities: any;
  allUsers: any =[];
  selectedUsers: any =[];
  assigndata: any;
  meeting_id: any ='';
  classf_id: any;
  unassigndata: any;
  textonModel: any;
  showSubBtn: boolean;
  assignedUsers: any =[];
  selectedUsersunassign: any =[];
  assigned_user_id: any;
  user_id: Array<any> = [];
  marksList: any[];
  nmarksList: any[];
  showUsers: boolean = false;
  butDisabled: boolean = false;
  is_test_res_declared_admin: number = 0;
  is_test_nmarks: number = 0;
  testres_declared_date: any;
  sminDate: Date;
  eminDate: Date;
  titleEdit: boolean = true;
  descEdit: boolean = true;
  qnsEdit: boolean = true;
  sdntEdit: boolean = true;
  edntEdit: boolean = true;
  durtEdit: boolean = true;
  resdecEdit: boolean = true;
  hasNegEdit: boolean = true;
  testResEdit: boolean = true;
  titleEdit_show: boolean = false;
  update: any;
  testres_declared_dates: any;
  angularRoute: any;
  url: string;
  domainAndApp: string;
  questions: any;
  itemsPerPage: any = 5;
  currentPage: any;
  selectedqnsassign: any;
  oldvalue: boolean;
  lessnsList: any[];
  qnsTypeList: any[];
  ownersList: { "label": string; "value": any; }[];
  qnsType: any;
  marksData: any;
  qnsVerify: any[];
  class_ids: Array<any> = [];
  subject_ids: Array<any> = [];
  qunsReq: any;
  seltdLesList: Array<any> = [];
  seltdqntList: Array<any> = [];
  selectedOwners: Array<any> = [];
  seltdqnsvList: Array<any> = [];
  seltdqnGrdList: Array<any> = [];
  seltdqnMrksList: Array<any> = [];
  seltdqnnMrksList: Array<any> = [];
  filesUrl: string;
  selectedQnid: any;
  assignedQnsNum: any = 1;
  getData: any;
  assignedQuestions: any =[];
  sectdQns: number;
  location: any;
  ansData: any;
  answers: any;
  requData: any;
  oldStart: any;
  oldEnd: any;
  showResDecDate: boolean;
  alqLabelA: any = 0;
  alqLabelB: any = 0;
  alqLabelC: any = 0;
  alqLabelD: any = 0;
  //alqLabelE : any = 0;
  asgnSTLabelA: any = 0;
  asgnSTLabelB: any = 0;
  asgnSTLabelC: any = 0;
  asgnSTLabelD: any = 0;
  //asgnSTLabelE : any = 0;
  totalQuestions: any;
  totalAssgnedQnsTothisTest: any;
  totalAssgnedQnsToAnyTest: any;
  questionsLength: any = 0;
  selectedQuestionIds: any[];
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
  showDecRes: boolean = true;
  act_result_date: string;
  selectedLessonIds: any;
  type3Show: boolean;
  seltdqnsbList: Array<any> = [];
  seltdqnsdList: Array<any> = [];
  cstartDate: any;
  cendDate: any;
  vstartDate: any;
  vendDate: any;
  bstartDate: any;
  bendDate: any;
  dstartDate: any;
  dendDate: any;
  question_id: any;
  seltdqnsidsList: any;
  data: any;
  sectdusersQns: number;
  assignedUserstoQns: any =[];
  getQnsGrdWise: any;
  totalAvailableQns: any;
  descEdit_show: boolean;
  qnsEdit_show: boolean;
  durtEdit_show: boolean;
  hasNegEdit_show: boolean;
  showAvailableQns: boolean;
  test_is_res_declared_admin: any;
  class_fname: any = '';
  cntry_name: any = '';
  course_fname: any = '';
  subject_fname: any = '';
  showClfsNames: boolean;
  clsf: any;
  lessons_names: any;
  creteBtn: boolean = false;
  creteBtnShow: boolean;
  assignBtnShow: boolean;
  moderatorBtnShow: boolean;
  test_duration: any;
  tests_duration: string;
  duration_tests: any;
  selectedAssignedUsers: any = [];
  selectedQuestionUsers_1: any = [];
  selectedQuestionUsers_2: any = [];
  selectedQuestionUsers_3: any = [];
  selectedQuestionUsers_4: any = [];
  selectedQuestionUsers_5: any = [];
  showRes: any ;
  moderatorClass:any;
  assignedQnsIds: any = [];
  removeUserId:any = '';
  removeQuestionIds:any = '';
  index: any;
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private _defaultDataService: DefaultDataService,
    private _router: Router,
    private messageService: MessageService,
    private _activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private loc: Location,
    private _classificationsService: ClassificationsService,
    private spinnerService: Ng4LoadingSpinnerService,
    private _meetcreateService: MeetcreateService,
    private _manageuserService: ManageuserService,
    public sanitizer: DomSanitizer,
    public _questiondetailedviewService: QuestiondetailedviewService

  ) {

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
    this.moderatorClass = {
    'background-color':'#f3d1a1'
    };
    this.assignBtnShow = false;
    this.moderatorBtnShow = true;
    this.Check_admin_id = localStorage.getItem('admin_id');
    this.admintype_id = localStorage.getItem('admintype_id');
    this.test_owner_ids = localStorage.getItem('admin_id');
    this.inst_id = localStorage.getItem('inst_id');
    if (this.Check_admin_id == null) {
      this._router.navigate(['/']);
    }
    this.angularRoute = this.loc.path();
    this.url = window.location.href;
    this.domainAndApp = this.url.replace(this.angularRoute, '');
    if (this.angularRoute == '/testcreate') {
      this._router.navigate(["createtest"]);
    }
    if (this.domainAndApp == 'http://localhost:8341/#') {
      this.filesUrl = 'C:/xampp/htdocs/gemService/';
    } else {
      // this.filesUrl = 'https://www.gemstudent.com/API/';
      this.filesUrl = 'http://localhost/~sunilyadav/satish/ci-backend/';
    }
    this.filesUrl = ConfigVariable.BASE_API_URL;
    this.getCountries();
    this.getuserCountries();
    this.snameGroup('');
    this.getQuestionsType();
    this.getQuestionsnegMarks();
    this.getQuestionsMarks();
    this.getCourses(this.inst_id);
    this.getClasses(this.inst_id);
    this.getSubjects(this.inst_id);
    this.testCrtForm = this.formBuilder.group({
      test_total_ques: [null, Validators.required],
    });
    this.userDname = [];
    this.Classname = [];
    this.Schoolname = [];
    this.stateNames = [];
    this.cityNames = [];
    this.lessnsList = [];
    this.qnsTypeList = [];
    this.marksList = [];
    this.nmarksList = [];
    this.selectedQuestionIds = [];
    this.dnameGroup();
    this.cnameGroup(this.inst_id);
    this.getAllStates();
    this.getAllCities();
    this.userType = [
      { "value": 1, "label": "Student" },
      { "value": 2, "label": "Faculty" },
      { "value": 3, "label": "Parent" },
      { "value": 4, "label": "School" }
    ];
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
    this.sminDate = new Date();


  }

  

  isFieldValid1(field: string) {
    return !this.testCrtForm.get(field).valid && this.testCrtForm.get(field).touched;
  }
  displayFieldCss1(field: string) {
    return {
      'has-error': this.isFieldValid1(field),
      'has-feedback': this.isFieldValid1(field)
    };
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  getCountries() {
    this._defaultDataService.getcountryNamesforProfile().subscribe(
      data => {
        { this.countrieslist = data; }
      },
      error => this.errorMessage = error
    );
  }
  getCourses(inst_id: any) {
    this._classificationsService.getCourses(inst_id).subscribe(
      data => {
        { this.allCourses = data; }
      },
      error => { },
    );
  }
  getClasses(inst_id: any) {
    this._classificationsService.getClasses(inst_id).subscribe(
      data => {
        { this.allClasses = data; }
      },
      error => { },
    );
  }
  getSubjects(inst_id: any) {
    this._classificationsService.getSubjects(inst_id).subscribe(
      data => {
        { this.allSubjects = data; }
      },
      error => { },
    );
  }
  getLessonsonForSubj() {
    this.noLessonsmsg = false;
    this.noLessons = false;
    this.lessonsList = [];
    this.selectedlessonList = '';
    this.lessData = {
      "inst_id": this.inst_id,
      "subject_id": this.subject_values,
    }
    this._classificationsService.getLessonsonForSubj(this.lessData).subscribe(
      data => {
        { this.allLessons = data; }
        for (let lsn of this.allLessons) {
          this.lessonsList.push({ "label": lsn.lesson_name, "value": lsn.lesson_id });
        }
      },
      error => { }
    );
  }
  numberOnly(event: any, num: number): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      this['mErrMsg_' + num] = 'Enter only numbers';
      return false;
    }
    this['mErrMsg_' + num] = '';
   var  myDate = new Date();
    myDate.setHours(0);
    myDate.setMinutes(0+$('#float-input-question').val());
    this['duration_tests'] = myDate;
    this.tests_duration = this.total_ques ;
    // this['duration_tests'] = new Date()+'00' + ':' + this.total_ques + ':00';
    return true;
  }
  // For Get Time & Date starts
  getDateTime(event: any, num: any) {
    this.creteBtnShow = true;
    this.yr = event.getFullYear();
    this.dt = event.getDate();
    if (this.dt < 10) { this.dt = '0' + this.dt; }
    this.mt = event.getMonth() + 1;
    if (this.mt < 10) { this.mt = '0' + this.mt; }
    this.hr = event.getHours();
    if (this.hr < 10) { this.hr = '0' + this.hr; }
    this.mn = event.getMinutes();
    if (this.mn < 10) { this.mn = '0' + this.mn; }
    if (num == 1) { this.teststart_datetime = (this.yr + '-' + this.mt + '-' + this.dt + ' ' + this.hr + ':' + this.mn + ':00'); }
    if (num == 2) { this.testend_datetime = (this.yr + '-' + this.mt + '-' + this.dt + ' ' + this.hr + ':' + this.mn + ':00'); }
    if (num == 3) { this.testres_declared_dates = (this.yr + '-' + this.mt + '-' + this.dt + ' ' + this.hr + ':' + this.mn + ':00'); }
    if (num == 4) { this.tests_duration = this.hr + ':' + this.mn + ':00'; }
  }
  // For Get Time & Date ends
  // For Create the test starts
  createMeet(ctForm: NgForm) {
    //return false;
    this.spinnerService.show();
    this._meetcreateService.createMeet(ctForm.value).subscribe(
      data => {
        {
          this.response = data.response;
          this.clsf = data.clsf;
        }
        this.seltdLesList = this.selectedlessonList;
        this.showClfsNames = true;
        this.meeting_id = this.response.meeting_id;
        this.classf_id = this.response.classf_id;
        this.cntry_name = this.clsf.map(function (a: any) { return a["cntry_name"]; });
        this.course_fname = this.clsf.map(function (a: any) { return a["course_fname"]; });
        this.class_fname = this.clsf.map(function (a: any) { return a["class_fname"]; });
        this.subject_fname = this.clsf.map(function (a: any) { return a["subject_fname"]; });
        this.lessons_names = data.lessons.map(function (a: any) { return a["lesson_name"]; }).toString();
        if (this.testtype_id == 3) {
          this.type3Show = false;
        } else {
          this.type3Show = true;
        }
        this.getAllRegisteredUsers();
        this.showUsers = true;
        this.alertmsgClass = 'success';
        this.msgSummery = 'Success';
        this.alertmsgSucc = 'Meeting created Successfully';
        this.titleEdit = false; this.descEdit = false; this.qnsEdit = false;
        this.sdntEdit = false; this.edntEdit = false; this.durtEdit = false;
        this.resdecEdit = false; this.hasNegEdit = false; this.testResEdit = false;
        this.showSuccess();
        this.spinnerService.hide();

      },
      error => { }
    );
  }
  // For Create the test ends
  createTimelineForTest() {
    this.data = {
      "inst_id": this.inst_id,
      "meeting_id": this.meeting_id,
      "timeline_type_id": 5,
      "timeline_user": null,
      "timeline_admin": this.Check_admin_id
    }
    this._meetcreateService.createTimelineForTest(this.data).subscribe(
      data => {
        { this.response = data.respnse; }
      },
      error => { }
    );
  }
  showQuestions() {
      this.type3Show = true;
      this.setSelectedUsersIds();
      this.getQuestions();
  }
  setSelectedUsersIds(){

    this.selectedQuestionUsers_1 = this.selectedUsersunassign;
    this.selectedQuestionUsers_2 = this.selectedUsersunassign;
    this.selectedQuestionUsers_3 = this.selectedUsersunassign;
    this.selectedQuestionUsers_4 = this.selectedUsersunassign;
    this.selectedQuestionUsers_5 = this.selectedUsersunassign;
  }
  rescheduledatesConfirm() {
    $(this.rescheduledate.nativeElement).modal('show');
    this.showSubBtn = true;
    this.oldStart = this.teststart_datetime;
    this.oldEnd = this.testend_datetime;
  }
  rescheduleTestdates() {
    this.requData = {
      "inst_id": this.inst_id,
      "meeting_id": this.meeting_id,
      "test_start_datetime": this.teststart_datetime,
      "test_end_datetime": this.testend_datetime,
      "test_rescheduled_userid": null,
      "test_rescheduled_adminid": this.Check_admin_id
    }
    this._meetcreateService.rescheduleTestdates(this.requData).subscribe(
      data => {
        { this.response = data.response; }
        if (data.response == 1) {
          this.alertmsgClass = 'success';
          this.msgSummery = 'Success';
          this.alertmsgSucc = 'Test re-scheduled Successfully';
        } else {
          this.alertmsgClass = 'error';
          this.msgSummery = 'Error';
          this.alertmsgSucc = data.response;
        }
        this.showSuccess();
      },
      error => { }
    );
  }
  rescheduleTestdatesConfirmClose() {
    this.teststart_datetime = this.oldStart;
    this.testend_datetime = this.oldEnd;
  }
  // For checked test types starts
  getDataontestType(isChecked: boolean, type: number) {
    // if(type==1){
    //   this.test_type_1 = true
    // }else{
    //   this.test_type_1 = false;
    // }    
    //console.log('typess == ', type);
  }
  // For checked test types ends
  // For getting user display name starts
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
  // For getting cities ends
  // To get user data starts
  getAllRegisteredUsers() {
    this.selectedValues = {
      "inst_id": this.inst_id,
      'meeting_id': this.meeting_id,
      "usertype_id": this.selectedUserType,
      "user_country": this.selectedUsercountry,
      "user_dname": this.selectedDisplayNames,
      "user_school": this.selectedSchoolNames,
      "user_class": this.selectedClasses,
      "user_states": this.selectedStates,
      "user_cities": this.selectedCities,
    }
    this._manageuserService.getAllRegisteredUsers(this.selectedValues)
    .then((data: any) => {
        { this.allUsers = data }
      },
      error => { }
    );
  }
  // To get user data ends
  // Assign Test To A user Starts
  AssignMeettoUserConfirm() {
    $(this.assignConfirm.nativeElement).modal('show');
    if (this.selectedUsers && this.selectedUsers.length > 0) {
      this.showSubBtn = true;
      this.textonModel = 'Do you really want to Assign this meeting to selected participant?';
    } else {
      this.showSubBtn = false;
      this.textonModel = 'Please select participant to assign this meeting';
    }
  }
  AssignMeettoModeratorConfirm() {
    $(this.assignmoderatorConfirm.nativeElement).modal('show');
    if (this.selectedUsers && this.selectedUsers.length > 0) {
      this.showSubBtn = true;
      this.textonModel = 'Do you really want to Assign this meeting to selected moderator?';
    } else {
      this.showSubBtn = false;
      this.textonModel = 'Please select moderator to assign this meeting';
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
    var assigndata = this.assigndata;
    this._meetcreateService.AssignMeettoUser(this.assigndata).subscribe(
      data => {
        { this.response = data.response; }
        this.alertmsgClass = 'success';
        this.msgSummery = 'Success';
        this.alertmsgSucc = 'Meeting assigned Successfully';
        this.showSuccess();
        this.getAssignedUserstoMeet();
        this.assigned_user_id = selectedUsers;
        this.selectedUsers = [];
        this.getAllRegisteredUsers();
        this.assignMeetSocket(assigndata);
     //   this.showQuestions();
      },
      error => { }
    );
  }
   AssignMeettomoderator() {
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
    var assigndata = this.assigndata;
    this._meetcreateService.AssignMeettoModerator(this.assigndata).subscribe(
      data => {
        { this.response = data.response; }
        this.alertmsgClass = 'success';
        this.msgSummery = 'Success';
        this.alertmsgSucc = 'Meeting assigned Successfully';
        this.showSuccess();
        this.getAssignedUserstoMeet();
        this.assigned_user_id = selectedUsers;
        this.selectedUsers = [];
        this.getAllRegisteredUsers();
        this.assignBtnShow = true;
        this.moderatorBtnShow = false;
        this.assignMeetSocket(assigndata);
      //  this.showQuestions();
      },
      error => { }
    );
  }

  assignMeetSocket(sockData: any)
  {
    this._meetcreateService.AssignMeetSocket(sockData).subscribe(
              data => {
              },
              error => {}
            );
  }
  // Assign Test To A user Ends
  // Unassign Test for a user Starts
  unAssignMeetforUserConfirm() {
    $(this.unassignConfirm.nativeElement).modal('show');
    if (this.selectedUsersunassign && this.selectedUsersunassign.length > 0) {
      this.showSubBtn = true;
      this.textonModel = 'Do you really want to unAssign this meeting to selected users?';
    } else {
      this.showSubBtn = false;
      this.textonModel = 'Please select users for unassign the meeting';
    }
  }
  unAssignMeetforUser() {
    this.unassigndata = {
      "inst_id": this.inst_id,
      "meeting_id": this.meeting_id,
      "user_id": this.selectedUsersunassign,
    }
    this._meetcreateService.unAssignMeetforUser(this.unassigndata).subscribe(
      data => {
        { this.response = data.response }
        this.alertmsgClass = 'success';
        this.msgSummery = 'Success';
        this.alertmsgSucc = 'Test unassigned Successfully';
        this.showSuccess();
        this.getAssignedUserstoMeet();
        this.user_id = this.user_id.concat(this.selectedUsersunassign);
        this.selectedUsersunassign = [];
        this.getAllRegisteredUsers();
    //  this.showQuestions();
      },
      error => { }
    );
  }
  // Unassign Test for a user Ends

  // Assign Questions for Test Starts
  AssignQnsforConfirm(qnid: any) {
    //console.log(this.selectedqnsassign);    
    $(this.assignQnsConfirm.nativeElement).modal('show');
    if (this.testtype_id == 4  || this.testtype_id == 2) {
      if (this.assignedQuestions.length >= this.total_ques) {
        this.showSubBtn = false;
        this.textonModel = 'You can only assign ' + this.total_ques + ' questions to this test';
      } else {
        this.showSubBtn = true;
        this.textonModel = 'Do you really want to assign this question to this test?';
        this.selectedQnid = qnid;
      }
    } else {
      if(this.selectedUsersunassign.length<1){

      this.showSubBtn = false;
      this.textonModel = 'Please select any user';
      }else{
        this.showSubBtn = true;
        this.textonModel = 'Do you really want to assign this question to this test?';
        this.selectedQnid = qnid;

      }
    }

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

    if (this.testtype_id == 3) {
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
          if (this.testtype_id == 3) {
            this.getAssignedUserstoMeet();
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


      },
      error => { }
    );
  }
  // Assign Questions for Test Ends

  // unAssign Questions for Test Starts
  unAssignQnsforConfirm(qnid: any) {
    $(this.unassignQnsConfirm.nativeElement).modal('show');
    this.showSubBtn = true;
    this.textonModel = 'Do you really want to unassign this question from this test?';
    this.selectedQnid = qnid;
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
        if (this.testtype_id == 3 || this.testtype_id ==1) {
          this.assignedQuestions =[];
          this.getAssignedUserstoMeet();
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
          // this.getAssignedQuestionsforTest();
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
  // unAssign Questions for Test Ends

  // Get assigned users starts
  getAssignedUserstoMeet() {
    this.assignedUserstoQns = [];
    this.assigndata = {
      "inst_id": this.inst_id,
      "meeting_id": this.meeting_id
    }
    this._meetcreateService.getAssignedUserstoMeet(this.assigndata).subscribe(
      data => {
        { this.assignedUsers = data.response }
        // for(let usr of this.assignedUsers){
        //   if(this.selectedUsersunassign.indexOf(usr.UserId) != -1){
        //     this.assignedUserstoQns.push({ "label": usr.user_dname, "value": usr.UserId });
        //   }
        // }
      },
      error => { }
    );
  }
  // GEt assigned users ends
  removeQuestion(question_id,user_id,i){
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
  // Get assigned questions for test starts
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
        for(let id of this.assignedQuestions){
          this.assignedQnsIds.push(id.question_id);
        }
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
  // Get assigned questions for test ends

  /*--Edit files starts--*/
  editTestFields(field: any, oldValue: any) {
    this.oldvalue = oldValue;
    this[field] = true;
    this[field + '_show'] = true;
  }
  /*--Edit files ends--*/

  /*--Close edited field starts--*/
  closeTestEdit(field: any, col: any) {
    this[col] = this.oldvalue;
    this[field] = false;
    this[field + '_show'] = false;
  }
  /*--Close edited field ends--*/

  /*--Update field starts--*/
  updateTestSpec(t_id: any, val: any, col: any, field: any) {
    this.update = {
      "meeting_id": t_id,
      "value": val,
      "column": col,
      "inst_id": this.inst_id,
      "is_res_by_admin": 2
    }
    //console.log(this.update);
    this._meetcreateService.updateTestSpec(this.update).subscribe(
      data => {
        { this.response = data.response; }
        this[field] = false;
        this[field + '_show'] = false;
        this.alertmsgClass = 'success';
        this.msgSummery = 'Success';
        this.alertmsgSucc = 'Updated Successfully';
        this.showSuccess();
        //console.log(data);
      },
      error => { }
    );
  }
  /*--Update field Ends--*/

  // Get All Leesons Topics starts
  getAllLessons() {
    this.allLessons = [];
    this.lessnsList = [];
    this.lessData = {
      "inst_id": this.inst_id,
      "subject_id": this.subject_values,
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
  // Get All Leesons Topics ends
  isResultDeclaredByAdmin(isChecked: boolean) {
    if (isChecked) {
      this.showResDecDate = true;
      this.test_is_res_declared_admin = 1;
    } else {
      this.showResDecDate = false;
      this.test_is_res_declared_admin = 0;
    }
  }
  updateTestSpecResAdmin(t_id: any, val: any, col: any, field: any) {
    this.data = {
      "meeting_id": t_id,
      "value": val,
      "column": col,
      "inst_id": this.inst_id,
      "is_res_by_admin": this.test_is_res_declared_admin

    }
    //return false;
    this._meetcreateService.updateTestSpec(this.data).subscribe(
      data => {
        { this.response = data.response; }
        this[field] = false;
        this[field + '_show'] = false;
        this.alertmsgClass = 'success';
        this.msgSummery = 'Success';
        this.alertmsgSucc = 'Updated Successfully';
        this.showSuccess();

      },
      error => { }
    );
  }
  // Get Question Types starts
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
  // Get Question Types ends

  // For getting question marks to show in filters starts 
  getQuestionsMarks() {
    this.marksData = {
      "inst_id": this.inst_id
    }
    this._questiondetailedviewService.getQuestionsMarks(this.marksData).subscribe(
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
    this.marksData = {
      "inst_id": this.inst_id
    }
    this._questiondetailedviewService.getQuestionsnegMarks(this.marksData).subscribe(
      data => {
        { this.response = data.response; }
        for (let mrks of this.response) {
          this.nmarksList.push({ "label": mrks.question_nmarks, "value": mrks.question_nmarks });
        }

      },
      error => { }
    );
  }
  // For getting question neg.marks to show in filters ends

  //
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
          this.assignedQuestions.splice(this.assignedQuestions.indexOf(this.index));
          this.getAssignedUserstoMeet();
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
          // this.assignedQnsNum--;
          this.alertmsgClass = 'success';
          this.msgSummery = 'Success';
          this.alertmsgSucc = 'Question no. ' + this.removeQuestionIds + ' is unassigned for the test no. ' + this.meeting_id + ' Successfully!';
          this.showSuccess();
          this.showQuestions();

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
  getQuestions() {
    var selectedUsersunassign = this.selectedUsersunassign;
    if(selectedUsersunassign.indexOf('0') != -1){
     selectedUsersunassign.splice(selectedUsersunassign.indexOf('0'), 1);
    }
    if (this.seltdLesList.length > 0) { this.seltdLesList = this.selectedlessonList; } else { this.seltdLesList = this.selectedlessonList; }
    if (this.class_ids.length > 0) { this.class_ids = this.class_ids; } else { this.class_ids.push(this.class_value); }
    if (this.subject_ids.length > 0) { this.subject_ids = this.subject_ids; } else { this.subject_ids.push(this.subject_values); }
    this.country_ids.push(this.country_id);
    this.course_values.push(this.course_value);
    this.qunsReq = {
      "inst_id": this.inst_id,
      "user_id": null,
      "contries": this.country_ids,
      "courses": this.course_values,
      "classes": this.class_ids,
      "subjects": this.subject_ids,
      "lessons": this.seltdLesList,
      "qntypes": this.seltdqntList,
      "owners": this.selectedOwners,
      "verify": this.seltdqnsvList,
      "filesUrl": this.filesUrl,
      "block": 0,
      "delete": 0,
      "grade": this.seltdqnGrdList,
      "marks": this.seltdqnMrksList,
      "nmarks": this.seltdqnnMrksList,
      "cstartDate": this.cstartDate,
      "cendDate": this.cendDate,
      "vstartDate": this.vstartDate,
      "vendDate": this.vendDate,
      "bstartDate": this.bstartDate,
      "bendDate": this.bendDate,
      "dstartDate": this.dstartDate,
      "dendDate": this.dendDate,
      "qnsIds": this.question_id,
      "question_id": this.seltdqnsidsList,
      "selectedUsersunassign": selectedUsersunassign,
      "qstnclsf_clsf_id": this.classf_id,
      "meeting_id": this.meeting_id
    }
    // this.spinnerService.show();
    //return false;
    if(this.testtype_id == 2 || this.testtype_id == 1){
      this.qunsReq['test_type'] = this.testtype_id;
    }
    this._questiondetailedviewService.getQuestionsTest(this.qunsReq).subscribe(
      data => {
        
        { this.questions = data.questions;
          this.country_ids = [];
          this.course_values = [];
          this.selectedAssignedUsers = [];
          for(let usr of this.dNames){
            if(selectedUsersunassign.indexOf(usr.user_id) != -1){
              this.selectedAssignedUsers.push(usr);
            }
          }
        if (data.questions == 0) {
          this.showRes = false;
          // this.spinnerService.hide();
        } else {
          this.showRes = true;
          // this.spinnerService.hide();
        }

        this.getAssignedQuestionsforTest();
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
  //
  getTotalAvailabaleQnsGradewise() {
    console.log('aqui');
    this.data = {
      "inst_id": this.inst_id,
      "lessons": this.selectedlessonList,
      "contries": this.country_id,
      "courses": this.course_value,
      "classes": this.class_value,
      "subjects": this.subject_values
    }
    this.seltdLesList = this.selectedLessonIds;
    if (this.selectedlessonList.length > 0 && this.country_id && this.course_value
      && this.class_value && this.subject_values && this.course_value) {console.log('aqui');
      this.getAllLessons();
      this._meetcreateService.getTotalAvailabaleQnsGradewise(this.data).subscribe(
        data => {console.log('aqui');
          this.showAvailableQns = true;
          { this.getQnsGrdWise = data.getQnsGrdWise; }
          this.creteBtnShow = true;
        //  console.log("creteBtnShow "+this.getQnsGrdWise.length);
          if (this.getQnsGrdWise.length > 0) {console.log('aqui');
            for (let qnsGrd of data.getQnsGrdWise) {
              if (qnsGrd.question_grade == 1) {console.log('aqui');
                this.alqLabelA = qnsGrd.count;
              }
              if (qnsGrd.question_grade == 2) {console.log('aqui');
                this.alqLabelB = qnsGrd.count;
              }
              if (qnsGrd.question_grade == 3) {console.log('aqui');
                this.alqLabelC = qnsGrd.count;
              }
              if (qnsGrd.question_grade == 4) {console.log('aqui');
                this.alqLabelD = qnsGrd.count;
              }

            }console.log('aqui');
            this.totalAvailableQns = (parseInt(this.alqLabelA) + parseInt(this.alqLabelB) + parseInt(this.alqLabelC) + parseInt(this.alqLabelD));
            this.creteBtnShow = true;
          } else {console.log('aqui');
            this.totalAvailableQns = this.alqLabelA = this.alqLabelB = this.alqLabelC = this.alqLabelD = 0;
          //  !this.testCrtForm.valid;
          //  this.creteBtnShow = false;
          }


        },
        error => { console.log('aqui');}
      );
    } else {console.log('aqui');
      //alert('No');
      this.showAvailableQns = false;
      this.totalAvailableQns = this.alqLabelA = this.alqLabelB = this.alqLabelC = this.alqLabelD = 0;

    }
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
  // Get Answers for questions ends
  /*--Click on new Test starts--*/
  refresh(): void {
    this._router.navigate(["testcreate"]);
  }
  /*--Click on new Test starts--*/
  declareResult() {
    this.requData = {
      "inst_id": this.inst_id,
      "meeting_id": this.meeting_id
    }
    this._meetcreateService.declareResult(this.requData).subscribe(
      data => {
        { this.response = data.response; }
        if (data.response != 2) {
          this.showDecRes = false;
          this.act_result_date = data.response.act_result_date;
          this.alertmsgClass = 'success';
          this.msgSummery = 'Success';
          this.alertmsgSucc = 'Result declared Successfully';
          this.showSuccess();
        }
      },
      error => { }
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
  showSuccess() {
    this.messageService.add({ severity: this.alertmsgClass, summary: this.msgSummery, detail: this.alertmsgSucc });
  }
  /* For Production */
  onReject() { }
}
