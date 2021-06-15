import { ManageinstituteService } from './manageinstitute.service';
import { DefaultDataService } from '../default-data.service';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
//import {CalendarModule} from 'primeng/calendar';
import { MessageService } from 'primeng/api';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-instutesmanage',
  templateUrl: './instutesmanage.component.html',
  styleUrls: [
    '../../assets/superadmin/dist/css/app.min.css',
    '../../assets/superadmin/dist/css/component_ui.min.css',
    '../../assets/superadmin/dist/css/custom.css',
    './instutesmanage.component.css',
  ],
  providers: [MessageService, DefaultDataService]
})
export class InstutesmanageComponent implements OnInit {
  instManage: FormGroup;
  createInstitute: FormGroup;
  instituteEditform: FormGroup;
  instituteAccessEditform: FormGroup;
  instsuperAdminEditform: FormGroup;
  instDefaultEditform: FormGroup;
  response: any;
  user_id: any;
  superadminData: any;
  userData: Array<any> = [];
  userShow: Array<any> = [];
  instituteShow: any= [];
  allInstitutes: Array<any> = [];
  uniqueInstitute: Array<any> = [];
  id: any;
  userid: any;
  username: any;
  userIds: any;
  instIds: any;
  instId: any;
  mylookupservice: any;
  instituteEdit: boolean = false;
  instituteData: any;
  country: any;
  cities: any;
  countryIds: any;
  errorMessage: any;
  states: any;
  dropdownList = [];
  selectedItems = [];
  selectedItems_inst_id = [];
  selectedItems_inst_name = [];
  selectedItems_access = [];
  selectedItems_contactperson = [];
  selectedItems_branch = [];
  dropdownSettings = {};
  selected: string;
  Check_admin_id: any;
  admintype_id: any;
  inst_id: any;
  itemList = [];
  settings = {};
  text: string;
  userData12: string[];
  Name: any;
  allSchoolusers: boolean = false;
  @Input() name: string;
  searchforInstitute: FormGroup;
  userId: number;
  userShows: any;
  noData: boolean;
  allSchoolid: boolean;
  noDataid: boolean;
  allinstid: boolean;
  noDatainsid: boolean;
  allinstname: boolean;
  noDatainsname: boolean;
  user_dname: any;
  availId: any;
  adminAvail: any;
  instAdminEmail: boolean = false;
  instAdminEmailErrText: string;
  insId: any;
  InstName: any;
  showPaginator: boolean = true;
  pageNum: any;
  pageCount: any;
  column: string;
  selectedValues: any;
  column3: string;
  selectedUserIds: any;
  selectedUserName: any;
  selectedInstsds: any;
  selectedInstNames: any;
  selectedContactNames: any;
  selectedCountryNames: any;
  selectedStateNames: any;
  selectedCityNames: any;
  rowsPerPage: any;
  alertmsgClass: string;
  msgSummery: string;
  alertmsgSucc: string;
  instSAEdit: boolean = false;
  private emailpattern = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$';
  instSAData: any;
  inst_ac_valid_from: any;
  inst_ac_valid_to: any;
  instituteEdit_2: boolean;
  instituteEdit_1: boolean;
  instaccess_to_date: any;
  instaccess_from_date: any;
  inst_created_date: any;
  is_inst_validaccess: any;
  inst_access_updateadby: any;
  inst_access_updated_date: any;
  userinst_id: any;
  inst_superadmn_nam: any;
  inst_superadmn_eml: any;
  inst_name: any;
  inst_user_id: any;
  cntry_name: any;
  cntry_id: any;
  state_name: any;
  state_id: any;
  city_name: any;
  city_id: any;
  inst_address: any;
  inst_email: any;
  inst_phone: any;
  inst_alt_phone: any;
  inst_fax: any;
  inst_contact: any;
  inst_ac_contnt_upload: any;
  inst_ac_restricted_access: any;
  inst_ac_testcr_access: any;
  inst_ac_testatnd_access: any;
  inst_ac_groupcr_access: any;
  inst_ac_qns_upload: any;
  inst_ac_disc_create: any;
  instituteEdit_3: boolean = false;
  inst_url: any;
  inst_admn_url:any;
  itemsPerPage: any = 10;
  currentPage: any;
  checkData: any;
  institute_date_invalid: any = false;
  StateNames: any;
  CityNames: any;
  AllStates: any;
  AllCities: any;
  AllCitiesMap: any;
  AllStatesMap: any;
  stateIds: any;
  cityIds: any;
  //institutesuperadminEdit: boolean;
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
  /** for producation  */
  InstUserIds: any;
  userName: any;
  Instsds: any;
  InstNames: any;
  ContactNames: any;
  CountryNames: any;
  UsersData: any = [];
  /**----------------**/
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private _manageinstituteService: ManageinstituteService,
    private _defaultDataService: DefaultDataService,
    private _router: Router, private fb: FormBuilder,
    private messageService: MessageService,
    private _activatedRoute: ActivatedRoute,
    //private _calendarModule:CalendarModule
  ) {
    this.instaccess_to_date = new Date();
    this.instaccess_from_date = new Date();
    this.userNameGroup();
    this.AllCities = [];
    this.AllCitiesMap = {};
    this.AllStatesMap = {};
  }

  dateTime = new Date();
  // form getter
  get createInstituteForm() { return this.createInstitute.controls; }
  get instituteEditForm() {return this.instituteEditform.controls;}
  instituteEditFormSubmitted = false;
  createInstituteFormSubmitted = false;


  public ngOnInit() {
    this.dateTime.setDate(this.dateTime.getDate());
    this.rowsPerPage = 5;
    this.pageNum = 1;
    this.search();
    this.Check_admin_id = localStorage.getItem('admin_id');
    this.admintype_id = localStorage.getItem('admintype_id');
    this.inst_id = localStorage.getItem('inst_id');
    if (this.Check_admin_id == null) {
      this._router.navigate(['/']);
    }
    this.itemList = [];
    this.selectedItems = [];
    this.selectedItems_inst_id = [];
    this.InstUserIds = [];
    this.userName = [];
    this.Instsds = [];
    this.InstNames = [];
    this.ContactNames = [];
    this.StateNames = [];
    this.CityNames = [];
    this.CountryNames = [];
    this.settings = {
      text: "Public User ID",
      selectAllText: 'Select All',
      enableSearchFilter: true,
      unSelectAllText: 'UnSelect All',
      classes: "myclass custom-class"
    };
    this.getAllInstitutes(this.pageNum, this.rowsPerPage);
    this.getAllInstitutesCount();
    this.InstUserIdsGroup();
    this.InstIdsGroup();
    this.InstNamesGroup();
    this.ContactNamesGroup();
    this.instManage = new FormGroup({
      username: new FormControl(''),

    });
    this.createInstitute = this.fb.group({
      inst_name: [''],
      inst_user_id: [''],
      inst_country: [''],
      inst_state: [''],
      inst_city: [''],
      inst_address: [''],
      inst_email: ['', [Validators.required, Validators.pattern(this.emailpattern)]],
      inst_phone: [''],
      inst_alt_phone: [''],
      inst_fax: [''],
      inst_contact: [''],
      inst_superadmn_nam: [''],
      inst_superadmn_eml: ['', [Validators.required, Validators.pattern(this.emailpattern)]],
      inst_ac_valid_from: [''],
      inst_ac_valid_to: [''],
      inst_created_by: [''],
      is_inst_validaccess: [''],
      inst_ac_contnt_upload: [''],
      inst_ac_restricted_access: [''],
      inst_ac_testcr_access: [''],
      inst_ac_groupcr_access: [''],
      inst_ac_qns_upload: [''],
      inst_ac_disc_create: [''],
      inst_url: ['',[Validators.required]],
      inst_admn_url:['', [Validators.required]],
      instaccess_to_date: [''],
      instaccess_from_date: [''],
      //inst_superadmn_phn: new FormControl('')
    });
   
    
    this.instDefaultEditform = new FormGroup({
      inst_id: new FormControl(''),
      inst_ac_valid_to: new FormControl(''),
      inst_ac_contnt_upload: new FormControl(''),
      inst_ac_restricted_access: new FormControl(''),
      inst_ac_testatnd_access: new FormControl(''),
      inst_ac_testcr_access: new FormControl(''),
      inst_ac_groupcr_access: new FormControl(''),
      inst_ac_qns_upload: new FormControl(''),
      inst_ac_disc_create: new FormControl(''),
      updated_by_admin: new FormControl('')
    });
    this.instituteEditform = new FormGroup({
      inst_id: new FormControl(''),
      inst_name: new FormControl(''),
      inst_user_id: new FormControl(''),
      cntry_name: new FormControl(''),
      inst_url: new FormControl('',Validators.required),
      inst_admn_url: new FormControl('',Validators.required),
      inst_country: new FormControl(''),
      inst_city: new FormControl(''),
      inst_state: new FormControl(''),
      inst_email: new FormControl(''),
      inst_address: new FormControl(''),
      inst_phone: new FormControl(''),
      inst_alt_phone: new FormControl(''),
      inst_fax: new FormControl(''),
      inst_contact: new FormControl(''),
      is_inst_validaccess: new FormControl(''),
      ac_valid_from: new FormControl(''),
      ac_valid_to: new FormControl(''),
      inst_access_updateadby: new FormControl(''),
      inst_access_updated_date: new FormControl(''),
      city_name: new FormControl(''),
      inst_ac_valid_from: new FormControl(''),
      inst_ac_valid_to: new FormControl(''),
      // inst_superadmn_nam: new FormControl(''),
      // inst_superadmn_eml: new FormControl(''),
      //inst_superadmn_phn: new FormControl(''),
      cntry_id: new FormControl(''),
    });
    this.instituteAccessEditform = new FormGroup({
      inst_url: new FormControl(''),
      inst_id: new FormControl(''),
      inst_created_date: new FormControl(''),
      is_inst_validaccess: new FormControl(''),
      instaccess_from_date: new FormControl(''),
      instaccess_to_date: new FormControl(''),
      inst_access_updateadby: new FormControl(''),
      inst_access_updated_date: new FormControl('')
    });
    this.instsuperAdminEditform = this.fb.group({
      inst_id: [''],
      inst_superadmn_nam: [''],
      inst_superadmn_eml: ['', [Validators.required, Validators.pattern(this.emailpattern)]]
    });
    this.searchforInstitute = new FormGroup({
      user_dname: new FormControl(''),
      //user_id : new FormControl(''),
      userid: new FormControl(''),
      insId: new FormControl(''),
      InstName: new FormControl('')
    });
  }
  resendActivation() {
    this._manageinstituteService.resendActivation({ inst_superadmn_eml: this.instsuperAdminEditform.controls.inst_superadmn_eml.value })
      .then(res => {
        if (res) {
          this.alertmsgClass = 'success';
          this.msgSummery = 'Success';
          this.alertmsgSucc = 'Resent Link Successfully Sent!';
        }
        this.showSuccess();

      });
  }
  instDefaultUpdateform() {
    this._manageinstituteService.instDefaultUpdate(this.instDefaultEditform.value).subscribe(
      data => {
        { this.response = data; }
        if (data) {
          this.alertmsgClass = 'success';
          this.msgSummery = 'Success';
          this.alertmsgSucc = 'Institute access updated successfully!';

        } else {
          this.alertmsgClass = 'error';
          this.msgSummery = 'Error';
          this.alertmsgSucc = 'Something went wrong';
        }
        this.instituteEdit_3 = false;
        this.showSuccess();
      },
      error => { }
    );
    this.instituteEdit_3 = false;
  }

  onItemSelect(item: any) {
  }
  selectDate(event: any, range: any) {
    this['instaccess_' + range + '_date'] = event

  }
  resetAccess(){
    this.instaccess_from_date = new Date(this.instituteShow.instaccess_to_date);
    this.instaccess_to_date = new Date(this.instituteShow.instaccess_to_date);
    this.is_inst_validaccess = this.instituteShow.is_inst_validaccess;
  }
  createSuperadmin(createInstitute: FormGroup) {
    this.createInstituteFormSubmitted = true;

    if (this.createInstitute.invalid) {
      return;
  }
    
    if (this.inst_ac_valid_from === undefined || this.inst_ac_valid_to === undefined) {
      this.institute_date_invalid = true;
      return
    }
    var body = {
      inst_ac_contnt_upload: "1",
      inst_ac_disc_create: "1",
      inst_ac_groupcr_access: "1",
      inst_ac_qns_upload: "0",
      inst_ac_restricted_access: "1",
      inst_ac_testcr_access: "0",
      inst_ac_testatnd_access: "1",
      inst_ac_valid_from: createInstitute.controls.instaccess_from_date.value.getFullYear()+'-'+(createInstitute.controls.instaccess_from_date.value.getMonth()+1 )+'-'+createInstitute.controls.instaccess_from_date.value.getDate(),
      inst_ac_valid_to: createInstitute.controls.instaccess_to_date.value.getFullYear()+'-'+(createInstitute.controls.instaccess_to_date.value.getMonth()+1 )+'-'+createInstitute.controls.instaccess_to_date.value.getDate(),
      
      inst_address: createInstitute.controls.inst_address.value,
      inst_alt_phone: createInstitute.controls.inst_alt_phone.value,
      inst_city: createInstitute.controls.inst_city.value,
      inst_contact: createInstitute.controls.inst_contact.value,
      inst_country: createInstitute.controls.inst_country.value,
      inst_created_by: createInstitute.controls.inst_created_by.value,
      inst_email: createInstitute.controls.inst_email.value,
      inst_fax: createInstitute.controls.inst_faxvalue,
      inst_name: createInstitute.controls.inst_name.value,
      inst_phone: createInstitute.controls.inst_phone.value,
      inst_state: createInstitute.controls.inst_state.value,
      inst_superadmn_eml: createInstitute.controls.inst_superadmn_eml.value,
      inst_superadmn_nam: createInstitute.controls.inst_superadmn_nam.value,
      inst_url: createInstitute.controls.inst_url.value,
      inst_admn_url: createInstitute.controls.inst_admn_url.value,
      inst_user_id: createInstitute.controls.inst_user_id.value,
      is_inst_validaccess: createInstitute.controls.is_inst_validaccess.value
    }
    if(createInstitute.controls.instaccess_from_date.value !=undefined){
      body['instaccess_from_date'] =  createInstitute.controls.instaccess_from_date.value.getFullYear()+'-'+(createInstitute.controls.instaccess_from_date.value.getMonth()+1 )+'-'+createInstitute.controls.instaccess_from_date.value.getDate();
      
    }
    if(createInstitute.controls.instaccess_from_date.value !=undefined){
      body["instaccess_to_date"]= createInstitute.controls.instaccess_to_date.value.getFullYear()+'-'+(createInstitute.controls.instaccess_to_date.value.getMonth()+1 )+'-'+createInstitute.controls.instaccess_to_date.value.getDate()
    }
    this.superadminData = body;
    console.log("form fields data", this.superadminData);
    if (createInstitute.value.inst_superadmn_eml) {
      if (this.instAdminEmail == false) {
        this.createSuperadmininstitue();
      }
    } else {
      this.instAdminEmail = true;
      this.instAdminEmailErrText = "Please enter super admin email";
    }
  }
  instituteUpdateform(instituteEditform: FormGroup) {
    this.instituteEditFormSubmitted = true;
    if (this.instituteEditform.invalid) {
      return;
  }
    this.instituteData = instituteEditform.value
    this.updateInstitute();
  }
  instSAUpdateform(instsuperAdminEditform: FormGroup) {
    this.instSAData = instsuperAdminEditform.value
    if (instsuperAdminEditform.value.inst_superadmn_eml) {
      if (this.instsuperAdminEditform.valid && this.instAdminEmail == false) {
        this.updateinstSA();
        this.instSAEdit = false;
      } else {
        this.instSAEdit = true;
      }
    } else {
      this.instSAEdit = true;
      this.instAdminEmailErrText = 'Plesae enter email';
    }
  }
  instituteAccessUpdateform() {
    this._manageinstituteService.instituteAccessUpdateform(this.instituteAccessEditform.value).subscribe(
      data => {
        { this.response = data; }
        if (data) {
          this.alertmsgClass = 'success';
          this.msgSummery = 'Success';
          this.alertmsgSucc = 'Institute access updated successfully!';

        } else {
          this.alertmsgClass = 'error';
          this.msgSummery = 'Error';
          this.alertmsgSucc = 'Something went wrong';
        }
        this.instituteEdit_1 = false;
        this.showSuccess();
      },
      data => { }
    );
  }
  createSuperadmininstitue() {
    this._manageinstituteService.createSuperadmininstitue(this.superadminData).subscribe(
      data => {
        { this.response = data; }
        if (data == 3) {
          this.alertmsgClass = 'error';
          this.msgSummery = 'Error';
          this.alertmsgSucc = 'Institute is already created for this user!';
          this.showSuccess();
        } else if (data == 2) {
          this.alertmsgClass = 'error';
          this.msgSummery = 'Error';
          this.alertmsgSucc = 'Something went wrong';
          this.showSuccess();
        } else if (data == 1) {
          this.alertmsgClass = 'success';
          this.msgSummery = 'Success';
          this.alertmsgSucc = 'Institute created successfully!';
          this.showSuccess();
          this.getAllInstitutes(1, this.rowsPerPage);
          this.showUser(this.superadminData.inst_user_id, '', '');
        }
      },
      error => { }
    );
  }
  getUsername(item) {
    this._manageinstituteService.searchForInstitute(item)
      .then((data: any) => {
        { this.userData = data; }
        if (item == '') {
          this.allSchoolusers = false;
          this.noData = false;
        } else if (item != '') {
          if (data.length == 0) {
            this.allSchoolusers = false;
            this.noData = true;
          } else {
            this.allSchoolusers = true;
            this.noData = false;
          }
        }
      })
      .catch((error) => {
      })
  }
  getUserid(item) {
    this._manageinstituteService.getSchoolid(item).subscribe(
      data => {
        { this.userIds = data; }
        if (item == '') {
          this.allSchoolid = false;
          this.noDataid = false;
        } else if (item != '') {
          if (data.length == 0) {
            this.allSchoolid = false;
            this.noDataid = true;
          } else {
            this.allSchoolid = true;
            this.noDataid = false;
          }
        }
      },
      error => { }
    );
  }
  getInstid(item, column) {
    this._manageinstituteService.getInstid(item, column).subscribe(
      data => {
        { this.instId = data; }
        if (item == '') {
          this.allinstid = false;
          this.noDatainsid = false;
        } else if (item != '') {
          if (data.length == 0) {
            this.allinstid = false;
            this.noDatainsid = true;
          } else {
            this.allinstid = true;
            this.noDatainsid = false;
          }
        }
      },
      error => { }
    );
  }
  getInstname(item, column) {
    this._manageinstituteService.getInstid(item, column).subscribe(
      data => {
        { this.instId = data; }
        if (item == '') {
          this.allinstname = false;
          this.noDatainsname = false;
        } else if (item != '') {
          if (data.length == 0) {
            this.allinstname = false;
            this.noDatainsname = true;
          } else {
            this.allinstname = true;
            this.noDatainsname = false;
          }
        }
      },
      error => { }
    );
  }
  activeRow(x, length) {
    for (let i = 0; i < this.allInstitutes.length; i++) {
      if (x === i) {

        $('.instrow' + i).css('background-color', 'orange');
      } else if (x !== i) {
        if (i % 2 == 0) {
          $('.instrow' + i).css('background-color', '#fffff');
        } else {
          $('.instrow' + i).css('background-color', '#d9edf7');
        }
      }
    }
  }
  resetInstituteEditform(){
    let data:any = this.instituteShow;
    this.inst_name = data.inst_name;
    this.countryIds = data.cntry_id;
    this.stateIds = data.state_id;
    this.cityIds = data.city_id;
    this.inst_url = data.InstUrl;
    this.inst_admn_url = data.inst_admn_url;
    this.inst_address = data.inst_address;
    this.inst_email = data.inst_email;
    this.inst_phone = data.inst_phone;
    this.inst_alt_phone = data.inst_alt_phone;
    this.inst_fax = data.inst_fax;
    this.inst_contact = data.inst_contact;
  }
  showUser(id, text, num) {
    if (num == 1) {
      this.userid = text;
      this.allSchoolid = false;
    } else if (num == 2) {
      this.user_dname = text;
      this.allSchoolusers = false;
    } else if (num == 3) {
      this.insId = text;
      this.allinstid = false;
    } else if (num == 4) {
      this.InstName = text;
      this.allinstname = false;
    } else {
      this.InstName = '';
      this.allinstname;
    }
    
    this._manageinstituteService.showUser(id).subscribe(
      data => {
        { this.userShows = data; }
        this.userId = data.user_id;
      },
      error => { }
    );
    this._manageinstituteService.showInstitute(id).subscribe(
      data => {
        { this.instituteShow = data; }
        this.userinst_id = data.userInst;
        if (Object.keys(data).length === 0) {
          return
        }
        this.inst_superadmn_nam = data.inst_superadmn_nam;
        this.inst_superadmn_eml = data.inst_superadmn_eml;
        this.instsuperAdminEditform.controls.inst_superadmn_eml.setValue(this.inst_superadmn_eml);
        this.inst_name = data.inst_name;
        this.inst_user_id = data.inst_user_id;
        this.cntry_name = data.cntry_name;
        this.cntry_id = data.cntry_id;
        this.state_name = data.state_name;
        this.state_id = data.state_id;
        this.city_name = data.city_name;
        this.city_id = data.city_id;
        this.inst_address = data.inst_address;
        this.inst_email = data.inst_email;
        this.inst_phone = data.inst_phone;
        this.inst_alt_phone = data.inst_alt_phone;
        this.inst_fax = data.inst_fax;
        this.inst_contact = data.inst_contact;
        this.inst_access_updateadby = data.inst_access_updateadby;
        this.instaccess_to_date = new Date(data.instaccess_to_date);
        this.instaccess_from_date = new Date(data.instaccess_from_date);
        this.inst_created_date = this.getFormattedDate(data.inst_created_date);
        this.is_inst_validaccess = data.is_inst_validaccess;
        this.inst_access_updated_date = this.getFormattedDate(data.inst_access_updated_date);
        this.inst_ac_valid_from = new Date(data.inst_ac_valid_from);
        this.inst_ac_valid_to = new Date(data.inst_ac_valid_to);
        this.inst_ac_contnt_upload = data.inst_ac_contnt_upload;
        this.inst_ac_restricted_access = data.inst_ac_restricted_access;
        this.inst_ac_testcr_access = data.inst_ac_testcr_access;
        this.inst_ac_testatnd_access = data.inst_ac_testatnd_access;
        this.inst_ac_groupcr_access = data.inst_ac_groupcr_access;
        this.inst_ac_qns_upload = data.inst_ac_qns_upload;
        this.inst_ac_disc_create = data.inst_ac_disc_create;
        this.inst_url = data.InstUrl;
        this.inst_admn_url = data.inst_admn_url;

      },
      error => { }
    );
    /* Get Countries */
    this._defaultDataService.getcountryNamesforProfile().subscribe(
      data => this.country = data,
      error => this.errorMessage = error
    );
    /* ./Get Countries */
  }
  getFormattedDate(data) {
    var date = new Date(data);
    var date2 = new Date(data).toString();
    if (date2 == 'Invalid Date') {
      return date2 = 'N/A';
    }
    let year = date.getFullYear().toString();
    let month = (1 + date.getMonth()).toString();
    let day = date.getDate().toString();
    let result = day + '-' + month + '-' + year
    return result.toString();
  }
  editInstituteDetails(form) {
    if(form ==1){
      if (this['instituteEdit_1'] == false) {
        this['instituteEdit_1'] = true;
        
      } else {
        this['instituteEdit_1'] = false;
      }
    }else{
      if (this['instituteEdit'] == false) {
        this['instituteEdit'] = true;
        /* Get Countries */
        this._defaultDataService.getcountryNamesforProfile().subscribe(
          data => this.country = data,
          error => this.errorMessage = error
        );
        /* ./Get Countries */
      } else {
        this['instituteEdit'] = false;
      }
    }
  }
  editInstSADetails() {
    if (this.instSAEdit == false) {
      this.instSAEdit = true;
    } else {
      this.instSAEdit = false;
    }
  }
  updateinstSA() {
    this._manageinstituteService.updateinstSA(this.instSAData).subscribe(
      data => {
        { this.response = data; }
        if (this.response == 1) {
          this.instSAEdit = false;
          this.alertmsgClass = 'success';
          this.msgSummery = 'Success!';
          this.alertmsgSucc = 'Data updated successfully!';
          this.showSuccess();
        } else {
          this.instSAEdit = false;
          this.alertmsgClass = 'error';
          this.msgSummery = 'Error!';
          this.alertmsgSucc = data;
          this.showSuccess();
        }
      },
      error => { }
    );
  }
  updateInstitute() {
    this._manageinstituteService.updateInstitute(this.instituteData).subscribe(
      data => {
        { this.response = data; }
        if (this.response == 1) {
          this.instituteEdit = false;
          this.alertmsgClass = 'success';
          this.msgSummery = 'Success!';
          this.alertmsgSucc = 'Data updated successfully!';
          this.showSuccess();
        }
      },
      error => { }
    );
  }
  getStatesoncountry(country) {
    this._defaultDataService.getStatesoncountries(country).subscribe(
      data => { this.states = data; this.cities = [] },
      error => this.errorMessage = error
    );
  }
  getCitiesonstates(state) {
    this._defaultDataService.getCitiesonstates(state).subscribe(
      data => this.cities = data,
      error => this.errorMessage = error
    );
  }
  getAllInstitutesCount() {
    this._manageinstituteService.getAllInstitutesCount().subscribe(
      data => {
        { this.pageNum = data; }
      },
      error => { }
    );
  }
  getAllInstitutes(pageNum, rowsPerPage) {
    this._manageinstituteService.getAllInstitutes(pageNum, rowsPerPage).subscribe(
      data => {
        {
          this.allInstitutes = data;
          this.showPaginator = true;
        }

      },
      error => { }
    );
  }
  manageUserFilter(column) {
    this.showPaginator = false;
    this.allInstitutes = [];
    if (column == 'user_id') { this.column = 'user_id'; this.selectedValues = this.selectedUserIds; } else { this.column3 = ''; }
    if (column == 'inst_id') {
      this.column = 'inst_id';
      this.selectedValues = this.selectedInstsds;
      if (this.selectedInstsds[0] === "0") {
        this._manageinstituteService.InstNoUserIdsGroup().subscribe(
          data => {
            { this.allInstitutes = data; }
          },
          error => { }
        );
      }
    }
    if (column == 'inst_name') { this.column = 'inst_name'; this.selectedValues = this.selectedInstNames; }
    if (column == 'inst_contact') { this.column = 'inst_contact'; this.selectedValues = this.selectedContactNames; }
    if (column == 'user_dname') { this.column = 'user_dname'; this.selectedValues = this.selectedUserName; }
    if (column == 'user_country') { this.column = 'user_country'; this.selectedValues = this.selectedCountryNames; }
    if (column == 'user_state') { this.column = 'user_state'; this.selectedValues = this.selectedStateNames; }
    if (column == 'user_city') { this.column = 'user_city'; this.selectedValues = this.selectedCityNames; }
    if (this.selectedValues.length < 1) {
      this.getAllInstitutes('1', '10');
    } else {
        this._manageinstituteService.manageUserFilter(column, this.selectedValues).subscribe(
          data => {
              for(let ins of data){
                this.allInstitutes.push(ins);
              }
          },
          error => { }
        );
    }
  }
  getStates() {
    this._manageinstituteService.getAllStates().subscribe(
      data => {
        this.AllStates = data;

        for (let state of this.AllStates) {
          if (state.state_id != undefined) {
            this.AllStatesMap[state.state_id] = state;
          }
        }
      },
      error => { }
    );
  }

  getCities() {
    this._manageinstituteService.getAllCity().subscribe(
      data => {
        this.AllCities = data;
        for (let city of this.AllCities) {
          if (city.city_id != undefined)
            this.AllCitiesMap[city.city_id] = city;
        }
      },
      error => { }
    );
  }
  convertByState(code) {
    // for(let state of this.AllStates){
    //   if(state.state_id === code){
    //     return state.state_name;
    //   }
    // }
    if (code === null) {
      return '';
    }
    let state = this.AllStatesMap[code];
    if (state.state_name !== undefined) {
      return state.state_name;
    }
  }
  convertByCity(code) {
    if (code === null) {
      return '';
    }
    let city = this.AllCitiesMap[code];
    return city.city_name;
    // for(let city of this.AllCities){
    //   if(city.city_id === code){
    //     return city.city_name;
    //   }
    // }
  }
  getUniqueInstitute() {
    this._manageinstituteService.getUniqueInstitute().subscribe(
      data => {
        { this.uniqueInstitute = data; }
      },
      error => { }
    );
  }
  CheckAdminAvailability(value, column) {
    this.checkData = {
      "value": value,
      "column": column,
      "availId": '',
      "w_column": "admin_id",
      "table": "admin_access"
    }
    this.availId = '';
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
  showSuccess() {
    this.messageService.add({ severity: this.alertmsgClass, summary: this.msgSummery, detail: this.alertmsgSucc });
  }
  /* For Production */
  onReject() { }
  index: number = -1;
  onTabClose(event) {
    this.messageService.add({ severity: 'info', summary: 'Tab Closed', detail: 'Index: ' + event.index })
  }
  onTabOpen(event) {
    this.messageService.add({ severity: 'info', summary: 'Tab Expanded', detail: 'Index: ' + event.index });
  }
  openNext() {
    this.index = (this.index === 3) ? 0 : this.index + 1;
  }
  openPrev() {
    this.index = (this.index <= 0) ? 3 : this.index - 1;
  }
  search() {
    this._manageinstituteService.getSchooluser().subscribe(
      data => {
        // for(let i=0; i<data.length; i++)
        //   {
        this.userData12 = data;
        //  }     
      },
      error => { }
    );
  }
  paginate(event) {
    this.pageCount = event.page + 1;
    this.getAllInstitutes(this.pageCount, this.rowsPerPage);
  }
  selectRowsperPage(event) {
    this.pageCount = 1;
    this.rowsPerPage = event;
    this.getAllInstitutes(this.pageCount, this.rowsPerPage);
  }
  InstUserIdsGroup() {
    this._manageinstituteService.InstUserIdsGroup().subscribe(
      data => {
        { this.response = data; }
        for (let usr of this.response) {
          this.InstUserIds.push(
            { "label": usr.inst_user_id, "value": usr.inst_user_id },
          );
        }
      },
      error => { });
  }
  userNameGroup() {
    this._manageinstituteService.UserNameGroup().subscribe(
      data => {
        { this.response = data; }
        this.userData = data;
        this.CountryNamesGroup()
        for (let usr of this.response) {
          this.userName.push(
            { "label": usr.user_dname, "value": usr.user_dname },
          );
        }
      },
      error => { });
  }
  InstIdsGroup() {
    this._manageinstituteService.InstIdsGroup().subscribe(
      data => {
        { this.response = data; }
        this.Instsds.push(
          { "label": 'is blank', "value": '0' },
        );
        for (let usr of this.response) {
          this.Instsds.push(
            { "label": usr.inst_id, "value": usr.inst_id },
          );
        }

      },
      error => { });
  }
  InstNamesGroup() {
    this._manageinstituteService.InstNamesGroup().subscribe(
      data => {
        { this.response = data; }
        for (let usr of this.response) {
          this.InstNames.push(
            { "label": usr.inst_name, "value": usr.inst_name },
          );
        }

      },
      error => { });
  }
  CountryNamesGroup() {
    var array = [];
    for (let usr of this.userData) {
      if (usr.user_country !== null) {
        if (array.indexOf(usr.user_country) === -1) {
          array.push(usr.user_country);
          this.CountryNames.push(
            { "label": usr.country, "value": usr.user_country },
          );
        }

      }
    }
    this.StateNamesGroup();

  }

  StateNamesGroup() {
    var array = [];
    for (let usr of this.userData) {
      if (usr.user_state !== null) {
        if (array.indexOf(usr.user_state) === -1) {
          array.push(usr.user_state);
          this.StateNames.push(
            { "label": usr.state, "value": usr.user_state },
          );
        }
      }
    }
    this.CityNamesGroup();
  }
  CityNamesGroup() {
    var array = [];
    for (let usr of this.userData) {
      if (usr.user_city !== null) {
        if (array.indexOf(usr.user_city) === -1) {
          array.push(usr.user_city);
          this.CityNames.push(
            { "label": usr.city, "value": usr.user_city },
          );
        }
      }
    }
  }
  getCountry() {
    this._defaultDataService.getcountryNamesforProfile().subscribe(
      data => {
        {
          this.country = data;
        }
      },
      error => this.errorMessage = error
    );
  }
  ContactNamesGroup() {
    this._manageinstituteService.ContactNamesGroup().subscribe(
      data => {
        { this.response = data; }
        for (let usr of this.response) {
          if (usr.inst_contact !== '') {
            this.ContactNames.push(
              { "label": usr.inst_contact, "value": usr.inst_contact },
            );
          }
        }
      },
      error => { });
  }
  search12(event) {
    this._manageinstituteService.getSchoolusersearch(event.query).subscribe(
      data => {
        this.userData12 = data;
      },
      error => { }
    );
  }
  states2: string[] = [
    'Alabama',
    'Alaska',];
}
