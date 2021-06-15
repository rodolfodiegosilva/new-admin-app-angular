
import { DefaultDataService } from '../default-data.service';
import { Component, OnInit, Inject, Input, ViewChild, ElementRef, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ClassificationsService } from '../classfications.service';
import { QuestionsService } from '../questionsanswersupload/questions.service';
import { QuestiondetailedviewService } from '../questionsdetailedview/questiondetailedview.service';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Paginator } from 'primeng/paginator';
declare var $: (arg0: any) => { modal: (arg0: string) => void; };
@Component({
  selector: 'app-questionsearchlist',
  templateUrl: './questionsearchlist.component.html',
  styleUrls: ['./questionsearchlist.component.css'],
  providers: [ClassificationsService, Ng4LoadingSpinnerService, DefaultDataService, QuestionsService, QuestiondetailedviewService, MessageService]
})
export class QuestionsearchlistComponent implements OnInit {
  @ViewChild('questionVerifyModal') questionVerifyModal: ElementRef;
  @ViewChild('questionBlockModal') questionBlockModal: ElementRef;
  @ViewChild('questionDeleteModal') questionDeleteModal: ElementRef;
  @ViewChild('paginator') paginator:Paginator;
  /*****forpoduc***** */
  cities1: any;
  selectedCities1: any;
  classification: any;
  selectedclasid: any;
  selected: any;
  /***************- */
  options: any = {
    autoApply: false,
    alwaysShowCalendars: false,
    linkedCalendars: true,
    singleDatePicker: false,
    showWeekNumbers: false,
    showISOWeekNumbers: false
  };
  selectedaterange: any;

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
  Check_admin_id: string;
  admintype_id: string;
  inst_id: string;
  qnsReq: any;
  response: any;
  searchLlist: any = [];
  currentPage: any;
  itemsPerPage: any = 10;
  marksData: any;
  allSubjects: any;
  allClasses: any;
  allCourses: any;
  countries: any;
  countryList: any[];
  courseList: any[];
  classList: any[];
  subjectList: any[];
  lessonsList: any[];
  qnsTypeList: any[];
  qnsGradeList: any[];
  qnsidsList: any[];
  marksList: any[];
  nmarksList: any[];
  qnsVerify: { "label": string; "value": number; }[];
  qnsDelete: { "label": string; "value": number; }[];
  qnsBlock: { "label": string; "value": number; }[];
  ownersList: { "label": string; "value": string; }[];
  errorMessage: any;
  qnsgrd: any;
  qnsId: any;
  qnReq: any;

  seltdCntryList: Array<any> = [];
  seltdqnsidsList: Array<any> = [];
  seltdCrsList: Array<any> = [];
  seltdClsList: Array<any> = [];
  seltdSubjList: Array<any> = [];
  seltdqnGrdList: Array<any> = [];
  seltdqntList: Array<any> = [];
  selectedOwners: Array<any> = [];
  seltdqnsvList: Array<any> = [];
  seltdqnsbList: Array<any> = [];
  seltdqnsdList: Array<any> = [];
  seltdqnMrksList: Array<any> = [];
  seltdqnnMrksList: Array<any> = [];
  //lessonsList       : Array<any> = [];

