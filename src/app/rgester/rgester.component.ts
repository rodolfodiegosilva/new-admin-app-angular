import { AdminLoginService } from '../login/admin-login.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-rgester',
  templateUrl: './rgester.component.html',
  styleUrls: ['../../assets/gemscss/custom2.css','../../assets/gemscss/component_ui.css']
})
export class RgesterComponent implements OnInit {
  registerAdmin: FormGroup;
  id:any;
  type: any;
  firstParam:any;
  regInstituteget : Array<any> = [];
  errorMessage: any;
  error : any;
  inst_superadmn_eml: any;
  inst_id:any;
  finaldata: any;
  adminCreates : any;
  response : any;
  admintype_id: any;
  private emailpattern = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$';
  linkExpire : boolean = false; 
  alertMsgs: boolean;
  usernamevlidaionerror: string;
  pwadmlidaionerror: string;
  msgSuccLogin: boolean = false;
  alertmsgClass: any;
  alertmsgSucc: any;
  Check_admin_id: any;
  alertMsgUname: boolean;
  availUsername: any;
  admin_id: any;
  alertMsgspwd: boolean;
  pwadmlidaionerrorc: string;
  admin_user_id: any;
  constructor(private _activatedRoute: ActivatedRoute,private _router: Router,private _adminLoginService:AdminLoginService) {
   }
  ngOnInit() {
    this.admin_user_id = '';
    this.Check_admin_id = localStorage.getItem('admin_id');
    //alert(this.Check_admin_id);
    this.registerAdmin = new FormGroup({
      institute_activation_code: new FormControl('',),
      inst_superadmn_nam: new FormControl(''),
      inst_superadmn_eml: new FormControl(''),
      inst_id: new FormControl(''),
      admintype_id: new FormControl(''),
      ac_user_loginid: new FormControl(''),
        ac_pswd: new FormControl('',Validators.required),
      /*ac_pswd: new FormControl('',{
        validators: [Validators.required, Validators.minLength(6)], updateOn: 'blur'}),*/
      // con_pswd: new FormControl('',{
      //   validators: [Validators.required, Validators.minLength(6)], updateOn: 'blur'})
      con_pswd: new FormControl('',Validators.required)
      
    });
   
    this.firstParam = this._activatedRoute.paramMap
    .subscribe(params => { 
     this.id = params.get('id');
     this.type= params.get('type');
       //console.log('Query params ',this.id) 
       this.getadminUser(this.id,this.type);
       
    });
   
  }
  getadminUser(id,type){ 
   
    
    this._adminLoginService.getadminUser(id,type).subscribe(
      data  => {      
          {this.regInstituteget=data;} 
          //console.log('get admins'+data);
         
          
          if(data!=1){
            if(type==3 || type==5){
              this.inst_superadmn_eml = data.inst_superadmn_eml;
              this.inst_id = data.inst_id;
              this.admintype_id = type;
              this.admin_id = data.admin_id;
              this.admin_user_id = data.ac_user_loginid;           
              
            }else if(type==1 || type==2 || type==4 || type==6){
              this.inst_superadmn_eml = data.ac_user_email;
              this.inst_id = data.inst_id;
              this.admintype_id = type;
              this.admin_id = data.admin_id;
              this.admin_user_id = data.ac_user_loginid;
               
            }          
          }else{
            this.linkExpire = true;
          }
      },
      error =>{}
    );
  }
  adminCreate(registerAdmin : FormGroup){
      this.finaldata = registerAdmin.value
      //console.log('What is this---',this.finaldata);   
     if(this.finaldata.ac_pswd === ''){
          
             this.alertMsgspwd=true;
             this.pwadmlidaionerror = "Password is required";
             return
      }else{
        this.alertMsgspwd=false;
      }
      if(this.finaldata.ac_pswd != this.finaldata.con_pswd){
            this.alertMsgspwd=false;
            this.alertMsgs = true;
            
            this.pwadmlidaionerrorc = 'Password and confirm password not matched';
              return     
        }else{
            this.alertMsgs = false;
        }
        this.createAdmin();
      
  }
  checkPassword(value,num){     
    if(num==1){
      if(value){
        if(value.length>5){
          if(this.registerAdmin.value.ac_pswd==this.registerAdmin.value.con_pswd){
            this.alertMsgs = false;
          }else{
            this.alertMsgs = true;
            this.pwadmlidaionerrorc = 'Password and confirm password should be same';
          }
          this.alertMsgspwd=false;
        }else{
          this.alertMsgspwd=true;
        this.pwadmlidaionerror = "Password should have minimum 6 characters";
        }      
      }else{
        this.alertMsgspwd=true;
        this.pwadmlidaionerror = "Password is required";
      }
    }else if(num==2){
      if(value){
          if(this.registerAdmin.value.ac_pswd==this.registerAdmin.value.con_pswd){
            this.alertMsgs = false;
          }else{
            this.alertMsgs = true;
        this.pwadmlidaionerrorc = 'Password and confirm password should be same';
          }
        
      }else{
        this.alertMsgs = true;
        this.pwadmlidaionerrorc = 'Confirm your password';
      }
    }
    
  }
  adminUsernameAvailability(value,column){
    if(value){
      if(value.length>5){
        var body = {
          value:value,
          column:column
        }
    this._adminLoginService.adminUsernameAvailability(body).subscribe(
      data => {
        {this.availUsername = data;}
        if(data==1){
          this.alertMsgUname = true;
          this.usernamevlidaionerror = 'This username is already existed!';
        }else{
          this.alertMsgUname = false;
        }
        //console.log(data);
      },
      error => {}
    );
    }else{
      this.alertMsgUname = true;
          this.usernamevlidaionerror = 'Username should have minimum 6 characters';
    }
    }else{
      this.alertMsgUname = false;
    }
  }
  createAdmin() {
    this._adminLoginService.createAdmin(this.finaldata).subscribe(
      data => {
        {this.response=data;}
       
       if(this.response==1){
        this.msgSuccLogin = true;
        this.alertmsgClass = 'alert-success';
        this.alertmsgSucc = 'You have registered successfully!';
        //this._router.navigate(['home']);
       }
        /*if(this.response==true){
          alert('You have registered successfully');
          this._router.navigate(['user']);
        }else{
          alert('Something went wrong');
          this._router.navigate(['home']);
        }*/
       // response
       
      },
      error => { 
        // error handling
      });
  }
  
}
