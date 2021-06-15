import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { ClassificationsService } from '../classfications.service';
import { MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
declare let $:any;
@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css'],
  providers: [MessageService,ClassificationsService],
})
export class LessonsComponent implements OnInit {
  @ViewChild('verifyClassModel') verifyModel:ElementRef;
  @ViewChild('blockModel') blockModel:ElementRef;
  @ViewChild('paginator') paginator:Paginator;
  allLesson: any = [];
  inst_id: any;
  lesson_id: any ='';
  Check_admin_id: any;
  is_lesson_blocked:any;
  limit:any =10;
  offset: any = 0;
  currentPage:any;
  totalCourse: any = 0;
  loading: any = false;
  verify:any = '';
  block: any = '';
  course_fname: any = '';
  subject_id: any = '';
  allSubjects: any = [];
  searchTerm: any = '';
  cancelCall: any = 0;
  cancelCallCount: any = 0;
  constructor(
    
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private classificationService: ClassificationsService) {
    this.inst_id = localStorage.getItem('inst_id');
    this.Check_admin_id = localStorage.getItem('admin_id');
   }

  ngOnInit() {
    this.getAllSubjects(this.inst_id);
  }
  getAllSubjects(inst_id){
    this.classificationService.getSubjects(inst_id).subscribe(
      data=>{
        this.subject_id='';
        this.allSubjects = data;
      },
      error=>{

      }
    )
  }
  searchLesson(){
    this.getLessons(this.inst_id,this.subject_id);
    this.getTotalSubjectsCount(this.inst_id,this.subject_id);

  }
  clearSubject(){
    this.paginator.changePage(0);

  }
  getLessonsFromSubject(event){
    this.subject_id = event.subject_id;
    this.limit = 10;
    this.offset = 0;
    this.block = '';
    this.verify = '';
    this.searchTerm = '';
    this.getLessons(this.inst_id,this.subject_id);
    this.getTotalSubjectsCount(this.inst_id,this.subject_id);
  }
  getLessons(inst_id,subject_id){
    this.loading = true;
    if (this.cancelCall !== 0) {
      this.cancelCall.unsubscribe();
      this.cancelCall = 0;
    }

    this.cancelCall = this.classificationService.getLessonsonForSubjlimit(inst_id,subject_id,this.limit,this.offset,this.block,this.verify,this.searchTerm).subscribe(
      data=>{
        this.lesson_id='';
        this.allLesson = data;
        this.loading = false;
      },
      error=>{

      }
    )
  }
  getTotalSubjectsCount(inst_id,subject_id){
    if (this.cancelCallCount !== 0) {
      this.cancelCallCount.unsubscribe();
      this.cancelCallCount = 0;
    }

    this.cancelCallCount = this.classificationService.getLessonsonForSubjCount(inst_id,subject_id,this.block,this.verify,this.searchTerm).subscribe(
      data=>{
        this.totalCourse = data;
      },
      error=>{

      }
    )
  }
  onPageChange(event){
    if(event.rows){
      this.limit = event.rows;
    }
    this.offset = event.page*this.limit;
    this.getLessons(this.inst_id,this.subject_id);
  }
  verifySubject(){
    var body ={
      'inst_id':this.inst_id,
      'lesson_id':this.lesson_id,
      "subject_id":this.subject_id,
      'admin_id': this.Check_admin_id,
      'value':1
    }
    this.classificationService.verifyLessonsonForSubj(body).subscribe(
      data=>{
        if(data ==1){
            this.getLessons(this.inst_id,this.subject_id);
            $(this.verifyModel.nativeElement).modal('hide');
            $('body').click();
        }
      },
      error=>{

      }
    )
  }
  getBlockCourse(){
    this.offset = 0;
    if ($('#blockCourse').is(":checked")){
      this.block = '1';
      this.getTotalSubjectsCount(this.inst_id,this.subject_id)
      this.getLessons(this.inst_id,this.subject_id);
    }else{

      this.block = '';
      this.getTotalSubjectsCount(this.inst_id,this.subject_id)
      this.getLessons(this.inst_id,this.subject_id);
    }
  }
  getVerifiedCourse(){
    this.offset = 0;
    if ($('#verifiedCourse').is(":checked")){
      this.verify = '0';
      this.getTotalSubjectsCount(this.inst_id,this.subject_id)
      this.getLessons(this.inst_id,this.subject_id);
    }else{

      this.verify = '';
      this.getTotalSubjectsCount(this.inst_id,this.subject_id)
      this.getLessons(this.inst_id,this.subject_id);
    }
  }
  blockCourse(){
var id = null
if(this.is_lesson_blocked =='1'){
  id =this.Check_admin_id;
}
    var body ={
      'inst_id':this.inst_id,
      'lesson_id':this.lesson_id,
      "subject_id":this.subject_id,
      'admin_id':id,
      'value':this.is_lesson_blocked
    }
    this.classificationService.blockunblockLessonsonForSubj(body).subscribe(
      data=>{
        if(data ==1){
            this.getLessons(this.inst_id,this.subject_id);
            $(this.blockModel.nativeElement).modal('hide');
            $('body').click();
        }
      },
      error=>{

      }
    )
  }
  saveFname(i,lesson_id,column){
    var body = {
      "inst_id":this.inst_id,
      "lesson_id":lesson_id,
      "subject_id":this.subject_id,
      "column":column,
      "value":$('#cfame_'+i).val()
    }
    this.classificationService.updateLessonsonForSubj(body).subscribe(
      data=>{
        if(data ==1){
          this.getLessons(this.inst_id,this.subject_id);
        }
      },
      error=>{

      }
    )
    
  }
  cancelRow(i){
    $('#editfame_'+i).css('display','block');
    $('#savefame_'+i).css('display','none');
    }
  editRow(i,class_fname){
    $('#cfame_'+i).val(class_fname);
    $('#editfame_'+i).css('display','none');
    $('#savefame_'+i).css('display','flex');
  }
  saveSname(i,lesson_id,column){
    var body = {
      "inst_id":this.inst_id,
      "lesson_id":lesson_id,
      "subject_id":this.subject_id,
      "column":column,
      "value":$('#sfame_'+i).val()
    }
    this.classificationService.updateSubjects(body).subscribe(
      data=>{
        if(data ==1){
          this.getLessons(this.inst_id,this.subject_id);
        }
      },
      error=>{

      }
    )
    
  }
  cancelRowSname(i){
    $('#editSname_'+i).css('display','block');
    $('#saveSname_'+i).css('display','none');
    }
    editRowSname(i,class_sname){
    $('#sfame_'+i).val(class_sname);
    $('#editSname_'+i).css('display','none');
    $('#saveSname_'+i).css('display','flex');
  }
}