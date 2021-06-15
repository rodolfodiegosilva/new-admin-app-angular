import { Component, OnInit,Inject, Input,ViewChild,ElementRef, Pipe, PipeTransform } from '@angular/core';
import { DefaultDataService }from '../default-data.service';
import { Router, ActivatedRoute} from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {MessageService} from 'primeng/api';
import { ContentviewService } from './contentview.service';
import { from } from 'rxjs/observable/from';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TypeScriptEmitter } from '@angular/compiler';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import Viewer from 'viewerjs';
import { ConfigVariable } from '../shared/app.config';
declare var $;

@Component({
  selector: 'app-contentview',
  templateUrl: './contentview.component.html',
  styleUrls: ['./contentview.component.css'],
  providers: [MessageService,ContentviewService]
})
@Pipe({ name: 'safe' })
export class ContentviewComponent implements OnInit {
  @ViewChild('deleteModel') deleteModel: ElementRef;
  @ViewChild('blockModel') blockModel: ElementRef;
  Check_admin_id: any;
  admintype_id: any;
  inst_id: any;
  firstParam: any;
  selectedcontent_id: any;
  contentData: any;
  contentResponse: any;
  content_id: any;
  content_owner_admin: any;
  content_owner_user: any;
  content_created_date: any;
  content_media_type: any;
  content_path: any;
  content_title: any;
  content_desc: any;
  content_total_clsf_cnt: any;
  lesson_name: any;
  subject_fname: any;
  class_fname: any;
  course_fname: any;
  mediatyp_extnsn: any;
  mediatypes_id: any;
  mediatyp_id: any;
  mediaFullpath: SafeResourceUrl;
  urlSafe: SafeResourceUrl;
  url: string;
  deleteBtn:any = '';
  deleteCls:any = '';
  blockBtn : any = '';
  blockCls: any = '';
  basePath: any = '';
  uploadUrl: any = ConfigVariable.BASE_API_URL;
  is_content_blocked: any;
  reasons: any;
  block_reason: any ='';
  delete_reason : any ='';
  reasonsblvalue: any ='';
  reasonsdlvalue: any = '';
  deleted_by_admin: any;
  is_content_deleted_by_owner: any;
  deleteSubmit: any =false;
  blockSubmit: any = false;
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private messageService: MessageService,
    private _defaultDataService: DefaultDataService,
    private _contentviewService: ContentviewService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public sanitizer: DomSanitizer
  ) { }
  public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
			case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
			case 'style': return this.sanitizer.bypassSecurityTrustStyle(value);
			case 'script': return this.sanitizer.bypassSecurityTrustScript(value);
			case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
			case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
			default: throw new Error(`Invalid safe type specified: ${type}`);
		}
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
                    //alert(this.selecteduserid);
    this.getContent(this.selectedcontent_id);

    $('#iframe').ready(function() {
      setTimeout(function() {
         $('#iframe').contents().find('#download').remove();
      }, 100);
   });
  //let viewer = new Viewer(document.getElementById('iframe'));
  var viewer = new Viewer(document.getElementById('iframeodt'), {
    inline: true,
    viewed: function() {
      viewer.zoomTo(1);
    }
  });
    }
  getContent(content_id){
    this.contentData = {
      "purpose" : "singlecontent",
      "inst_id" : this.inst_id,
      "contentIds" : content_id
    } 
      this._contentviewService.getContent(this.contentData).subscribe(
        data => {
          {this.contentResponse = data;}  
          this.content_id = data.content_id;
          //this.inst_id
          this.content_owner_admin    = data.content_owner_admin;
          this.content_owner_user     = data.content_owner_user;
          this.content_created_date   = data.content_created_date;
          this.content_media_type     = data.content_media_type;
          this.content_path           = data.content_path;
          this.content_title          = data.content_title;
          this.content_desc           = data.content_desc;
          this.content_total_clsf_cnt = data.content_total_clsf_cnt;
          this.lesson_name            = data.lesson_name;
          this.subject_fname          = data.subject_fname;
          this.class_fname            = data.class_fname;
          this.course_fname           = data.course_fname;
          this.mediatyp_extnsn        = data.mediatyp_extnsn;
          this.mediatypes_id          = data.mediatypes_id;
          this.mediatyp_id            = data.mediatyp_id;
          this.is_content_blocked     = data.is_content_blocked;
          this.deleted_by_admin       = data.deleted_by_admin;
          this.getblReasonValues(data.bl_reasontyp_id);
          this.getdlReasonValues(data.dl_reasontyp_id);
          this.is_content_deleted_by_owner = data.is_content_deleted_by_owner;
          if(data.deleted_by_admin == null){
            this.deleteBtn = 'Delete';
            this.deleteCls = 'default';
          }else{
            this.deleteBtn = 'Undelete';
            this.deleteCls = 'danger';
          }
          if(data.is_content_blocked =='0'){
            this.blockBtn = 'Block';
            this.blockCls = 'default';
          }else {
            this.blockBtn = 'Unblock';
            this.blockCls = 'danger';
          }
          if(data.inst_ac_contnt_upload_url !=null){
            this.basePath               = data.inst_ac_contnt_upload_url;
          }else {
            this.basePath               = 'assets/contentUpload/';
          }
          if(this.mediatypes_id==1){
            this.url                = 'https://docs.google.com/gview?url='+this.uploadUrl+ this.basePath + 'instNum_' + this.inst_id + '/contentNum_' + data.content_id + '/' + data.content_path +'&embedded=true';
          }else{
            this.url                = this.uploadUrl  +  this.basePath + 'instNum_' + this.inst_id + '/contentNum_' + data.content_id + '/' + data.content_path;
          }
          this.mediaFullpath          = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
//console.log(data);
        },
        error => {},
      );    
  }
  deleteContent(){
    this.deleteSubmit = true;
    var value = '';
    if(this.deleted_by_admin == null){
      if(this.delete_reason ==''){
        return
      }
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
    this._contentviewService.deleteContent(body).subscribe(
      data=>{
        if(data ==1){
            this.getContent(this.content_id);
            this.deleteSubmit = false;
            $(this.deleteModel.nativeElement).modal('hide');
            $('body').click(); 
        } 
      },
      error=>{
  
      }
    )
  }
  getBlockReasons(value:any){
    this._contentviewService.getBlockReasons(value).subscribe(
      data => {
        {this.reasons = data;}
        //console.log(data);
      },
      error => {},
    );
  }
  getblReasonValues(resonid:number){
    this._contentviewService.getbldlReasonValues(resonid).subscribe(
      data => {
        if(data !=null){
          this.reasonsblvalue = data.block_reason;
        }
        //console.log(data);
      },
      error => {},
    );
  }
  getdlReasonValues(resonid:number){
    this._contentviewService.getbldlReasonValues(resonid).subscribe(
      data => {
        if(data != null){
          this.reasonsdlvalue = data.block_reason;
        }
        //console.log(data);
      },
      error => {},
    );
  }
  is_ContentVerifications(value:any,column:any,a_column:any,date:any,resnid:any,rsncolum:any){
    //if(resnid){
      this.blockSubmit = true;
      if(this.is_content_blocked==0){
        if(this.block_reason ==''){
          return
        }
      }
    
    this._contentviewService.is_ContentVerifications(value,column,this.content_id,this.Check_admin_id,a_column,date,resnid,rsncolum).subscribe(
      data => {   
          if(data==1){
            this.getblReasonValues(this.block_reason);
            $(this.blockModel.nativeElement).modal('hide');
            $(document.body).click();
            if(column=='is_content_blocked'){          
              if(this.is_content_blocked==0){ 
                this.is_content_blocked = 1;
                this.blockSubmit = false;
                if (this.is_content_blocked == 0) { this.blockCls = 'btn-info'; this.blockBtn = 'Block'; } else { this.blockCls = 'danger'; this.blockBtn = 'Unblock'; }
              }else{
                this.is_content_blocked=0;
  
        if (this.is_content_blocked == 0) {this.blockCls = 'btn-info'; this.blockBtn = 'Block'; } else { this.blockCls = 'danger'; this.blockBtn = 'Unblock';}        
            }       
          }
        }},
      
      error => {}
    );
     // }
  }
  disableContextmenu(){    
    return false;
  }

}
