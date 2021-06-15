import { Component, OnInit,Inject, Input,ViewChild,ElementRef } from '@angular/core';
import { DefaultDataService }from '../default-data.service';
import { Router, ActivatedRoute} from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {MessageService} from 'primeng/api';
import { ContentuploadmangeService } from './contentuploadmange.service';
import { from } from 'rxjs/observable/from';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TypeScriptEmitter, ReadVarExpr } from '@angular/compiler';
import { ClassificationsService } from '../classfications.service';
import { Location } from '@angular/common';
declare var $;
@Component({
  selector: 'app-contntuploadmanage',
  templateUrl: './contntuploadmanage.component.html',
  styleUrls: ['./contntuploadmanage.component.css'],
  providers: [MessageService,ContentuploadmangeService,ClassificationsService]
})
export class ContntuploadmanageComponent implements OnInit {
  @ViewChild('someModal') someModal:ElementRef;
  @ViewChild('courseModel') courseModel:ElementRef;
  @ViewChild('classModel') classModel:ElementRef;
  @ViewChild('classModeln') classModeln:ElementRef;
  @ViewChild('subjectModel') subjectModel:ElementRef;
  @ViewChild('subjectModeln') subjectModeln:ElementRef;
  @ViewChild('courseModeln') courseModeln:ElementRef;
  @ViewChild('verifiedclassf') verifiedclassf:ElementRef;
  @ViewChild('deleteClassf') deleteClassf:ElementRef;
  @ViewChild('lessonModel') lessonModel:ElementRef;
  @ViewChild('lessonModeln') lessonModeln:ElementRef;
  
  /****producation***/
  cars:any;
  selectedCars1:any;
  classification:any;
  selectedclasid:any;
  mediaTypes: any;
  fileToUpload: File = null;
  contentFile: any;
  fileName: string;
  fileExtError: boolean;
  fileExtErrorText: string;
  fileExt: string;
  fileSize: any;
  country: any;
  errorMessage: any;
  clfValues: any;
  is_course_available: boolean;
  is_course_availablen: boolean;
  is_course_notavailable: boolean;
  is_course_notavailablen: boolean;
  crtCrs: any;
  is_subject_notavailable: boolean;
  is_class_notavailable: boolean;
  Check_admin_id: string;
  admintype_id: string;
  inst_id: any;
  contentUpload: FormGroup;
  insertContentResp: any;
  contentUploadData: any;
  alertmsgClass: string;
  msgSummery: string;
  alertmsgSucc: string;
  timelineUrl: any;
  content_title: string;
  fileExtId: any;
  content_sizemb: any;
  content_file: string;
  content_desc: string;
  content_search: string;
  classf_country_id: string;
  classf_course_id_vlaue: string;
  classf_subject_id_vlaue: string;
  classf_class_id_value: string;
  course_id: any ='';
  subject_id: any ='';
  class_id: any ='';
  showLessons: boolean;
  allClassifications: any;
  newClassification: FormGroup;
  allCourses: any;
  allSubjects: any;
  allClasses: any;
  subj_id_avail: boolean;
  allLessons: any;
  noLessons: boolean;
  noLessonsmsg: boolean;
  lesson_value: any;
  crtlsn: any ='';
  checkvalue :number = 0;
  selectedLessonId: any = 0;
  clfValuesn: any;
  subj_id_availn: boolean;
  subject_idn: any ='';
  content_clsf_id: any;
  newClassificationData: any;
  newClassificationRes: any;
  content_id: any;
  course_value: any;
  allLessonsn: any;
  showLessonsn: boolean;
  noLessonsn: boolean;
  noLessonsmsgn: boolean;
  checkvaluen :number = 0;
  lesson_valuen: string;
  selectedLessonIdn: any = 0;
  modalText: string;
  content_owner: any;
  classf_course_id: any;
  classf_subject_id: any;
  classf_class_id: any;
  content_media_type: any;
  created_by_admin: any;
  lesson_name: any;
  checkboxValues: any;
  contentUploads: FormGroup;
  uploadFile: any;
  content_file_id: any;
  singleContent: any;
  is_content_verified: any;
  isData: any;
  verifytext: string;
  is_content_blocked: number;
  blocktext: string;
  deleted_by_admin: any;
  deleteText: string;
  adminProf: any;
  content_verified_date: any;
  content_blocked_date: any;
  content_deleted_date: any;
  block_reason : any;
  delete_reason : any;
  time: Date;
  year: any;
  month: number;
  data: any;
  date: number;
  hour: number;
  minute: number;
  second: number;
  fullDate: string;
  classificationCount: any;
  reasons: any;
  btnblText: string;
  btndlText: string;
  reasonsblvalue: any;
  reasonsdlvalue: any;
  reasonsdlvalues: any;
  reasonsblvalues: any;
  typevalues: any;
  typevalue: any;
  course_idn: any='';
  lessonsList: any[];
  is_subject_notavailablen: boolean;
  is_class_notavailablen: boolean;
  class_idn: any ='';
  fileName2: any;
  content_owner_column : string = 'content_owner_admin';
  firstParam: any;
  selectedcontent_id: any;
  createCourseForm : FormGroup;
  createCourseFormn : FormGroup;
  crsGroup: any;
  course_logoToUpload: File;
  clsfsLogo: any;
  createClassForm: FormGroup;
  createClassFormn : FormGroup;
  subGroup: any;
  createSubjectForm: FormGroup;
  createSubjectFormn : FormGroup;
  subject_valuen : any;
  class_valuen : any;
  course_valuen : any;
  subject_value : any;
  class_value : any;
  is_subject_available : any;
  is_subject_availablen : any;
  is_class_availablen : any;
  countrieslist: any;
  clsfData: any;
  lessData: any;
  subject_values: any;
  selectedlessonList: string;
  clsdata: any;
  domainAndApp: any;
  url: string;
  angularRoute: any;
  uploadUrl: string;
  response: any;
  classificationId: any;
  checkedContentid:any = [];
  btnText:any;
  btnClass:any;
  btnClassd:any;
  clf_lesson_list :any =[];
  selectedLessons: any = [];
  checkcourse:any;
  createLessonForm:FormGroup;
  createLessonFormn:FormGroup;
  checkcoursen:any;
  courseSubbmit: any = false;
  courseSubbmitn: any = false;
  checkclass:any;
  checkclassn:any;
  classSubbmit: any = false;
  classSubbmitn: any = false;
  checksubject:any;
  checksubjectn:any;
  subjectSubbmit: any = false;
  subjectSubbmitn: any = false;
  checklesson:any;
  checklessonn:any;
  lessonSubbmit: any = false;
  lessonSubbmitn: any = false;
allLessonsMap: any = {};

newClassificationSubmmit: any = false
// selectedcontent_id:any;
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private messageService: MessageService,
    private _defaultDataService: DefaultDataService,
    private _router: Router,
    private formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _contentuploadmangeService : ContentuploadmangeService,
    private _classificationsService : ClassificationsService,
    private loc: Location,
    
  ) { }
  addDropdownCss(){
    $('.ui-multiselect .ui-multiselect-panel').css('width','100%');
    $('.ui-multiselect-panel .ui-multiselect-header .ui-multiselect-filter-container').css('width','93%');
    $('.ui-multiselect-panel .ui-multiselect-header').css('width','100%');
    
  }
  editRow(i,subject_id,lesson_id){
    this.getLessonFromSubjectIds(subject_id,i,lesson_id);
  }
  getLessonNames(lesson_id){
    if(lesson_id.split(',').length>1){
      var name = '';
      for(let id of lesson_id.split(',')){
        name += this.allLessonsMap[id] +',';
      }
      return name.substring(0, name.lastIndexOf(","))
    }
    if(lesson_id.split(',').length<2){
      return this.allLessonsMap[lesson_id]
    }
  }
  getAllLesson(inst_id){
    var data ={
      inst_id:inst_id,
      content_id:null
    }
    this._classificationsService.getLessonsonForSubj(data).subscribe(
      data=>{
        for(let i of data){

          this.allLessonsMap[i.lesson_id] = i.lesson_name;
        }
      }
    )
  }
