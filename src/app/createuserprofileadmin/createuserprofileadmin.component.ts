import { Component, OnInit } from '@angular/core';
import { DefaultDataService }from '../default-data.service';
import { CreateuserbyadminService } from '../createuserprofileadmin/createuserbyadmin.service';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MessageService} from '../../../node_modules/primeng/api';
import * as $ from 'jquery';
@Component({
  selector: 'app-createuserprofileadmin',
  templateUrl: './createuserprofileadmin.component.html',
  styleUrls: [
  '../../assets/superadmin/dist/css/app.min.css',
  '../../assets/superadmin/dist/css/component_ui.min.css',
  '../../assets/superadmin/material_icons/materia_icons.css',
  '../../assets/superadmin/dist/css/custom.css',
  '../../assets/superadmin/plugins/bootstrap-toggle/bootstrap-toggle.min.css',
  './createuserprofileadmin.component.css',
   ],
   providers:[MessageService]
})
export class CreateuserprofileadminComponent implements OnInit {
  createUser : FormGroup;
  country: any;
  errorMessage: any;
  states: any;
  response: any;
  userCountry: any;
  cities: any;
  userState: any;
  userTypes: any;
  finaldata: any;
  dateselect:any;
  options: any = {
    autoApply: false,
    alwaysShowCalendars: false,
    linkedCalendars: true,
    singleDatePicker: false,
    showWeekNumbers: false,
    showISOWeekNumbers: false
  };
  uac_phone: number;
  phoneEnable_1: boolean;
  phoneEnable_2: boolean;
  phoneEnable_3: boolean;
  alertmsgClass: string;
  alertmsgSucc: string;
  msgSummery: string;
  userEmailErrText: any;
  usernameErrText: any;
  userEmailErr: boolean;
  usernameErr: boolean;
  userTypeErr: boolean;
  userTypeErrText: string;
  Check_admin_id: any;
  admintype_id: any;
  inst_id: any;
  userCity: any;
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
/*********for producation------- */
  user_state:any;
  countryISDConde:any;
  user_city:any;
 
  /***********--------------- */
  private emailpattern = '[a-zA-Zhrhnjmh87kxerp0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$';
  constructor(
    private messageService: MessageService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router, 
    private fb: FormBuilder, 
    private  _defaultDataService : DefaultDataService,
    private _createuserbyadminService : CreateuserbyadminService,
  ) {
    this.createUser       = new FormGroup({
     
      user_email          : new FormControl('',{
        validators: [Validators.required, Validators.pattern(this.emailpattern)], updateOn: 'blur'}),
      user_alt_email      : new FormControl('',{
        validators: [Validators.required, Validators.pattern(this.emailpattern)], updateOn: 'blur'}),
      user_phone_code     : new FormControl(''),
      user_phone          : new FormControl('',{
        validators: [Validators.required, Validators.minLength(6)], updateOn: 'blur'}),
      user_alt_phone      : new FormControl('',{
        validators: [Validators.required, Validators.minLength(6)], updateOn: 'blur'}),

      uac_email           : new FormControl('',{
        validators: [Validators.required, Validators.pattern(this.emailpattern)], updateOn: 'blur'}),
         username           : new FormControl('',{
        validators: [Validators.required, Validators.minLength(6)], updateOn: 'blur'}),
      uac_phone           : new FormControl('',{
        validators: [Validators.required, Validators.minLength(6)], updateOn: 'blur'}),
      usertype_id         : new FormControl('')
    });
   }


   
  ngOnInit() {
    this.Check_admin_id = localStorage.getItem('admin_id');
    this.admintype_id = localStorage.getItem('admintype_id');
    this.inst_id = localStorage.getItem('inst_id');
    this.userCountry = '';
    this.userState = '';
    this.userCity = ''; 
    if(this.Check_admin_id==null){
      this._router.navigate(['/']);
    }
    this.getCountry();
    this.getuserTypes();
    this.uac_phone = 0;
    this.createUser       = new FormGroup({
      uac_school          : new FormControl(''),
      Created_by_admin    : new FormControl(''),
      user_dname          : new FormControl(''),
      user_fname          : new FormControl(''),
      user_mname          : new FormControl(''),
      user_lname          : new FormControl(''),
      user_gender         : new FormControl(''),
      user_dob            : new FormControl(''),
      user_email          : new FormControl('',{
        validators: [Validators.required, Validators.pattern(this.emailpattern)], updateOn: 'blur'}),
      user_alt_email      : new FormControl('',{
        validators: [Validators.required, Validators.pattern(this.emailpattern)], updateOn: 'blur'}),
      user_phone_code     : new FormControl(''),
      user_phone          : new FormControl('',{
        validators: [Validators.required, Validators.minLength(6)], updateOn: 'blur'}),
      user_alt_phone      : new FormControl('',{
        validators: [Validators.required, Validators.minLength(6)], updateOn: 'blur'}),
         username           : new FormControl('',{
        validators: [Validators.required, Validators.minLength(6)], updateOn: 'blur'}),
      user_alt_phone_code : new FormControl(''),
      user_fax            : new FormControl(''),
      user_fax_code       : new FormControl(''),
      user_school         : new FormControl(''),
      user_class          : new FormControl(''),
      user_country        : new FormControl(''),
      user_state          : new FormControl(''),
      user_city           : new FormControl(''),
      user_address        : new FormControl(''),  
      uac_email           : new FormControl('',{
        validators: [Validators.required, Validators.pattern(this.emailpattern)], updateOn: 'blur'}),
      uac_phone           : new FormControl(''),
      usertype_id         : new FormControl('')
    });
  }
 
