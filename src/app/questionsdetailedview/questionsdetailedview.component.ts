import { DefaultDataService } from '../default-data.service';
import { Component, OnInit, Inject, Input, ViewChild, ElementRef, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ClassificationsService } from '../classfications.service';
import * as moment from 'moment';
import { QuestionsService } from '../questionsanswersupload/questions.service';
import { QuestiondetailedviewService } from './questiondetailedview.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { AnimationDriver } from '@angular/animations/browser';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ConfigVariable } from '../shared/app.config';
import { Paginator } from 'primeng/paginator';
// import { moment } from 'ngx-bootstrap/chronos/test/chain';
declare let $:any; 
@Component({
  selector: 'app-questionsdetailedview',
  templateUrl: './questionsdetailedview.component.html',
  styleUrls: ['./questionsdetailedview.component.css'],
  providers: [ClassificationsService, Ng4LoadingSpinnerService, DefaultDataService, QuestionsService, QuestiondetailedviewService, MessageService]
})
//@Pipe({ name: 'safe' })
export class QuestionsdetailedviewComponent implements OnInit {
  @Input() name: string;
  @ViewChild('questionVerifyModal') questionVerifyModal: ElementRef;
  @ViewChild('questionclsfVerifyModal') questionclsfVerifyModal: ElementRef;
  @ViewChild('questionclsfBlockModal') questionclsfBlockModal: ElementRef;
  @ViewChild('questionclsfDeleteModal') questionclsfDeleteModal: ElementRef;
  @ViewChild('answerDeleteModal') answerDeleteModal: ElementRef;
  @ViewChild('questionBlockModal') questionBlockModal: ElementRef;
  @ViewChild('questionDeleteModal') questionDeleteModal: ElementRef;
  @ViewChild('courseModel') courseModel: ElementRef;
  @ViewChild('classModel') classModel: ElementRef;
  @ViewChild('subjectModel') subjectModel: ElementRef;
  @ViewChild('lessonModel') lessonModel: ElementRef;
  @ViewChild('paginator') paginator:Paginator;
  cities1: any;
  selectedCities1: any;
  ckeditortrfsoul: any;
  options: any = {
    autoApply: false,
    alwaysShowCalendars: false,
    linkedCalendars: true,
    singleDatePicker: false,
    showWeekNumbers: false,
    showISOWeekNumbers: false
  };
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
  Check_admin_id: any;
  admintype_id: any;
  inst_id: any;
  countries: any;
  errorMessage: any;
  countryList: any[];
  courseList: any[];
  classList: any[];
  subjectList: any[];
  lessnsList: any[];
  qnsTypeList: any[];
  qnsGradeList: any[];
  marksList: any[];
  nmarksList: any[];
  allCourses: any;
  allClasses: any;
  allSubjects: any;
  qnsType: any;
  qnsVerify: { "label": string; "value": number; }[];
  qnsDelete: { "label": string; "value": number; }[];
  qnsBlock: { "label": string; "value": number; }[];
  ownersList: { "label": string; "value": any; }[];
  qnsgrd: any;
  questions: any =[];
  qunsReq: any;
  itemsPerPage: any = 5;
  currentPage: any;
  qunId: number;
  verify: number;
  qnVefyData: any;
  response: any;
  alertmsgClass: string;
  msgSummery: string;
  alertmsgSucc: string;
  block: number;
  qnBlkData: any;
  delete: number;
  qnDeltData: any;
  qnsText: string;
  QuenstId: any = '';
  qnSoldata: any;
  variable: string;
  collapseStatus: boolean = false;
  answers: any;
  ansData: any;
  sectdQns: number;
  selAnsId: any;
  urlSafe: SafeResourceUrl;
  SoltnId: any;
  seltdCntryList: any = [];
  seltdCrsList: any = [];
  seltdClsList: any = [];
  seltdSubjList: any = [];
  seltdqntList: any = [];
  selectedOwners: any = [];
  seltdqnsvList: any = [];
  seltdqnsbList: any = [];
  seltdqnsdList: any = [];
  seltdqnGrdList: any = [];
  seltdqnMrksList: any = [];
  seltdqnnMrksList: any = [];
  seltdLesList: any = [];
  rowsLimit: any = 10;
  offset: any = 0;
  showRes: boolean = true;
  marksData: { "inst_id": any; };
  sdate: any;
  smonth: any;
  syear: any;
  edate: any;
  emonth: any;
  eyear: any;
  cstartDate: string;
  cendDate: string;
  vendDate: string;
  vstartDate: string;
  bendDate: string;
  bstartDate: string;
  dendDate: string;
  dstartDate: string;
  sectdclsfQns: number;
  clsfReq: {};
  qnClassifications: any;
  clsfData: {};
  clfValues: any;
  subject_id: any='';
  subj_id_avail: boolean;
  showLessons: boolean;
  noLessonsmsg: boolean;
  lesson_value: string;
  selectedLessonId: string;
  is_course_available: boolean;
  is_course_notavailable: boolean = false;
  is_class_available: boolean;
  is_class_notavailable: boolean;
  is_subject_available: boolean;
  is_subject_notavailable: boolean;
  createCourseForm: FormGroup;
  createClassForm: FormGroup;
  crtCrs: any;
  course_id: any='';
  course_value: any;
  crsGroup: any;
  class_idn: any;
  is_class_notavailablen: boolean;
  classModeln: any;
  class_id: any='';
  class_value: any;
  createSubjectForm: FormGroup;
  createLessonForm: FormGroup;
  subject_idn: any;
  is_subject_notavailablen: boolean;
  subjectModeln: any;
  noLessons: boolean;
  lessonsList: Array<any> = [];
  lessonsListflt: any[];
  selectedlessonList: string;
  lessData: {};
  subject_values: any;
  allLessons: any;
  allLessonss: any;
  crtlsn: any;
  noLessonsn: boolean;
  lessonsdata: {};
  lesson_name: any;
  getlessons: any;
  clsfRes: any;
  country_id: any;
  qnClassification: NgForm;
  firstParam: any;
  question_id: any;
  fileToUpload: File = null;
  fileUrl: any;
  selFile: boolean;
  oldName: any;
  subject_value: any;
  subGroup: any;
  createdDate: any;
  verifiedDate: any;
  blockedDate: any;
  deletedDate: any;
  showEditor: boolean;
  showMoreDiv: boolean;
  showMrSub: boolean;
  moreAnsData: any;
  location: any;
  moreAnsEditor: string;
  showMoreAnsEditorCtrl: boolean;
  countData: any;
  ansCount: any;
  showMorecAnsEditorCtrl: boolean;
  delansData: any;
  confrmansdlt: boolean = false;
  ans: number;
  qns: number;
  //loc: any;
  file: any;
  moreAns: string;
  angularRoute: any;
  url: string;
  domainAndApp: string;
  realPath: any;
  editgrdId: any;
  question_grade: any;
  update: any;
  editmrkId: any;
  question_marks: any;
  editnmrkId: any;
  question_nmarks: any;
  question_time: any;
  editqntId: any;
  hr: any;
  mn: any;
  qnclsf: any;
  clsfCol: string;
  clsfval: any;
  clsfbyCol: any;
  clsfdtCol: string;
  clqnid: any;
  qnReq: any;
  qnsId: any;
  qnsidsList: any[];
  seltdqnsidsList: Array<any> = [];
  clsfCount: any;
  lessDatas: { "inst_id": any; "subject_id": any; };
  template: string = '<img src="https://www.vedantaresources.com/SiteAssets/Images/loading.gif" />';
  filesUrl: string;
  checkcourse: any;
  checklesson: any;
  checksubject: any;
  checkclass: any;
  courseSubbmit: any = false;
  classSubbmit: any = false;
  subjectSubbmit: any = false;
  lessonSubbmit: any = false;
  totalQuestions: any = 1674;
  selectedLssnList: any[];
  searchLlist: any =[];
  questionUrl:any = '';
  answernUrl:any = '';
  answerData: any = '';
  updateQuesId: any = '';
  filelocation: any = '';
  filename: any = '';
  answerObject:any = {};
  answerHtml: any = '';
  editClick: any = '';
  questionObject: any ={};
  solutionObject:any = {};
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private _defaultDataService: DefaultDataService,
    private _router: Router,
    private messageService: MessageService,
    private _activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private loc: Location,
    public sanitizer: DomSanitizer,
    private _classificationsService: ClassificationsService,
    private _questionsService: QuestionsService,
    private _questiondetailedviewService: QuestiondetailedviewService,
    private spinnerService: Ng4LoadingSpinnerService,
  ) {

    this.maxDate = moment().add(2, 'weeks');
    this.minDate = moment().subtract(3, 'days');
    this.alwaysShowCalendars = true;
    this.keepCalendarOpeningWithRange = true;
    this.showRangeLabelOnInput = true;
  }
  rangeClicked(range: any) {

  }
  getAllSubjectGroup(){
    this._defaultDataService.getAllSubjectGroup().subscribe(
      data => {
        {this.subGroup = data;}
      },
      error => {}
    );
  }
  setValues(question_id,location,file){
    this.updateQuesId = question_id;
    this.filelocation = location;
    this.filename = file;

  }
  ngOnInit() {
    this.Check_admin_id = localStorage.getItem('admin_id');
    this.admintype_id = localStorage.getItem('admintype_id');
    this.inst_id = localStorage.getItem('inst_id');
    if (this.Check_admin_id == null) {
      this._router.navigate(['/']);
    }
    this.firstParam = this._activatedRoute.paramMap
      .subscribe(params => { this.question_id = params.get('question_id');
      if(params.get('question_id') !=null){
        this.seltdqnsidsList = this.question_id;
      }else{
        this.seltdqnsbList = [];
      }
    });
    //alert(this.question_id);
    //this.qnsText='<p><span style="color:#e74c3c">Checking</span>&nbsp;with get and put <span style="font-family:Comic Sans MS,cursive">the html</span></p>/qnsNum_207/qn_20190129124817.mp3';
    this.angularRoute = this.loc.path();
    this.url = window.location.href;
    this.domainAndApp = this.url.replace(this.angularRoute, '');
  
    if (this.domainAndApp == 'https://www.admin.gemstudent.com/#') {
      this.realPath = '/home/gemstud/public_html/API/assets/questionsUpload/';
    } else if (this.domainAndApp == 'http://localhost:8341/#') {
      this.realPath = 'C:/xampp/htdocs/gemService/assets/questionsUpload/';
    }
    if (this.domainAndApp == 'http://localhost:8341/#') {
      this.filesUrl = 'C:/xampp/htdocs/gemService/';
    } else {
      // this.filesUrl = 'https://www.gemstudent.com/API/';
      this.filesUrl = ConfigVariable.BASE_API_URL;
    }
 //console.log('File Url'+this.filesUrl);
    this.filesUrl = ConfigVariable.BASE_API_URL;

    //alert(this.realPath);
    this.getAllLessons();
    this.getQuestionIds();
    this.getQuestions();
    if(!this.question_id){
      this.getQuestionSearchListCount();
  }
    this.getQuestionSearchList();
    this.getCountries();
    this.getCourses(this.inst_id);
    this.getClasses(this.inst_id);
    this.getSubjects(this.inst_id);
    //this.getLessonsonForSubj(2);
    this.getQuestionsMarks();
    this.getQuestionsnegMarks();
    this.getQuestionsType();
    this.getQuestionGrade();
    this.getAllCourseGroup();
    this.getAllSubjectGroup();
    this.countryList = [];
    this.courseList = [];
    this.classList = [];
    this.subjectList = [];
    this.lessnsList = [];
    this.qnsTypeList = [];
    this.qnsGradeList = [];
    this.marksList = [];
    this.nmarksList = [];
    this.qnsidsList = [];
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
    this.createCourseForm = this.formBuilder.group({
      course_fname: ['', Validators.required],
      course_sname: ['', Validators.required],
      inst_id: new FormControl(''),
      crs_search_id: [null, Validators.required],
    });
    this.createClassForm = this.formBuilder.group({
      inst_id: new FormControl(''),
      class_sname: ['', Validators.required],
      class_fname: ['', Validators.required]
    });
    this.createSubjectForm = this.formBuilder.group({
      inst_id: new FormControl(''),
      subject_sname: ['', Validators.required],
      subject_fname: ['', Validators.required],
      search_id: [null, Validators.required],
    });

    this.createLessonForm = this.formBuilder.group({
      inst_id : [''],
      subject_name :[{disabled: true}],
      lesson_name : ['',Validators.required],
    });
    this.createLessonForm.controls.subject_name.disable();


  }
  onClassSearch(event) {
    if (event != '') {
      var flage = false;
      for (let val of this.allClasses) {

        if (((val.class_fname.toLowerCase()).includes(event.toLowerCase())) == true) {
          flage = true;
          this.is_class_notavailable = false;
        }
      }
      if (flage) {
        this.is_class_notavailable = false;
      } else {
        this.createClassForm.controls.class_fname.setValue(event);
        this.is_class_notavailable = true;
      }
    } else {
      this.is_class_notavailable = false;

    }
  }
  selectItemsperpage(num: number) {
    this.itemsPerPage = num;
  }
  onCourseSearch(event) {
    if (event != '') {
      var flage = false;
      for (let val of this.allCourses) {

        if (((val.course_fname.toLowerCase()).includes(event.toLowerCase())) == true) {
          flage = true;

          this.is_course_notavailable = false;
        }
      }
      if (flage) {
        this.is_course_notavailable = false;
      } else {
        this.createCourseForm.controls.course_fname.setValue(event);
        this.is_course_notavailable = true;
      }
    } else {
      this.is_course_notavailable = false;

    }


  }
  onCourseCheck(event) {
    if (event != '') {
      var flage = false;
      for (let val of this.allCourses) {

        if (((val.course_fname.toLowerCase().trim()) == event.toLowerCase().trim())) {
          flage = true;

          this.checkcourse = false;
        }
      }
      if (flage) {
        this.checkcourse = false;
      } else {
        this.checkcourse = true;
      }
    }
  }
  onLessonCheck(event) {
    if (event != '') {
      var flage = false;
      for (let val of this.lessonsList) {

        if (((val.label.toLowerCase().trim()) == event.toLowerCase().trim())) {
          flage = true;
          this.checklesson = false;
        }
      }
      if (flage) {
        this.checklesson = false;
      } else {
        this.checklesson = true;
      }
    }
  }
  onSubjectCheck(event) {
    if (event != '') {
      var flage = false;
      for (let val of this.allSubjects) {

        if (((val.subject_fname.toLowerCase().trim()) == event.toLowerCase().trim())) {
          flage = true;

          this.checksubject = false;
        }
      }
      if (flage) {
        this.checksubject = false;
      } else {
        this.checksubject = true;
      }
    }
  }
  onClassCheck(event) {
    if (event != '') {
      var flage = false;
      for (let val of this.allClasses) {

        if (((val.class_fname.toLowerCase()) == event.toLowerCase())) {
          flage = true;

          this.checkclass = false;
        }
      }
      if (flage) {
        this.checkclass = false;
      } else {
        this.checkclass = true;
      }
    }
  }
  onSubjectSearch(event) {
    if (event != '') {
      var flage = false;
      for (let val of this.allSubjects) {

        if (((val.subject_fname.toLowerCase()).includes(event.toLowerCase())) == true) {
          flage = true;
          this.is_subject_notavailable = false;
          this.is_subject_notavailablen = false;
        }
      }
      if (flage) {
        this.is_subject_notavailable = false;
        this.is_subject_notavailablen = false;
      } else {
        this.createSubjectForm.controls.subject_fname.setValue(event);
        this.is_subject_notavailable = true;
        this.is_subject_notavailablen = true;
      }
    } else {
      this.is_subject_notavailable = false;
      this.is_subject_notavailablen = false;

    }


  }
  onLessonsSearch(event) {
    if (event != '') {
      var flage = false;
      for (let val of this.lessonsList) {

        if (((val.label.toLowerCase()).includes(event.toLowerCase())) == true) {
          flage = true;
          this.noLessons = false;
          this.noLessonsmsg = false;
        }
      }
      if (flage) {
        this.noLessonsn = false;
        this.noLessons = false;
        this.noLessonsmsg = false;
      } else {
        this.noLessonsn = true;
        this.noLessons = true;
        this.noLessonsmsg = true;
        // this.lesson_valuen = [];
        // this.createLessonFormn.controls.lesson_namen.setValue(event);
        // this.createLessonForm.controls.lesson_name.setValue(event);
      }
    } else {
      this.noLessonsn = false;
      this.noLessons = false;
      this.noLessonsmsg = false;
    }


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
  getAllCourseGroup() {
    this._defaultDataService.getAllCourseGroup().subscribe(
      data => {
        { this.crsGroup = data; }
      },
      error => { }
    );
  }
  getCourses(inst_id: any) {
    this._classificationsService.getCoursesUser(inst_id).subscribe(
      data => {
        { this.allCourses = data; }
        for (let crs of this.allCourses) {
          this.courseList.push({ "label": crs.course_fname, "value": crs.course_id });
        }
        if(this.course_id !=''){
          this.course_value = this.allCourses[this.allCourses.length - 1].course_id;
        }
      },
      error => { },
    );
  }
  getClasses(inst_id: any) {
    var body = {
      inst_id: inst_id,
      user_id: this.Check_admin_id
    }
    this._classificationsService.getClassesUser(body).subscribe(
      data => {
        { this.allClasses = data; }
        if (data.length > 0) {
          for (let cls of this.allClasses) {
            this.classList.push({ "label": cls.class_fname, "value": cls.class_id });
          }
        }
        if(this.class_id !=''){
          this.class_value = this.allClasses[this.allClasses.length - 1].class_id;
        }
      },
      error => { },
    );
  }
  getSubjects(inst_id: any) {
    this._classificationsService.getSubjects(inst_id).subscribe(
      data => {
        { this.allSubjects = data; }
        for (let sub of data) {
          this.subjectList.push({ "label": sub.subject_fname, "value": sub.subject_id });
        }
        if(this.subject_id != ''){
          this.subject_values = this.allSubjects[this.allSubjects.length - 1].subject_id;
          this.getLessonsonForSubj(1);
        }
        //console.log('why subjects ==', this.subjectList);
      },
      error => { },
    );
  }
  getAllLessons() {
    this.lessnsList = [];
    this.lessData = {
      "inst_id": this.inst_id
    }
    this._classificationsService.getLessons(this.lessData).subscribe(
      data => {
        { this.allLessons = data; }
        this.lessnsList = [];
        //console.log('why = ', this.allLessons);
        for (let lsns of this.allLessons) {
          this.lessnsList.push({ "label": lsns.lesson_name, "value": lsns.lesson_id });
        }
        //console.log('why lessons ==', this.lessnsList);
      },
      error => { }
    );
  }
  getClassificationValue(value: any, sname: any, fname: any, table: string) {
    this.clsfData = {
      "inst_id": this.inst_id,
      "value": value,
      "sname": sname,
      "fname": fname,
      "table": table
    }

    this._classificationsService.getClassificationValue(this.clsfData).subscribe(
      data => {
        this.clfValues = data;

        if (value) {
          if (data == 2) {
            this[table + '_value'] = value;
            this['is_' + table + '_notavailable'] = true;
            this['is_' + table + '_available'] = false;
          } else {
            this['is_' + table + '_available'] = true;
            this['is_' + table + '_notavailable'] = false;
          }
        } else {
          this['is_' + table + '_available'] = false;
          this['is_' + table + '_notavailable'] = false;
          this[table + '_id'] = '';
          if (!this.subject_id) {
            this.subj_id_avail = false;
            this.showLessons = false;
            this.noLessonsmsg = false;
            this.lesson_value = '';
            this.selectedLessonId = '';
          }
        }
      },
      error => { }
    );
  }
  getLessons(value: any) {
    this.lessonsdata = {
      "inst_id": this.inst_id,
      "subject_id": this.subject_values,
      "lesson_name": value
    }
    this.lesson_name = value;
    this._classificationsService.getLessons(this.lessonsdata).subscribe(
      data => {
        { this.getlessons = data; }
        if (value) {
          if (this.subject_values) {
            this.noLessonsmsg = false;
            if (data.length == 0) {
              this.noLessons = true;
            } else {
              this.noLessons = false;
            }
          } else {
            this.noLessonsmsg = true;
          }
        } else {
          this.noLessonsmsg = false;
          this.noLessons = false;
        }
      },
      error => { },
    );
  }
  courseCreateForm() {
    this.courseCreate(this.createCourseForm.value);
  }
  classCreateForm() {
    this.classCreate(this.createClassForm.value, '');
  }
  subjCreateForm() {
    this.subjectCreate(this.createSubjectForm.value, '');
  }
  courseCreate(values: any) {
    this.courseSubbmit = true;
    if (this.createCourseForm.invalid) {
      return
    }
    if(!this.checkcourse){
      return
    }
    this._classificationsService.createCourse(values).subscribe(
      data => {
        this.crtCrs = data;
        this.course_id = data;
        this.courseSubbmit = true;
        this.alertmsgClass = 'success';
        this.msgSummery = 'Success!';
        this.alertmsgSucc = 'Course Created Successfully';
        this.showSuccess();
        this.getCourses(this.inst_id);
        this.course_value = data;
        $(this.courseModel.nativeElement).modal('hide');
        this.is_course_notavailable = false;
      },
      error => { }
    );
  }
  classCreate(values: any, n: any) {
    this.classSubbmit = true;
    if(this.createClassForm.invalid){
      return
    }
    if(!this.checkclass){
      return
    }
    this._classificationsService.createClass(values).subscribe(
      data => {
        this.crtCrs = data;
        if (n != '') {
          this.class_idn = data;
          this.is_class_notavailablen = false;
          $(this.classModeln.nativeElement).modal('hide');
        } else {
          this.getClasses(this.inst_id);
          this.class_id = data;
          this.class_value = data;
          this.is_class_notavailable = false;
          $(this.classModel.nativeElement).modal('hide');
        }
        this.alertmsgClass = 'success';
        this.msgSummery = 'Success!';
        this.alertmsgSucc = 'Class Created Successfully';
        this.classSubbmit = false;
        this.showSuccess();
      },
      error => { }
    );
  }
  subjectCreate(values: any, n: any) {
    this.subjectSubbmit = true;
    if(this.createSubjectForm.invalid){
      return 
    }
    if(!this.checksubject){
      return
    }
    this._classificationsService.createSubject(values).subscribe(
      data => {
        this.crtCrs = data;
        if (n == '') {
          this.subject_id = data;
          this.is_subject_notavailable = false;
          this.getSubjects(this.inst_id);
          $(this.subjectModel.nativeElement).modal('hide');
        } else {
          this.subject_idn = data;
          this.is_subject_notavailablen = false;
          $(this.subjectModeln.nativeElement).modal('hide');
        }
        this.alertmsgClass = 'success';
        this.subjectSubbmit = false;
        this.msgSummery = 'Success!';
        this.alertmsgSucc = 'Subject Created Successfully';
        this.subj_id_avail = true;
        this.showSuccess();
        $(this.subjectModel.nativeElement).modal('hide');

      },
      error => { }
    );
  }
  getLessonsonForSubjnew() {
    this.lessonsList = [];
    if (this.subject_values) {
      this.subject_values = this.subject_values;
    } else {
      this.subject_values = null;
      //this.getAllLessons();
    }
    this.lessDatas = {
      "inst_id": this.inst_id,
      "subject_id": this.subject_values,
    }
    this._classificationsService.getLessons(this.lessDatas).subscribe(
      data => {
        { this.allLessonss = data; }
        //console.log('this is one =', data);
        for (let ls of data) {
          this.lessonsList.push({ "label": ls.lesson_name, "value": ls.lesson_id });
          //console.log('this is one == ', this.allLessonss);
        }
      },
      error => { }
    );
  }
  getLessonsonForSubj(num: number) {
    if (this.seltdSubjList) {
      this.subject_values = this.seltdSubjList;
    } else {
      this.subject_values = null;
      //this.getAllLessons();
    }
    this.lessData = {
      "inst_id": this.inst_id,
      "subject_id": this.subject_values,
    }
    this._classificationsService.getLessons(this.lessData).subscribe(
      data => {
        if(data.length<1){
          this.noLessons = true;
        }
        { this.allLessons = data; }
        this.lessnsList = [];
          for (let lsns of this.allLessons) {
            this.lessnsList.push({ "label": lsns.lesson_name, "value": lsns.lesson_id });
          
        }
        //  if(num==1){

        //  }
      },
      error => { }
    );
  }
  // getLessonsonForSubj(num:number){

  //   this.noLessonsmsg = false;
  //   this.noLessons = false;
  //   this.lessonsList = [];
  //   this.selectedlessonList = ''; 
  //   if(this.subject_values){
  //     this.subject_values = this.subject_values;
  //   }else{
  //     this.subject_values = null;
  //   }
  //   this.lessData = {
  //     "inst_id" : this.inst_id,
  //     "subject_id" : this.subject_values,     
  //   }    
  //   console.log('When select sub in filters == ', this.lessData);
  //   this._classificationsService.getLessonsonForSubj(this.lessData).subscribe(
  //     data => {
  //       {this.allLessons = data;}

  //       //for (let lsn of this.allLessons) {
  //         if(num==1){
  //           for (let lsn of this.allLessons){
  //             this.lessonsList.push({ "label": lsn.lesson_name, "value": lsn.lesson_id });
  //           }           
  //         }
  //         if(num==2){
  //           alert('number is == '+num);
  //           for (let lsns of this.allLessons){
  //             this.lessonsListflt.push({ "label": lsns.lesson_name, "value": lsns.lesson_id });
  //           console.log('All lessons == ', data);
  //           }

  //         }          
  //         //} 

  //     },
  //     error => {}
  //   );
  // }
  lessonCreate(value: any, n: any) {
    if (n == '') {
      this.subject_id = this.subject_values;
    } else {
      this.subject_id = this.subject_idn;
    }
    this.lessData = {
      "inst_id": this.inst_id,
      "subj_id": this.subject_id,
      "value": value
    }

    this._classificationsService.createLesson(this.lessData).subscribe(
      data => {
        this.crtlsn = data;

        //this.selectedlessonList= ["30"];
        //console.log('lesson id', this.selectedlessonList);

        //this.getLessonsonForSubj(1); // Commented
        if (n == '') {
          this.noLessons = false;
        } else {
          this.noLessonsn = false;
        }
        this.alertmsgSucc = 'Lesson created Successfully';
        this.alertmsgClass = 'success';
        this.msgSummery = 'Success';
        this.showSuccess();
      },
      error => { },
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
  // For Edit and update grade,marks,neg.marks and time starts
  editQnsSpec(qnsid: any, value: any, type: any) {
    if (type == 1) {
      this.question_grade = value;
      this.editgrdId = qnsid;
    } else if (type == 2) {
      this.question_marks = value;
      this.editmrkId = qnsid;
    } else if (type == 3) {
      this.question_nmarks = value;
      this.editnmrkId = qnsid;
    }
    else if (type == 4) {
      this.question_time = value;
      this.editqntId = qnsid;
    }
  }
  // For Edit grade,marks,neg.marks and time ends
  // For Close without update values starts
  closeQnsSpec(type: any) {
    if (type == 1) {
      this.editgrdId = '';
    } else if (type == 2) {
      this.editmrkId = '';
    } else if (type == 3) {
      this.editnmrkId = '';
    } else if (type == 4) {
      this.editqntId = '';
    }
  }
  // For Close without update values ends
  // For Get Time in hours and minutes starts
  getTime(event: any) {
    this.hr = event.getHours();
    this.mn = event.getMinutes();
    this.question_time = this.hr + ':' + this.mn;
    //console.log(this.hr.count(),':',this.mn.count());
  }
  // For Get Time in hours and minutes ends
  // For update grade,marks,neg.marks and time starts
  updateQnsSpec(qnsid: any, value: any, column: string, spec: string, type: any) {
    if (!value) {
      this.alertmsgSucc = 'Please enter ' + spec;
      this.alertmsgClass = 'error';
      this.msgSummery = 'Error';
      this.showSuccess();
      return false;
    }
    this.update = {
      "inst_id": this.inst_id,
      "question_id": qnsid,
      "value": value,
      "column": column,
      //"values"          : value,
    }
    //console.log(this.update);
    //return;
    this._questiondetailedviewService.updateQnsSpec(this.update).subscribe(
      data => {
        { this.response = data.response }

        if (this.response == 1) {
          if (type == 1) { this.editgrdId = ''; }
          else if (type == 2) { this.editmrkId = ''; }
          else if (type == 3) { this.editnmrkId = ''; }
          else if (type == 4) { this.editqntId = ''; }
          this.getQuestions();
          this.alertmsgSucc = spec + ' updated Successfully';
          this.alertmsgClass = 'success';
          this.msgSummery = 'Success';
          this.showSuccess();
        }
      },
      error => { }
    );
  }
  // For update grade,marks,neg.marks and time ends
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
    if (column == 'question_verified_date') {
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
    this.getQuestions();
  }
  onPageChange(event){
    if(event.rows){
      this.rowsLimit = event.rows;
    }
    this.offset = event.page*this.rowsLimit;
    this.getQuestionSearchList();
    this.getQuestions();
  }
  setFilter(){
    this.getQuestionSearchListCount();
    this.getQuestionSearchList();
    this.getQuestions();
  }
  resetFilter(){
    
  this.seltdCntryList = [];
  this.seltdqnsidsList =[];
  this.seltdCrsList =[];
  this.seltdClsList= [];
  this.seltdSubjList= [];
  this.seltdLesList = [];
  this.seltdqnGrdList = [];
  this.seltdqntList = [];
  this.selectedOwners = [];
  this.seltdqnsvList= []; 
  this.seltdqnsbList = [];
  this.seltdqnsdList= [];
  this.seltdqnMrksList = [];
  this.seltdqnnMrksList= [];
  this.selectedLssnList = [];
  this.rowsLimit = 10;
  this.offset = 0;
  this.paginator.changePage(0);
  this.getQuestionSearchListCount();
  this.getQuestionSearchList();
  this.getQuestions();
  }
  showPopUp(folder,file){
    $(document).ready(function() {
      $('.modal-content').resizable({
    //alsoResize: ".modal-dialog",
    minHeight: 300,
    minWidth: 300
    });
    // $('.modal-body').draggable();
    
    // $('#myModal').on('show.bs.modal', function() {
    // $(this).find('.modal-body').css({
    //   'max-height': '100%'
    // });
    // });
    });
//     var url = ConfigVariable.BASE_API_URL+ "assets/questionsUpload/instNum_2/"+folder+"/"+file;
//     var iframe = '<html><head><style>body, html {width: 100%; height: 100%; margin: 0; padding: 0}</style></head><body><iframe src="'+url+'" style="height:calc(100% - 4px);width:calc(100% - 4px)"></iframe></html></body>';

// var win = window.open("","popUpWindow","height=500, width=1300, left=100, top=100, resizable=yes, scrollbars=yes, toolbar=no, menubar=no, location=no, directories=no, status=yes,location=no");
// win.document.write(iframe);
    // window.open(url,'popUpWindow','height=500, width=1300px, left=100, top=100, resizable=yes, scrollbars=yes, toolbar=no, menubar=no, location=no, directories=no, status=yes,location=no');
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
      "lessons": this.seltdLesList,
    }
    this._questionsService.getQuestionSearchListCount(qnsReq).subscribe(
      data => {
        { this.totalQuestions = data.response; }
      },

      error => { }
    );
  }
  //mmlabs3
  getFile(id,location,question){
    var url = this.filesUrl+'Asset_Api/getSecureFile/?user_id='+this.Check_admin_id+'&inst_id='+this.inst_id+'&qns_location='+location+'&QuestDet='+question;
    // var url = this.filesUrl+'assets/questionsUpload/instNum_'+this.inst_id+'/'+location+'/'+ question;
    this._questiondetailedviewService.getHtmlFile(url)
    .subscribe(data=>{
      if(JSON.stringify(data._body).length >1500){
        $('#show_more_'+id).css('display','block');
      }else {
        $('#show_more_'+id).css('display','none');
      }
      $('#div_iframe_'+id).html(data._body);
    });
  }

  // getFile(id,location,question){
  //   var url = this.filesUrl+'assets/questionsUpload/instNum_'+this.inst_id+'/'+location+'/'+ question;
  //   this._questiondetailedviewService.getHtmlFile(url)
  //   .subscribe(data=>{
  //     this.addCssQus(id,data._body);
  //   });
  // }

  showAnsPopUp(){

  }
  //mmlabs3
  // getFileAns(id,location,question){
  //   var url = this.filesUrl+'assets/questionsUpload/instNum_'+this.inst_id+'/'+location+'/'+ question;
  //   this._questiondetailedviewService.getHtmlFile(url)
  //   .subscribe(data=>{
  //     this.addCssAns(id,data._body);
  //   });
  // }

  getFileAns(id,location,question){
    var url = this.filesUrl+'Asset_Api/getSecureFile/?user_id='+this.Check_admin_id+'&inst_id='+this.inst_id+'&qns_location='+location+'&QuestDet='+question;
    // var url = this.filesUrl+'assets/questionsUpload/instNum_'+this.inst_id+'/'+location+'/'+ question;
    this._questiondetailedviewService.getHtmlFile(url)
    .subscribe(data=>{
      if(JSON.stringify(data._body).length >1500){
        $('#show_more_ans'+id).css('display','block');
      }else {
        $('#show_more_ans'+id).css('display','none');
      }
      $('#div_iframe_ans'+id).html(data._body);
    });
  }

  addCssQus(id,data){
    
    if(JSON.stringify(data).length >1500){
      $('#show_more_'+id).css('display','block');
    }else {
      $('#show_more_'+id).css('display','none');
    }
    $('#div_iframe_'+id).html(data);
  }
  addCssAns(id,data){
    if(JSON.stringify(data).length >1500){
      $('#show_more_ans'+id).css('display','block');
    }else {
      $('#show_more_ans'+id).css('display','none');
    }
    $('#div_iframe_ans'+id).html(data);
  }

 //mmlabs3
 loadDocQuestion(location,question) {
  var url = this.filesUrl+'Asset_Api/getSecureFile/?user_id='+this.Check_admin_id+'&inst_id='+this.inst_id+'&qns_location='+location+'&QuestDet='+question;
  // var url = this.filesUrl+'assets/questionsUpload/instNum_'+this.inst_id+'/'+location+'/'+ question;
  this._questiondetailedviewService.getHtmlFile(url)
  .subscribe(data=>{
    this.questionUrl = data._body;
    this.questionObject['questionUrl'] = data._body;
    this.addCssQus(this.questionObject['question_id'],this.questionObject['questionUrl']);
  })
} 

// loadDocQuestion(location,question) {
//   var url = this.filesUrl+'assets/questionsUpload/instNum_'+this.inst_id+'/'+location+'/'+ question;
//   this._questiondetailedviewService.getHtmlFile(url)
//   .subscribe(data=>{
//     this.questionUrl = data._body;
//     this.questionObject['questionUrl'] = data._body;
//     this.addCssQus(this.questionObject['question_id'],this.questionObject['questionUrl']);
//   })
// }

//mmlabs3
loadDocAnswer(location,answer) {
  var url = this.filesUrl+'Asset_Api/getSecureFile/?user_id='+this.Check_admin_id+'&inst_id='+this.inst_id+'&qns_location='+location+'&QuestDet='+answer;
  // var url = this.filesUrl+'assets/questionsUpload/instNum_'+this.inst_id+'/'+location+'/'+ answer;
  // var url = this.filesUrl+'assets/questionsUpload/instNum_'+this.inst_id+'/'+location+'/'+ answer;
  this._questiondetailedviewService.getHtmlFile(url)
  .subscribe(data=>{
    this.answernUrl = data._body;
    this.answerData = data._body;
    this.questionObject['answernUrl'] = data._body;
    this.solutionObject['answernUrl'] = data._body;
    console.log("fixxxxxxxxxxxxxxxxxxx",this.solutionObject)
    this.addCssAns(this.solutionObject['question_id'],this.answerData);
  })
}

// loadDocAnswer(location,answer) {
//   var url = this.filesUrl+'assets/questionsUpload/instNum_'+this.inst_id+'/'+location+'/'+ answer;
//   this._questiondetailedviewService.getHtmlFile(url)
//   .subscribe(data=>{
//     this.answernUrl = data._body;
//     this.answerData = data._body;
//     this.questionObject['answernUrl'] = data._body;
//     this.solutionObject['answernUrl'] = data._body;
//     this.addCssAns(this.solutionObject['question_id'],this.answerData);
//   })
// }
 
  getQuestionSearchList() {
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
      "rowsLimit": this.rowsLimit.toString(),
      "lessons": this.seltdLesList,
      "limit": this.rowsLimit.toString(),
      "offset":this.offset.toString()
    }
    this.spinnerService.show();
    this.getLessonsonForSubj(this.seltdSubjList);
    this._questionsService.getQuestionSearchList(qnsReq).subscribe(
      data => {
        { this.searchLlist = data.response; }
        // var url = this.fileUrl + "questionsUpload/instNum_"+this.inst_id+"/q_2_admn_1672_1_20190821182140/QN_2_1672_20190821182140.html"
        // this.questionUrl = this.filesUrl + "questionsUpload/instNum_"+this.inst_id+"/q_2_admn_1672_1_20190821182140/QN_2_1672_20190821182140.html";
        // this._questiondetailedviewService.getHtmlFile().subscribe(data2=>{

        //   console.log("html file===>>>",data2)
        // })
        if(data.response >0){
          this.showRes = false;
          this.spinnerService.hide();
          $('#scroll').animate({ scrollTop: 0 }, 'fast');
        }else{
          this.showRes = true;
          this.spinnerService.hide();
          $('#scroll').animate({ scrollTop: 0 }, 'fast'); 
        }
      },

      error => { }
    );
  }
  getQuestions() {
    if (this.seltdSubjList.length > 0) {
      this.subject_values = this.seltdSubjList;
      this.lessonsListflt = [];
      this.lessnsList = [];
      this.getLessonsonForSubj(2); // Commented  
    } else {
      this.lessnsList = [];
      this.lessonsList = [];
      this.getAllLessons();
    }

    if (this.seltdCntryList.length > 0 || this.seltdCrsList.length > 0 || this.seltdClsList.length > 0 ||
      this.seltdSubjList.length > 0 || this.selectedOwners.length > 0 || this.seltdqnsvList.length > 0 ||
      this.seltdqnsbList.length > 0 || this.seltdqnsdList.length > 0 || this.seltdqnGrdList.length > 0 ||
      this.seltdqnMrksList.length > 0 || this.seltdqnnMrksList.length > 0 || this.sdate || this.question_id ||
      this.seltdqntList.length > 0 || this.seltdLesList.length > 0 || this.seltdqnsidsList.length > 0) {
        //  this.rowsLimit = 10; 
        } else { 
          //  this.rowsLimit = 10; 
          }

    this.qunsReq = {
      "rowsLimit": this.rowsLimit.toString(),
      "offset": this.offset.toString(),
      "inst_id": this.inst_id,
      "user_id": null,
      "contries": this.seltdCntryList,
      "courses": this.seltdCrsList,
      "classes": this.seltdClsList,
      "subjects": this.seltdSubjList,
      "lessons": this.seltdLesList,
      "qntypes": this.seltdqntList,
      "owners": this.selectedOwners,
      "delete": this.seltdqnsdList,
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
      "filesUrl": this.filesUrl,
    }
    if(this.seltdqnsvList.length >0){

      this.qunsReq["verify"] = this.seltdqnsvList;
    }
    if(this.seltdqnsbList.length >0){

      this.qunsReq["block"] = this.seltdqnsbList;
    }
    this.spinnerService.show();
    this._questiondetailedviewService.getQuestions(this.qunsReq).subscribe(
      data => {
        { this.questions = data.questions; }
        if (data.questions == 0) {
          this.questions = [];
          $('#scroll').animate({ scrollTop: 0 }, 'fast');
        } else {
          $('#scroll').animate({ scrollTop: 0 }, 'fast');
        }
        for(let data of this.questions){
          this.getFile(data.question_id,data.qns_location,data.questDetFile);
          this.getFileAns(data.question_id,data.qns_location,data.questSolFile);
        }
      },
      error => { }
    );
  }
  getClsfctnforQuestion(qnsId: number) {
    this.lessonsList = [];
    this.sectdclsfQns = qnsId;
    this.clsfCount = 0;
    this.country_id; this.course_value; this.class_value; this.subject_values; this.selectedlessonList;
    //this.qnClassification.reset();
    this.clsfReq = {
      "inst_id": this.inst_id,
      "question_id": qnsId,
      "user_id": null
    }
    this._questiondetailedviewService.getClsfctnforQuestion(this.clsfReq).subscribe(
      data => {
        { this.qnClassifications = data.response; }
        this.clsfCount = this.qnClassifications.length;
      },
      error => { }
    );
  }

  getAnsforQuestion(qnsId: number, loc: any) {
    this.sectdQns = qnsId;
    this.location = loc;
    this.ansData = {
      "inst_id": this.inst_id,
      "question_id": qnsId,
      "location": loc,

    }
    //console.log(' Req == ', this.ansData);
    this._questiondetailedviewService.getAnsforQuestion(this.ansData).subscribe(
      data => {
        { this.answers = data.answers; }
        this.moreAns = '';
        this.showMorecAnsEditorCtrl = false;
        this.showMoreAnsEditorCtrl = false;
        //console.log('Ans data == ',this.answers);
        this.showMoreDiv = true;
        //console.log('After new answers == ', this.answers);  
      },
      error => { }
    );
  }
  showAnsPeditor(ansId: number, qnsId: number) {
    this.selAnsId = ansId;
  }
  closeanseditor(qnsId: number) {
    this.selAnsId = '';
    this.getAnsforQuestion(qnsId, '');
  }
  updateAnswer(ansId: number, qnsId: number, desc: any, file: string, loc: any, type: number) {
    this.ansData = {
      "inst_id": this.inst_id,
      "ans_id": ansId,
      "qns_id": qnsId,
      "desc": desc,
      "file_name": file,
      "by": this.Check_admin_id,
      "type": type,
      "location": loc
    }
    //console.log("data == ",this.ansData); 
    this._questiondetailedviewService.updateAnswer(this.ansData).subscribe(
      data => {
        { this.response = data.response; }
        if (data.response == 1) {
          this.selAnsId = '';
          this.editClick = '';
          this.alertmsgClass = 'success';
          this.msgSummery = 'Success';
          this.alertmsgSucc = 'Updated Successfully';
          this.showSuccess();
          this.getAnsforQuestion(qnsId, loc);
        }
      },
      error => { }
    );
  }
  addMore(sectdQns: any) {
    this.countData = {
      "inst_id": this.inst_id,
      "question_id": sectdQns
    }
    this._questiondetailedviewService.getansCountForQns(this.countData).subscribe(
      data => {
        { this.ansCount = data.response; }
        if (data.response.cransCount < 4) {
          this.showMorecAnsEditorCtrl = true;
          this.showMoreAnsEditorCtrl = true;
        } else {
          this.showMorecAnsEditorCtrl = false;
          this.showMoreAnsEditorCtrl = true;
        }
      },
      error => { }
    );

  }
  showMoreAnsEditor(val: any) {
    this.showEditor = true;
    this.showMrSub = true;
  }
  confirmAnsdelete(ans: number, qns: number, loc: any, file: any) {
    this.confrmansdlt = true;
    //this.deleteAnswer(ans, qns,loc,file);
    this.ans = ans;
    this.qns = qns;
    this.loc = loc;
    this.file = file;
    $(this.answerDeleteModal.nativeElement).modal('show');
  }
  deleteAnswer() {
    this.delansData = {
      "inst_id": this.inst_id,
      "answer_id": this.ans,
      "question_id": this.qns,
      "location": this.loc,
      "ans_file": this.file
    }

    //console.log('del data ==', this.delansData);
    this._questiondetailedviewService.deleteAnswer(this.delansData).subscribe(
      data => {
        { this.response = data.response; }
        if (this.response == true) {
          this.getAnsforQuestion(this.qns, this.loc);
          this.showMoreAnsEditorCtrl = false;
          this.showMorecAnsEditorCtrl = false;
          this.showEditor = false;
          this.showMrSub = false;
          this.alertmsgClass = 'success';
          this.msgSummery = 'Success';
          this.alertmsgSucc = 'Answer deleted Successfully';
          this.showSuccess();
        }
        //console.log('response == ', data.response);
      },
      error => { }
    );
  }
  submitMoreAns(qnId: any, type: any, text: any) {
    this.moreAnsData = {
      "inst_id": this.inst_id,
      "question_id": qnId,
      "answertyp_id": type,
      "description": text,
      "location": this.location
    }
    this.addMore(qnId);
    //console.log(this.moreAnsData);
    this._questiondetailedviewService.submitMoreAns(this.moreAnsData).subscribe(
      data => {
        { this.response = data.response }
        this.getAnsforQuestion(qnId, this.location);
        this.alertmsgClass = 'success';
        this.msgSummery = 'Success';
        this.alertmsgSucc = 'New answer added Successfully';
        this.moreAnsEditor = '';
        this.showEditor = false;
        this.showMrSub = false;
        this.showMoreAnsEditorCtrl = false;
        this.showMorecAnsEditorCtrl = false;
        this.showSuccess();

      },
      error => { }
    );
  }
  verifyQnsclsfModal(clqnid: any, qnclsf: any, clsfval: number, column: string, by: string, dcol: string) {
    this.qnclsf = qnclsf;
    this.clsfval = clsfval;
    this.clsfCol = column;
    this.clsfbyCol = by;
    this.clsfdtCol = dcol;
    this.clqnid = clqnid;
    //console.log('classification value', this.clsfval);
    $(this.questionclsfVerifyModal.nativeElement).modal('show');
  }

  blockQnsclsfModal(clqnid: any, qnclsf: any, clsfval: number, column: string, by: string, dcol: string) {
    this.qnclsf = qnclsf;
    this.clsfval = clsfval;
    this.clsfCol = column;
    this.clsfbyCol = by;
    this.clsfdtCol = dcol;
    this.clqnid = clqnid;
    //console.log('classification value', this.clsfval);
    $(this.questionclsfBlockModal.nativeElement).modal('show');
  }
  deleteQnsclsfModal(clqnid: any, qnclsf: any, clsfval: number, column: string, by: string, dcol: string) {
    this.qnclsf = qnclsf;
    this.clsfval = clsfval;
    this.clsfCol = column;
    this.clsfbyCol = by;
    this.clsfdtCol = dcol;
    this.clqnid = clqnid;
    //console.log('classification value', this.clsfval);
    $(this.questionclsfDeleteModal.nativeElement).modal('show');
  }
  verifyQnsModal(qunId: number, verify: number) {
    this.qunId = qunId;
    this.verify = verify;
    $(this.questionVerifyModal.nativeElement).modal('show');
  }
  blockQnsModal(qunId: number, block: number) {
    this.qunId = qunId;
    this.block = block;
    $(this.questionBlockModal.nativeElement).modal('show');
  }
  deleteQnsModal(qunId: number, del: number) {
    this.qunId = qunId;
    this.delete = del;
    $(this.questionDeleteModal.nativeElement).modal('show');
  }
  verifydlblQuestionclsf() {
    this.qnVefyData = {
      "inst_id": this.inst_id,
      "qstnclsf_id": this.qnclsf,
      "value": this.clsfval,
      "column": this.clsfCol,
      "byColumn": this.clsfbyCol,
      "dColumn": this.clsfdtCol,
      "by": this.Check_admin_id
    }
    this._questiondetailedviewService.verifydlblQuestionclsf(this.qnVefyData).subscribe(
      data => {
        { this.response = data.response }
        if (this.response == 1) {
          this.alertmsgClass = 'success';
          this.msgSummery = 'Success';
          this.alertmsgSucc = 'Classification deleted Successfully';
        }
        // this.getQuestions();   
        this.getClsfctnforQuestion(this.clqnid);
        this.showSuccess();
      },
      error => { }
    );
  }
  verifyQuestion() {
    this.qnVefyData = {
      "inst_id": this.inst_id,
      "question_id": this.qunId,
      "verify": this.verify,
      "verify_by": this.Check_admin_id
    }
    this._questiondetailedviewService.verifyQuestion(this.qnVefyData).subscribe(
      data => {
        { this.response = data; }
        if (data.response == 1) {
          if (this.verify == 1) {
            this.alertmsgClass = 'error';
            this.msgSummery = 'Success';
            this.alertmsgSucc = 'UnVerified question Successfully';
          } else {
            this.alertmsgClass = 'success';
            this.msgSummery = 'Success';
            this.alertmsgSucc = 'Verified question Successfully';
          }
          this.getQuestions();
          this.showSuccess();
        }
      },
      error => { }
    );
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
          this.getQuestions();
          this.showSuccess();
        }

      },
      error => { }
    );
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
          this.getQuestions();
          this.showSuccess();
        }
      },
      error => { }
    );
  }
  showPeditor(variable: string, qnId: any, oldName: any) {
    this[variable] = qnId;
    this.oldName = oldName;
  }
  closeeditor(variable: any) {
    this.answerData = this.questionObject.answernUrl;
    this[variable] = '';
  }
  changeHeader(){
    $('.ui-editor-container .ui-editor-toolbar').css('background-color',' #ffd9d9')
  }
  videoAudioQns(file: FileList) {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.fileUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
    this.selFile = true;
  }

  updateQstnSol(id: number, desc: any, column: string, variable: string, type: any, loc: any, file: any) {
    this.qnSoldata = {
      "inst_id": this.inst_id,
      "question_id": id,
      "description": desc,
      "column": column,
      "by": this.Check_admin_id,
      "type": type,
      "oldName": this.oldName,
      "location": loc,
      "fileName": file
    }
    this._questiondetailedviewService.updateQstnSol(this.qnSoldata, this.fileToUpload).subscribe(
      data => {
        { this.response = data }

        //if(data.response==1){
        this[variable] = '';
        this.alertmsgClass = 'success';
        this.msgSummery = 'Success';
        this.alertmsgSucc = 'Updated Successfully';
        if(column == 'QuestDet'){
          this.loadDocQuestion(loc,file);
        }
      if(column == 'QuestSol'){
        this.loadDocAnswer(loc,file);
      }
        this.showSuccess();
        this.selFile = false;
        //}
      },
      error => { },
    );
  }
  newClassificationforQn(qnClsf: NgForm) {
    this.clsfData = {
      "class_ids": qnClsf.value.class_ids,
      "country_ids": qnClsf.value.country,
      "course_ids": qnClsf.value.course_ids,
      "selectedLessonIds": qnClsf.value.selectedLessonIds,
      "subject_ids": qnClsf.value.subject_ids,
      "inst_id": this.inst_id,
      "table": "question_clsf",
      "id_column": "question_id",
      "clsf_id_column": "qstnclsf_clsf_id",
      "id": qnClsf.value.qn_id,
      "qstnclsf_cr_user_id": null,
      "qstnclsf_cr_admin_id": this.Check_admin_id
    }
    this.class_value = this.subject_values = this.country_id = this.course_value = this.selectedlessonList = null;
    this.lessonsList = [];
    this._classificationsService.CreatenewClassification(this.clsfData).subscribe(
      data => {
        { this.clsfRes = data; }
        if (data.response == 1) {
          this.alertmsgClass = 'success';
          this.msgSummery = 'Success';
          this.alertmsgSucc = 'New classification created for this question Successfully';
        } else if (data.response == 2) {
          this.alertmsgClass = 'error';
          this.msgSummery = 'Error';
          this.alertmsgSucc = 'This question already have this classification, Please try with another';
        }
        this.showSuccess();
        this.class_value = this.subject_values = this.country_id = this.course_value = this.selectedlessonList = null;
        this.lessonsList = [];
        this.getClsfctnforQuestion(qnClsf.value.qn_id);
        //console.log('response == ', data.response);
        //qnClsf.reset();

      },
      error => { }
    );
  }

  showSuccess() {
    this.messageService.add({ severity: this.alertmsgClass, summary: this.msgSummery, detail: this.alertmsgSucc });
  }
  /* For Production */
  onReject() { }
}
