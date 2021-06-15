import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DefaultDataService } from '../default-data.service';
import { ClassificationsService } from '../classfications.service';
import { CreatenotificationService } from './createnotification.service';
import { TimelineService } from '../timeline.service';
import {MessageService} from 'primeng/api';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-createnotification',
  templateUrl: './createnotification.component.html',
  styleUrls: ['./createnotification.component.css'],
  providers: [MessageService,CreatenotificationService,ClassificationsService,TimelineService]
})
export class CreatenotificationComponent implements OnInit {
  @ViewChild('formCreateNotification') formCreateNotification: NgForm;
  clascountry:any;
  selecteclascountry:any;
  allCourses: any;
  country: any;
  course_idn: any='';
  inst_id: any;
  errorMessage: any;
  allClasses: any;
  Check_admin_id: string;
  allSubjects: any;
  lessData: any;
  allLessons: any;
  file: any;
  
  fileToUpload: File = null;
  contentFile: any;
  fileName: string;
  fileExtError: boolean;
  fileExtErrorText: string;
  fileExt: string;
  fileSize: any;
  timelineUrl: any;
  fileName2: any;
  content_file_id: any;
  fileExtId: any;
  content_sizemb: any;
  uploadFile: any;
  fileToUploadName: any;

  alertmsgClass: string;
  msgSummery: string;
  alertmsgSucc: string;
  // FroalaEditor = require('froala-editor');
  error: any;
  notification_detail_error: any;
  file_error : any;
  FileorTexts: number;

  lessonsList: any[];
  noLessonsmsg : any;
  noLessons : any;
  selectedlessonList: any = '';
  subject_values : any;
  lessonsdata: any;
  lesson_name: any;
  getlessons: any;
  timeline_contant_name: string;
  timeline_action_id: any;
  timeline_column_name: string;
  notify_id: any;
  data: { inst_id: any; id: any; timeline_user: any; timeline_admin: any; timeline_type: string; column_name: string; };
  response: any;
  new_timeline_id: any;
  constructor(
    private _createnotificationService : CreatenotificationService,
    private _defaultDataService : DefaultDataService,
    private _classificationsService : ClassificationsService,
    private messageService: MessageService,
    private _timelineService: TimelineService,
  ) { }

  ngOnInit() {
    var data = "";
    this.FileorTexts = 1
    // new this.FroalaEditor('textarea#froala-editor',{
    //   attribution: false
    // });
    // var FroalaEditor = require('froala-editor');
    // new FroalaEditor('textarea#froala-editor');
    // $(document).ready(function() {
    //   $("#demo-editor-bootstrap").Editor();
    // });
    

    this.Check_admin_id = localStorage.getItem('admin_id');
    // this.admintype_id = localStorage.getItem('admintype_id');
    this.inst_id = localStorage.getItem('inst_id'); 
    this.getCountries();
    this.getCourses(this.inst_id);
    this.getClasses(this.inst_id);
    this.getSubjects(this.inst_id);
  }
  changeeditor(event){
    console.log(event);
    var data = "";
    //  this.FroalaEditor('textarea#froala-editor', {
    //   events: {
    //     contentChanged: function () {
    //       data=(this.html.get());
    //       console.log(data);
    //     }
    //   }
    // })
  }
  getCountries(){
    this._defaultDataService.getcountryNamesforProfile().subscribe(
      data => {
        this.country = data;
        // for(let cnt of this.countrieslist){
        //   this.countries.push({ id: cnt.cntry_id, name: cnt.cntry_name });
        // }
      },
      error => this.errorMessage = error
    );
  }

  getCourses(inst_id:any){
    this._createnotificationService.getCoursesUser(inst_id).subscribe(
      data => {
        this.allCourses = data;
      },
      error => {},
    );
  }

