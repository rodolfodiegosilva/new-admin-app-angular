import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ClassificationsService } from '../classfications.service';
import { MessageService } from 'primeng/api';
import { DefaultDataService } from '../default-data.service';
import { Paginator } from 'primeng/paginator';
declare let $: any;

@Component({
  selector: 'app-classifsearchlistview',
  templateUrl: './classifsearchlistview.component.html',
  styleUrls: ['./classifsearchlistview.component.css'],
  providers: [MessageService, ClassificationsService],
})
export class ClassifsearchlistviewComponent implements OnInit {
  @ViewChild('verifyModel') verifyModel: ElementRef;
  @ViewChild('blockModel') blockModel: ElementRef;
  @ViewChild('paginator') paginator: Paginator;
  allClassification: any = [];
  inst_id: any;
  classf_id: any = '';
  Check_admin_id: any;
  classf_blocked: any;
  limit: any = 10;
  offset: any = 0;
  currentPage: any;
  totalClassification: any = 0;
  loading: any = false;
  verify: any = '';
  block: any = '';
  course_fname: any = '';
  searchTerm: any = '';
  cancelCall: any = 0;
  cancelCallCount: any = 0;
  country: any = [];
  course: any = [];
  class: any = [];
  subject: any = [];
  status: any = [
    { "label": "No", "value": 0 },
    { "label": "Yes", "value": 1 }
  ];
  selectedCountry: any = [];
  selectedCourse: any = [];
  selectedClass: any = [];
  selectedSubject: any = [];
  selectedVerify: any = [];
  selectedBlocked: any = [];
  constructor(

    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private classificationService: ClassificationsService,
    private defaultService: DefaultDataService
  ) {
    this.inst_id = localStorage.getItem('inst_id');
    this.Check_admin_id = localStorage.getItem('admin_id');
    this.getTotalClassification(this.inst_id);
    this.getAllClassification(this.inst_id);
  }

