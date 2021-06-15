import { DefaultDataService } from '../default-data.service';
import { Component, OnInit, Inject, Input,ViewChild,ElementRef,Pipe, PipeTransform,ViewEncapsulation} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup,FormControl, Validators, NgForm } from '@angular/forms';
import {MessageService} from 'primeng/api';
import { QuestionsService } from './questions.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { ContentuploadmangeService } from '../contntuploadmanage/contentuploadmange.service';
import { ClassificationsService }  from '../classfications.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Location } from '@angular/common';
declare var $;

@Component({
  selector: 'app-questionsanswersupload',
  templateUrl: './questionsanswersupload.component.html',
  styleUrls: ['./questionsanswersupload.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService,Ng4LoadingSpinnerService,DefaultDataService,QuestionsService,ContentuploadmangeService,ClassificationsService],
  
})
//@Pipe({ name: 'safe' })
export class QuestionsanswersuploadComponent implements OnInit {
  @Input() name: string;
  @ViewChild('courseModel') courseModel:ElementRef;
  @ViewChild('classModeln') classModeln:ElementRef; 
  @ViewChild('classModel') classModel:ElementRef;
  @ViewChild('subjectModel') subjectModel:ElementRef;
  @ViewChild('subjectModeln') subjectModeln:ElementRef;
  @ViewChild('videoPlayer') videoplayer: any;
  //name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log: string = '';
  @ViewChild("myckeditor") ckeditor: any;  
  errorMessage: any;
  Check_admin_id: string;
  admintype_id: string;
  inst_id: string;
  clfValues: any;  
  subj_id_avail: boolean;
  is_course_available : boolean;
  is_course_notavailable : boolean;
  is_class_available : boolean;
  is_class_notavailable : boolean;
  is_subject_available : boolean;
  is_subject_notavailable : boolean;
  course_value: any;
  subject_value: any;
  class_value: any ;
  course_id: any;
  subject_id: any;
  class_id: any;
  qnsgrd: any;
  question_grade : any = 2;
  mErrMsg: string;
  createCourseForm : FormGroup;
  createCourseFormn : FormGroup;
  createClassForm: FormGroup;
  createClassFormn : FormGroup;
  createSubjectForm: FormGroup;
  createSubjectFormn : FormGroup;
  crtCrs: any;
  alertmsgClass: string;
  msgSummery: string;
  alertmsgSucc: string;
  crsGroup: any;
  subGroup: any; 
  class_idn: any;
  is_class_notavailablen: boolean;
  subject_idn: any;
  is_subject_notavailablen: boolean;
  response: any;
  question: any;
  qnsText: any;
  qnUpload : FormGroup;  
  qnsType: any;
  questntyp_id : number= 1;
  text : string;
  nmarkss : number = 0;
  tMarks : number = 1;
  country_id : any;
  lesson_value : any;
  selectedLessonId : any;
  showLessons : any;
  noLessons : any;
  noLessonsmsg : any;
  mErrMsg_1 : any;
  mErrMsg_2 : any;
  qnHrs : any = '00';
  qnMns : any = '02';
  question_detail : any;
  ans_type : any;
  question_solutions : any = '';      
  allLessons: any;
  allLessonsn: any;
  noLessonsmsgn: boolean;
  noLessonsn: boolean;
  showLessonsn: boolean;
  lesson_valuen: any;
  crtlsn: any;
  checkvalue: any;
  checkvaluen: any;
  selectedLessonIdn: any;
  checkboxValues : any;
  CheckedValues : Array<any> = [];
  wransCount : Array<any> = [];
  cransCount : Array<any> = [];
  lesson_names: any;
  selected : number;
  t_f_crt_answr : any;
  ans_id : number = 1;
  ans_type_shw: boolean = true;  
  countries: Array<any>;  
  countrieslist: any;
  lessSlct: boolean;
  display: boolean = false;
  dilogueMsg: string;
  dlbtn_one: boolean;
  dlbtn_tow: boolean;
  dlbtn_one_txt: string;
  dlbtn_two_txt: string;
  submitForm: boolean;
  acceptnumber: number;
  submitForm2: boolean;
  titleMsg: string;
  dlgCntrl: number = 0;
  allCourses: Array<any> = [];
  allClasses: any;
  allSubjects: any;
  lessonsdata: any;
  getlessons: any;
  lessonsList: any[];
  LesPlhlder : string = 'Lesson/Topic';
  selectedlessonList: any = '';
  subject_values : any;
  lessData: {};
  lesson_name: any;
  FileorTexts: number = 1;
  FileorTextsols: number = 1;
  fileToUpload: File = null;
  solfileToUpload : File = null;
  fileUrl: any;
  mediaFullpath: SafeResourceUrl = 'https://youtu.be/c61wr1ZsHzY';
  fileName: string;
  fileName2: string;  
  fileSize: number;
  fileData: any;
  contentFile: any;
  fileExt: string;
  fileExtError: boolean;
  fileExtErrorText: string;
  qnFormData: any;
  clsfData: any;
  selFile: boolean;
  fileUrls: any;
  selFiles: boolean;
  question_solutionFile: any;
  template: string ='<img src="https://www.vedantaresources.com/SiteAssets/Images/loading.gif" />';
  question_solution: any;
  angularRoute            : any;
  url: string;
  domainAndApp: string;
  sessionMsg: any;
  isSession: any;
  //showSpinner : boolean = true;
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,    
    private _defaultDataService          : DefaultDataService,
    private _router                     : Router, 
    private messageService              : MessageService,
    private _activatedRoute             : ActivatedRoute,
    private formBuilder                 : FormBuilder,
    private _questionsService           : QuestionsService,
    private _contentuploadmangeService  : ContentuploadmangeService,
    private _classificationsService     : ClassificationsService,
    public sanitizer                    : DomSanitizer,
    private loc                         : Location,
    private spinnerService              : Ng4LoadingSpinnerService
  ) {
    this.mycontent='';
   }
  ngOnInit() {
    //this.spinnerService.show();
    this.Check_admin_id = localStorage.getItem('admin_id');
    this.admintype_id = localStorage.getItem('admintype_id');
    this.inst_id = localStorage.getItem('inst_id');   
    if(this.Check_admin_id==null){
      this._router.navigate(['/']);
    }
    this.angularRoute = this.loc.path();
    this.url = window.location.href;
    this.domainAndApp = this.url.replace(this.angularRoute, '');
    if(this.angularRoute=='/questionansweruploads'){      
      this._router.navigate(["questionanswerupload"]);
    }
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true
    };
    
  //this.qnsText='<p><span style="color:#e74c3c">Checking</span>&nbsp;with get and put <span style="font-family:Comic Sans MS,cursive">the html</span></p>';
  this.getQuestionsType();  
  this.getCountries();
  this.getCourses(this.inst_id);
  this.getClasses(this.inst_id);
  this.getSubjects(this.inst_id);
  
    this.getQuestionGrade();
    this.getAllCourseGroup();
     this.getAllSubjectGroup();
    this.createCourseForm = this.formBuilder.group({
      course_fname : new FormControl(''),
      course_sname : new FormControl(''),
      inst_id : new FormControl(''),
      crs_search_id : new FormControl(''),     
    });
    this.createClassForm = this.formBuilder.group({
      inst_id : new FormControl(''),
      class_sname : new FormControl(''),
      class_fname : new FormControl('')
    }); 
    this.createSubjectForm = this.formBuilder.group({
      inst_id : new FormControl(''),
      subject_sname : new FormControl(''),
      subject_fname : new FormControl(''),
      search_id : new FormControl('')      
    });
    this.createSubjectFormn = this.formBuilder.group({
      inst_id : new FormControl(''),
      subject_sname : new FormControl(''),
      subject_fname : new FormControl(''),
      search_id : new FormControl('')      
    });
    this.qnUpload = this.formBuilder.group({
      inst_id : new FormControl(''),
      country : new FormControl(''),
      course_value : new FormControl(''),
      class_value : new FormControl(''),
      subject_value : new FormControl(''),
      subject_id  : new FormControl(''),
      class_id    : new FormControl(''),
      course_id   : new FormControl(''),
      lesson_name : new FormControl(''),
      question_grade : new FormControl(''),
      marks : new FormControl(''),
      nmarks : new FormControl(''),
      question_details : new FormControl(''),
      question_solution : new FormControl(''),
      wrAns_1 : new FormControl(''),
      wrAns_2 : new FormControl(''),
      wrAns_3 : new FormControl(''),
      wrAns_4 : new FormControl(''),
      wrAns_5 : new FormControl(''),
      wrAns_6 : new FormControl(''),
      wrAns_7 : new FormControl(''),
      wrAns_8 : new FormControl(''),
      crAns_1 : new FormControl(''),
      crAns_2 : new FormControl(''),
      crAns_3 : new FormControl(''),
      crAns_4 : new FormControl(''),
      question_time : new FormControl(''),
      question_admin : new FormControl('')
    });
      this.countries = [];
    if(this.sessionMsg==1){
      this.alertmsgSucc = 'Question created Successfully';
      this.alertmsgClass = 'success';
      this.msgSummery = 'Success'; 
      this.showSuccess();
      localStorage.removeItem('isSession');
    }
  }
  showDialog() {
    this.display = true;
}
  // uploadQns(){   
  //   //console.log('Form Data ', this.qnUpload.value);
  //   this._questionsService.questionUpload(this.qnUpload.value).subscribe(
  //     data => {
  //       {this.response = data;}
  //       console.log('response ', data);       
  //     },
  //     error => {}
  //   );
  // }
  courseCreateForm(){
    this.courseCreate(this.createCourseForm.value);   
  }
  classCreateForm(){
    this.classCreate(this.createClassForm.value,'');
  }
  subjCreateForm(){
    this.subjectCreate(this.createSubjectForm.value,'');
  }
  subjCreateFormn(){
    this.subjectCreate(this.createSubjectFormn.value,'n');
  }
  courseCreate(values:any){     
    this._contentuploadmangeService.createCourse(values).subscribe(
      data => {
        this.crtCrs = data;       
        this.course_id = data;
        //alert(this.course_id);
        this.alertmsgClass = 'success';
        this.msgSummery = 'Success!';
        this.alertmsgSucc = 'Course Created Successfully';        
        this.showSuccess();
        this.getCourses(this.inst_id);
        this.course_value = data;
        $(this.courseModel.nativeElement).modal('hide'); 
        this.is_course_notavailable = false;
      },
      error => {}
    );
  }
  classCreate(values:any,n:any){ 
    this._contentuploadmangeService.createClass(values).subscribe(
      data => {
        this.crtCrs = data;        
        if(n!=''){       
        this.class_idn = data;
        this.is_class_notavailablen = false;
        $(this.classModeln.nativeElement).modal('hide');
        }else{       
        
        this.class_id = data;
        this.class_value = data;
        this.is_class_notavailable = false;
        $(this.classModel.nativeElement).modal('hide'); 
        }      
        this.alertmsgClass = 'success';
        this.msgSummery = 'Success!';
        this.alertmsgSucc = 'Class Created Successfully';
        this.getClasses(this.inst_id);
        this.showSuccess();      
      },
      error => {}
    );    
  }
  subjectCreate(values:any,n:any){ 
    this._contentuploadmangeService.createSubject(values).subscribe(
      data => {
        this.crtCrs = data;        
        if(n==''){
        this.subject_id = data;
        this.is_subject_notavailable = false;
        $(this.subjectModel.nativeElement).modal('hide');
        }else{
        this.subject_idn = data;
        this.is_subject_notavailablen = false;
        $(this.subjectModeln.nativeElement).modal('hide');
        }      
        this.alertmsgClass = 'success';
        this.msgSummery = 'Success!';
        this.alertmsgSucc = 'Subject Created Successfully';
        this.subj_id_avail = true;
        this.getSubjects(this.inst_id);
        this.showSuccess();
        $(this.subjectModel.nativeElement).modal('hide');
        
      },
      error => {}
    );
  }
  // onChange($event: any): void {
  //   console.log("onChange");   
  // }
  getCountries(){
    //alert(this.sessionMsg);
    this._defaultDataService.getcountryNamesforProfile().subscribe(
      data => {
              {this.countrieslist = data;}
              // for(let cnt of this.countrieslist){
              //   this.countries.push({ id: cnt.cntry_id, name: cnt.cntry_name });
              // }              
            },
      error => this.errorMessage = error
    );
  }
  getCourses(inst_id:any){
    this._classificationsService.getCourses(inst_id).subscribe(
      data => {
        {this.allCourses = data;}                   
      },
      error => {},
    );
  }
  getClasses(inst_id:any){    
    this._classificationsService.getClasses(inst_id).subscribe(
      data => {
        {this.allClasses = data;}  
                   
      },
      error => {},
    );
  }
  getSubjects(inst_id:any){   
    this._classificationsService.getSubjects(inst_id).subscribe(
      data => {
        {this.allSubjects = data;}
                   
      },
      error => {},
    );
  }
  getQuestionGrade(){
    this._questionsService.getQuestionGrade().subscribe(
      data => {
        {this.qnsgrd = data;}          
      },
      error => {}
    );
  }
  getClassificationValue(value:any,sname:any,fname:any,table:any){
    this.clsfData = {
      "inst_id" : this.inst_id,
      "value"   : value,
      "sname"   : sname,
      "fname"   : fname,
      "table"   : table
    }    
    this._classificationsService.getClassificationValue(this.clsfData).subscribe(
      data => {
        this.clfValues = data;       
        if(value){
            if(data==2){
              this[table+'_value'] = value;
              this['is_'+table+'_notavailable'] = true;
              this['is_'+table+'_available'] = false;
            }else{              
              this['is_'+table+'_available'] = true;
              this['is_'+table+'_notavailable'] = false;
            }
        }else{
          this['is_'+table+'_available'] = false;
          this['is_'+table+'_notavailable'] = false;
          this[table+'_id'] = '';
          if(!this.subject_id){
            this.subj_id_avail=false;            
            this.showLessons = false;
            this.noLessonsmsg = false;
            this.lesson_value = '';
            this.selectedLessonId = '';
          }
        }      
      },
      error => {}
    );
  }
  showInputValue(id:number,value:any,table:string){    
    this['is_'+table+'_available'] = false;
    this[table+'_value'] = value;   
    this[table+'_id'] = id;
    //alert(this[table+'_id']);
    if(this.subject_id){
      this.subj_id_avail = true;
    }else{
      this.subj_id_avail = false;
    }
  }
  numberOnly(event:any,num:number): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      this['mErrMsg_'+num] = 'Enter only numbers';
      return false;
    }
    this['mErrMsg_'+num] = '';
    return true;
  }
  getAllCourseGroup(){
    this._defaultDataService.getAllCourseGroup().subscribe(
      data => {
        {this.crsGroup = data;}
      },
      error => {}
    );
  } 
  getAllSubjectGroup(){
    this._defaultDataService.getAllSubjectGroup().subscribe(
      data => {
        {this.subGroup = data;}
      },
      error => {}
    );
  }
  getQuestionsType(){
    this._defaultDataService.getQuestionsType().subscribe(
      data => {
        {this.qnsType = data;}        
      },
      error => {}
    );
  }
  setQuestionsType(isChecked:boolean,val){   
    this.questntyp_id = val;
    this.t_f_crt_answr = '';
    this.ans_type = '';
    this.dlgCntrl = 0;
    if(val==2){ this.ans_type_shw = false; } else { this.ans_type_shw = true; }    
  }
  getLessonsonForSubj(){
    this.noLessonsmsg = false;
    this.noLessons = false;
    this.lessonsList = [];
    this.selectedlessonList = ''; 
    this.lessData = {
      "inst_id" : this.inst_id,
      "subject_id" : this.subject_values,     
    }
    //console.log(this.lessData);
    this._classificationsService.getLessonsonForSubj(this.lessData).subscribe(
      data => {
        {this.allLessons = data;}
        for (let lsn of this.allLessons) {
          this.lessonsList.push({ "label": lsn.lesson_name, "value": lsn.lesson_id });
          }        
      },
      error => {}
    );
  } 
  getLessonsonFocus(){    
    this.allLessons = [];
    this.CheckedValues = [];
    this._contentuploadmangeService.getLessons(this.subject_values,'').subscribe(
      data => {
        this.allLessons = data;
        for (let lsn of this.allLessons) {
          this.lessonsList.push({ "label": lsn.lesson_name, "value": lsn.lesson_id });
          }  
        if(this.subject_id){
          this.selected = 2;
          if(data==2){
            this.noLessonsmsg = true;
            this.noLessons = false;
          }else{
            this.showLessons=true;
            this.lessSlct = false;
            this.noLessonsmsg = false;
          }
        }
       
      },
      error => {}
    );
  }
  getLessonsonFocusn(){
    this._contentuploadmangeService.getLessons(this.subject_idn,'').subscribe(
      data => {
        this.allLessonsn = data;
        if(this.subject_idn){
          if(data==2){
            this.noLessonsmsgn = true;
            this.noLessonsn = false;
          }else{
            this.showLessonsn=true;
          }
        }       
      },
      error => {}
    );
  }
  getLessons(value:any){   
    this.lessonsdata = {
      "inst_id"     : this.inst_id,
      "subject_id"  : this.subject_values,
      "lesson_name" : value
    } 
    this.lesson_name = value;
    this._classificationsService.getLessons(this.lessonsdata).subscribe(
      data => {
        {this.getlessons = data;} 
        if(value){
          if(this.subject_values){
            this.noLessonsmsg = false;
            if(data.length==0){
              this.noLessons = true;
            }else{
              this.noLessons = false;
            }
          }else{
            this.noLessonsmsg = true;
          }
        }else{
          this.noLessonsmsg = false;
          this.noLessons = false;
        }     
      },
      error => {},
    );
  }
  
  getLessonsn(value:any){
    if(this.subject_idn){
    if(value){      
      this.lesson_valuen = value;
      this._contentuploadmangeService.getLessons(this.subject_idn,value).subscribe(
        data => {
          {this.allLessonsn = data;} 
          if(data==2){            
            this.noLessonsn = true;
            this.noLessonsmsgn = false;
            this.showLessonsn = false;
          }else{
            this.showLessonsn = true;
          }          
        },
          error => {}
      );            
    }else{
      this.noLessonsmsgn = true;
      this.noLessonsn = false;
      this.showLessonsn = false;
    }
  }  
  }
  lessonCreate(value:any,n:any){   
    if(n==''){
      this.subject_id = this.subject_values; 
    }else{
      this.subject_id = this.subject_idn;
    }   
    this.lessData = {
      "inst_id" : this.inst_id,
      "subj_id" : this.subject_id, 
      "value"       : value
    } 
    this._classificationsService.createLesson(this.lessData).subscribe(
      data => {
        this.crtlsn = data;        
        //this.selectedlessonList= ["30"];
        this.getLessonsonForSubj();
        if(n==''){
          this.noLessons = false;
        }else{
          this.noLessonsn = false;
        }         
        this.alertmsgSucc = 'Lesson created Successfully';
        this.alertmsgClass = 'success';
            this.msgSummery = 'Success';                 
          this.showSuccess();
      },
      error => {},
    );
  }
  closeAllChecks(){
    this.showLessons = false;
  }
  closeAllChecksn(){
    this.showLessonsn = false;
  }
  isAnswerProvided(event:any,id:number,val:any,num:number){   
    if(event.target.checked==true){ 
      this.checkvalue = num+1;     
      this.lesson_value = this.checkvalue +'Item Selected';       
      if(this.selectedLessonId==0){
        this.selectedLessonId = id;
      }else{
        this.selectedLessonId = this.selectedLessonId+','+id; 
      }        
    }else{
      this.checkvalue = num-1;
      this.lesson_value = this.checkvalue +'Item Selected';
    }    
  }
  isAnswerProvidedn(event:any,id:number,val:any,num:number){   
    if(event.target.checked==true){ 
      this.checkvaluen = num+1;     
      this.lesson_valuen = this.checkvaluen +'Item Selected';      
      if(this.selectedLessonIdn==0){
        this.selectedLessonIdn = id;
      }else{
        this.selectedLessonIdn = this.selectedLessonIdn+','+id; 
      }        
    }else{
      this.checkvaluen = num-1;
      this.lesson_valuen = this.checkvaluen +'Item Selected';
    }    
  }
  getCheckedValues(id:number, isChecked: boolean) {   
    if(isChecked) {
      this.CheckedValues.push(id);
    } else {
      let index = this.CheckedValues.indexOf(id);
      this.CheckedValues.splice(index,1);
    } 
    this.lesson_value = this.CheckedValues.length+' '+'Items Selected';    
}
setAnsType(isChecked: boolean, id:number){
  if(isChecked){
    this.ans_type = id;
  }else{
    this.ans_type = '';
  }
}  
  forContinue(num:number){
    this.display = false;
    if(num==1){
      this.submitForm = true;
    }
    if(num==2){
      this.submitForm2 = true;
    }
    
  }
  questionsCount(value:any,qtype:any, num:number){   
     
      if(qtype=='false'){
        if(value){
          if(this.wransCount.indexOf(num)==-1){
            this.wransCount.push(num);
            //console.log('w leng s', this.wrqnsCount.length);
          }
        }else{
          let index = this.wransCount.indexOf(num);
          this.wransCount.splice(index,1);
          //console.log('w leng n', this.wrqnsCount.length);
        }
      }
      if(qtype=='true'){
        if(value){
          if(this.cransCount.indexOf(num)==-1){
            this.cransCount.push(num);
            
            //console.log('c leng s', this.crqnsCount.length);
          }
        }else{
          let index = this.cransCount.indexOf(num);
          this.cransCount.splice(index,1);
         // alert(this.cransCount);
          //console.log('c leng n', this.crqnsCount.length);
        }
      }     
      //console.log('wrong options', this.wrqnsCount);
      //console.log('correct options', this.crqnsCount);
  }

  FileorTextCtrl(isChecked:boolean,val:number){   
    this.FileorTexts = val;
    // this.t_f_crt_answr = '';
    // this.ans_type = '';
    // this.dlgCntrl = 0;
    //if(val==2){ this.ans_type_shw = false; } else { this.ans_type_shw = true; }
    this.selFile = false;    
    this.selFiles = false;    
  }
  videoAudioQns(file: FileList){
    this.fileToUpload = file.item(0);  
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.fileUrl = event.target.result;
    }    
    reader.readAsDataURL(this.fileToUpload);
    this.fileName = this.fileToUpload.name;
    this.fileName2 = this.fileName.split('.').shift();
    this.fileExt = this.fileName.replace(/^.*\./, '');    
    this.fileSize = this.fileToUpload.size;   
    this.fileSize = (0.001)*(this.fileSize);
    //this.mediaFullpath          = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl);
    this.fileData = {
      "extension" : this.fileExt
    }
    this.selFile = true;
    this._defaultDataService.checkFileExt(this.fileData).subscribe(
      data => {
        {this.contentFile=data}
        if(data==2){
          this.fileExtError = true;
          this.fileExtErrorText = 'Upload only above mentioned types';        
        }else{
          this.fileExtError = true;
          this.fileExtErrorText = 'Size should be '+data.mediatyp_minsize+' Kb to '+data.mediatyp_maxsize+' Kb';
        }
      },
      error => {}
    );
  }
  videoAudioSolns(file: FileList){
    this.solfileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.fileUrls = event.target.result;
    }
    reader.readAsDataURL(this.solfileToUpload);
    this.selFiles = true;
    //console.log(" selected sol file == ", file);
  }
  FileorTextSol(isChecked:boolean,val:number){
    this.FileorTextsols = val;
    // this.t_f_crt_answr = '';
    // this.ans_type = '';
    // this.dlgCntrl = 0;
   // if(val==2){ this.ans_type_shw = false; } else { this.ans_type_shw = true; }  
  }
  clearMsg(){
    this.display = false;
    this.dilogueMsg = '';
    this.dlgCntrl = 0;
  }
  questionUpload(myForm: NgForm){
    //console.log('Form Data == ', myForm.value);
   // return false;
    this.dilogueMsg = '';
    let wrAnscnt =   this.wransCount.length;
    let crAnscnt =   this.cransCount.length;
    let ansCnt = (+wrAnscnt + +crAnscnt);   
    
    //alert(crAnscnt);
    if(myForm.value.selectedLessonIds==''){ this.lessSlct = true;   return false; }
    else { this.lessSlct = false; }
    // If select image/text editor
    if(this.FileorTexts==1){
      if(myForm.value.question_details=='' || myForm.value.question_details==undefined){
        this.dlgCntrl = 1;
        this.titleMsg = 'Error!';
        this.dilogueMsg += 'Please enter your question.<br> ';
        this.dlbtn_one = true; this.dlbtn_one_txt='Cancel'; this.dlbtn_tow = false;       
      }      
    }else{
      // If select video/audio      
      if(myForm.value.question_detailss=='' || myForm.value.question_detailss==undefined){        
        this.dlgCntrl = 1;
        this.titleMsg = 'Error!';
        this.dilogueMsg += 'Please select question file.<br> ';
        this.dlbtn_one = true; this.dlbtn_one_txt='Cancel'; this.dlbtn_tow = false;
      }
    }    
    if(this.questntyp_id==1){ 
      //Validation for Multiple choice Question   
      //alert(crAnscnt);
      if(crAnscnt<1){
        this.dlgCntrl = 1;
        this.titleMsg = 'Error!';
        this.dlbtn_one = true; this.dlbtn_one_txt='Cancel';
        this.dilogueMsg += '  Please enter atleast one correct answer option <br>';            
      } 
      if(ansCnt<4){          
        this.dlgCntrl = 1;
        this.titleMsg = 'Error!';
        this.dlbtn_one = true; 
        this.dlbtn_one_txt='Cancel';
        this.dilogueMsg += '  Please enter atleast four answer options <br>';          
      }
      if(wrAnscnt < 3){
        this.dlgCntrl = 1;
        this.titleMsg = 'Error!';
        this.dlbtn_one = true; 
        this.dlbtn_one_txt='Cancel';
        this.dilogueMsg += '  Please enter atleast three wrong options <br>';  
        
      } 
      if(ansCnt<6){                      
          if(this.dlgCntrl==0){
            this.titleMsg = 'Warning!';
            this.dlbtn_two_txt = 'This quesiton does not have any more "Wrong Answers". I would like to "Submit" the quesiton. "';
            this.acceptnumber = 2;
            this.dilogueMsg += '<span class="alert-danger">Warning - </span> <br>';
            this.dilogueMsg += 'Enterning more wrong answers will help increase the question quality. <br>';
            this.dlbtn_one = true; this.dlbtn_one_txt='Cancel';
            this.dlbtn_tow = true;   
          }          
          if(this.dlgCntrl==1){            
            this.dilogueMsg += '<span class="alert-danger">Warning - </span> <br>';
            this.dilogueMsg += 'Enterning more wrong answers will help increase the question quality. <br>';            
          }  
          //this.acceptnumber = 2;        
          if(this.submitForm2==false){           
            this.showDialog(); return false;
          }               
      }
      if(wrAnscnt < 3){
        this.showDialog(); return false;
        
      }  
      
    }else{
      //Validation for True/False Question    
      if(!myForm.value.t_f_crt_ans){        
        this.titleMsg = 'Error!';
        this.dlbtn_one = true; this.dlbtn_one_txt='Cancel';
          this.dilogueMsg += 'Please choose the correct answer. <br>';
          //this.showDialog(); return false;
      }    
    }
      if(this.FileorTexts==1){
      if(myForm.value.question_solution=='' || myForm.value.question_solution==undefined){
        if(this.dlgCntrl==0){
          this.titleMsg = 'Warning!';
          this.dlbtn_tow = true; 
          this.dlbtn_two_txt = 'This quesiton does not have a pre defined solution. I would like to Submit the question without solution.';      
          //this.dlbtn_two_txt = 
          this.dilogueMsg += '<span class="alert-danger">Warning - </span> <br>';
          this.dilogueMsg += ' Solution is very important for the review of test results, It will enhance student learning while evaluated.';
          this.dlbtn_one = true; this.dlbtn_one_txt='Cancel';
        }
        if(this.dlgCntrl==1){
          this.dilogueMsg += '<span class="alert-danger">Warning - </span> <br>';
          this.dilogueMsg += ' Solution is very important for the review of test results, It will enhance student learning while evaluated.';
          this.dlbtn_one = true; this.dlbtn_one_txt='Cancel';
        }     
        this.acceptnumber = 1;
        if(this.submitForm==false || !this.submitForm){ this.showDialog();  return false; }   
      }
    }
    //else if(this.FileorTexts==2){
      if(this.FileorTextsols==1){
        //alert(myForm.value.question_solution);
        //if(myForm.value.question_solutionFileEdr=='' || myForm.value.question_solutionFileEdr==undefined){
        if(myForm.value.question_solution=='' || myForm.value.question_solution==undefined){
          //alert(myForm.value.question_solution);
          if(this.dlgCntrl==0){
            this.titleMsg = 'Warning!';
            this.dlbtn_tow = true; 
            this.dlbtn_two_txt = 'This quesiton does not have a pre defined solution.I would like to Submit the question without solution.';      
            //this.dlbtn_two_txt = 
            this.dilogueMsg += '<span class="alert-danger">Warning - </span> <br>';
            this.dilogueMsg += ' Solution is very important for the review of test results, It will enhance student learning while evaluated.';
            this.dlbtn_one = true; this.dlbtn_one_txt='Cancel';
          }
          if(this.dlgCntrl==1){
            this.dilogueMsg += '<span class="alert-danger">Warning - </span> <br>';
            this.dilogueMsg += ' Solution is very important for the review of test results, It will enhance student learning while evaluated.';
            this.dlbtn_one = true; this.dlbtn_one_txt='Cancel';
          }
        }
        //this.showDialog();  
        //return false;
      }else if(this.FileorTextsols==2){       
        if(myForm.value.question_solutionFile=='' || myForm.value.question_solutionFile==undefined){
          //alert('Hiii');
          if(this.dlgCntrl==0){
            this.titleMsg = 'Warning!';
            this.dlbtn_tow = true; 
            this.dlbtn_two_txt = 'This quesiton does not have a pre defined solution.I would like to Submit the question without solution.';      
            //this.dlbtn_two_txt = 
            this.dilogueMsg += '<span class="alert-danger">Warning - </span> <br>';
            this.dilogueMsg += ' Solution is very important for the review of test results, It will enhance student learning while evaluated.';
          }
          if(this.dlgCntrl==1){
            this.dilogueMsg += '<span class="alert-danger">Warning - </span> <br>';
            this.dilogueMsg += ' Solution is very important for the review of test results, It will enhance student learning while evaluated.';
            this.dlbtn_one = true; this.dlbtn_one_txt='Cancel';
          }
        }
        //this.showDialog();  return false;
      }
      //this.display = false;    
    //}   
    // this.qnFormData = {
    //   "inst_ids" : this.inst_id,
    //   "question_solutionFile" : myForm.value.question_solutionFile,
    //   "question_detailsFile"  : this.fileToUpload
    // }

    
    
     console.log('Form Data == ', myForm.value);
   //return false;
    if(this.fileToUpload){
      this.spinnerService.show();
      this._questionsService.questionUpload(myForm.value,this.fileToUpload, this.solfileToUpload).subscribe(
        //this._questionsService.fileUploadwithData().subscribe(
        data => {
          {this.response = data;}       
          this.isSession = 1;
          localStorage.setItem('isSession',this.isSession);
          this.sessionMsg = localStorage.getItem('isSession');

          this.question_detail = ''; this.question_solutions = ''; this.question_solution = '';
          this.selFiles = false; this.selFile = false;
          this.question_solutionFile = ''; this.question_detail = '';
          this.fileToUpload = null;
          let wlist = [1,2,3,4,5,6,7,8,9]; let clist = [1,2,3,4,5];
          for(let w in wlist){ this["wrOptn"+w] = '';  }
          for(let c in clist){ this["crOptn"+c] = '';  }       
          this.qnsText = data;
          this.dlgCntrl = 0; this.cransCount = []; this.wransCount = [];
          this.alertmsgSucc = 'Question created Successfully';
          this.alertmsgClass = 'success';
          this.msgSummery = 'Success'; 
          this.showSuccesss();    
          if(this.question_detail == '' || this.selFiles == false){
            this.spinnerService.hide(); 
          }        
          //console.log('dlgCntrol =', this.dlgCntrl);
          //console.log(' cr ans count ==', this.cransCount);
          //console.log(' wr ans count ==', this.wransCount);
         

        },
        error => {}
      );
     }else{
      this.spinnerService.show();
      this._questionsService.questionUpload(myForm.value,null,null).subscribe(
        //this._questionsService.fileUploadwithData().subscribe(
        data => {
          {this.response = data;}
          //this.spinnerService.hide();
          //console.log('response suren ' ,data);
          this.isSession = 1;
          localStorage.setItem('isSession',this.isSession);
          this.sessionMsg = localStorage.getItem('isSession');

          this.question_detail = ''; this.question_solutions = ''; this.question_solution = '';
          this.selFiles = false; this.selFile = false;
          this.question_solutionFile = ''; this.question_detail = '';
          this.fileToUpload = null;
          let wlist = [1,2,3,4,5,6,7,8,9]; let clist = [1,2,3,4,5];
          for(let w in wlist){ this["wrOptn"+w] = '';  }
          for(let c in clist){ this["crOptn"+c] = '';  }       
          this.qnsText = data;  
          this.dlgCntrl = 0; this.cransCount = []; this.wransCount = [];
          this.alertmsgSucc = 'Question created Successfully';
          this.alertmsgClass = 'success';
          this.msgSummery = 'Success';        
          if(this.question_detail == '' || this.selFiles == false){
            this.spinnerService.hide(); 
          } 
          this.country_id = null;
          this.showSuccesss(); 
          //console.log('dlgCntrol =', this.dlgCntrl);
          //console.log(' cr ans count ==', this.cransCount.length);
          //console.log(' wr ans count ==', this.wransCount.length);
           
        },
        error => {}
      );
     }
    
  }
  showSuccess() {
    this.messageService.add({severity:this.alertmsgClass, summary: this.msgSummery, detail:this.alertmsgSucc});
  }
  showSuccesss() {
    this.messageService.add({severity: this.alertmsgClass, summary: this.msgSummery, detail: this.alertmsgSucc});
    setTimeout(() => {
            
      this._router.navigate(["questionansweruploads"]);
      }, 1000); 
  }
  onReject(){}
}