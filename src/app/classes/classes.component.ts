import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ClassificationsService } from '../classfications.service';
import { MessageService } from 'primeng/api';
declare let $:any;
@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
  providers: [MessageService,ClassificationsService],
})
export class ClassesComponent implements OnInit {
  @ViewChild('verifyClassModel') verifyModel:ElementRef;
  @ViewChild('blockModel') blockModel:ElementRef;
  allCourse: any = [];
  inst_id: any;
  class_id: any ='';
  Check_admin_id: any;
  is_class_blocked:any;
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
    this.getTotalCourse(this.inst_id);
    this.getAllCourse(this.inst_id);
   }

  ngOnInit() {
  }
  searchClass(){
    this.getTotalCourse(this.inst_id);
    this.getAllCourse(this.inst_id);
  }
  getAllCourse(inst_id){
    this.loading = true;
  if (this.cancelCall !== 0) {
      this.cancelCall.unsubscribe();
      this.cancelCall = 0;
    }

    this.cancelCall =  this.classificationService.getClasseslimit(inst_id,this.limit,this.offset,this.block,this.verify,this.searchTerm).subscribe(
      data=>{
        this.class_id='';
        this.allCourse = data;
        this.loading = false;
      },
      error=>{

      }
    )
  }
  getTotalCourse(inst_id){
   
    if (this.cancelCallCount !== 0) {
      this.cancelCallCount.unsubscribe();
      this.cancelCallCount = 0;
    }

    this.cancelCallCount = this.classificationService.getClassesCount(inst_id,this.block,this.verify,this.searchTerm).subscribe(
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
    this.getAllCourse(this.inst_id);
  }
  verifyClass(){
    var body ={
      'inst_id':this.inst_id,
      'class_id':this.class_id,
      'admin_id': this.Check_admin_id,
      'value':1
    }
    this.classificationService.verifyClass(body).subscribe(
      data=>{
        if(data ==1){
            this.getAllCourse(this.inst_id);
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
      this.getTotalCourse(this.inst_id)
      this.getAllCourse(this.inst_id);
    }else{

      this.block = '';
      this.getTotalCourse(this.inst_id)
      this.getAllCourse(this.inst_id);
    }
  }
  getVerifiedCourse(){
    this.offset = 0;
    if ($('#verifiedCourse').is(":checked")){
      this.verify = '0';
      this.getTotalCourse(this.inst_id)
      this.getAllCourse(this.inst_id);
    }else{

      this.verify = '';
      this.getTotalCourse(this.inst_id)
      this.getAllCourse(this.inst_id);
    }
  }
  blockCourse(){
var id = null
if(this.is_class_blocked =='1'){
  id =this.Check_admin_id;
}
    var body ={
      'inst_id':this.inst_id,
      'class_id':this.class_id,
      'admin_id':id,
      'value':this.is_class_blocked
    }
    this.classificationService.blockunblockClass(body).subscribe(
      data=>{
        if(data ==1){
            this.getAllCourse(this.inst_id);
            $(this.blockModel.nativeElement).modal('hide');
            $('body').click();
        }
      },
      error=>{

      }
    )
  }
  saveFname(i,class_id,column){
    var body = {
      "inst_id":this.inst_id,
      "class_id":class_id,
      "column":column,
      "value":$('#cfame_'+i).val()
    }
    this.classificationService.updateClasses(body).subscribe(
      data=>{
        if(data ==1){
          this.getAllCourse(this.inst_id);
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
  saveSname(i,class_id,column){
    var body = {
      "inst_id":this.inst_id,
      "class_id":class_id,
      "column":column,
      "value":$('#sfame_'+i).val()
    }
    this.classificationService.updateClasses(body).subscribe(
      data=>{
        if(data ==1){
          this.getAllCourse(this.inst_id);
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