  getCountry(){
    this._defaultDataService.getcountryNamesforProfile().subscribe(
      data => this.country = data,     
      error => this.errorMessage = error
    );
  }
  getStatesoncountry(country){   
     
    this._defaultDataService.getStatesoncountries(country).subscribe(
      data => {
        {
          this.states = data;
          this.cities = [];
        }    },
      error => this.errorMessage = error
    );
    this._defaultDataService.getCountryCode(country).subscribe(  
      data => {
         {
           this.response=data;          
         }
         this.userCountry = data.cntry_name;  
             },
      error => {this.errorMessage=error}    
    );
   
  }
  getCitiesonstates(state){    
    this._defaultDataService.getCitiesonstates(state).subscribe(
      data => this.cities = data,
      error => this.errorMessage = error
    );
    this._defaultDataService.getStateonState(state).subscribe(
      data => {
        {this.states = data;}
        this.userState=  data[0].state_name;            
      },
      error => this.errorMessage = error
    );
  }
  getCitiesoncities(city){    
   
    this._defaultDataService.getCitiesoncity(city).subscribe(
      data => {
        {this.cities = data;}
        this.userCity= data[0].city_name;    
      },
      error => this.errorMessage = error
    );
  }
  setAdress(name){
  }
  getuserTypes(){
    this._createuserbyadminService.getuserTypes().subscribe(
      data => this.userTypes = data,
      error => this.errorMessage = error
    )}
  UserCreate(createUser: FormGroup){
    this.finaldata = createUser.value;
    this.finaldata.state = this.userState;
    this.finaldata.city = this.userCity;
    this.finaldata.country = this.userCountry;
    //console.log(this.finaldata);
    if(!createUser.value.usertype_id){
      this.userTypeErr = true;
      this.userTypeErrText = 'Please select usertype';
    }else{
      this.userTypeErr = false;
    }
    //alert(createUser.value.usertype_id);
    //console.log('The values are '+createUser.value);    
    if(  this.userTypeErr!=undefined && this.userTypeErr==false && (this.userEmailErr!=undefined || this.usernameErr !=undefined) && (this.usernameErr ==false || this.userEmailErr ==false )){
      this.createUserbyAdmin();
    }else{
      if(!createUser.value.uac_email || !createUser.value.username){
        this.userEmailErr = true;
      this.userEmailErrText = 'Please enter email or username!';
      }
      
    }
   
  }
  selectUserType(event){
    if(event){
      this.userTypeErr = false;
    }else{
      this.userTypeErr = true;
    }
  }
  createUserbyAdmin(){   

    this._createuserbyadminService.createUserbyAdmin(this.finaldata).subscribe(
      data => { 
          {this.response = data;}
          //this.userState= this.response.map(function(a) {return a["state_name"];}); 
          //alert(data);

          if(data==1){
            this.alertmsgClass = 'success';
            this.alertmsgSucc = 'Created Successfully!';
            this.msgSummery  = 'Success!';
            this.createUser.reset();                   
            this.showSuccess();
            //this.userTypeErr = false;
            setTimeout(() => {
              alert('Navigated');
              this._router.navigate(['createuserprofile']);
            }, 2000);
           // alert('User registered successfully!');
          }else if(data==2){
            this.alertmsgClass = 'error';
          this.alertmsgSucc = 'Something went wrong! Please try again';
          this.msgSummery  = 'Error!';
          this.createUser.reset();
          this.showSuccess();
           // alert('Something went wrong! Please try again')
          }else if(data==3){
            this.alertmsgClass = 'error';
            this.alertmsgSucc = 'User access email is already registered! Please try with another';
            this.msgSummery  = 'Error!';
            this.createUser.reset();
            this.showSuccess();
            //alert('User access email is already registered! Please try with another');
          }else{
             this.alertmsgClass = 'success';
          this.alertmsgSucc = 'User Created Successfully!';
          this.msgSummery  = 'Success!';
          this.createUser.reset();
          this.showSuccess();
          }
          
        },
      error => this.errorMessage = error
    )}
    enbalePhone(value,column){
      //alert('alt code'+column);
      if(column==1){
        if(value){ this.phoneEnable_1= true; }else{ this.phoneEnable_1= false;}      
      }
      if(column==2){
        if(value){ this.phoneEnable_2= true; }else{ this.phoneEnable_2= false;}      
      }
      if(column==3){
        if(value){ this.phoneEnable_3= true; }else{ this.phoneEnable_3= false;}      
      }    
    }
    uniqueEmail(value,column){
      if(value){
        this._createuserbyadminService.uniqueEmail(value,column).subscribe(
          data => {
            {this.response=data}
            if(data==1){
              this.userEmailErr = true;
              this.userEmailErrText = 'This email is already exists!';
            }else{
              this.userEmailErr = false;
            }
            //alert(data);
          },
          error => {}
        );
      }else{
        this.userEmailErr = false;
      }
     
    }
    uniqueUsername(value,column){
      if(value){
        this._createuserbyadminService.uniqueUsername(value,column).subscribe(
          data => {
            {this.response=data}
            if(data==1){
              this.usernameErr = true;
              this.usernameErrText = 'This username is already exists!';
            }else{
              this.usernameErr = false;
              this.userEmailErr = false;
            }
            //alert(data);
          },
          error => {}
        );
      }else{
        this.usernameErr = false;
        this.userEmailErr = false;
      }
     
    }
    showSuccess() {
      //alert('success toast');
      this.messageService.add({severity:this.alertmsgClass, summary: this.msgSummery, detail:this.alertmsgSucc});
    }
    /* For Production */
onReject(){
  
}

}