cancelRow(id, i){
  this.selectedLessons = id.split(',');
  $('#editlesson_'+i).css('display','block');
  $('#savelesson_'+i).css('display','none');
  }
  saveRow(i,content_clsf_id){
    var lessonIds = '';
    for(let id of this.selectedLessons){
      lessonIds +=  id +',';
    }
    var body ={
      'content_clsf_id':content_clsf_id,
      'lesson_id': this.selectedLessons.toString()
    }
    this._contentuploadmangeService.updateClassificationLesson(body)
    .subscribe(
      data=>{
        if(data == 3){
          this.getClassifications(this.selectedcontent_id);
        }
      },
      error =>{
      }
    )
  }
  getLessonFromSubjectIds(subject_id,i,lesson_id){
    var body = {
      'inst_id' : this.inst_id,
      'subject_id' : subject_id,
    }
    this.clf_lesson_list = [];
    
    this._classificationsService.getLessonsonForSubj(body).subscribe(
      data=>{
        for (const lsn of data) {
          this.clf_lesson_list.push({ 'label': lsn.lesson_name, 'value': lsn.lesson_id });
          }
  
          this.selectedLessons=lesson_id.split(',');
      $('#editlesson_'+i).css('display','none');
      $('#savelesson_'+i).css('display','block');
      },
      error =>{
  
      }
    )
  }
  ngOnInit() {
    this.Check_admin_id = localStorage.getItem('admin_id');
    this.admintype_id = localStorage.getItem('admintype_id');
    this.inst_id = localStorage.getItem('inst_id');    
    if(this.Check_admin_id==null){
      this._router.navigate(['/']);
    }
    this.firstParam = this._activatedRoute.paramMap
    .subscribe(params => { 
     this.selectedcontent_id = params.get('content_id'); 
      });
      this.content_id = this.selectedcontent_id;
      this.angularRoute = this.loc.path();
      this.url = window.location.href;   
      this.domainAndApp = this.url.replace(this.angularRoute, '');  
      if(this.domainAndApp=='http://localhost:8341/#'){
        this.uploadUrl = 'C:/xampp/htdocs/gemService';
      }else{
        //this.uploadUrl = 'https://www.gemstudent.com/API/';
        this.uploadUrl = '/home/gemstud/public_html/API';
      }
    this.getMediaTypes();
    this.getCountries();
    this.getAllLesson(this.inst_id);
    this.getCourses(this.inst_id);
    this.getSubjects(this.inst_id);
    this.getClasses(this.inst_id);
      if(this.content_id){
        this.getClassifications(this.content_id);
        this.getContent(this.content_id);
      }
    
    this.getAdminProfile(this.Check_admin_id,this.admintype_id);
   
      this.contentUpload = this.formBuilder.group({
      inst_id : new FormControl(''),
      content_owner: new FormControl(''),
      content_file: new FormControl(''),
      content_title : [null, Validators.required],
      content_desc: new FormControl(''),
      content_search: new FormControl(''),
      classf_country_id:[null,Validators.required],
      classf_course_id: new FormControl(''),
      classf_subject_id: new FormControl(''),
      classf_class_id: new FormControl(''),
      classf_course_id_vlaue: new FormControl(''),
      classf_subject_id_vlaue: new FormControl(''),
      classf_class_id_value: new FormControl(''),
      content_media_type: new FormControl(''),
      content_sizemb : new FormControl(''),
      created_by_admin : new FormControl(''),
      lesson_name : new FormControl(''),
      selectedLessonId : new FormControl(''),
      checkboxValues : new FormControl('')
    });
    this.contentUploads = this.formBuilder.group({
      inst_id : new FormControl(''),
      content_owner: new FormControl(''),
      content_media_type: new FormControl(''),
      content_sizemb : new FormControl(''),
      created_by_admin : new FormControl(''),
      content_file : [null, Validators.required],
      //content_file_id : [null, Validators.required],
      content_title : [null, Validators.required],
      content_desc : [null, Validators.required],
      content_search : new FormControl(''),
      classf_country_id : [null, Validators.required],
      classf_course_id_vlaue : [null, Validators.required],
      classf_course_id : new FormControl(''),
      classf_class_id_value : [null, Validators.required],
      classf_class_id : new FormControl(''),
      classf_subject_id_vlaue : [null, Validators.required],
      classf_subject_id : new FormControl(''),
      lesson_name : [null,Validators.required],
      selectedLessonId : new FormControl(''),
      checkboxValues : new FormControl(''),
      originalFileName : new FormControl(''),
      content_owner_column : new FormControl(''),
      uploadUrl : new FormControl('')
    });
    this.createCourseForm = this.formBuilder.group({
      course_fname : ['', Validators.required],
      course_sname : ['', Validators.required],
      inst_id : new FormControl(''),
      crs_search_id : [null, Validators.required],     
    });
    this.createCourseFormn = this.formBuilder.group({
      course_fname : ['', Validators.required],
      course_sname :['', Validators.required],
      inst_id : new FormControl(''),
      crs_search_id : [null, Validators.required],
    });
    this.createClassForm = this.formBuilder.group({
      inst_id : new FormControl(''),
      class_sname : ['', Validators.required],
      class_fname : ['', Validators.required],
    }); 
    this.createClassFormn = this.formBuilder.group({
      inst_id : new FormControl(''),
      class_sname : ['', Validators.required],
      class_fname : ['', Validators.required],
    });
    this.createSubjectForm = this.formBuilder.group({
      inst_id : new FormControl(''),
      subject_sname : ['', Validators.required],
      subject_fname : ['', Validators.required],
      search_id : [null, Validators.required],  
    });
    this.createSubjectFormn = this.formBuilder.group({
      inst_id : new FormControl(''),
      subject_sname : ['', Validators.required],
      subject_fname : ['', Validators.required],
      search_id : [null, Validators.required],      
    });
    this.newClassification = this.formBuilder.group({
      classf_country_idn: [null,Validators.required],
      classf_course_idn: new FormControl(''),     
      classf_subject_idn: new FormControl(''),
      classf_class_idn: new FormControl(''),
      classf_course_id_vlauen : [null,Validators.required],
      classf_subject_id_vlauen: [null,Validators.required],
      classf_class_id_valuen: [null,Validators.required],
      content_id: new FormControl(''),
      inst_id : new FormControl(''),
      checkboxValuesn: new FormControl(''),
      lesson_valuen: new FormControl(''),
      selectedLessonIdn: new FormControl(''),
      lesson_namen:[null,Validators.required]
    });

this.createLessonForm = this.formBuilder.group({
  inst_id : [''],
  subject_name :[{disabled: true}],
  lesson_name : ['',Validators.required],
});
this.createLessonFormn = this.formBuilder.group({
  inst_id : [''],
  subject_namen :[{disabled: true}],
  lesson_namen : ['',Validators.required],
});
this.createLessonForm.controls.subject_name.disable();
this.createLessonFormn.controls.subject_namen.disable();
    this.getAllCourseGroup();
    this.getAllSubjectGroup();
  }
  courseCreateForm(){
    this.courseCreate(this.createCourseForm.value);   
  }

  onClassSearch(event){
    if(event != ''){
     var flage = false;
      for(let val of this.allClasses){
        
       if(((val.class_fname.toLowerCase()).includes(event.toLowerCase())) == true){
         flage = true;
        this.is_class_notavailable = false;
        this.is_class_notavailablen = false;
       }
      }
      if( flage){   
        this.is_class_notavailable = false;
        this.is_class_notavailablen = false;
      }else{
        this.createClassForm.controls.class_fname.setValue(event);
        this.createClassFormn.controls.class_fname.setValue(event);
        this.is_class_notavailable = true;
        this.is_class_notavailablen = true;
      }
    }else{
      this.is_class_notavailable = false; 
      this.is_class_notavailablen = false;

    }


  }
  onCourseSearch(event){
    if(event != ''){
     var flage = false;
      for(let val of this.allCourses){
        
       if(((val.course_fname.toLowerCase()).includes(event.toLowerCase())) == true){
         flage = true;

         this.is_course_notavailablen = false;
        this.is_course_notavailable = false;
       }
      }
      if( flage){   
        this.is_course_notavailable = false;
        this.is_course_notavailablen = false;
      }else{
        this.createCourseForm.controls.course_fname.setValue(event);
        this.createCourseFormn.controls.course_fname.setValue(event);
        this.is_course_notavailable = true;
        this.is_course_notavailablen = true;
      }
    }else{
      this.is_course_notavailable = false; 
      this.is_course_notavailablen = false;

    }


  }
  onCourseCheck(event){
    if(event != ''){
      var flage = false;
       for(let val of this.allCourses){
         
        if(((val.course_fname.toLowerCase().trim()) == event.toLowerCase().trim())){
          flage = true;
 
         this.checkcourse = false;
         this.checkcoursen = false;
        }
       }
       if( flage){   
         this.checkcourse = false;
         this.checkcoursen = false;
       }else{
         this.checkcourse = true;
         this.checkcoursen = true;
       }
     }
  }
  onLessonCheck(event){
    if(event != ''){
      var flage = false;
       for(let val of this.lessonsList){
      
        if(((val.label.toLowerCase().trim()) == event.toLowerCase().trim())){
          flage = true;
         this.checklesson = false;
         this.checklessonn = false;
        }
       }
       if( flage){   
         this.checklesson = false;
         this.checklessonn = false;
       }else{
         this.checklesson = true;
         this.checklessonn = true;
       }
     }
  }
  onSubjectCheck(event){
    if(event != ''){
      var flage = false;
       for(let val of this.allSubjects){
         
        if(((val.subject_fname.toLowerCase().trim()) == event.toLowerCase().trim())){
          flage = true;
 
         this.checksubject = false;
         this.checksubjectn = false;
        }
       }
       if( flage){   
         this.checksubject = false;
         this.checksubjectn = false;
       }else{
         this.checksubject = true;
         this.checksubjectn = true;
       }
     }
  }
  onClassCheck(event){
    if(event != ''){
      var flage = false;
       for(let val of this.allClasses){
         
        if(((val.class_fname.toLowerCase()) == event.toLowerCase())){
          flage = true;
 
         this.checkclass = false;
         this.checkclassn = false;
        }
       }
       if( flage){   
         this.checkclass = false;
         this.checkclassn = false;
       }else{
         this.checkclass = true;
         this.checkclassn = true;
       }
     }
  }
  onSubjectSearch(event){
    if(event != ''){
     var flage = false;
      for(let val of this.allSubjects){
        
       if(((val.subject_fname.toLowerCase()).includes(event.toLowerCase())) == true){
         flage = true;
        this.is_subject_notavailable = false;
        this.is_subject_notavailablen = false;
       }
      }
      if( flage){   
        this.is_subject_notavailable = false;
        this.is_subject_notavailablen = false;
      }else{
        this.createSubjectFormn.controls.subject_fname.setValue(event);
        this.createSubjectForm.controls.subject_fname.setValue(event);
        this.is_subject_notavailable = true;
        this.is_subject_notavailablen = true;
      }
    }else{
      this.is_subject_notavailable = false; 
      this.is_subject_notavailablen = false;

    }


  }
  onLessonsSearch(event){
    if(event != ''){
     var flage = false;
      for(let val of this.lessonsList){
        
       if(((val.label.toLowerCase()).includes(event.toLowerCase())) == true){
         flage = true;
        this.noLessonsn = false;
        this.noLessonsmsgn = false;
        this.noLessons = false;
        this.noLessonsmsg = false;
       }
      }
      if( flage){   
        this.noLessonsn = false;
        this.noLessonsmsgn = false;
        this.noLessons = false;
        this.noLessonsmsg = false;
      }else{
        this.noLessonsn = true;
        this.noLessonsmsgn = true;
        this.noLessons = true;
        this.noLessonsmsg = true;
        // this.lesson_valuen = [];
        this.lesson_value = [];
        // this.createLessonFormn.controls.lesson_namen.setValue(event);
        // this.createLessonForm.controls.lesson_name.setValue(event);
      }
    }else{
      this.noLessonsn = false; 
      this.noLessonsmsgn = false;
      this.noLessons = false; 
      this.noLessonsmsg = false;
    }


  }

  verifyContent(id){
  this.checkedContentid.push(id);
  var  body = {
      "inst_id" : this.inst_id,
      "checkedValues" : this.checkedContentid,
      "admin_id" : this.Check_admin_id
    }
    this._contentuploadmangeService.verifyContent(body).subscribe(
      data => {
        {this.response = data;}
        this.alertmsgClass = 'success';
              this.msgSummery = 'Success';
              this.alertmsgSucc = 'Verified Successfully';
              this.showSuccess();
      },
      error => {}
    );
  }
  deleteclassification(){
    var body = {
      "content_clsf_id": this.classificationId,
      "inst_id": this.inst_id,
      "id":this.Check_admin_id,
      "column":"deleted_by_admin"
    }
    this._classificationsService.deleteClassification(body).subscribe(
      data=>{
        if(data == 1){
            this.getClassifications(this.content_id);
            $(this.deleteClassf.nativeElement).modal('hide');
        }
      },
      error =>{}
    )
  }
  verifyClassification(){
    var body = {
      "content_clsf_id": this.classificationId,
      "inst_id": this.inst_id,
      "id":1,
      "column":"is_verified"
    }
    this._classificationsService.verifyClassification(body).subscribe(
      data=>{
        if(data == 1){
            this.getClassifications(this.content_id);
            $(this.verifiedclassf.nativeElement).modal('hide');
        }
      },
      error =>{}
    )
  }
  courseCreateFormn(){
    this.courseCreaten(this.createCourseFormn.value);
  }
  classCreateForm(){
    this.classCreate(this.createClassForm.value,'');
  }
  classCreateFormn(){    
    this.classCreate(this.createClassFormn.value,'n');
  }
  subjCreateForm(){
    this.subjectCreate(this.createSubjectForm.value,'');
  }
  subjCreateFormn(){
    this.subjectCreate(this.createSubjectFormn.value,'n');
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
  getAdminProfile(Check_admin_id:any, admintype_id:any): any {
    this._contentuploadmangeService.getAdminProfile(Check_admin_id,admintype_id)
    .then((data: any)=> {
          {this.adminProf = data;}
        //console.log(data);
      },
      error => {}
    );
  }
  addnewContent(){    
   //console.log('content validation == ', this.contentUploads.valid);
    if(this.contentUploads.valid){           
      this.insertContent();
    }else{      
      this.validateAllFormFields(this.contentUploads);      
    }    
  }
  isFieldValid1(field: string) {
    return !this.contentUpload.get(field).valid && this.contentUpload.get(field).touched;
  }
  isFieldValid2(field: string) {
    return !this.contentUploads.get(field).valid && this.contentUploads.get(field).touched;
  }

  displayFieldCss1(field: string) {
    return {
      'has-error': this.isFieldValid1(field),
      'has-feedback': this.isFieldValid1(field)
    };
  }
  uploadContent(contentUpload: FormGroup, event:Event){
    event.preventDefault();    
     this.contentUploadData = contentUpload.value   
    this.inst_id = localStorage.getItem('inst_id');
  }
  uploadContents(event){
    event.preventDefault();

    this.contentUploadData = {
      "content_title":this.content_title,
      "inst_id" : this.inst_id,
      "content_owner": this.contentUpload.value.content_owner,
      "content_file": this.content_file,
      "content_desc": this.content_desc,
      "content_search": this.content_search,
      "classf_country_id": this.contentUpload.value.classf_country_id,
      "classf_course_id": this.contentUpload.value.classf_course_id,
      "classf_subject_id": this.contentUpload.value.classf_subject_id,
      "classf_class_id": this.contentUpload.value.classf_class_id,
      "classf_course_id_vlaue": this.contentUpload.value.classf_course_id_vlaue,
      "classf_subject_id_vlaue": this.contentUpload.value.classf_subject_id_vlaue,
      "classf_class_id_value": this.contentUpload.value.classf_class_id_value,
      "content_media_type": this.contentUpload.value.content_media_type,
      "content_sizemb" : this.content_sizemb,
      "created_by_admin" : this.contentUpload.value.created_by_admin,
      "lesson_name" : this.contentUpload.value.lesson_name,
      "selectedLessonId" : this.selectedLessonId,
      "checkboxValues" : this.contentUpload.value.checkboxValues,
    }
    //console.log(this.contentUploadData);
    if(this.contentUpload.valid){
      this.insertContent();
    }else{
      this.validateAllFormFields(this.contentUpload);
    }    
  }
  addnewClassification(newClassification: FormGroup){
    //console.log('new classification == ', newClassification.value);
    this.newClassificationData = newClassification.value
    this.createNewClassificationforOldContent();
  }
  createNewClassificationforOldContent(){
    this.newClassificationSubmmit = true;
    if(this.newClassification.invalid){
      return
    }
    this._contentuploadmangeService.createNewClassificationforOldContent(this.newClassificationData).subscribe(
      data => {
        this.newClassificationRes = data;
        //console.log('new classification data == ', data);
        if(data==false){
          this.modalText = 'For this content similar classification details already existed!';
          $(this.someModal.nativeElement).modal('show');
        }else if(data.result==3){
          this.modalText = 'Below listed topics updated to existing classifiction id '+data.clsf_id+'!';
          $(this.someModal.nativeElement).modal('show');
        }else{
          this.getClassifications(data.content_id);          
          this.modalText = 'New classification created for this content successfully!';
          $(this.someModal.nativeElement).modal('show');
        }       
      },
      error => {}
    );
  }
  getMediaTypes(){
    this._defaultDataService.getMediaTypes().subscribe(
      data => {
        this.mediaTypes=data;        
      },
      error => {});
  }
  handleClsfLogo(file: FileList,table){
    this[table+'_logoToUpload'] = file.item(0);
    var reader = new FileReader();
    reader.onload = (event:any)=>{
      this.clsfsLogo = event.target.result;
    }
  }
  handleTimelinePic(file: FileList){
    this.fileToUpload = file.item(0);  
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.timelineUrl = event.target.result;
    }   
    reader.readAsDataURL(this.fileToUpload);
    this.fileName = this.fileToUpload.name;
    this.fileName2 = this.fileName.split('.').shift();
    this.fileExt = this.fileName.replace(/^.*\./, '');    
    this.fileSize = this.fileToUpload.size;   
    this.fileSize = (0.001)*(this.fileSize);
    this._contentuploadmangeService.checkFileExt(this.fileExt,this.fileSize).subscribe(
          data => {
            {this.contentFile=data}
            if(data==2){
              this.fileExtError = true;
              this.fileExtErrorText = 'Upload only above mentioned types';
              this.content_file_id = '';
            }else{
              if(this.fileSize>=data.mediatyp_minsize && this.fileSize<=data.mediatyp_maxsize){
                this.fileExtError = false;
                //console.log(this.fileExt);
                //console.log(data.mediatyp_id);
                this.fileExtId = data.mediatyp_id;
                this.content_sizemb = this.fileSize;
                this._contentuploadmangeService.contentFileUpload(this.fileToUpload).subscribe(
                  data => {
                    {this.uploadFile= data;}
                    //console.log(data);
                    this.content_file_id = data.result;
                  },
                  error => {}
                );
              }else{
                this.content_file_id = '';
                this.fileExtError = true;
              this.fileExtErrorText = 'Size should be '+data.mediatyp_minsize+' Kb to '+data.mediatyp_maxsize+' Kb';
              }
              
            }
          },      
          error => {}
    );

  }
  getLessonsonFocus(value){
    this._contentuploadmangeService.getLessons(this.subject_id,'').subscribe(
      data => {
        this.allLessons = data;
        //console.log(data);
        if(this.subject_id){
          if(data==2){
            this.noLessonsmsg = true;
            this.noLessons = false;
          }else{
            this.showLessons=true;
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
        //console.log(data);
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
  getLessons(value){
    if(this.subject_id){
    if(value){
      this.lesson_value = value;
      this._contentuploadmangeService.getLessons(this.subject_id,value).subscribe(
        data => {
          {this.allLessons = data;} 
          if(data==2){            
            this.noLessons = true;
            this.noLessonsmsg = false;
            this.showLessons = false;
          }else{
            this.showLessons = true;
          }          
        },
         error => {}
      ); 
           
    }else{
      this.noLessonsmsg = true;
      this.noLessons = false;
      this.showLessons = false;
    }
  }  
  }
  getLessonsn(value){
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
  closeAllChecks(){
    this.showLessons = false;
  }
  closeAllChecksn(){
    this.showLessonsn = false;
  }
  lessonCreate(n){ 
    var body ={
      subj_id:this.subject_id,
      inst_id:this.inst_id
    }
    if (n == '') {
      this.lessonSubbmit = true;
      if(this.createLessonForm.invalid){
        return
      }
      this.subject_id = this.subject_id;
      if(!this.checklesson){
        return
      }
      body['value']=this.createLessonForm.controls.lesson_name.value;
    } else {
      this.lessonSubbmitn = true;
      if(this.createLessonFormn.invalid){
        return
      }
      this.subject_id = this.subject_idn;
      body['value']=this.createLessonFormn.controls.lesson_namen.value;
    }
    this._contentuploadmangeService.createLesson(body).subscribe(
      data => {
        this.crtlsn = data;   
        if(n==''){
          this.noLessons = false;
        }else{
          this.noLessonsn = false;
        } 
        if(n != ''){

          $(this.lessonModeln.nativeElement).modal('hide');
          this.getLessonsonForSubj(2);
        }
        if(n == ''){
          $(this.lessonModel.nativeElement).modal('hide');
          this.getLessonsonForSubj(1);
        }
        this.alertmsgSucc = 'Lesson created Successfully';
        this.alertmsgClass = 'success';
            this.msgSummery = 'Success';                
          this.showSuccess();
      },
      error => {},
    );
  }
  isAnswerProvided(event:any,id:any,val:any,num:any){   
    if(event.target.checked==true){ 
      this.checkvalue = num+1;     
      this.lesson_value = this.checkvalue +'Item Selected'; 
      //alert('true '+ this.checkvalue); 
      if(this.selectedLessonId==0){
        this.selectedLessonId = id;
      }else{
        this.selectedLessonId = this.selectedLessonId+','+id; 
      }
        
    }else{
      this.checkvalue = num-1;
      this.lesson_value = this.checkvalue +'Item Selected';
      //this.selectedLessonId = this.selectedLessonId+','+id;

    }    
  }
  isAnswerProvidedn(event,id,val,num){   
    if(event.target.checked==true){ 
      this.checkvaluen = num+1;     
      this.lesson_valuen = this.checkvaluen +'Item Selected'; 
      //alert('true '+ this.lesson_valuen); 
      if(this.selectedLessonIdn==0){
        this.selectedLessonIdn = id;
      }else{
        this.selectedLessonIdn = this.selectedLessonIdn+','+id; 
      }
        
    }else{
      this.checkvaluen = num-1;
      this.lesson_valuen = this.checkvaluen +'Item Selected';
      //this.selectedLessonId = this.selectedLessonId+','+id;

    }    
  }
  
  insertContent(){    
    //console.log('content data sockets == ',this.contentUploads.value);
      this._contentuploadmangeService.uploadContent(this.contentUploads.value,this.fileToUpload,this.inst_id).subscribe(
      data => {
        this.insertContentResp = data;
        //console.log('content upload response == ', data);
        this.content_id = data.result; 
        this.createTimelineForContent();
        this.contentUploads.reset();     
        // this.contentUploads.value.content_title=this.contentUploads.value.content_desc=this.contentUploads.value.content_search=null;
        // this.contentUploads.value.classf_country_id = this.contentUploads.value.classf_course_id_vlaue = null;
        // this.contentUploads.value.classf_class_id_value = this.contentUploads.value.classf_subject_id_vlaue = null;
        // this.contentUploads.value.lesson_name = null;
        //console.log('content response == ',this.insertContentResp);
        // this.modalText = "New Content '"+this.contentUploads.value.content_title+"' uploaded Sucessfully. You have rewarded with "+data.rewards.user_rewards+". \n A content can have more than one classification. You may want to add more classifications to this content. To do so please proceed to classification section on the right side!";
          this.modalText = "Content uploaded successfully!!" ;
          $(this.someModal.nativeElement).modal('show');
           this.getClassifications(this.content_id);
           //this.getContent(data.content.content_id);
           //this.content_id = data.content.content_id;          
      },
      error => {},      
    );
    return false;
  }   
  createTimelineForContent(){
    this.data = {
      "inst_id" : this.inst_id,
      "content_id" : this.content_id,
      "timeline_type_id"  : 1,
      "timeline_user"     : 2,
      "timeline_admin"    : this.Check_admin_id      
    }
    this._contentuploadmangeService.createTimelineForContent(this.data).subscribe(
      data => {
        { this.response = data.respnse;}
      },
      error => {}
    );
  }
  getCountries(){
  this._defaultDataService.getcountryNamesforProfile().subscribe(
    data => {
      {this.country = data;}
      // for(let cnt of this.countrieslist){
      //   this.countries.push({ id: cnt.cntry_id, name: cnt.cntry_name });
      // }
    },
    error => this.errorMessage = error
  );
}
getCourses(inst_id:any){
  this._contentuploadmangeService.getCoursesUser(inst_id).subscribe(
    data => {
      {this.allCourses = data;}
      //console.log('courses = ', data);
      if(this.course_idn !=''){

        this.newClassification.controls.classf_course_id_vlauen.setValue(this.allCourses[this.allCourses.length - 1].course_id);
        this.course_valuen = this.allCourses[this.allCourses.length - 1].course_id;
      }
      if(this.course_id !=''){
        this.contentUploads.controls.classf_course_id_vlaue.setValue(this.allCourses[this.allCourses.length - 1].course_id);
        this.course_value = this.allCourses[this.allCourses.length - 1].course_id;
      }
    },
    error => {},
  );
}
getSubjects(inst_id){
  this._contentuploadmangeService.getSubjectsUser(inst_id).subscribe(
    data => {
      this.allSubjects = data;
      if(this.subject_idn != ''){

        this.newClassification.controls.classf_subject_id_vlauen.setValue(this.allSubjects[this.allSubjects.length - 1].subject_id);
        this.subject_valuen = this.allSubjects[this.allSubjects.length - 1].subject_id;
        this.getLessonsonForSubj(2);
      }
      if(this.subject_id != ''){

        this.contentUploads.controls.classf_subject_id_vlaue.setValue(this.allSubjects[this.allSubjects.length - 1].subject_id);
        this.subject_value = this.allSubjects[this.allSubjects.length - 1].subject_id;
        this.getLessonsonForSubj(1);
      }
    },
    error => {},
  );
}
getClasses(inst_id:any){
  var body ={
    inst_id: inst_id,
    user_id: this.Check_admin_id
  }
  this._contentuploadmangeService.getClassesUser(body).subscribe(
    data => {
      this.allClasses = data;
      if(this.class_idn !=''){

        this.newClassification.controls.classf_class_id_valuen.setValue(this.allClasses[this.allClasses.length - 1].class_id);
        this.class_valuen = this.allClasses[this.allClasses.length - 1].class_id;
      }
      if(this.class_id !=''){

        this.contentUploads.controls.classf_class_id_value.setValue(this.allClasses[this.allClasses.length - 1].class_id);
        this.class_value = this.allClasses[this.allClasses.length - 1].class_id;
      }
    },
    error => {},
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
      //console.log(data);
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
        }
      }      
    },
    error => {}
  );
}
getLessonsonForSubj(type: any) {
  if (type == 1) { this.subject_id =  this.subject_value; } else { this.subject_id = this.subject_valuen; }
  this.noLessonsmsg = false;
  this.noLessons = false;
  this.lessonsList = [];
  this.selectedlessonList = '';
  this.lessData = {
    'inst_id' : this.inst_id,
    'subject_id' : this.subject_id,
  };
  if(this.subject_id == null){
    this.noLessons = true;
    this.noLessonsmsg = true;
    this.noLessonsn = true;
    this.noLessonsmsgn = true;
    this.lessonsList = [];
    // this.is_subject_notavailablen = false;
    return
  }
  //console.log('lesson data == ', this.lessData);
  this._classificationsService.getLessonsonForSubj(this.lessData).subscribe(
    data => {
      {this.allLessons = data; }
      if (this.allLessons.length <1) {
        this.noLessons = true;
        this.noLessonsmsg = true;
        this.noLessonsn = true;
        this.noLessonsmsgn = true;
        this.showLessonsn = false;
        this.lessonsList = [];
      }else{

        for (const lsn of this.allLessons) {
          this.lessonsList.push({ 'label': lsn.lesson_name, 'value': lsn.lesson_id });
          }
          if(this.crtlsn !=''){

            // this.newClassification.controls.lesson_name.setValue([this.crtlsn])
            // var arr = ""+this.crtlsn
            this.lesson_valuen =this.crtlsn.toString().split();
          }
      }
    },
    error => {}
  );
}
getClassificationValues(value,sname,fname,table){
  this._contentuploadmangeService.getClassificationValue(this.inst_id,value,sname,fname,table).subscribe(
    data => {
      this.clfValuesn = data;
      //console.log(data);
      //alert(value);
      if(value){
          if(data==2){
            this[table+'_valuen'] = value;            
            this['is_'+table+'_notavailablen'] = true;
            this['is_'+table+'_availablen'] = false;
          }else{
            this['is_'+table+'_availablen'] = true;
            this['is_'+table+'_notavailablen'] = false;
          }
      }else{
        this['is_'+table+'_availablen'] = false;
        this['is_'+table+'_notavailablen'] = false;
        this[table+'_idn'] = '';
        if(!this.subject_id){
          this.subj_id_avail=false;
        }
      }      
    },
    error => {}
  );
}
courseCreate(values){    
  this.courseSubbmit = true;
  if(this.createCourseForm.invalid){
    return 
  }
  if(!this.checkcourse){
    return
  }
  this._contentuploadmangeService.createCourse(values).subscribe(
    data => {
      this.crtCrs = data;
      //console.log(data);
      this.course_id = data;
      this.alertmsgClass = 'success';
          this.msgSummery = 'Success!';
          this.alertmsgSucc = 'Course Created Successfully';
          this.showSuccess();
          $(this.courseModel.nativeElement).modal('hide'); 
          this.getCourses(this.inst_id);
      this.is_course_notavailable = false;
    },
    error => {}
  );
}
courseCreaten(value){    
//console.log('course',this.course_logoToUpload);
this.courseSubbmitn = true;
  if(this.createCourseFormn.invalid){
    return 
  }
  if(!this.checkcoursen){
    return
  }
  this._contentuploadmangeService.createCourse(value).subscribe(
    data => {
      this.crtCrs = data;
      //console.log(data);
      this.course_idn = data;
      this.alertmsgClass = 'success';
          this.msgSummery = 'Success!';
          this.alertmsgSucc = 'Course Created Successfully';
          this.showSuccess();
          $(this.courseModeln.nativeElement).modal('hide');
          this.getCourses(this.inst_id);
      this.is_course_notavailablen = false;
    },
    error => {}
  );
}
subjectCreate(values,n){  
  //console.log('subject', this.createSubjectForm.value);
  //console.log(values);
  //return false;
  if(n != ''){
    this.subjectSubbmitn = true;
    if(this.createSubjectFormn.invalid){
      return 
    }
    if(!this.checksubjectn){
      return
    }
  }else{
    this.subjectSubbmit = true;
    if(this.createSubjectForm.invalid){
      return 
    }
    if(!this.checksubject){
      return
    }
  }
  
  this._contentuploadmangeService.createSubject(values).subscribe(
    data => {
      this.crtCrs = data;
      //console.log(data);
      if(n==''){
        this.subject_id = data;
        this.is_subject_notavailable = false;
        $(this.subjectModel.nativeElement).modal('hide');
        this.getSubjects(this.inst_id);
      }else{
        this.subject_idn = data;
      this.is_subject_notavailablen = false;
      $(this.subjectModeln.nativeElement).modal('hide');
      this.getSubjects(this.inst_id);
      }      
      this.alertmsgClass = 'success';
          this.msgSummery = 'Success!';
          this.alertmsgSucc = 'Subject Created Successfully';
          this.showSuccess();
          $(this.subjectModel.nativeElement).modal('hide');
      
    },
    error => {}
  );
}
classCreate(values,n){ 
  if(n != ''){
    this.classSubbmitn = true;
    if(this.createClassFormn.invalid){
      return
    }
    if(!this.checkclassn){
      return
    }
  }else {
    this.classSubbmit = true;
    if(this.createClassForm.invalid){
      return
    }
    if(!this.checkclass){
      return
    }
  }
  this._contentuploadmangeService.createClass(values).subscribe(
    data => {
      this.crtCrs = data;
      
      if(n!=''){       
        this.class_idn = data;
      this.is_class_notavailablen = false;
      $(this.classModeln.nativeElement).modal('hide');
      this.getClasses(this.inst_id);
      }else{       
      this.class_id = data;
      this.is_class_notavailable = false;
      $(this.classModel.nativeElement).modal('hide'); 
      this.getClasses(this.inst_id);
      }      
          this.alertmsgClass = 'success';
          this.msgSummery = 'Success!';
          this.alertmsgSucc = 'Class Created Successfully';
          this.showSuccess();       
          
      
    },
    error => {}
  );
}
showInputValue(id:number,value:string,table:string){    
  this['is_'+table+'_available'] = false;
  this[table+'_value'] = value;
  this[table+'_id'] = id;
  if(this.subject_id){
    this.subj_id_avail = true;
  }else{
    this.subj_id_avail = false;
  }
}
showInputValues(id:any,value:any,table:string){  
 
  this['is_'+table+'_availablen'] = false;
  this[table+'_valuen'] = value;
  this[table+'_idn'] = id;
  if(this.subject_idn){
    this.subj_id_availn = true;
  }else{
    this.subj_id_availn = false;
  }
}
getClassifications(content_id:number){
  this.clsdata = {
    "content_id"  : content_id,
    "inst_id"     : this.inst_id
  }
  //console.log(' clsdata == ', this.clsdata);
  this._contentuploadmangeService.getClassifications(this.clsdata).subscribe(
    data => {
      this.allClassifications = data;
      //console.log(' classification == ', data);
      this.classificationCount = data.length;    
    },
    error => {}
  );
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
getContent(content_id){  
  this._contentuploadmangeService.getContent(content_id).subscribe(
    data => {
      this.singleContent = data;      
      this.is_content_verified = data.is_content_verified;      
      this.is_content_blocked = data.is_content_blocked;      
      this.deleted_by_admin = data.deleted_by_admin;     
      this.content_verified_date = data.content_verified_date;
      this.content_blocked_date = data.content_blocked_date;
      this.content_deleted_date = data.content_deleted_date;
      this.content_title = data.content_title;
      this.getSingleFiletypes(data.content_media_type);     
      this.fileSize = data.content_sizemb;
      if (this.is_content_blocked == 0) { this.btnClass = 'btn-info'; this.btnText = 'Block'; } else { this.btnClass = 'btn-success'; this.btnText = 'Blocked'; }
      if(this.is_content_blocked==0){ this.blocktext = 'Block'; this.btnblText = 'Block';}else{this.blocktext='Blocked'; this.btnblText = 'Unblock'; }
      if(this.deleted_by_admin==null){ this.deleteText = 'Delete'; this.btndlText = 'Delete'; this.btnClassd = 'btn-info';}else{this.deleteText='Deleted';this.btndlText = 'Activate';this.btnClassd = 'btn-danger';}
      this.getblReasonValues(data.bl_reasontyp_id);
      this.getdlReasonValues(data.dl_reasontyp_id);
    },
    error => {}
  );
}
deleteContent(){
  var value = '';
  if(this.deleted_by_admin == null){
    value = this.Check_admin_id
  }else {
    value = null;
  }
  var body ={
    'content_id':this.content_id,
    'admin_id': this.Check_admin_id,
    'value' : value,
    'dl_reasontyp_id':this.delete_reason
  }
  this._contentuploadmangeService.deleteContent(body).subscribe(
    data=>{
      if(data ==1){
        this.getContent(this.content_id);
        this.alertmsgClass = 'success';
        this.msgSummery = 'Success';
        this.showSuccess();    
      }          
      
    },
    error=>{

    }
  )
}
is_ContentVerifications(value:any,column:any,a_column:any,date:any,resnid:any,rsncolum:any){
  //if(resnid){
    var val = '';
  this.time = new Date();
  this.year = this.time.getFullYear();
  this.month = this.time.getMonth()+1;
  this.date = this.time.getDate();
  this.hour = this.time.getHours();
  this.minute = this.time.getMinutes();
  this.second = this.time.getSeconds();
  
  this.fullDate = this.year+'-'+this.month+'-'+this.date+' '+this.hour+':'+this.minute+':'+this.second;
  
  this._contentuploadmangeService.is_ContentVerifications(value,column,this.content_id,this.Check_admin_id,a_column,date,resnid,rsncolum).subscribe(
    data => {
      {this.isData = data;       
        if(data==1){
          if(column=='is_content_verified'){
            this.is_content_verified=1;
            this.alertmsgClass = 'success';
            this.msgSummery = 'Success';
            this.alertmsgSucc = 'Verified Successfully';
            this.content_verified_date = this.fullDate;
          }
          if(column=='is_content_blocked'){
            this.getblReasonValues(resnid);           
            if(this.is_content_blocked==0){ 
              this.is_content_blocked = 1;
              this.alertmsgSucc = 'Blocked Successfully';
              this.blocktext = 'Blocked';
              this.btnblText = 'Unblock';

              if (this.is_content_blocked == 0) { this.btnClass = 'btn-info'; this.btnText = 'Block'; } else { this.btnClass = 'btn-success'; this.btnText = 'Blocked'; }
              this.content_blocked_date = this.fullDate;
            }else{
              this.is_content_blocked=0;
              this.alertmsgSucc = 'UnBlocked Successfully';
              this.blocktext = 'Block';
              this.btnblText = 'Block';

      if (this.is_content_blocked == 0) { this.btnClass = 'btn-info'; this.btnText = 'Block'; } else { this.btnClass = 'btn-success'; this.btnText = 'Blocked'; }
              this.content_blocked_date = this.fullDate;
            }
            this.alertmsgClass = 'success';
            this.msgSummery = 'Success';            
          }
          if(column=='deleted_by_admin'){

            this.getdlReasonValues(resnid);
            if(this.deleted_by_admin==null){ 
              this.deleted_by_admin = 1;
              this.alertmsgSucc = 'Deleted Successfully';
              this.deleteText = 'Deleted';
              this.btndlText = 'Activate';
              if(this.deleted_by_admin==1){ this.deleteText = 'Delete'; this.btndlText = 'Delete'; this.btnClassd = 'btn-info';}else{this.deleteText='Deleted';this.btndlText = 'Activate';this.btnClassd = 'btn-danger';}
              this.content_deleted_date = this.fullDate;
            }else{
              this.deleted_by_admin=null
              this.alertmsgSucc = 'Activated Successfully';
              this.deleteText = 'Delete';
              this.btndlText = 'Delete';

              this.content_deleted_date = this.fullDate;
            }
            this.alertmsgClass = 'success';
            this.msgSummery = 'Success';            
          }          
          this.showSuccess();
        }
      }},
    
    error => {}
  );
   // }
}
getBlockReasons(value:any){
  this._contentuploadmangeService.getBlockReasons(value).subscribe(
    data => {
      {this.reasons = data;}
      //console.log(data);
    },
    error => {},
  );
}
getblReasonValues(resonid:number){
  this._contentuploadmangeService.getbldlReasonValues(resonid).subscribe(
    data => {
      {this.reasonsblvalue = data;}
      if(this.reasonsblvalue !=null){
        this.reasonsblvalues = this.reasonsblvalue.block_reason;
      }
      //console.log(data);
    },
    error => {},
  );
}
getdlReasonValues(resonid:number){
  this._contentuploadmangeService.getbldlReasonValues(resonid).subscribe(
    data => {
      if(data != null){
        this.reasonsdlvalues = data.block_reason;
      }
      //console.log(data);
    },
    error => {},
  );
}
getSingleFiletypes(typeid:number){
  this._contentuploadmangeService.getSingleFiletypes(typeid).subscribe(
    data => {
      {this.typevalues = data;}
      this.fileExt = this.typevalues.mediatyp_extnsn;     
      //console.log(data);
    },
    error => {},
  );
}
showSuccess() {  
  this.messageService.add({severity:this.alertmsgClass, summary: this.msgSummery, detail:this.alertmsgSucc});
}
/* For Production */
onReject(){

}
}