  test: any = 5;
  qnsType: any;
  showData: boolean;
  checkedQnsid: Array<any> = [];
  qnVefyData: any;
  qnBlkData: any;
  verify: number;
  alertmsgClass: string;
  msgSummery: string;
  alertmsgSucc: string;
  isQnsChecked: boolean = false;
  qunId: number;
  block: number;
  delete: number;
  qnDeltData: any;
  sdate: any;
  smonth: any;
  syear: any;
  edate: any;
  emonth: any;
  eyear: any;
  cendDate: string;
  cstartDate: string;
  vstartDate: string;
  vendDate: string;
  bendDate: string;
  bstartDate: string;
  dstartDate: string;
  dendDate: string;
  createdDate: any;
  verifiedDate: any;
  blockedDate: any;
  deletedDate: any;
  rowsLimit: any;
  template: string = '<img src="https://www.vedantaresources.com/SiteAssets/Images/loading.gif" />';
  lessdata: any;
  lessonsLists: any;
  selectedLssnList: any =[];
  limit:any = 10;
  offset:any = 0;
  totalQuestions: any=0;
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private _defaultDataService: DefaultDataService,
    private _router: Router,
    private messageService: MessageService,
    private _activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public sanitizer: DomSanitizer,
    private _classificationsService: ClassificationsService,
    private _questionsService: QuestionsService,
    private _questiondetailedviewService: QuestiondetailedviewService,
    private spinnerService: Ng4LoadingSpinnerService
  ) {

    this.maxDate = moment().add(2, 'weeks');
    this.minDate = moment().subtract(3, 'days');
    this.alwaysShowCalendars = true;
    this.keepCalendarOpeningWithRange = true;
    this.showRangeLabelOnInput = true;
  }
  rangeClicked(range) {

  }
  setFilter(){
    this.getQuestionSearchListCount();
    this.getQuestionSearchList();
  }
  resetFilter(){
    
  this.seltdCntryList = [];
  this.seltdqnsidsList =[];
  this.seltdCrsList =[];
  this.seltdClsList= [];
  this.seltdSubjList= [];
  this.seltdqnGrdList = [];
  this.seltdqntList = [];
  this.selectedOwners = [];
  this.seltdqnsvList= []; 
  this.seltdqnsbList = [];
  this.seltdqnsdList= [];
  this.seltdqnMrksList = [];
  this.seltdqnnMrksList= [];
  this.selectedLssnList = [];
  this.limit = 10;
  this.offset = 0;
  this.paginator.changePage(0);
  this.getQuestionSearchListCount();
  this.getQuestionSearchList();
  }
  ngOnInit() {
    this.Check_admin_id = localStorage.getItem('admin_id');
    this.admintype_id = localStorage.getItem('admintype_id');
    this.inst_id = localStorage.getItem('inst_id');
    if (this.Check_admin_id == null) {
      this._router.navigate(['/']);
    }
    this.getQuestionIds();
    this.getQuestionSearchListCount();
    this.getQuestionSearchList();
    this.getCountries();
    this.getQuestionGrade();
    this.getQuestionsType();
    //this.getLessons();
    this.getCourses(this.inst_id);
    this.getClasses(this.inst_id);
    this.getSubjects(this.inst_id);
    this.getQuestionsMarks();
    this.getQuestionsnegMarks();
    this.countryList = [];
    this.courseList = [];
    this.classList = [];
    this.subjectList = [];
    this.lessonsList = [];
    this.qnsTypeList = [];
    this.qnsGradeList = [];
    this.qnsidsList = [];
    this.marksList = [];
    this.nmarksList = [];
    this.qnsVerify = [
      { "label": "No", "value": 0 },
      { "label": "Yes", "value": 1 }
    ];
    this.qnsDelete = [
      { "label": "No", "value": 0 },
      { "label": "Yes", "value": 1 }
    ];
    this.qnsBlock = [
      { "label": "No", "value": 0 },
      { "label": "Yes", "value": 1 }
    ];
    this.ownersList = [
      { "label": "Admin", "value": "1" },
      { "label": "User", "value": "2" }
    ];
  }
  onPageChange(event){
    if(event.rows){
      this.limit = event.rows;
    }
    this.offset = event.page*this.limit;
    this.getQuestionSearchList();
  }
  getQuestionSearchListCount(){
    var qnsReq = {
      "inst_id": this.inst_id,
      "question_id": this.seltdqnsidsList,
      "contries": this.seltdCntryList,
      "courses": this.seltdCrsList,
      "classes": this.seltdClsList,
      "subjects": this.seltdSubjList,
      "qntypes": this.seltdqntList,
      "owners": this.selectedOwners,
      "verify": this.seltdqnsvList,
      "block": this.seltdqnsbList,
      "delete": this.seltdqnsdList,
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
      "rowsLimit": this.rowsLimit,
      "lessons": this.selectedLssnList,
    }
    this._questionsService.getQuestionSearchListCount(qnsReq).subscribe(
      data => {
        { this.totalQuestions = data.response; }
      },

      error => { }
    );
  }
  getQuestionSearchList() {
    this.qnsReq = {
      "inst_id": this.inst_id,
      "question_id": this.seltdqnsidsList,
      "contries": this.seltdCntryList,
      "courses": this.seltdCrsList,
      "classes": this.seltdClsList,
      "subjects": this.seltdSubjList,
      "qntypes": this.seltdqntList,
      "owners": this.selectedOwners,
      "verify": this.seltdqnsvList,
      "block": this.seltdqnsbList,
      "delete": this.seltdqnsdList,
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
      "rowsLimit": this.rowsLimit,
      "lessons": this.selectedLssnList,
      "limit": this.limit.toString(),
      "offset":this.offset.toString()
    }
    this.spinnerService.show();
    this.getLessonsonForSubj(this.seltdSubjList);
    this._questionsService.getQuestionSearchList(this.qnsReq).subscribe(
      data => {
        { this.searchLlist = data.response; }
        if (data.response.length > 0) {
          this.showData = true;
        } else {
          this.showData = false;
        }
        this.spinnerService.hide();
      },

      error => { }
    );
  }
  getCountries() {
    this._defaultDataService.getcountryNamesforProfile().subscribe(
      data => {
        { this.countries = data; }
        for (let cnt of this.countries) {
          this.countryList.push({ "label": cnt.cntry_name, "value": cnt.cntry_id });
        }
      },
      error => this.errorMessage = error
    );
  }
  getCourses(inst_id: any) {
    this._classificationsService.getCourses(inst_id).subscribe(
      data => {
        { this.allCourses = data; }
        for (let crs of this.allCourses) {
          this.courseList.push({ "label": crs.course_fname, "value": crs.course_id });
        }
      },
      error => { },
    );
  }
  getClasses(inst_id: any) {
    this._classificationsService.getClasses(inst_id).subscribe(
      data => {
        { this.allClasses = data; }
        if (data.length > 0) {
          for (let cls of this.allClasses) {
            this.classList.push({ "label": cls.class_fname, "value": cls.class_id });
          }
        }
      },
      error => { },
    );
  }
  getSubjects(inst_id: any) {
    this._classificationsService.getSubjects(inst_id).subscribe(
      data => {
        { this.allSubjects = data; }
        for (let sub of this.allSubjects) {
          this.subjectList.push({ "label": sub.subject_fname, "value": sub.subject_id });
        }
      },
      error => { },
    );
  }
  getLessons() {
    this.lessdata = {
      "inst_id": this.inst_id
    }
    this._classificationsService.getLessons(this.lessdata).subscribe(
      data => {
        { this.lessonsLists = data }
        //console.log('lessons data = ', data);
        for (let lsn of this.lessonsLists) {
          this.lessonsList.push({ "label": lsn.lesson_name, "value": lsn.lesson_id });
        }
      },
      error => { }
    );
  }
  getLessonsonForSubj(num: any) {
    this.lessdata = {
      "inst_id": this.inst_id,
      "subject_id": num
    }
    this.lessonsList = [];
    //this.lessonsList = Array();
    this._classificationsService.getLessons(this.lessdata).subscribe(
      data => {
        { this.response = data; }
        for (let lsn of this.response) {
          this.lessonsList.push({ "label": lsn.lesson_name, "value": lsn.lesson_id });
        }
      },
      error => { }
    );
  }
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
  getQuestionGrade() {
    this._questionsService.getQuestionGrade().subscribe(
      data => {
        { this.qnsgrd = data; }
        for (let qng of this.qnsgrd) {
          this.qnsGradeList.push({ "label": qng.gradtyp_name, "value": qng.gradtyp_id });
        }
      },
      error => { }
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
  getQuestionIds() {
    this.qnReq = {
      "inst_id": this.inst_id
    }
    this._questionsService.getQuestionIds(this.qnReq).subscribe(
      data => {
        { this.qnsId = data.response; }
        for (let qni of this.qnsId) {
          this.qnsidsList.push({ "label": qni.question_id, "value": qni.question_id });
        }
      },
      error => { }
    );
  }
  getCheckedQuensValues(qid: number, isChecked: boolean) {
    this.verify = 0;
    if (isChecked) {
      this.checkedQnsid.push(qid);
    } else {
      let tindex = this.checkedQnsid.indexOf(qid);
      this.checkedQnsid.splice(tindex, 1);
    }
    if (this.checkedQnsid.length > 0) {
      this.isQnsChecked = true;
    } else {
      this.isQnsChecked = false;
    }

  }
  verifyQuestion() {
    this.qnVefyData = {
      "inst_id": this.inst_id,
      "question_id": this.checkedQnsid,
      "verify": this.verify,
      "verify_by": this.Check_admin_id
    }
    this._questiondetailedviewService.verifyQuestion(this.qnVefyData).subscribe(
      data => {
        { this.response = data; }
        if (data.response == 1) {
          // if(this.verify==1){
          //   this.alertmsgClass = 'error';
          //   this.msgSummery = 'Success';
          //   this.alertmsgSucc = 'UnVerified question Successfully';
          // }else{
          this.alertmsgClass = 'success';
          this.msgSummery = 'Success';
          this.alertmsgSucc = 'Verified question Successfully';
          //}  
          this.getQuestionSearchList();
          this.showSuccess();
        }
      },
      error => { }
    );
  }
  verifyQnsModal(qunId: number, verify: number) {
    this.qunId = qunId;
    this.checkedQnsid.push(qunId);
    this.verify = verify;
    if (this.verify == 0) {
      $(this.questionVerifyModal.nativeElement).modal('show');
    }
  }
  blockQnsModal(qunId: number, block: number) {
    this.qunId = qunId;
    this.block = block;
    $(this.questionBlockModal.nativeElement).modal('show');
  }
  blockQuestion() {
    this.qnBlkData = {
      "inst_id": this.inst_id,
      "question_id": this.qunId,
      "block": this.block,
      "by_column": "question_blocked_by",
      "block_by": this.Check_admin_id
    }
    this._questiondetailedviewService.blockQuestion(this.qnBlkData).subscribe(
      data => {
        { this.response = data; }
        if (data.response == 1) {
          if (this.block == 1) {
            this.alertmsgClass = 'success';
            this.msgSummery = 'Success';
            this.alertmsgSucc = 'Question unblocked Successfully';
          } else {
            this.alertmsgClass = 'error';
            this.msgSummery = 'Success';
            this.alertmsgSucc = 'Question blocked Successfully';
          }
          this.getQuestionSearchList();
          this.showSuccess();
        }

      },
      error => { }
    );
  }
  deleteQnsModal(qunId: number, del: number) {
    this.qunId = qunId;
    this.delete = del;
    $(this.questionDeleteModal.nativeElement).modal('show');
  }
  deleteQuestion() {
    this.qnDeltData = {
      "inst_id": this.inst_id,
      "question_id": this.qunId,
      "delete": this.delete,
      "delete_by": this.Check_admin_id,
      "delete_by_column": "question_deleted_by_admin"
    }
    this._questiondetailedviewService.deleteQuestion(this.qnDeltData).subscribe(
      data => {
        { this.response = data; }
        if (data.response == 1) {
          if (this.delete == 1) {
            this.alertmsgClass = 'success';
            this.msgSummery = 'Success';
            this.alertmsgSucc = 'Question activated Successfully';
          } else {
            this.alertmsgClass = 'error';
            this.msgSummery = 'Success';
            this.alertmsgSucc = 'Question deleted Successfully';
          }
          this.getQuestionSearchList();
          this.showSuccess();
        }
      },
      error => { }
    );
  }
  getDate(event: any, column: string) {
    this.sdate = event.startDate._d.getDate();
    if (this.sdate.toString().length < 2) { this.sdate = '0' + this.sdate; }
    this.smonth = event.startDate._d.getMonth() + 1;
    if (this.smonth.toString().length < 2) { this.smonth = '0' + this.smonth; }
    this.syear = event.startDate._d.getFullYear();
    this.edate = event.endDate._d.getDate();
    if (this.edate.toString().length < 2) { this.edate = '0' + this.edate; }
    this.emonth = event.endDate._d.getMonth() + 1;
    if (this.emonth.toString().length < 2) { this.emonth = '0' + this.emonth; }
    this.eyear = event.endDate._d.getFullYear();
    if (column == 'question_created_date') {
      this.cstartDate = this.syear + '-' + this.smonth + '-' + this.sdate;
      this.cendDate = this.eyear + '-' + this.emonth + '-' + this.edate;
    }
    if (column == 'question_is_verified') {
      this.vstartDate = this.syear + '-' + this.smonth + '-' + this.sdate;
      this.vendDate = this.eyear + '-' + this.emonth + '-' + this.edate;
    }
    if (column == 'question_blocked_date') {
      this.bstartDate = this.syear + '-' + this.smonth + '-' + this.sdate;
      this.bendDate = this.eyear + '-' + this.emonth + '-' + this.edate;
    }
    if (column == 'question_deleted_date') {
      this.dstartDate = this.syear + '-' + this.smonth + '-' + this.sdate;
      this.dendDate = this.eyear + '-' + this.emonth + '-' + this.edate;
    }
    this.getQuestionSearchList();
  }
  showSuccess() {

    this.messageService.add({ severity: this.alertmsgClass, summary: this.msgSummery, detail: this.alertmsgSucc });
  }
  /* For Production */
  onReject() {

  }
}
