import { AdminLoginService } from './admin-login.service';
import { Component, OnInit,Inject } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';
//import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {MessageService} from 'primeng/api';
import { ManageinstituteService }  from '../instutesmanage/manageinstitute.service';
//mml2
import * as CryptoJS from 'crypto-js';
declare let $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../assets/gemscss/custom2.css','../../assets/gemscss/component_ui.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  Check_admin_id:any;
  adminLogin:FormGroup;
  forgotPassword: FormGroup;
  admindata:any;
  response : any;
  key: any;
  val: any;
  public data:any=[];
  alertMsgs: boolean=false;
  saloginvlidaionerror: any;
  saloginvpwlidaionerror: string;
  errorReg = '';
  errors = '';
  erroruser = '';
  errorpass = '';
  errorterms = '';
  alertMsg: boolean=false;
  alertClass: any;
  alertText: any;
  alertmsgClass: any;
  summary: any;
  alertmsgSucc: any;
  private emailpattern = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$';
  availId: string;
  adminAvail: any;
  instAdminEmail: boolean;
  instAdminEmailErrText: string;
  forgotData: any;
  checkData: any;
  constructor(
  @Inject(LOCAL_STORAGE) private storage: WebStorageService,
  private fb: FormBuilder,private _adminLoginService: AdminLoginService,
  private messageService: MessageService,
  private _manageinstituteService : ManageinstituteService,
    private _router: Router) { }

  ngOnInit() {    
    this.Check_admin_id = localStorage.getItem('admin_id');
    //alert('hi');
    //alert(this.Check_admin_id);
    if(this.Check_admin_id!=null){
      this._router.navigate(['superadmin']);
    }
    
    this.adminLogin = new FormGroup({
      user_name: new FormControl('' ,[Validators.required]),
      user_pass: new FormControl('',[Validators.required])
    });
    this.forgotPassword = new FormGroup({
      userEmail: new FormControl('', {
        validators: [Validators.required, Validators.pattern(this.emailpattern)], updateOn: 'blur'
      })
    });
    
  }
  //mml2
    encrypt(userInfo){

      const message = userInfo;
      
      const key = CryptoJS.enc.Hex.parse("da69304530ae647a0fd96bffdda88248");
      const iv = CryptoJS.enc.Hex.parse("4a4d85a6cfd38525fb4e2de31481ba1f");

      const encrypted = CryptoJS.AES.encrypt(message, key, {
          iv,
          padding: CryptoJS.pad.ZeroPadding,
      });

      return encrypted.toString();

  }

  loginAdmin(adminLogin: FormGroup){
    //console.log('=========', adminLogin.value);
    if(this.adminLogin.value.user_name ===''){
      this.alertMsgs=true;
      this.saloginvlidaionerror = "Enter UserName";
    }else if(this.adminLogin.value.user_pass ===''){
      this.alertMsgs=true;
      this.saloginvpwlidaionerror = "Enter  Password";
    }else{
     //mml2
      this.admindata = {
        'user_name': this.encrypt(adminLogin.value.user_name),
        'user_pass': this.encrypt(adminLogin.value.user_pass)
     }
      //console.log('===Admin Data======', this.admindata);
      this.allLogin();
    }
   
  }
  sendforgotPassword(forgotPassword: FormGroup){
    if(forgotPassword.controls.userEmail.value === null ){
      return
    }
    if(this.instAdminEmail){
      return
    }
    this.forgotData = forgotPassword;
    this.sendforgotPasswordEmail();
  }
  sendforgotPasswordEmail(){
    //mml2
    this._adminLoginService.sendforgotPasswordEmail(this.encrypt(this.forgotPassword.value)).subscribe(
      data => {
        this.response = data;
        if(data==1){
          this.alertmsgClass = 'success';
          this.summary = 'Success';
          this.alertmsgSucc = 'Resent link sent to your email!';
          $('#forgotPassword').modal('hide');
          this.forgotData.reset();
          this.showSuccess();
        }else{
          this.alertmsgClass = 'error';
          this.summary = 'Error';
          this.alertmsgSucc = 'Something is wrong!';
          this.showSuccess();
        }
      },
      error => {});
  }
  allLogin() {    
    this.alertMsg = false;
    this._adminLoginService.sendLogins(this.admindata).subscribe(
      data => {      
        {this.response=data.data;}
        console.log("all Login", data);
        if(data.data==1){
          this.alertMsg = true;
          this.alertClass = 'alert alert-danger';
          this.alertText = 'Your account is not in active status'; 
          $('#exampleModal').modal('show');        
        }else if(data.data==2 || data.data==3){
          this.alertmsgClass = 'error';
          this.summary = 'Error';
          this.alertmsgSucc = 'Provided password or login id is wrong!';
          $('#exampleModal').modal('show');
          // this.showSuccess();         
        }else if(data.data==4){          
          this.alertmsgClass = 'error';
          this.summary = 'Error';
          this.alertmsgSucc = 'Your account is not in active status. Please contact your admin!';
          $('#exampleModal').modal('show');
          // this.showSuccess();          
        }else if(data.data==5){         
          this.alertmsgClass = 'error';
          this.summary = 'Error';
          this.alertmsgSucc = 'Your account is deleted. Please contact your admin!';
          $('#exampleModal').modal('show');
          // this.showSuccess();          
        }
        else{  
          //console.log('admin data == ', data);
            localStorage.setItem('adminData',JSON.stringify(data));
            localStorage.setItem('adminToken',JSON.stringify(data.Token))      
            localStorage.setItem('admin_id',data.data.adminData.admin_id);
            localStorage.setItem('ac_user_email',data.data.adminData.ac_user_email);
            localStorage.setItem('ac_branch_id',data.data.adminData.ac_branch_id);
            localStorage.setItem('inst_id',data.data.adminData.inst_id);
            localStorage.setItem('ac_status',data.data.adminData.ac_status);
            localStorage.setItem('admin_dname',data.data.adminData.admin_dname);
            localStorage.setItem('admintype_id',data.data.adminData.admintype_id);
          this.alertmsgClass = 'success';
          this.summary = 'Success';
          this.alertmsgSucc = 'You have seccessfully Logged in!';
          this.showSuccess();           
          this._router.navigate(['superadmin']);            
        }     
      },
      error => { 
        // error handling
      });
  }
  CheckAdminAvailability(value,column){
    
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(value).toLowerCase())){
      this.instAdminEmail = true;
      this.instAdminEmailErrText = "This email is not valid";
      return
    }else{
      this.instAdminEmail = false;
      this.instAdminEmailErrText = "";
    }
    this.checkData = {
      "value"   : value,
      "column"  : column,
      "availId" : "",
      "w_column" : "admin_id",
      "table"   : "admin_access"
    }     
    this._manageinstituteService.CheckAdminAvailability(this.checkData).subscribe(
      data => {
        {this.adminAvail=data;}
        //alert(data);
        if(value){         
          if(data==3){
            this.instAdminEmail = true;
            this.instAdminEmailErrText = "This email is not registered with us!";
          }else{
            this.instAdminEmail = false;
          }  
        }else{
          this.instAdminEmail = false;
        }
       
      },
      error => {}
    );
  }
  showSuccess() {
    this.messageService.add({severity:this.alertmsgClass, summary: this.summary, detail:this.alertmsgSucc});
}
/* For Production */
onReject(){
  
}
 /* saveInLocal(key, val){
    alert('in save in local function '+val);
    this.storage.set(key, val);
    this.data[key]= this.storage.get(key);
  }*/
  /*----  Method used to clear fields on key press  ---*/
  clearmessage() {
    this.errors = '';
    this.errorReg = '';
    this.erroruser = '';
    this.errorpass = ' ';
    this.errorterms = '';
  }
}