  getSubjects(inst_id){
    this._createnotificationService.getSubjectsUser(inst_id).subscribe(
      data => {
        this.allSubjects = data;
      },
      error => {},
    );
  }
  getLessonsonForSubj(id){
    this.formCreateNotification.control.get('lession').setValue('');
    this.subject_values = id;
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

  // getLessons(value:any){   
  //   this.lessonsdata = {
  //     "inst_id"     : this.inst_id,
  //     "subject_id"  : this.subject_values,
  //     "lesson_name" : value
  //   } 
  //   this.lesson_name = value;
  //   this._classificationsService.getLessons(this.lessonsdata).subscribe(
  //     data => {
  //       {this.getlessons = data;} 
  //       if(value){
  //         if(this.subject_values){
  //           this.noLessonsmsg = false;
  //           if(data.length==0){
  //             this.noLessons = true;
  //           }else{
  //             this.noLessons = false;
  //           }
  //         }else{
  //           this.noLessonsmsg = true;
  //         }
  //       }else{
  //         this.noLessonsmsg = false;
  //         this.noLessons = false;
  //       }     
  //     },
  //     error => {},
  //   );
  // }
  // getLessonsonForSubj(id) {
  //   // if (type == 1) { this.subject_id =  this.subject_value; } else { this.subject_id = this.subject_valuen; }
  //   // this.noLessonsmsg = false;
  //   // this.noLessons = false;
  //   // this.lessonsList = [];
  //   // this.selectedlessonList = '';
  //   this.lessData = {
  //     'inst_id' : this.inst_id,
  //     'subject_id' : id,
  //   };
  //   // if(this.subject_id == null){
  //   //   this.noLessons = true;
  //   //   this.noLessonsmsg = true;
  //   //   this.noLessonsn = true;
  //   //   this.noLessonsmsgn = true;
  //   //   this.lessonsList = [];
  //   //   // this.is_subject_notavailablen = false;
  //   //   return
  //   // }
  //   //console.log('lesson data == ', this.lessData);
  //   this._classificationsService.getLessonsonForSubj(this.lessData).subscribe(
  //     data => {
  //       this.allLessons = data; 
  //     //   if (this.allLessons.length <1) {
  //     //     this.noLessons = true;
  //     //     this.noLessonsmsg = true;
  //     //     this.noLessonsn = true;
  //     //     this.noLessonsmsgn = true;
  //     //     this.showLessonsn = false;
  //     //     this.lessonsList = [];
  //     //   }else{
  
  //     //     for (const lsn of this.allLessons) {
  //     //       this.lessonsList.push({ 'label': lsn.lesson_name, 'value': lsn.lesson_id });
  //     //       }
  //     //       if(this.crtlsn !=''){
  
  //     //         // this.newClassification.controls.lesson_name.setValue([this.crtlsn])
  //     //         // var arr = ""+this.crtlsn
  //     //         this.lesson_valuen =this.crtlsn.toString().split();
  //     //       }
  //     //   }
  //     },
  //     error => {}
  //   );
  // }

  getClasses(inst_id:any){
    var body ={
      inst_id: inst_id,
      user_id: this.Check_admin_id
    }
    this._createnotificationService.getClassesUser(body).subscribe(
      data => {
        this.allClasses = data;
        // if(this.class_idn !=''){
  
        //   this.newClassification.controls.classf_class_id_valuen.setValue(this.allClasses[this.allClasses.length - 1].class_id);
        //   this.class_valuen = this.allClasses[this.allClasses.length - 1].class_id;
        // }
        // if(this.class_id !=''){
  
        //   this.contentUploads.controls.classf_class_id_value.setValue(this.allClasses[this.allClasses.length - 1].class_id);
        //   this.class_value = this.allClasses[this.allClasses.length - 1].class_id;
        // }
      },
      error => {},
    );
  }

  // uploadImage(event){
  //   console.log(event);
  //   var file = event.target.files[0];
  //   this.file = file;
  // }

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
    this._createnotificationService.checkFileExt(this.fileExt,this.fileSize).subscribe(
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
                this._createnotificationService.contentFileUpload(this.fileToUpload).subscribe(
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

  FileorTextCtrl(isChecked:boolean,val:number){  
    this.notification_detail_error = "";
    this.file_error = "";
    // this.formCreateNotification.control.get('file').setValue("");
    // this.formCreateNotification.control.get('notification_details').setValue("");
    this.FileorTexts = val;   
    // if(this.FileorTexts == 1){
    //   this.formCreateNotification.control.get('notification_details').setValue("");
    // }else if(this.FileorTexts == 2){
    //   this.formCreateNotification.control.get('file').setValue("");
    // }
  }
  checkActivityTypeTimeline(){
    let data = {
      'acttyp_const_name': 'AC_CREATE_NOTIFICATION',
    };
    //console.log('time line data == ', this.data);
    this._timelineService.checkActivityTypeTimeline(data).subscribe(
      data => {
        if(data[0].acttyp_is_cret_timeline == 1){
          this.createTimelineForNotification();
        }
      },
      error => {}
    );
  }

  createTimelineForNotification() {
    this.data = {
      'inst_id' : this.inst_id,
      'id' : this.timeline_action_id,
      'timeline_type'     : 'AC_CREATE_NOTIFICATION',
      'timeline_user'     : 2,
      'timeline_admin'    : this.Check_admin_id,
      'column_name'       : 'timeline_notify_id'
    };
    //console.log('time line data == ', this.data);
    this._timelineService.createTimeline(this.data).subscribe(
      data => {
        { this.response = data.respnse; }
        //console.log('time line for test == ', data.respnse);
      },
      error => {}
    );
  }
  onSubmitCreateNotification(){
    // var notification_detail = $( "#froala-editor" ).val();
    // console.log(notification_detail);
    // console.log(this.formCreateNotification.value);
    // console.log(this.formCreateNotification.value.lession);
    // var $id = this.formCreateNotification.value.lession;
    // console.log($id.toString());
    // if(this.fileToUpload){
    //   this.fileToUploadName=this.fileToUpload.name;
    // }else{
    //   this.fileToUploadName=null;
    // } 
    
    // return;
    // console.log(this.file);
    if(this.FileorTexts == 1){
      if(!this.formCreateNotification.value.notification_details){
        this.notification_detail_error = " Notification details is required!"
      }
    }else if(this.FileorTexts == 2){
      if(!this.file){
        this.file_error = " File is required!"
      }
    }
    if(this.formCreateNotification.valid){
      // let formData =new FormData();
      //   formData.append('Producimage', this.file);
      var formData = new FormData();
      if(this.fileToUpload){
        formData.append('file_path', this.fileToUpload,this.fileToUpload.name);
      }else{
        formData.append('file_path', "");
      }
      formData.append('inst_id', this.inst_id);
      formData.append('country',this.formCreateNotification.value.country);
      formData.append('course', this.formCreateNotification.value.course);
      formData.append('class', this.formCreateNotification.value.class);
      formData.append('subject', this.formCreateNotification.value.subject);
      formData.append('lession', this.formCreateNotification.value.lession);
      formData.append('title', this.formCreateNotification.value.title);
      formData.append('FileorText', this.formCreateNotification.value.FileorText);
      formData.append('notification_details', this.formCreateNotification.value.notification_details);
      this._createnotificationService.createNotification(formData).subscribe(
        data => {
          console.log(data);
          this.notify_id = data;
          this.timeline_action_id = this.notify_id;
          // this.timeline_column_name = 'timeline_notify_id';
          // this.timeline_contant_name = 'AC_CREATE_NOTIFICATION';
          this.checkActivityTypeTimeline();
          
          console.log(this.notify_id);
          // this.alertmsgClass = 'success';
          // this.msgSummery = 'Success!';
          // this.alertmsgSucc = 'Course Created Successfully';
          // this.showSuccess();
          Swal.fire("Success!", "Notification added successfully!", "success");
          this.formCreateNotification.control.get('lession').setValue('');
          this.formCreateNotification.resetForm();
          this.FileorTexts = 1;
        },
        error => {}
      );
    }
  }
  showSuccess() {  
    this.messageService.add({severity:this.alertmsgClass, summary: this.msgSummery, detail:this.alertmsgSucc});
  }
  // clearForm(){
  //   this.formCreateNotification.map()
  // }
}
