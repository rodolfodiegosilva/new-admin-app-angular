import { AdminprofileService } from './adminprofile.service';
import { DefaultDataService } from '../default-data.service';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ManageinstituteService } from '../instutesmanage/manageinstitute.service';
import { MessageService } from 'primeng/api';
import { ConfigVariable } from '../shared/app.config';

@Component({
  selector: 'app-adminprofilepage',
  templateUrl: './adminprofilepage.component.html',
  styleUrls: ['./adminprofilepage.component.css'],
  providers: [MessageService]
  /* styles: [
  .hideoption { display:none; visibility:hidden; height:0; font-size:0; }
  ]
  */
})

export class AdminprofilepageComponent implements OnInit {
  profileAdmin: FormGroup;
  changePassword: FormGroup;
  updateLogins: FormGroup;
  selectedFile: File = null;
  key: any;
  response: any;
  imageUrl: any;
  timelineUrl: any;
  fileToUpload: File = null;
  profilepicUpload: FormGroup;
  timelinepicUpload: FormGroup;
  //adminProfile: Array<any> = [];
  adminProfile: any = [];
  finaldata: any;
  country: any;
  cities: any;
  states: any;
  errorMessage: any;
  countryIds: any;
  countryISDConde: any;
  msgSucc: boolean = false;
  alertmsgSucc: string;
  alertmsgClass: string;
  msgErr: boolean = false;
  hoverBox: boolean = false;
  loginsEdit_1: boolean = false;
  loginsEdit_2: boolean = false;
  loginsEdit_3: boolean = false;
  msgSuccLogin: boolean = false;
  profileEdit_1: boolean = false;
  profileEdit_2: boolean = false;
  profileEdit_3: boolean = false;
  profileEdit_4: boolean = false;
  profileEdit_5: boolean = false;
  profileEdit_6: boolean = false;
  profileEdit_7: boolean = false;
  profileEdit_7_1: boolean = true;
  profileEdit_8: boolean = false;
  profileEdit_9: boolean = false;
  profileEdit_10: boolean = false;
  profileEdit_11: boolean = false;
  profileEdit_12: boolean = false;
  profileEdit_13: boolean = false;
  timeChange: boolean = false;
  picChange: boolean = false;
  admin_timeline_pic: any;
  fullName: any;
  adminCountry: any;
  adminState: any;
  adminCity: any;
  instAdminEmail: boolean = false;
  @Input() name: string;
  availId: any;
  adminAvail: any;
  instAdminEmailErrText: string;
  adminloginId: boolean;
  adminloginIdErrText: string;
  adminphonecontcode: any;
  adminaltphonecontcode: any;
  adminCityId: any;
  severity: any;
  summary: string;
  phoneEnable_1: boolean;
  phoneEnable_3: boolean;
  phoneEnable_2: boolean;
  admin_phone_cont_code: any;
  admin_alt_phone_cont_code: any;
  adminStateId: any;
  admin_country: any;
  checkData: any;
  isProfileLoading: any;
  isTimelineLoading: any;
  headerPic: any;
  passwordSubmitted: any;
  mismatch: any;
  adminProfileData: any;
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  /***-----forproducation */
  admin_pic: any;
  admin_state: any;
  admin_city: any;
  /***------- */
  private emailpattern = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$';
  Check_admin_id: any;
  admintype_id: any;
  headerName: any;
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    //@Inject(SESSION_STORAGE) private storage: WebStorageService,
    private messageService: MessageService,
    private _adminprofileService: AdminprofileService,
    private _defaultDataService: DefaultDataService,
    private _fb: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _manageinstituteService: ManageinstituteService,
    private _http: Http,
    private fb:FormBuilder
  ) {
    this.isProfileLoading = false;
    this.isTimelineLoading = false;
    this.passwordSubmitted = false;
    this.mismatch = false;
    this.adminProfileData = {};
  }
  passwordMatchValidator() {
    this.f.newPassword.value === this.f.renewPassword.value ? this.mismatch = false : this.mismatch = true;
  }