  ngOnInit() {
    this.getCountry();
    this.getCourses(this.inst_id);
    this.getSubjects(this.inst_id);
    this.getClasses(this.inst_id);
  }
  getCourses(inst_id: any) {
    this.classificationService.getCourses(inst_id).subscribe(
      data => {
        for (let crs of data) {
          this.course.push({ "label": crs.course_fname, "value": crs.course_id });
        }
      },
      error => { },
    );
  }
  getClasses(inst_id: any) {
    this.classificationService.getClasses(inst_id).subscribe(
      data => {
        if (data.length > 0) {
          for (let cls of data) {
            this.class.push({ "label": cls.class_fname, "value": cls.class_id });
          }
        }

      },
      error => { },
    );
  }
  getSubjects(inst_id: any) {
    this.classificationService.getSubjects(inst_id).subscribe(
      data => {
        for (let sub of data) {
          this.subject.push({ "label": sub.subject_fname, "value": sub.subject_id });
        }
      },
      error => { },
    );
  }
  getCountry() {
    this.defaultService.getcountryNamesforProfile().subscribe(
      data => {
        for (let cnt of data) {
          this.country.push({ "label": cnt.cntry_name, "value": cnt.cntry_id });
        }
      },
      error => { },
    );
  }
  searchClassification() {
    this.getTotalClassification(this.inst_id);
    this.getAllClassification(this.inst_id);
  }
  resetFilters() {
    this.limit = 10;
    this.offset = 0;
    $('#blockClassification').prop('checked', false);
    $('#verifiedClassification').prop('checked', false);
    this.selectedBlocked = [];
    this.selectedClass = [];
    this.selectedCountry = [];
    this.selectedCourse = [];
    this.selectedVerify = [];
    this.selectedSubject = [];
    this.searchTerm = '';
    this.verify = '';
    this.block = '';
    this.paginator.changePage(0);
    this.getTotalClassification(this.inst_id);
    this.getAllClassification(this.inst_id);
  }
  setFilters(){
    this.getTotalClassification(this.inst_id);
    this.getAllClassification(this.inst_id);
  }
  getAllClassification(inst_id) {
    this.loading = true;
    if (this.cancelCall !== 0) {
      this.cancelCall.unsubscribe();
      this.cancelCall = 0;
    }
    var body = {
      'inst_id': inst_id,
      'limit': this.limit.toString(),
      'offset': this.offset.toString()
    }
    if (this.verify != '') {
      body['verify'] = this.verify;
    }
    if (this.block != '') {
      body['block'] = this.block;
    }
    if (this.searchTerm != '') {
      body['search'] = this.searchTerm
    }
    if (this.selectedCountry.length > 0) {
      body['contries'] = this.selectedCountry;
    }
    if (this.selectedCourse.length > 0) {
      body['courses'] = this.selectedCourse;
    }
    if (this.selectedSubject.length > 0) {
      body['subjects'] = this.selectedSubject;
    }
    if (this.selectedClass.length > 0) {
      body['classes'] = this.selectedClass;
    }
    if (this.selectedVerify.length > 0) {
      body['verified'] = this.selectedVerify;
    }
    if (this.selectedBlocked.length > 0) {
      body['blocked'] = this.selectedBlocked;
    }
    this.cancelCall = this.classificationService.getAllClassifications(body).subscribe(
      data => {
        this.classf_id = '';
        this.allClassification = data;
        this.loading = false;
      },
      error => {

      }
    )
  }
  getTotalClassification(inst_id) {
    if (this.cancelCallCount !== 0) {
      this.cancelCallCount.unsubscribe();
      this.cancelCallCount = 0;
    }
    var body = {
      'inst_id': inst_id
    }
    if (this.verify != '') {
      body['verify'] = this.verify;
    }
    if (this.block != '') {
      body['block'] = this.block;
    }
    if (this.searchTerm != '') {
      body['search'] = this.searchTerm
    }
    if (this.selectedCountry.length > 0) {
      body['contries'] = this.selectedCountry;
    }
    if (this.selectedCourse.length > 0) {
      body['courses'] = this.selectedCourse;
    }
    if (this.selectedSubject.length > 0) {
      body['subjects'] = this.selectedSubject;
    }
    if (this.selectedClass.length > 0) {
      body['classes'] = this.selectedClass;
    }
    if (this.selectedVerify.length > 0) {
      body['verified'] = this.selectedVerify;
    }
    if (this.selectedBlocked.length > 0) {
      body['blocked'] = this.selectedBlocked;
    }
    this.cancelCallCount = this.classificationService.getAllClassificationsCount(body).subscribe(
      data => {
        this.totalClassification = data;
      },
      error => {

      }
    )
  }
  onPageChange(event) {
    if (event.rows) {
      this.limit = event.rows;
    }
    this.offset = event.page * this.limit;
    this.getAllClassification(this.inst_id);
  }
  verifyClassification() {
    var body = {
      'inst_id': this.inst_id,
      'classf_id': this.classf_id,
      'admin_id': this.Check_admin_id,
      'value': 1
    }
    this.classificationService.verifyClassifications(body).subscribe(
      data => {
        if (data == 1) {
          this.getAllClassification(this.inst_id);
          $(this.verifyModel.nativeElement).modal('hide');
          $('body').click();
        }
      },
      error => {

      }
    )
  }
  getBlockClassification() {

    if ($('#blockClassification').is(":checked")) {
      this.block = '1';
      this.getTotalClassification(this.inst_id)
      this.getAllClassification(this.inst_id);
    } else {

      this.block = '';
      this.getTotalClassification(this.inst_id)
      this.getAllClassification(this.inst_id);
    }
  }
  getVerifiedClassification() {
    if ($('#verifiedClassification').is(":checked")) {
      this.verify = '0';
      this.getTotalClassification(this.inst_id)
      this.getAllClassification(this.inst_id);
    } else {

      this.verify = '';
      this.getTotalClassification(this.inst_id)
      this.getAllClassification(this.inst_id);
    }
  }
  blockClassification() {
    var id = null
    if (this.classf_blocked == '1') {
      id = this.Check_admin_id;
    }
    var body = {
      'inst_id': this.inst_id,
      'classf_id': this.classf_id,
      'admin_id': id,
      'value': this.classf_blocked
    }
    this.classificationService.blockunblockClassification(body).subscribe(
      data => {
        if (data == 1) {
          this.getAllClassification(this.inst_id);
          $(this.blockModel.nativeElement).modal('hide');
          $('body').click();
        }
      },
      error => {

      }
    )
  }
  // saveFname(i,classf_id,column){
  //   var body = {
  //     "inst_id":this.inst_id,
  //     "classf_id":classf_id,
  //     "column":column,
  //     "value":$('#cfame_'+i).val()
  //   }
  //   this.classificationService.updateClassification(body).subscribe(
  //     data=>{
  //       if(data ==1){
  //         this.getAllClassification(this.inst_id);
  //       }
  //     },
  //     error=>{

  //     }
  //   )

  // }
  // cancelRow(i){
  //   $('#editfame_'+i).css('display','block');
  //   $('#savefame_'+i).css('display','none');
  //   }
  // editRow(i,course_fname){
  //   $('#cfame_'+i).val(course_fname);
  //   $('#editfame_'+i).css('display','none');
  //   $('#savefame_'+i).css('display','flex');
  // }
  // saveSname(i,classf_id,column){
  //   var body = {
  //     "inst_id":this.inst_id,
  //     "classf_id":classf_id,
  //     "column":column,
  //     "value":$('#sfame_'+i).val()
  //   }
  //   this.classificationService.updateClassification(body).subscribe(
  //     data=>{
  //       if(data ==1){
  //         this.getAllClassification(this.inst_id);
  //       }
  //     },
  //     error=>{

  //     }
  //   )

  // }
  // cancelRowSname(i){
  //   $('#editSname_'+i).css('display','block');
  //   $('#saveSname_'+i).css('display','none');
  //   }
  //   editRowSname(i,course_sname){
  //   $('#sfame_'+i).val(course_sname);
  //   $('#editSname_'+i).css('display','none');
  //   $('#saveSname_'+i).css('display','flex');
  // }
}
