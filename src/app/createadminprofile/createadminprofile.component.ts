import { DefaultDataService }from '../default-data.service';
import { CreateadminprofileService } from './createadminprofile.service';
import { ManageinstituteService } from '../instutesmanage/manageinstitute.service';
import { Component, OnInit,Inject, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {MessageService} from '../../../node_modules/primeng/api';
import * as moment from 'moment';
@Component({
  selector: 'app-createadminprofile',
  templateUrl: './createadminprofile.component.html',
  styleUrls: ['./createadminprofile.component.css',],
  providers:[MessageService]
})
export class CreateadminprofileComponent implements OnInit {
  createAdmin: FormGroup;
  country: any;
  cities: any[];
  states: any;
  errorMessage: any;
  response : any;
  userCountry: any;
  userState: any;
  adminTypes: any;
  Check_admin_id: any;
  admintype_id: any;
  inst_id:any;
  msgSuccLogin: boolean= false;
  alertmsgClass : any;
  alertmsgSucc : any;
  @Input() name: string;
  availId: string;
  adminAvail: any;
  instAdminEmail: boolean;
  instAdminEmailErrText: string;
  admintypeId:number = 1;
  acuserPhone:number = 0;
  rangeDates: any;
  phoneEnable_1: boolean;
  phoneEnable_2: boolean;
  phoneEnable_3: boolean;
  adminResponse: any;
  msgSummery: any;
  checkData: any;
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  options: any = {
    autoApply: false,
    alwaysShowCalendars: false,
    linkedCalendars: true,
    singleDatePicker: false,
    showWeekNumbers: false,
    showISOWeekNumbers: false
  };
  datepicselected: any;
  alwaysShowCalendars: boolean;
  showRangeLabelOnInput: boolean;
  keepCalendarOpeningWithRange: boolean;
 
  invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];  
  isInvalidDate = (m: moment.Moment) =>  {
    return this.invalidDates.some(d => d.isSame(m, 'day') )
  }
  /*--------for producation****/
  countryISDConde:any;
  user_state:any;
  admin_state:any;
  admin_city:any;
  /********-------------- */
  private emailpattern = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$';
  finaldata: any;
  constructor( 
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private messageService: MessageService,
    private  _defaultDataService : DefaultDataService,
    private _fb: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _createadminprofileService : CreateadminprofileService,
    private _manageinstituteService : ManageinstituteService,
    private _http: Http) { 
   
       this.alwaysShowCalendars = true;
       this.keepCalendarOpeningWithRange = true;
       this.showRangeLabelOnInput = true;
     
    }
    
   

 
   
  listofitems(listofitems: any): any {
    throw new Error("Method not implemented.");
  }
  ngOnInit() {
    
    this.Check_admin_id = localStorage.getItem('admin_id');
    this.admintype_id = localStorage.getItem('admintype_id');
    this.inst_id = localStorage.getItem('inst_id');
    //alert(this.Check_admin_id);
    if(this.Check_admin_id==null){
      this._router.navigate(['/']);
    }
    this.getCountry();
    this.getAmdinTypes();
    this.createAdmin = new FormGroup({
      admin_id : new FormControl(''),
      inst_id : new FormControl(''),
      admin_dname: new FormControl(''),
      admin_fname: new FormControl(''),
      admin_mname: new FormControl(''),
      admin_lname: new FormControl(''),
      admin_gender : new FormControl(''),
      admin_dob : new FormControl(''),
      admin_email : new FormControl('',{
        validators: [Validators.required, Validators.pattern(this.emailpattern)], updateOn: 'blur'}),
      admin_alt_email : new FormControl('',{
        validators: [Validators.required, Validators.pattern(this.emailpattern)], updateOn: 'blur'}),
      admin_phone_cont_code : new FormControl(''),
      admin_phone : new FormControl(''),
      admin_alt_phone_cont_code : new FormControl('',{
        validators: [Validators.required, Validators.minLength(6)], updateOn: 'blur'}),
      admin_alt_phone : new FormControl('',{
        validators: [Validators.required, Validators.minLength(6)], updateOn: 'blur'}),
      admin_fax_cnt_code : new FormControl(''),
      admin_fax : new FormControl(''),
      admin_country : new FormControl(''),
      admin_state : new FormControl(''),
      admin_city : new FormControl(''),
      admin_address : new FormControl(''),
      admintype_id : new FormControl(''),
      ac_user_email: new FormControl('', {
        validators: [Validators.required, Validators.pattern(this.emailpattern)], updateOn: 'blur'}),
      ac_user_phone : new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)], updateOn: 'blur'}),
    });
  }
  adminCreates(createAdmin: FormGroup){
    this.finaldata = createAdmin.value
    
    if(this.instAdminEmail==false){
      this.createsAdmin();
    }else{
      if(!createAdmin.value.ac_user_email){
        this.instAdminEmail=true;
        this.instAdminEmailErrText = 'Please enter admin email';
      }
    }
    
   /* this.msgSuccLogin = true;
    this.alertmsgClass = 'alert-primary';
    this.alertmsgSucc = 'Please wait.....';*/
  }
  createsAdmin(){
    //console.log('This is data ',this.finaldata);
    this._createadminprofileService.createsAdmin(this.finaldata)
    .then((data: any)=> {
        {this.adminResponse = data;}  
        //alert(data)
        if(data==1){
          //this.msgSuccLogin = true;
          this.alertmsgClass = 'success';
          this.alertmsgSucc = 'Created Successfully!';
          this.msgSummery  = 'Success!';
          this.createAdmin.reset();
          this.showSuccess();
          setTimeout(() => {
            this._router.navigate(['/createadmin']);
          }, 2000);
        }else{
          //this.msgSuccLogin = true;
          this.alertmsgClass = 'Error';
          this.alertmsgSucc = 'Something went wrong';
          this.msgSummery  = 'Error!';
          this.showSuccess();
        }
      },      
      error => this.errorMessage = error
    );
  }
  getCountry(){
    this._defaultDataService.getcountryNamesforProfile().subscribe(
      data => {{
        this.country = data;}      
      },      
      error => this.errorMessage = error
    );
  }
  getStatesoncountry(country){
    
    //console.log('Cities == '+this.cities);
    this._defaultDataService.getStatesoncountries(country).subscribe(
      data => {
        {
          this.states = data;
          this.cities = [];
          //console.log(this.states);
         }    },
      error => this.errorMessage = error
    );
    // this._defaultDataService.getCountryCode(country).subscribe( 
    //   data => {
    //      {
    //        this.response=data;          
    //      }
    //      this.userCountry = data.cntry_name;        
    //          },
    //   error => {this.errorMessage=error}    
    // );
  }
  getCitiesonstates(state){    
    this._defaultDataService.getCitiesonstates(state).subscribe(
      data => this.cities = data,
      error => this.errorMessage = error
    );
    // this._defaultDataService.getStateonState(state).subscribe(
    //   data => {
    //     {this.states = data;}
    //     this.userState= this.states.map(function(a) {return a["state_name"];});        
    //   },
    //   error => this.errorMessage = error
    // );
  }
  getAmdinTypes(){
    this._defaultDataService.getAmdinTypes().subscribe(
      data => {this.adminTypes = data},
      error => {this.errorMessage = error}
    );
  }
  CheckAdminAvailability(value,column){
    //alert('1='+value+'2='+column);
    //return false;
    this.checkData = {
      "value"   : value,
      "column"  : column,
      "availId" : '',
      "w_column" : "admin_id",
      "table"   : "admin_access"
    } 
    this.availId = '';
    this._manageinstituteService.CheckAdminAvailability(this.checkData).subscribe(
      data => {
        {this.adminAvail=data;}
        if(value){         
          if(data==1){
            this.instAdminEmail = true;
            this.instAdminEmailErrText = "This email is already exists!";
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

  enbalePhone(value,column){
    //alert('alt code'+column);
    if(column==1){
      if(value){ this.phoneEnable_1= true; }else{this.phoneEnable_1= false;}    
    }
    if(column==2){
      if(value){ this.phoneEnable_2= true; } else{this.phoneEnable_2= false;}     
    }
    if(column==3){
      if(value){ this.phoneEnable_3= true; } else{this.phoneEnable_3= false;}     
    }    
  }
  showSuccess() {
    //alert('success toast');
    this.messageService.add({severity:this.alertmsgClass, summary: this.msgSummery, detail:this.alertmsgSucc});
  }
 /* For Production */
onReject(){
  
}
  rangeClicked(range) {
    
  }
  
  today(VALUE) {
  const date = new Date();
   const format = moment(date).format('MM/DD/YYYY');
   this.rangeDates = format;
  alert('date'+format);
  alert(moment(date.getDate()-5).format('MM/DD/YYYY'));
  
  }
  
}