get f(){return this.changePassword.controls;}
get profileForm() { return this.profileAdmin.controls;}
  ngOnInit() {
    //alert('Hii');
    this.Check_admin_id = localStorage.getItem('admin_id');
    this.admintype_id = localStorage.getItem('admintype_id');
    this.availId = this.Check_admin_id;
    //alert(this.Check_admin_id);
    if (this.Check_admin_id == null) {
      this._router.navigate(['/']);
    }
    //this.getFromLocal(this.key);
    this.getAdminprofile();
    this.getCountry();
    this.profileAdmin = this.fb.group({
      admin_id: [''],
      admin_dname: [''],
      admin_fname: [''],
      admin_mname: [''],
      admin_lname: [''],
      admin_email: ['', [Validators.pattern(this.emailpattern)]],
      admin_alt_email: ['', [Validators.pattern(this.emailpattern)]],
      admin_phone: [''],
      admin_phone_cont_code: [''],
      admin_alt_phone: [''],
      admin_alt_phone_cont_code: [''],
      admin_dob: [''],
      admin_country: [''],
      admin_state: [''],
      admin_city: [''],
      admin_gender: [''],
      admin_address: [''],
    });
    this.updateLogins = this.fb.group({
      ac_user_loginid: [''],
      ac_user_email: [''],
      ac_user_phone: [''],
    });
    this.changePassword = this.fb.group({
      admin_id: [],
      oldPassword: ['',[Validators.required]],
      newPassword: ['',[Validators.required]],
      renewPassword: ['',[Validators.required]],
    });
    this.profilepicUpload = new FormGroup({
      admin_pic: new FormControl(''),
      //admin_timeline_pic: new FormControl('')
      admin_id: new FormControl('')
    });
    this.timelinepicUpload = new FormGroup({
      admin_timeline_pic: new FormControl(''),
      admin_id: new FormControl('')
    });

  }
  uploadProfilepic(profilepicUpload: FormGroup) {
    this.finaldata = profilepicUpload.value;
    this.updatePic();
  }
  uploadTimelinepic(timelinepicUpload: FormGroup) {
    this.finaldata = timelinepicUpload.value
    this.updateTimeline();
  }
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
    this.picChange = true;
    // this.updatePic();    
  }
  updatePic() {
    this.isProfileLoading = true;
    this._adminprofileService.uploadProfileimg(this.finaldata.admin_id, this.fileToUpload)
      .then((data: any) => {
        { this.response = data }
        //console.log(this.response);
        this.alertmsgSucc = 'You have changed your profile pic successfully!';
        this.alertmsgClass = 'success';
        this.summary = 'Success';
        this.showSuccess();
        this.headerPic = this.imageUrl;
        this.picChange = false;
        this.isProfileLoading = false;
      })
      .catch((error) => {
        this.isProfileLoading = false;
      });
  }
  handleTimelinePic(file: FileList) {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.timelineUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
    this.timeChange = true;
    // this.updateTimeline();
  }
  updateTimeline() {
    this.isTimelineLoading = true;
    this._adminprofileService.uploadTimelineimg(this.finaldata.admin_id, this.fileToUpload)
    .then((data: any) => {
        { this.response = data }
        this.alertmsgSucc = 'You have changed your timeline successfully!';
        this.alertmsgClass = 'success';
        this.summary = 'Success';
        this.showSuccess();
        this.isTimelineLoading = false;
        //console.log(this.response);
        this.timeChange = false;
      })
      .catch((error)=>{
        this.isTimelineLoading = false;
      })
  }
  updatePassword(changePassword: FormGroup) {
    this.passwordSubmitted = true;
    if(this,changePassword.invalid){
      return;
    }
    if(this.mismatch){
      return
    }
    this.finaldata = changePassword.value
    this.passwordUpdate();
  }
  passwordUpdate() {
    this._adminprofileService.passwordUpdate(this.finaldata)
    .then((data:any) => {
        { this.response = data; }
        //alert(this.response);
        if (data == 1) {
          //this.msgSuccLogin=true;
          this.alertmsgSucc = 'You have changed your password successfully!';
          this.alertmsgClass = 'success';
          this.summary = 'Success';
          this.showSuccess();
          this.passwordSubmitted = false;
          this.changePassword.reset();
        } else if (data == 2) {
          //this.msgSuccLogin=true;
          this.alertmsgSucc = 'Something went wrong';
          this.alertmsgClass = 'error';
          this.summary = 'Error';
          this.showSuccess();
          this.changePassword.reset();
        } else if (data == 3) {
          //this.msgSuccLogin=true;
          this.alertmsgSucc = 'Your old password is not matched with our database';
          this.alertmsgClass = 'error';
          this.summary = 'Error';
          this.showSuccess();
          // this.changePassword.reset();
        }
      },
      error => { }
    );
  }
  getAdminprofile() {
    this._adminprofileService.getAdminprofile(this.Check_admin_id, this.admintype_id)
      .then((data: any) => {
        { this.adminProfile = data; }
        this.adminProfileData = data[0];
        this.adminCountry = this.adminProfile.map(function (a) { return a["cntry_name"]; });
        this.admin_country = this.adminProfile.map(function (a) { return a["admin_country"]; });
        this.adminState = this.adminProfile.map(function (a) { return a["state_name"]; });
        this.admin_state = this.adminProfile.map(function (a) { return a["admin_state"]; });
        this.adminCity = this.adminProfile.map(function (a) { return a["city_name"]; });
        this.admin_city = this.adminProfile.map(function (a) { return a["city_id"]; });
        this.headerName = this.adminProfile.map(function (a) { return a["admin_dname"]; });
        this.adminphonecontcode = this.adminProfile.map(function (a) { return +a["admin_phone_cont_code"]; });
        this.admin_phone_cont_code = this.adminProfile.map(function (a) { return +a["admin_phone_cont_code"]; });
        this.adminaltphonecontcode = this.adminProfile.map(function (a) { return +a["admin_alt_phone_cont_code"]; });
        this.admin_alt_phone_cont_code = this.adminProfile.map(function (a) { return +a["admin_alt_phone_cont_code"]; });
        //this.getCitiesonstates(this.adminStateId);
        this.getStatesoncountry(this.admin_country);

        if (this.imageUrl != '') {
          this.imageUrl = this.adminProfile.map(function (a) { return ConfigVariable.BASE_API_URL + "assets/Admin/profilePics/admin_" + a["admin_id"] + '/' + a["admin_pic"]; });
        } else {
          this.imageUrl = "/assets/profilePics/default_profile.png";
        }
        this.timelineUrl = this.adminProfile.map(function (a) { return  a["admin_timeline_pic"]; });
        if (this.timelineUrl != '') {
          this.timelineUrl = this.adminProfile.map(function (a) { return ConfigVariable.BASE_API_URL + "assets/Admin/timelinePics/admin_" + a["admin_id"] + '/' + a["admin_timeline_pic"]; });
        } else {
          this.timelineUrl = "/assets/timelinePics/profile-bg.jpg";
        }
        this.headerPic = this.imageUrl;
        //+data.admin_mname+data.admin_lname  
        //this.fullName = this.adminProfile.admin_fname;
        //alert(this.adminProfile.admin_fname); 
      })
      .catch((error) => {
      })
    //this._adminprofileService.get
  }
  updateProfile(profileAdmin: FormGroup) {
    this.finaldata = profileAdmin.value;
    // const this.finaldata = profileAdmin.value
    //console.log('This is the form data==',profileAdmin.value);
    /* if (){
 
     }*/
     this.finaldata.admin_alt_phone_cont_code = this.finaldata.admin_alt_phone_cont_code[0];
     this.finaldata.admin_country = this.finaldata.admin_country[0];
     this.finaldata.admin_phone_cont_code = this.finaldata.admin_phone_cont_code[0];
     this.finaldata.admin_state = this.finaldata.admin_state[0];
    //  console.log("final data==>>",this.finaldata)
     this.updateAdminProfile();
  }
  getCountry() {
    //alert(country);
    this._defaultDataService.getcountryNamesforProfile().subscribe(
      data => this.country = data,
      //alert();
      error => this.errorMessage = error
    );
  }
  getStatesoncountry(country) {
    this._defaultDataService.getStatesoncountries(country).subscribe(
      data => { { this.states = data; this.cities = []; } },
      error => this.errorMessage = error
    );
    this._defaultDataService.getCountryCode(country).subscribe(
      data => {
        {
          this.response = data;
        }
        this.adminCountry = data.cntry_name;
        //alert(data.cntry_isdcode);
      },
      error => { this.errorMessage = error }
    );
  }
  getCitiesonstates(state) {
    //alert(state);
    this._defaultDataService.getCitiesonstates(state).subscribe(
      data => {
        { this.cities = data; }
        //console.log(data);
      },

      error => this.errorMessage = error
    );
    this._defaultDataService.getStateonState(state).subscribe(
      data => {
        { this.states = data; }
        this.adminState = this.states.map(function (a) { return a["state_name"]; });
        //alert(this.userState);
      },
      error => this.errorMessage = error
    );
  }
  getCitiesoncity(city) {
    this._defaultDataService.getCitiesoncity(city).subscribe(
      data => {
        { this.cities = data; }
        this.adminCity = this.cities.map(function (a) { return a["city_name"]; });
      },
      error => this.errorMessage = error
    );
  }


  profilefieldEdit_1(num) {
    if (this.profileEdit_1 == false) {
      this.profileEdit_1 = true;
    } else {
      this.profileEdit_1 = false;
    }
  }
  profilefieldUpdate_1(value, column) {
    if (this.profileEdit_1 == true) {
      this._adminprofileService.profilefieldUpdate(value, column, this.Check_admin_id)
      .then((data: any)=> {
          { this.response = data }
          //alert(this.response);
          if (data == 1) {
            //this.msgSucc=true;
            this.alertmsgSucc = 'Updated successfully';
            this.alertmsgClass = 'success';
            this.summary = 'Success';
            this.headerName = value;
            this.getAdminprofile();
            localStorage.setItem('admin_dname',value)
            this.showSuccess();
          } else if (data == 2) {
            this.alertmsgSucc = 'Data not updated';
            this.alertmsgClass = 'error';
            this.summary = 'Error';
            this.showSuccess();
          } else if (data == 3) {
            this.alertmsgSucc = 'You have not changed the value';
            this.alertmsgClass = 'error';
            this.summary = 'Error';
            this.showSuccess();
          } else if (data == 4) {
            this.profileEdit_1 = true;
            this.alertmsgSucc = 'This value is already existed. Please try with another';
            this.alertmsgClass = 'error';
            this.summary = 'Error';
            this.showSuccess();
          }
        })
        .catch((error)=>{
        })
      this.profileEdit_1 = false;

    } else {
      this.profileEdit_1 = true;
    }
  }
  profilefieldEdit_2(num) {
    if (this.profileEdit_2 == false) {
      this.profileEdit_2 = true;
    } else {
      this.profileEdit_2 = false;
    }
  }
  profilefieldUpdate_2(value, column) {
    if (this.profileEdit_2 == true) {
      this._adminprofileService.profilefieldUpdate(value, column, this.Check_admin_id)
      .then((data: any) => {
          { this.response = data }
          if (data == 1) {
            //this.msgSucc=true;
            this.alertmsgSucc = 'Updated successfully';
            this.alertmsgClass = 'success';
            this.summary = 'Success';
            this.getAdminprofile();
            this.showSuccess();
          } else if (data == 2) {
            this.alertmsgSucc = 'Data not updated';
            this.alertmsgClass = 'error';
            this.summary = 'Error';
            this.showSuccess();
          } else if (data == 3) {
            this.alertmsgSucc = 'You have not changed the value';
            this.alertmsgClass = 'error';
            this.summary = 'Error';
            this.showSuccess();
          } else if (data == 4) {
            this.profileEdit_2 = true;
            this.alertmsgSucc = 'This value is already existed. Please try with another';
            this.alertmsgClass = 'error';
            this.summary = 'Error';
            this.showSuccess();
          }
        })
      .catch((error)=>{
      })
      this.profileEdit_2 = false;

    } else {
      this.profileEdit_2 = true;
    }
  }
  profilefieldEdit_3(num) {
    if (this.profileEdit_3 == false) {
      this.profileEdit_3 = true;
    } else {
      this.profileEdit_3 = false;
    }
  }
  profilefieldUpdate_3(value, column) {
    if (this.profileEdit_3 == true) {
      this._adminprofileService.profilefieldUpdate(value, column, this.Check_admin_id)
      .then((data: any) => {
          { this.response = data }
          if (data == 1) {
            //this.msgSucc=true;
            this.alertmsgSucc = 'Updated successfully';
            this.alertmsgClass = 'success';
            this.summary = 'Success';
            this.getAdminprofile();
            this.showSuccess();
          } else if (data == 2) {
            this.alertmsgSucc = 'Data not updated';
            this.alertmsgClass = 'error';
            this.summary = 'Error';
            this.showSuccess();
          } else if (data == 3) {
            this.alertmsgSucc = 'You have not changed the value';
            this.alertmsgClass = 'error';
            this.summary = 'Error';
            this.showSuccess();
          } else if (data == 4) {
            this.profileEdit_3 = true;
            this.alertmsgSucc = 'This value is already existed. Please try with another';
            this.alertmsgClass = 'error';
            this.summary = 'Error';
            this.showSuccess();
          }
        })
        .catch((error)=>{
        })
      this.profileEdit_3 = false;

    } else {
      this.profileEdit_3 = true;
    }
  }
  profilefieldEdit_4(num) {
    if (this.profileEdit_4 == false) {
      this.profileEdit_4 = true;
    } else {
      this.profileEdit_4 = false;
    }
  }
  profilefieldUpdate_4(value, column) {
    if (this.profileEdit_4 == true) {
      this._adminprofileService.profilefieldUpdate(value, column, this.Check_admin_id).then(
        (data: any) => {
          { this.response = data }
          if (data == 1) {
            //this.msgSucc=true;
            this.alertmsgSucc = 'Updated successfully';
            this.alertmsgClass = 'success';
            this.summary = 'Success';
            this.getAdminprofile();
            this.showSuccess();
          } else if (data == 2) {
            this.alertmsgSucc = 'Data not updated';
            this.alertmsgClass = 'error';
            this.summary = 'Error';
            this.showSuccess();
          } else if (data == 3) {
            this.alertmsgSucc = 'You have not changed the value';
            this.alertmsgClass = 'error';
            this.summary = 'Error';
            this.showSuccess();
          } else if (data == 4) {
            this.profileEdit_4 = true;
            this.alertmsgSucc = 'This value is already existed. Please try with another';
            this.alertmsgClass = 'error';
            this.summary = 'Error';
            this.showSuccess();
          }
        },
        error => { }
      );
      this.profileEdit_4 = false;

    } else {
      this.profileEdit_4 = true;
    }
  }
  profilefieldEdit_5(num) {
    if (this.profileEdit_5 == false) {
      this.profileEdit_5 = true;
    } else {
      this.profileEdit_5 = false;
    }
  }
  profilefieldUpdate_5(value, column) {
    if (this.profileEdit_5 == true) {
      this._adminprofileService.profilefieldUpdate(value, column, this.Check_admin_id).then(
        (data: any) => {
          { this.response = data }
          //alert(data);
          if (data == 1) {
            //this.msgSucc=true;
            this.alertmsgSucc = 'Updated successfully';
            this.alertmsgClass = 'success';
            this.summary = 'Success';
            this.getAdminprofile();
            this.showSuccess();
          } else if (data == 2) {
            this.alertmsgSucc = 'Data not updated';
            this.alertmsgClass = 'error';
            this.summary = 'Error';
            this.showSuccess();
          } else if (data == 3) {
            this.alertmsgSucc = 'You have not changed the value';
            this.alertmsgClass = 'error';
            this.summary = 'Error';
            this.showSuccess();
          } else if (data == 4) {
            this.profileEdit_5 = true;
            this.alertmsgSucc = 'This value is already existed. Please try with another';
            this.alertmsgClass = 'error';
            this.summary = 'Error';
            this.showSuccess();
          }
        },
        error => { }
      );
      this.profileEdit_5 = false;

    } else {
      this.profileEdit_5 = true;
    }
  }
  profilefieldEdit_6(num) {
    if (this.profileEdit_6 == false) {
      this.profileEdit_6 = true;
    } else {
      this.profileEdit_6 = false;
    }
  }
  profilefieldUpdate_6(value, column) {
    if (this.profileEdit_6 == true) {
      this._adminprofileService.profilefieldUpdate(value, column, this.Check_admin_id).then(
        (data: any)  => {
          { this.response = data }
          if (data == 1) {
            //this.msgSucc=true;
            this.alertmsgSucc = 'Updated successfully';
            this.alertmsgClass = 'success';
            this.summary = 'Success';
            this.getAdminprofile();
            this.showSuccess();
          } else if (data == 2) {
            this.alertmsgSucc = 'Data not updated';
            this.alertmsgClass = 'error';
            this.summary = 'Error';
            this.showSuccess();
          } else if (data == 3) {
            this.alertmsgSucc = 'You have not changed the value';
            this.alertmsgClass = 'error';
            this.summary = 'Error';
            this.showSuccess();
          } else if (data == 4) {
            this.profileEdit_6 = true;
            this.alertmsgSucc = 'This value is already existed. Please try with another';
            this.alertmsgClass = 'error';
            this.summary = 'Error';
            this.showSuccess();
          }
        },
        error => { }
      );
      this.profileEdit_6 = false;

    } else {
      this.profileEdit_6 = true;
    }
  }
  profilefieldEdit_7(num) {
    if (this.profileEdit_7 == false) {
      this.profileEdit_7 = true;
    } else {
      this.profileEdit_7 = false;
    }
    if (this.profileEdit_7_1 == false) {
      this.profileEdit_7_1 = true;
    } else {
      this.profileEdit_7_1 = false;
    }
  }
  profilefieldUpdate_7(value, column) {
    if (this.profileEdit_7 == true) {
      this._adminprofileService.profilefieldUpdate(value, column, this.Check_admin_id).then(
        (data: any)  => {
          { this.response = data }
          if (data == 1) {
            //this.msgSucc=true;
            this.alertmsgSucc = 'Updated successfully';
            this.alertmsgClass = 'success';
            this.summary = 'Success';
            this.showSuccess();
          } else if (data == 2) {
            this.alertmsgSucc = 'Data not updated';
            this.alertmsgClass = 'error';
            this.summary = 'Error';
            this.showSuccess();
          } else if (data == 3) {
            this.alertmsgSucc = 'You have not changed the value';
            this.alertmsgClass = 'error';
            this.summary = 'Error';
            this.showSuccess();
          } else if (data == 4) {
            this.profileEdit_7 = true;
            this.alertmsgSucc = 'This value is already existed. Please try with another';
            this.alertmsgClass = 'error';
            this.summary = 'Error';
            this.showSuccess();
          }
        },
        error => { }
      );
      this.profileEdit_7 = false;

    } else {
      this.profileEdit_7 = true;
    }
  }
  profilefieldEdit_8(num) {
    if (this.profileEdit_8 == false) {
      this.profileEdit_8 = true;
    } else {
      this.profileEdit_8 = false;
    }
  }
  profilefieldUpdate_8(valuec, columnc, value, column) {
    //alert('1='+valuec+'2='+columnc+'3='+value+'4='+column);
    //return false;
    this.adminphonecontcode = valuec;
    //if(valuec){
    if (this.profileEdit_8 == true) {
      this._adminprofileService.profilePhoneUpdate(valuec, columnc, value, column, this.Check_admin_id).then(
        (data: any) => {
          { this.response = data }
          //console.log(this.response);
          if (data == 1) {
            //this.msgSucc=true;
            this.phoneEnable_1 = false;
            //alert(this.phoneEnable_1);
            this.alertmsgSucc = 'Updated successfully';
            this.alertmsgClass = 'success';
            this.summary = 'Success';
            this.getAdminprofile();
            this.showSuccess();
          } else if (data == 2) {
            this.phoneEnable_1 = false;
            this.alertmsgSucc = 'Data not updated';
            this.alertmsgClass = 'error';
            this.summary = 'Error';
            this.showSuccess();
          } else if (data == 3) {
            this.phoneEnable_1 = false;
            this.alertmsgSucc = 'You have not changed the value';
            this.alertmsgClass = 'error';
            this.summary = 'Error';
            this.showSuccess();
          } else if (data == 4) {
            this.profileEdit_8 = true;
            this.phoneEnable_1 = true;
            this.alertmsgSucc = 'This value is already existed. Please try with another';
            this.alertmsgClass = 'error';
            this.summary = 'Error';
            this.showSuccess();
          }
        })
        .catch((error)=>{
        })
      this.profileEdit_8 = false;

    } else {
      this.profileEdit_8 = true;
    }
    // }else{
    //   this.alertmsgSucc = 'Please select code';
    //           this.alertmsgClass = 'error';
    //           this.summary = 'Error';
    //           this.showSuccess();
    // }
  }
  profilefieldEdit_9(num) {
    if (this.profileEdit_9 == false) {
      this.profileEdit_9 = true;
    } else {
      this.profileEdit_9 = false;
    }
  }
  profilefieldUpdate_9(valuec, columnc, value, column) {
    this.adminaltphonecontcode = valuec;
    if (valuec) {
      if (this.profileEdit_9 == true) {
        this._adminprofileService.profilePhoneUpdate(valuec, columnc, value, column, this.Check_admin_id).then(
          (data: any) => {
            { this.response = data }
            if (data == 1) {
              //this.msgSucc=true;
              this.phoneEnable_2 = false;
              this.alertmsgSucc = 'Updated successfully';
              this.alertmsgClass = 'success';
              this.summary = 'Success';
              this.getAdminprofile();
              this.showSuccess();
            } else if (data == 2) {
              this.phoneEnable_2 = false;
              this.alertmsgSucc = 'Data not updated';
              this.alertmsgClass = 'error';
              this.summary = 'Error';
              this.showSuccess();
            } else if (data == 3) {
              this.phoneEnable_2 = false;
              this.alertmsgSucc = 'You have not changed the value';
              this.alertmsgClass = 'error';
              this.summary = 'Error';
              this.showSuccess();
            } else if (data == 4) {
              this.profileEdit_9 = true;
              this.phoneEnable_2 = true;
              this.alertmsgSucc = 'This value is already existed. Please try with another';
              this.alertmsgClass = 'error';
              this.summary = 'Error';
              this.showSuccess();
            }
          })
          .catch((error)=>{
          })
        this.profileEdit_9 = false;

      } else {
        this.profileEdit_9 = true;
      }
    } else {
      this.phoneEnable_2 = false;
      this.alertmsgSucc = 'Please select Code';
      this.alertmsgClass = 'error';
      this.summary = 'Error';
      this.showSuccess();
    }
  }
  profilefieldEdit_10(num) {
    if (this.profileEdit_10 == false) {
      this.profileEdit_10 = true;
    } else {
      this.profileEdit_10 = false;
    }
  }
  profilefieldUpdate_10(value, column) {
    if (this.profileEdit_10 == true) {
      this._adminprofileService.profilefieldUpdate(value, column, this.Check_admin_id).then(
        (data: any)  => {
          { this.response = data }
          if (data == 1) {
            //this.msgSucc=true;
            this.alertmsgSucc = 'Updated successfully';
            this.alertmsgClass = 'success';
            this.summary = 'Success';
            this.getAdminprofile();
            this.showSuccess();
          } else if (data == 2) {
            this.alertmsgSucc = 'Data not updated';
            this.alertmsgClass = 'error';
            this.summary = 'Error';
            this.showSuccess();
          } else if (data == 3) {
            this.alertmsgSucc = 'You have not changed the value';
            this.alertmsgClass = 'error';
            this.summary = 'Error';
            this.showSuccess();
          } else if (data == 4) {
            this.profileEdit_10 = true;
            this.alertmsgSucc = 'This value is already existed. Please try with another';
            this.alertmsgClass = 'error';
            this.summary = 'Error';
            this.showSuccess();
          }
        },
        error => { }
      );
      this.profileEdit_10 = false;

    } else {
      this.profileEdit_10 = true;
    }
  }
  profilefieldEdit_11(num) {
    if (this.profileEdit_11 == false) {
      this.profileEdit_11 = true;
    } else {
      this.profileEdit_11 = false;
    }
  }
  profilefieldUpdate_11(usad, usct, usst, uscn) {
    //alert('value1 is'+value1+'  - column1 is'+column1+' - value2 is'+value2+' column2 is'+column2);
    if (this.profileEdit_11 == true) {
      this._adminprofileService.useraddressUpdate(usad, usct, usst, uscn, this.Check_admin_id)
      .then((data: any)=> {
          { this.response = data; }
          //alert(this.response);
          if (data == 1) {
            this.profileEdit_11 = false;
            this.alertmsgSucc = 'Updated successfully';
            this.alertmsgClass = 'success';
            this.summary = 'Success';
            this.getAdminprofile();
            this.showSuccess();
          } else if (data == 2) {
            this.alertmsgSucc = 'Updated successfully';
            this.alertmsgClass = 'error';
            this.summary = 'Error';
            this.showSuccess();
          }
        },
        error => { }
      );
    } else {
      this.profileEdit_11 = true;
    }

  }
  profilefieldEdit_12(num) {
    if (this.profileEdit_12 == false) {
      this.profileEdit_12 = true;
    } else {
      this.profileEdit_12 = false;
    }
  }
  profilefieldUpdate_12(value, column) {
    if (this.profileEdit_12 == true) {
      this._adminprofileService.profilefieldUpdate(value, column, this.Check_admin_id).then(
        (data: any)  => {
          { this.response = data }
          //alert(this.response);
          if (data == 1) {
            //this.msgSucc=true;
            this.alertmsgSucc = 'Updated successfully';
            this.alertmsgClass = 'success';
            this.summary = 'Success';
            this.showSuccess();
          } else if (data == 2) {
            this.alertmsgSucc = 'Data not updated';
            this.alertmsgClass = 'error';
            this.summary = 'Error';
            this.showSuccess();
          } else if (data == 3) {
            this.alertmsgSucc = 'You have not changed the value';
            this.alertmsgClass = 'error';
            this.summary = 'Error';
            this.showSuccess();
          } else if (data == 4) {
            this.profileEdit_12 = true;
            this.alertmsgSucc = 'This value is already existed. Please try with another';
            this.alertmsgClass = 'error';
            this.summary = 'Error';
            this.showSuccess();
          }
        },
        error => { }
      );
      this.profileEdit_12 = false;

    } else {
      this.profileEdit_12 = true;
    }
  }
  isPublic(value, column) {
    this._adminprofileService.profilefieldUpdate(value, column, this.Check_admin_id).then(
      (data: any)  => {
        { this.response = data; }
        if (data == 1) {
          this.msgSucc = true;
          this.alertmsgSucc = 'Updated successfully';
          this.alertmsgClass = 'alert-success';
          //this.msgErr = false;
        } else if (data == 2) {
          this.msgSucc = true;
          this.alertmsgSucc = 'Data not updated';
          this.alertmsgClass = 'alert-danger';
          //this.msgSucc = false;
          //this.msgErr = true;
        }
      },
      error => { }
    );
    //alert('value is '+value+' Column is '+column);
  }
  updateAdminProfile() {
    //alert(this.finaldata.admin_dname);
    this._adminprofileService.updateAdminProfile(this.finaldata).then(
      (data: any) => {
        { this.response = data; }
        this.getAdminprofile();
        // alert('this.response');
      })
      .catch((error)=>{
      })
  }
  loginsfieldEdit_1() {
    if (this.loginsEdit_1 == false) {
      this.loginsEdit_1 = true;
    } else {
      this.loginsEdit_1 = false;
    }
  }
  loginsfieldUpdate_1(value, column) {
    //alert('value is '+value+ ' column is '+column);
    if (this.adminloginId == true) {
      return false;
    }
    this._adminprofileService.updateLogins(value, column, this.Check_admin_id).then(
      (data: any)=> {
        { this.response = data; }
        if (data == 1) {
          //this.msgSucc=true;
          this.alertmsgSucc = 'Updated successfully';
          this.alertmsgClass = 'success';
          this.summary = 'Success';
          this.getAdminprofile();
          this.showSuccess();
        } else if (data == 2) {
          this.alertmsgSucc = 'Data not updated';
          this.alertmsgClass = 'error';
          this.summary = 'Error';
          this.showSuccess();
        } else if (data == 3) {
          this.alertmsgSucc = 'You have not changed the value';
          this.alertmsgClass = 'error';
          this.summary = 'Error';
          this.showSuccess();
        } else if (data == 4) {
          this.loginsEdit_1 = true;
          this.alertmsgSucc = 'This value is already existed. Please try with another';
          this.alertmsgClass = 'error';
          this.summary = 'Error';
          this.showSuccess();
        }

      },
      error => { }
    );
    this.loginsEdit_1 = false;
  }
  loginsfieldEdit_2() {
    if (this.loginsEdit_2 == false) {
      this.loginsEdit_2 = true;
    } else {
      this.loginsEdit_2 = false;
    }
  }
  loginsfieldUpdate_2(value, column) {
    // alert('value is '+value+ ' column is '+column);
    if (this.instAdminEmail == true) {
      return false;
    }
    this._adminprofileService.updateLogins(value, column, this.Check_admin_id).then(
      (data: any) => {
        { this.response = data; }
        if (data == 1) {
          //this.msgSucc=true;
          this.alertmsgSucc = 'Updated successfully';
          this.alertmsgClass = 'success';
          this.summary = 'Success';
          this.getAdminprofile();
          this.showSuccess();
        } else if (data == 2) {
          this.alertmsgSucc = 'Data not updated';
          this.alertmsgClass = 'error';
          this.summary = 'Error';
          this.showSuccess();
        } else if (data == 3) {
          this.alertmsgSucc = 'You have not changed the value';
          this.alertmsgClass = 'error';
          this.summary = 'Error';
          this.showSuccess();
        } else if (data == 4) {
          this.loginsEdit_2 = true;
          this.alertmsgSucc = 'This value is already existed. Please try with another';
          this.alertmsgClass = 'error';
          this.summary = 'Error';
          this.showSuccess();
        }

      },
      error => { }
    );
    this.loginsEdit_2 = false;
  }
  loginsfieldEdit_3() {
    if (this.loginsEdit_3 == false) {
      this.loginsEdit_3 = true;
    } else {
      this.loginsEdit_3 = false;
    }
  }
  loginsfieldUpdate_3(value, column) {
    // alert('value is '+value+ ' column is '+column);
    this._adminprofileService.updateLogins(value, column, this.Check_admin_id).then(
      (data: any) => {
        { this.response = data; }
        if (data == 1) {
          //this.msgSucc=true;
          this.alertmsgSucc = 'Updated successfully';
          this.alertmsgClass = 'success';
          this.summary = 'Success';
          this.showSuccess();
        } else if (data == 2) {
          this.alertmsgSucc = 'Data not updated';
          this.alertmsgClass = 'error';
          this.summary = 'Error';
          this.showSuccess();
        } else if (data == 3) {
          this.alertmsgSucc = 'You have not changed the value';
          this.alertmsgClass = 'error';
          this.summary = 'Error';
          this.showSuccess();
        } else if (data == 4) {
          this.loginsEdit_3 = true;
          this.alertmsgSucc = 'This value is already existed. Please try with another';
          this.alertmsgClass = 'error';
          this.summary = 'Error';
          this.showSuccess();
        }

      },
      error => { }
    );
    this.loginsEdit_3 = false;
  }
  CheckAdminAvailability(value: any, column: string) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(value).toLowerCase())){
      this.instAdminEmail = true;
      this.instAdminEmailErrText = "This email is invalid!";
      return
    }else{
      this.instAdminEmail = false;
      this.instAdminEmailErrText = "";
    }
    this.checkData = {
      "value": value,
      "column": column,
      "availId": '',
      "w_column": "admin_id",
      "table": "admin_access"
    }
    this._manageinstituteService.CheckAdminAvailability(this.checkData).subscribe(
      data => {
        { this.adminAvail = data; }
        if (value) {
          if (data == 1) {
            this.instAdminEmail = true;
            this.instAdminEmailErrText = "This email is already exists!";
          } else {
            this.instAdminEmail = false;
          }
        } else {
          this.instAdminEmail = false;
        }

      },
      error => { }
    );
  }
  CheckAdminidAvailability(value, column) {
    this.checkData = {
      "value": value,
      "column": column,
      "availId": this.availId,
      "w_column": "admin_id",
      "table": "admin_access"
    }
    this._manageinstituteService.CheckAdminAvailability(this.checkData).subscribe(
      data => {
        { this.adminAvail = data; }
        if (value) {
          if (data == 1) {
            this.adminloginId = true;
            this.adminloginIdErrText = "This login id is already exists!";
          } else {
            this.adminloginId = false;
          }
        } else {
          this.adminloginId = false;
        }

      },
      error => { }
    );
  }
  resetchangePassword() {
    //alert('hi');
    this.changePassword.reset();
    this.passwordSubmitted = false;
  }

  showSuccess() {
    this.messageService.add({ severity: this.alertmsgClass, summary: this.summary, detail: this.alertmsgSucc });
  }
  /* For Production */
  onReject() {

  }
  onSelectionChange() {
    this.profileEdit_12 = true;
  }
  enablePhone(value, column) {
    if (column == 1) {
      if (value) { this.phoneEnable_1 = true; } else { this.phoneEnable_1 = false; }
    }
    if (column == 2) {
      if (value) { this.phoneEnable_2 = true; } else { this.phoneEnable_2 = false; }
    }
  }

  onFileselected(event) {
    this.selectedFile = <File>event.target.files[0];
    //this.onUpload();
  }
  onUpload() {
    /* this._adminprofileService.uploadFile(this.selectedFile).subscribe(
     //this._adminprofileService.uploadFile(this.selectedFile).subscribe(
       data => {
         this.response = data
       },
       error =>{}
     );*/
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name)
    this._http.post('https://gemstudent.in/Services/', fd)
      .subscribe(res => { console.log(res) }
      );

  }
}
