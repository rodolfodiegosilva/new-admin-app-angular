import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { ClassificationsService } from '../classfications.service';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { MessageService } from '../../customodule/primeng/api';
declare let $: any;
@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css'],
  providers: [MessageService,ClassificationsService],
})
export class SubjectsComponent implements OnInit {
  @ViewChild('verifyClassModel') verifyModel:ElementRef;
  @ViewChild('blockModel') blockModel:ElementRef;
  allCourse: any = [];
  inst_id: any;
  subject_id: any ='';
  Check_admin_id: any;
  is_subject_blocked:any;
  limit:any =10;
  offset: any = 0;
  currentPage:any;
  totalCourse: any = 0;
  loading: any = false;
  verify:any = '';
  block: any = '';
  course_fname: any = '';
  searchTerm: any = '';
  cancelCall: any = 0;
  cancelCallCount: any = 0;
  constructor(
    
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private classificationService: ClassificationsService) {
    this.inst_id = localStorage.getItem('inst_id');
    this.Check_admin_id = localStorage.getItem('admin_id');
    this.getTotalSubjectsCount(this.inst_id);
    this.getAllSubjects(this.inst_id);
   }

  ngOnInit() {
  }
  searchSubject(){
    this.getTotalSubjectsCount(this.inst_id);
    this.getAllSubjects(this.inst_id);
  }
  getAllSubjects(inst_id){
    this.loading = true;
    if (this.cancelCall !== 0) {
        this.cancelCall.unsubscribe();
        this.cancelCall = 0;
      }
  
      this.cancelCall =  this.classificationService.getSubjectslimit(inst_id,this.limit,this.offset,this.block,this.verify,this.searchTerm).subscribe(
      data=>{
        this.subject_id='';
        this.allCourse = data;
        this.loading = false;
      },
      error=>{

      }
    )
  }
  getTotalSubjectsCount(inst_id){

    if (this.cancelCallCount !== 0) {
      this.cancelCallCount.unsubscribe();
      this.cancelCallCount = 0;
    }

    this.cancelCallCount =  this.classificationService.getSubjectsCount(inst_id,this.block,this.verify,this.searchTerm).subscribe(
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
    this.getAllSubjects(this.inst_id);
  }
  verifySubject(){
    var body ={
      'inst_id':this.inst_id,
      'subject_id':this.subject_id,
      'admin_id': this.Check_admin_id,
      'value':1
    }
    this.classificationService.verifySubjects(body).subscribe(
      data=>{
        if(data ==1){
            this.getAllSubjects(this.inst_id);
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
      this.getTotalSubjectsCount(this.inst_id)
      this.getAllSubjects(this.inst_id);
    }else{

      this.block = '';
      this.getTotalSubjectsCount(this.inst_id)
      this.getAllSubjects(this.inst_id);
    }
  }
  getVerifiedCourse(){
    this.offset = 0;
    if ($('#verifiedCourse').is(":checked")){
      this.verify = '0';
      this.getTotalSubjectsCount(this.inst_id)
      this.getAllSubjects(this.inst_id);
    }else{

      this.verify = '';
      this.getTotalSubjectsCount(this.inst_id)
      this.getAllSubjects(this.inst_id);
    }
  }
  blockCourse(){
var id = null
if(this.is_subject_blocked =='1'){
  id =this.Check_admin_id;
}
    var body ={
      'inst_id':this.inst_id,
      'subject_id':this.subject_id,
      'admin_id':id,
      'value':this.is_subject_blocked
    }
    this.classificationService.blockunblockSubjects(body).subscribe(
      data=>{
        if(data ==1){
            this.getAllSubjects(this.inst_id);
            $(this.blockModel.nativeElement).modal('hide');
            $('body').click();
        }
      },
      error=>{

      }
    )
  }
  saveFname(i,subject_id,column){
    var body = {
      "inst_id":this.inst_id,
      "subject_id":subject_id,
      "column":column,
      "value":$('#cfame_'+i).val()
    }
    this.classificationService.updateSubjects(body).subscribe(
      data=>{
        if(data ==1){
          this.getAllSubjects(this.inst_id);
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
  saveSname(i,subject_id,column){
    var body = {
      "inst_id":this.inst_id,
      "subject_id":subject_id,
      "column":column,
      "value":$('#sfame_'+i).val()
    }
    this.classificationService.updateSubjects(body).subscribe(
      data=>{
        if(data ==1){
          this.getAllSubjects(this.inst_id);
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