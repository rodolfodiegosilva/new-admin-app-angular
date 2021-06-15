import { DefaultDataService }from '../default-data.service';
import { Component, OnInit, Inject, Input} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
//import {CalendarModule} from 'primeng/calendar';
import {MessageService} from 'primeng/api';
import { DiscussionlistviewService } from '../discussonsearhlistview/discussionlistview.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-discussiondetailedpage',
  templateUrl: './discussiondetailedpage.component.html',
  styleUrls: ['./discussiondetailedpage.component.css'],
  providers: [MessageService,DefaultDataService,DiscussionlistviewService]
})
export class DiscussiondetailedpageComponent implements OnInit {
  Check_admin_id: string;
  admintype_id: string;
  inst_id: string;
  firstParam: any;
  discus_id: string;
  getDisc: any;
  discussion: any;
  inst_name: any;
  user_dname: any;
  discus_date: any;
  discus_desc: any;
  distopic_name: any;
  discus_owner: any;
  user_pic: any;
  getFollow: any;
  followData: any;
  deleteFlwid: any;
  deleteDiscId: any;
  flwdldata: any;
  response: any;
  alertmsgClass: string;
  summary: string;
  alertmsgSucc: string;
  editCommentId : any = '';
  editDescusId  : any = '';  
  edittopicid   : any = '';
  updateData: any;
  deltdesc: any;
  is_discus_verified: any;
  verifydata: any;
  discus_verified_date: any;
  is_discus_blocked: any;
  discus_blocked_date: any;
  distopic_verified_date: any;
  distopic_is_verified: any;
  discus_topic: any;
  distopic_blocked_date: any;
  distopic_is_blocked: any;
  followDiscussion: FormGroup;
  createFollow: any;
  discusn_desc: string;
  distopic_owner: any;
  topicdata: any;
  distopic_is_deleted: any;
  distopic_deleted_by: any;
  distopic_deleted_date: any;
  is_disc_del_by_admin: any;
  discus_deleted_date: any;
  discus_closed_admin: any;
  discus_closed_date: any;
  descData: any;
  is_discus_closed_admin: any;
  discus_closed_ownr: any;
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,    
    private _defaultDataService: DefaultDataService,
    private _router: Router, private fb: FormBuilder,
    private messageService: MessageService,
    private _activatedRoute: ActivatedRoute,
    private _discussionlistviewService : DiscussionlistviewService
  ) { }

  ngOnInit() {
    this.Check_admin_id = localStorage.getItem('admin_id');
    this.admintype_id = localStorage.getItem('admintype_id');
    this.inst_id = localStorage.getItem('inst_id');
    if(this.Check_admin_id==null){
    this._router.navigate(['home']);
  }
  this.firstParam = this._activatedRoute.paramMap
    .subscribe(params => { this.discus_id = params.get('discus_id'); });
    
    this.getsingleDiscussions();
    this.followDiscussion = new FormGroup({
      discusn_desc : new FormControl(''),
      discusn_id   : new FormControl('')
    });
  }

  getsingleDiscussions(){
    this.getDisc = {
      "inst_id"   : this.inst_id,
      "discus_id" : this.discus_id
    } 
    this._discussionlistviewService.getsingleDiscussions(this.getDisc).subscribe(
      data => {
        {this.discussion = data;}  
        if(data){
          this.inst_name = data.inst_name; 
          this.user_dname = data.user_dname;
          this.discus_id = data.discus_id;
          this.discus_date = data.discus_date;     
          this.discus_desc = data.discus_desc;
          this.distopic_name = data.distopic_name;
          this.discus_owner = data.discus_owner;    
          this.distopic_owner = data.distopic_created_by_user
          this.user_pic       = data.user_pic;
          this.is_discus_verified = data.is_discus_verified; 
          this.discus_verified_date = data.discus_verified_date;   
          this.is_discus_blocked = data.is_discus_blocked;   
          this.discus_blocked_date = data.discus_blocked_date; 
          this.distopic_is_verified = data.distopic_is_verified;  
          this.distopic_verified_date = data.distopic_verified_date;  
          this.discus_topic = data.discus_topic;
          this.distopic_blocked_date = data.distopic_blocked_date;
          this.distopic_is_blocked = data.distopic_is_blocked;
          this.distopic_is_deleted = data.distopic_is_deleted;
          this.distopic_deleted_by = data.distopic_deleted_by;
          this.distopic_deleted_date = data.distopic_deleted_date;
          this.is_disc_del_by_admin = data.is_disc_del_by_admin;
          this.discus_deleted_date = data.discus_deleted_date;
          this.discus_closed_date = data.discus_closed_date;
          this.discus_closed_admin = data.discus_closed_admin;
          this.is_discus_closed_admin = data.is_discus_closed_admin;
          this.discus_closed_ownr = data.discus_closed_ownr;
          this.getDiscussionFollow(this.discus_id);
        }       
      },
      error => {}  
    );
  }
  getDiscussionFollow(descid){
    this.getFollow = {
      "discusn_id" : descid,
      "inst_id"    : this.inst_id
    }
    this.discus_id = descid;
    this._discussionlistviewService.getDiscussionFollow(this.getFollow).subscribe(
      data => {
        {this.followData = data;}        
      },
      error => {}
    );
    }
    assignDeleteflid(flid,num){
      if(num==1){
        this.deleteFlwid = flid;
      }else if(num==2){
        this.deleteDiscId = flid;
      }            
    }
    deleteDiscussionComment(flid){
      this.flwdldata = {
        "discusnflw_id" : flid,
        "institute_id"  : this.inst_id
      }     
      this._discussionlistviewService.deleteDiscussionComment(this.flwdldata).subscribe(
        data => {
          { this.response = data; }
          if(data){
            this.alertmsgClass = 'error';
            this.summary = 'Success!';
            this.alertmsgSucc = 'Comment deleted successfully!';
            this.showSuccess();
            this.getDiscussionFollow(this.discus_id);
          }
        },
        error => {}
      );
    }
    editComment(num:number){ 
      this.editCommentId = num;              
    }
    editDescuss(num){
      this.editDescusId = num;
    }
    editTopic(num){
      this.edittopicid = num;
    }
    updateComment(desc,id,cowner){
      this.updateData = {
        "user_id"       : cowner,
        "inst_id"       : this.inst_id,
        "discusn_desc"  : desc,
        "discusnflw_id" : id
      }
      this.editCommentId = '';
      this._discussionlistviewService.updateComment(this.updateData).subscribe(
        data => {
          {this.response = data;}
          if(data){
            this.alertmsgClass = 'success';
            this.summary = 'Success!';
            this.alertmsgSucc = 'Comment updated successfully!';
            this.showSuccess();
            this.getDiscussionFollow(this.discus_id);
          }
        },
        error => {}
      );
    }
    updateDescussion(desc,id,owner){
      this.updateData = {
        "user_id"       : owner,
        "inst_id"       : this.inst_id,
        "discus_desc"   : desc,
        "discus_id"     : id
      }
      this.editDescusId = '';
      this._discussionlistviewService.updateDescussion(this.updateData).subscribe(
        data => {
          {this.response = data;}
          if(data){
            this.alertmsgClass = 'success';
            this.summary = 'Success!';
            this.alertmsgSucc = 'Discussion updated successfully!';
            this.showSuccess();
            this.getsingleDiscussions();
          }
        },
        error => {}
      );
    }
    closeDiscussions(){
      this.descData = {
        "discus_id" : this.discus_id,
        "inst_id"   : this.inst_id,
        "owner_column" : "discus_closed_admin",
        "by_id"    : this.Check_admin_id,
        "closed_value" : this.is_discus_closed_admin,
        "is_owner_column" : "is_discus_closed_admin"
      }
      this._discussionlistviewService.closeDiscussions(this.descData).subscribe(
        data => {
          { this.response = data;}
          this.alertmsgClass = 'error';
            this.summary = 'Success!';
            this.alertmsgSucc = 'Discussion status changed!';
            this.showSuccess();
            this.getsingleDiscussions();
        },
        error => {}
      );
    }
    updateTopic(name,id,owner){
      this.topicdata = {
        "distopic_name"             : name,
        "discus_topic"              : id,
        "distopic_owner"            : owner,
        "distopic_updated_by_admin" :this.Check_admin_id,
        "inst_id"                   : this.inst_id
      }
      this.edittopicid = '';
      this._discussionlistviewService.updateTopic(this.topicdata).subscribe(
        data => {
          {this.response = data;}
          this.alertmsgClass = 'success';
          this.summary = 'Success!';
          this.alertmsgSucc = 'Discussion updated successfully!';
          this.showSuccess();
        },
        error => {}
      );
    }
    deleteDescussion(descid){
      this.deltdesc = {
        "discus_id" : descid,
        "inst_id"   : this.inst_id,
        "by_admin"  : 'is_disc_del_by_admin',
        "is_disc_del" : this.is_disc_del_by_admin
      }     
      this._discussionlistviewService.deleteDescussion(this.deltdesc).subscribe(
        data => {
          {this.response = data;}
          this.alertmsgClass = 'success';
          this.summary = 'Success!';
          this.alertmsgSucc = 'Discussion status changed successfully!';
          this.showSuccess();
          this.getsingleDiscussions();
        },
        error => {}
      );
    }
    verifyDiscussions(colmn,id,value,datecolumn){
      this.verifydata = {
        "inst_id" : this.inst_id,
        "column"  : colmn,
        "value"   : value,
        "discus_id" : id,
        "discus_verified_by"  : this.Check_admin_id,
        "datecolumn" : datecolumn
      } 
    this._discussionlistviewService.verifyDiscussions(this.verifydata).subscribe(
      data => {
        {this.response = data;}
        this.alertmsgClass = 'success';
            this.summary = 'Success!';
            this.alertmsgSucc = 'Status changed successfully!';
            this.showSuccess();
        this.getsingleDiscussions();
      },
      error => {}
    );
    }
    
    verifyTopics(colmn,id,value,datecolumn,verifycolmn){
      this.verifydata = {
        "inst_id" : this.inst_id,
        "column"  : colmn,
        "value"   : value,
        "discus_topic" : id,
        "topic_verified_by"  : this.Check_admin_id,
        "datecolumn" : datecolumn,
        "verifycolmn" : verifycolmn
      } 
     
    this._discussionlistviewService.verifyTopics(this.verifydata).subscribe(
      data => {
        {this.response = data;}
            this.alertmsgClass = 'success';
            this.summary = 'Success!';
            this.alertmsgSucc = 'Status changed successfully!';
            this.showSuccess();
        this.getsingleDiscussions();
      },
      error => {}
    );
    }
    createDiscussionFollow(){
      this.createFollow = {
        "discusn_desc" : this.followDiscussion.value.discusn_desc,
        "discusn_id"    : this.discus_id,
        "admin_id"       : this.Check_admin_id,
        "inst_id"       : this.inst_id
      }      
      this._discussionlistviewService.createDiscussionFollow(this.createFollow).subscribe(
        data => {
          {this.response = data;}
          if(data){
            this.followDiscussion.value.discusn_desc = '';
            this.discusn_desc = '';
            this.alertmsgClass = 'success';
            this.summary = 'Success!';
            this.alertmsgSucc = 'Comment added successfully!';
            this.showSuccess()
            this.getDiscussionFollow(this.discus_id);
          }
        },
        error => {}
      );
    }
    showSuccess() {
      this.messageService.add({severity:this.alertmsgClass, summary: this.summary, detail:this.alertmsgSucc});
    }
    onReject(){
      
    }

}
