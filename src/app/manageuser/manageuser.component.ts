import { Component, OnInit, Input, Inject, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { SelectItemGroup } from 'primeng/api';
import { ManageuserService } from './manageuser.service';
import { DefaultDataService } from '../default-data.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Paginator } from 'primeng/paginator';
interface City {
  name: string;
  code: string;
}
declare const $: any;
@Component({
  selector: 'app-manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: [
    '../../assets/superadmin/plugins/bootstrap-toggle/bootstrap-toggle.min.css',
    './manageuser.component.css'
  ],
  providers: [ManageuserService, MessageService]
})

export class ManageuserComponent implements OnInit {
  @ViewChild('p') paginator: Paginator;
  updateUser: FormGroup;
  mentorUser: FormGroup;
  partnerUser: FormGroup;
  userUpdatedata: any;
  CreateMentor = true;
  EditMentorButton = true;
  SaveMentorButton = false;
  CancelMentorButton = true;
  CreatePartner = false;
  SavePartnerButton = false;
  CancelPartnerButton = false;
  EditPartnerButton = false;
  mentor_id: any;
  mentor_name: any;
  mentor_user_id:any;
  mentor_address:any;
  mentor_phone:any;
  mentor_alt_phone:any;
  mentor_fax:any;
  mentor_email:any;
  
  partner_id: any;
  partner_name: any;
  partner_user_id:any;
  partner_address:any;
  partner_phone:any;
  partner_alt_phone:any;
  partner_fax:any;
  partner_email:any;

  profileimg: any = "../../assets/superadmin/gems-img/upload/avatar.png";
  cities: City[];
  selectedCity: City;
  cars: SelectItem[];
  selectedCar1: string;
  selectedCar2: string = 'BMW';
  selectedCar3: string;
  Check_admin_id: any;
  response: any;
  countries: any;
  userTypes: any;
  userId: any = [];
  suser_id: any;
  userShow: any;
  country: any;
  errorMessage: any;
  user_dname: any;
  usr_mentor_id: any;
  is_show_user: boolean;
  show_mentor_edit_form: boolean;
  usr_parnter_id: any;
  states: any;
  user_fname: any;
  user_mname: any;
  user_lname: any;
  user_gender: any;
  user_dob: any;
  user_email: any;
  user_alt_email: any;
  user_phone_code: any;
  user_phone: any;
  user_alt_phone: any;
  user_alt_phone_code: any;
  user_fax: any;
  user_fax_code: any;
  user_school: any;
  user_school_name: any;
  user_class: any;
  user_country: any;
  user_state: any;
  user_city: any;
  user_address: any;
  uac_email: any;
  uac_phone: any;
  usr_asind_mentor: any;
  user_asind_partner: any;
  usertype_id: any;
  allSchools: Array<any> = [];
  allSchoolNames: any = [];
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
  profileEdit_15: any = true;
  currentPage: any;
  block_reason: any;
  disabled = false;
  profileEdit_13: boolean = false;
  profileEdit_14: boolean = false;
  msgSucc: boolean = false;
  alertmsgSucc: string;
  alertmsgClass: string;
  groupedCars: SelectItemGroup[];
  @Input() name: string;
  userCountry: any;
  userState: any;
  userCity: any;
  loginsEdit_2: boolean = false;
  loginsEdit_3: boolean = false;
  msgSuccLogin: boolean = false;
  user_regdate: any;
  createdby_admin: any;
  uac_is_reg_confiemed: any;
  dataDismiss: any;
  btnColor: string;
  btnText: string;
  dataTarget: boolean;
  uac_reg_cnf_by: any;
  uac_reg_cnf_date: any;
  Check_admintype_id: string;
  is_user_verified: any;
  verifyTarget: boolean;
  user_verified_date: any;
  user_verified_by: any;
  uac_is_blocked: any;
  uac_blocked_by: any;
  uac_blocked_date: any;
  btnClass: string;
  uac_is_deleted: any;
  uac_deleted_by: any;
  uac_deleted_date: any;
  btnClassd: string;
  btnTextd: string;
  userDeleted: boolean = false;
  usrtyp_name: any;
  userpCountry: any;
  userapCountry: any;
  allUsers12: any;
  OnItemSelect: any;
  //onItemSelect:any;
  onItemDeSelect: any;
  OnItemDeSelect: any;
  OnSelectAll: any;
  OnDeSelectAll: any;
  onSelectAll: any;
  onDeSelectAll: any;
  userDname: any;
  schoolInstId: any;
  menotorId: any;
  userType: any;
  userStatus: any;
  //userCountries: any;
  itemList2: any;
  userLname: any;
  //pageNumText2 :[];
  usersPage: number;
  pageCount: number = 1;
  pageNum: any;
  totalPages: any;
  rowsPerPage: any;
  pageNumText: any;
  page: string;
  pagePrev: any;
  selectedFirstNames: any = [];
  selectedUserType: any = [];
  selectedUserId: any = [];
  selectedUserstatus: any = [];
  column1: any;
  finaldata: any;
  mentorfinaldata: any;
  partnereditdata: any;
  partnerfinaldata:any;
  column2: string;
  selectedLastNames: any = [];
  fNames: any;
  mNames: any;
  pNames: any;
  column: string;
  selectedValues: any;
  dNames: any;
  column3: string;
  selectedDisplayNames: any = [];
  lNames: any;
  sNames: any;
  Schoolname: any;
  nRightClicks = 0;
  selectedSchoolNames: any = [];
  cNames: any;
  Classname: any;
  selectedClasses: any = [];
  UserConfirm: any;
  selectedUserConfirm: any = [];
  freeAccess: any[];
  selectedfreeAccess: any = [];
  gemsAccess: ({ "label": number; "value": number; } | { "label": string; "value": string; })[];
  selectedgemsAccess: any = [];
  asNames: any;
  schoolAccesss: any;
  selectedschoolAccess: any;
  blockedAccess: { "label": string; "value": number; }[];
  verifyAccess: any[];
  selectedblockedAccess: any = [];
  deletedAccess: { "label": string; "value": number; }[];
  selecteddeletedAccess: any = [];
  showPaginator: boolean = true;
  options: any = {
    autoApply: false,
    alwaysShowCalendars: false,
    linkedCalendars: true,
    singleDatePicker: false,
    showWeekNumbers: false,
    showISOWeekNumbers: false
  };

  selected: any;
  alwaysShowCalendars: boolean;
  showRangeLabelOnInput: boolean;
  keepCalendarOpeningWithRange: boolean;
  maxDate: moment.Moment;
  minDate: moment.Moment;
  invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];
  ranges: any = {
    'Today': [new Date()],
    'Yesterday': [moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last Week (Mo-Su)': [moment().subtract('days', 7).isoWeekday(1), moment().subtract('days', 7).isoWeekday(7)],
    'Month to Date': [moment().startOf('month'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    'Year to Date': [moment().startOf('year'), moment()]
  };

  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some(d => d.isSame(m, 'day'))
  }
  uac_iusertypeId: any;
  Check_inst_id: any;
  summary: any;
  uac_school: any[];
  uac_gems: any[];
  uac_free: any[];
  accessColumn: any;
  selectedUsercountry: any = [];
  sdate: any;
  smonth: any;
  syear: any;
  edate: any;
  emonth: any;
  eyear: any;
  rendDate: any = [];
  rstartDate: any = [];
  allStates: any;
  allCities: any;
  stateNames: any[];
  selectedCities: any = [];
  selectedStates: any = [];
  cityNames: any;
  selectedverifyAccess: any = [];
  selectedtestAttndAccess: any = [];
  selectedInstitutes: any = [];
  selectedschoolInstId: any = [];
  schoolInst: any;
  selectedmenotorId: any = [];
  allmenotorId: any;
  reasons: any;
  usrblock_reason: any;
  usrblock_reasond: any;
  uac_blocked_reasonid: any;
  uac_deleted_reasonid: any;
  reasonsvalues: any;
  blockedData: any;
  checkedData: any;
  checkedResponse: any;
  uac_valid_from: any;
  uac_valid_to: any;
  instAcceColumn: string;
  accessColumns: any;
  accessColumng: any;
  accessColumnf: any;
  accessColumnt: any;
  accessColumnr: any;
  geminstAcc: any;
  accessControl: FormGroup;
  userData: any;
  mentorshowdata: any;
  usermMentorData_Show: any;
  itemsPerPage: any = 10;
  acc_valid_to: any;
  acc_valid_to_calender: any;
  user_acc_institute: any;
  accessTrueFalse: boolean;
  accessChangeTrueFalse: any = false;
  acc_valid_from: any;
  config: any[];
  uac_contnt_upload: any;
  uac_restricted_access: any;
  uac_testcr_access: any;
  uac_testatnd_access: any;
  uac_groupcr_access: any;
  uac_qns_upload: any;
  uac_disc_create: any;
  accCntrlResp: any;
  date: Date;
  configDate: void;
  validToDate: any;
  uac_id: any;
  user_id: any;
  sbbtnText: string = 'Update';
  today: any;
  yesterday: any;
  testAttndAccess: { "label": string; "value": number; }[];
  instNames: any;
  schoolInstitute: any = null;
  oldvalidToDate: any;
  userAccessData: any;
  is_show_user_partner: boolean;
  show_partner_edit_form: boolean;
  usr_parnter: any;
  partner_id_value: any;
  mantor_id_value: any;
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  /********------for producation */
  selectedCars1: any;
  selectedCars2: any;
  selectedCars3: any;
  selectedCars4: any;
  selectedCars5: any;
  selectedCars6: any;
  rangeDates: any

  itemList = [];
  allUsers = [];
  userCountries = [];
  selectedItems = [];
  selectedItems2 = [];
  CheckedValues: any = [];
  checkedValuesIndexes: any = [];
  settings2 = {};
  settings = {};
  firstParam: any;
  filterFirstName: any;
  delete_reason: any;
  minimumDate: any;
  getUserLoader: any = false;
  cancelCall: any = 0;
  cancelCityCall: any = 0;
  cancelCountryCall: any = 0;
  paginatorRefresh: any = true;
  acc_to_date: any;
  userEducation: FormGroup;
  Check_user_id: any;
  schoolEditShow: any = false;
  schoolEdit: any = true;
  mentorid: any = true;
  partnerid: any = true;
  user_course: any;
  allCourses: any = [];
  allCoursesNames: any = [];
  allClasses: any = [];
  allClassesName: any = [];
  // allMentorsName: any = [];
  user_type: any;
  is_inst_access: any;
  /**--------------------- */


  constructor(
    private _manageuserService: ManageuserService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private _router: Router,
    private _http: Http,
    private _activatedRoute: ActivatedRoute,
    private _defaultDataService: DefaultDataService,
    private messageService: MessageService,
  ) {
    this.maxDate = moment().add(2, 'weeks');
    this.minDate = moment().subtract(3, 'days');
    this.alwaysShowCalendars = true;
    this.keepCalendarOpeningWithRange = true;
    this.showRangeLabelOnInput = true;
    this.currentPage = 1;
  }
  rangeClicked(range) {

  }
  dateTime = new Date();
  public ngOnInit(): any {
    this.SaveMentorUser();
    this.SavePartnerUser();
    this.date = new Date();
    this.is_show_user = false;
    this.show_mentor_edit_form = false;
    this.is_show_user_partner = false;
    this.show_partner_edit_form = false;
    this.rowsPerPage = 10;

    /***Filter Drap Down**** */
    this.itemList = [
      { "id": 1, "itemName": "India" },
      { "id": 2, "itemName": "Singapore" },
      { "id": 3, "itemName": "Australia" },
      { "id": 4, "itemName": "Canada" },
      { "id": 5, "itemName": "South Korea" },
      { "id": 6, "itemName": "Brazil" }
    ];
    this.userDname = [];
    this.schoolInstId = [];
    this.menotorId = [];
    this.userType = [
      { "value": 1, "label": "Student" },
      { "value": 2, "label": "Faculty" },
      { "value": 3, "label": "Parent" },
    ];
    this.userStatus = [
      { "value": 0, "label": "Not Active" },
      { "value": 1, "label": "Active" },
    ];
    this.itemList2 = [];
    this.userLname = [];
    this.Schoolname = [];
    this.Classname = [];
    this.UserConfirm = [];
    this.schoolAccesss = [];
    this.selectedItems2 = [];
    this.stateNames = [];
    this.cityNames = [];
    this.settings2 = {
      singleSelection: false,
      text: "Select",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      badgeShowLimit: 3
    };
    this.selectedItems = [
    ];
    this.settings = {
      singleSelection: false,
      text: "Select Countries",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      badgeShowLimit: 3
    };


    this.Check_admintype_id = localStorage.getItem('admintype_id');
    if (this.Check_admintype_id != '3' && this.Check_admintype_id != '4') {
      this.userType.push({ "value": 4, "label": "School" });
    }
    this.Check_admin_id = localStorage.getItem('admin_id');
    this.Check_inst_id = localStorage.getItem('inst_id');
    if (!this.Check_admin_id) {
      this._router.navigate(['']);
    }
    this.getAllCountry('');
    this.getuserTypes();
    this.getSchools();
    this.dnameGroup(this.Check_inst_id);
    this.fnameGroup(this.Check_inst_id);
    this.lnameGroup(this.Check_inst_id);
    this.snameGroup(this.Check_inst_id);
    this.cnameGroup(this.Check_inst_id);
    this.getUserId(this.Check_inst_id);
    this.userConfirm();
    this.getAllStates('');
    this.getAllCities('');
    this.getAllschoolinst();
    this.getAllmentorId();
    this.getDlblReasons();
    this.getClasses(this.Check_inst_id);
    this.getCourses(this.Check_inst_id);
    this.getMentors();
    this.getPartners();

    this.getAllRegisteredUsers(this.pageCount, this.rowsPerPage, this.Check_inst_id);
    $('#user_detal').on('hidden.bs.modal', (e) => {
      this.getUserLoader = true;
      this.allUsers = [];
      this.getAllRegisteredUsers(this.currentPage, this.rowsPerPage, this.Check_inst_id);
    });
    this.updateUser = new FormGroup({
      user_dname: new FormControl(''),
      user_fname: new FormControl(''),
      user_mname: new FormControl(''),
      user_lname: new FormControl(''),
      user_gender: new FormControl(''),
      user_dob: new FormControl(''),
      user_email: new FormControl(''),
      user_alt_email: new FormControl(''),
      user_phone_code: new FormControl(''),
      user_phone: new FormControl(''),
      user_alt_phone: new FormControl(''),
      user_alt_phone_code: new FormControl(''),
      user_fax: new FormControl(''),
      user_fax_code: new FormControl(''),
      user_school: new FormControl(''),
      user_class: new FormControl(''),
      user_country: new FormControl(''),
      user_state: new FormControl(''),
      user_city: new FormControl(''),
      user_address: new FormControl(''),
      testid: new FormControl(''),
      uac_email: new FormControl(''),
      uac_phone: new FormControl(''),
      usertype_id: new FormControl(''),
      usrtyp_name: new FormControl(''),
      usr_asind_mentor: new FormControl(''),
      user_asind_partner: new FormControl('')
    });
    this.mentorUser = new FormGroup({
      mentor_id: new FormControl(''),
      mentor_user_id: new FormControl(''),
      mentor_name: new FormControl(''),
      mentor_address: new FormControl(''),
      mentor_alt_phone: new FormControl(''),
      mentor_phone: new FormControl(''),
      mentor_fax: new FormControl(''),
      mentor_email: new FormControl(''),
    })
    this.partnerUser = new FormGroup({
      partner_id: new FormControl(''),
      partner_user_id: new FormControl(''),
      partner_name: new FormControl(''),
      partner_address: new FormControl(''),
      partner_alt_phone: new FormControl(''),
      partner_phone: new FormControl(''),
      partner_fax: new FormControl(''),
      partner_email: new FormControl(''),
    })
    this.userEducation = new FormGroup({
      user_school: new FormControl(''),
      user_class: new FormControl(''),
      user_course: new FormControl(''),
      UserId: new FormControl('')
    });
    this.accessControl = new FormGroup({
      user_id: new FormControl(''),
      uac_id: new FormControl(''),
      created_by_admin: new FormControl(''),
      acc_valid_to: new FormControl(''),
      oldvalidToDate: new FormControl(''),
      user_acc_institute: new FormControl(''),
      uac_contnt_upload: new FormControl(''),
      uac_testcr_access: new FormControl(''),
      uac_testatnd_access: new FormControl(''),
      uac_groupcr_access: new FormControl(''),
      uac_qns_upload: new FormControl(''),
      uac_disc_create: new FormControl(''),
      oldvalidFromDate: new FormControl('')

    });

  }

  getMentors(){
    this._manageuserService.getMentors()
      .then((data: any) => {
        { this.mNames = data.result; }
      },
        error => { }
      );
  }
  getPartners(){
    this._manageuserService.getPartners().subscribe(
      data => {
        this.pNames = data.result;
      },
      error => { },
    );
  }
  getClasses(inst_id: any) {
    this.allClassesName = [];
    this._manageuserService.getClasses(inst_id).subscribe(
      data => {
        this.allClasses = data;
        this.allClassesName.push({ "label": "No Class", "value": 0 });
        for (let act of this.allClasses) {
          this.allClassesName.push({ "label": act.class_sname, "value": act.class_id });
        }
      },
      error => { },
    );
  }
  getCourses(inst_id: any) {
    this.allCoursesNames = [];
    this._manageuserService.getCourses(inst_id).subscribe(
      data => {
        { this.allCourses = data; }
        //console.log('courses = ', data);
        this.allCoursesNames.push({ "label": "No Course", "value": null });
        for (let act of this.allCourses) {
          this.allCoursesNames.push({ "label": act.course_sname, "value": act.course_id });
        }
      },
      error => { },
    );
  }
  updateEducation(userEducation: FormGroup) {
    this.finaldata = userEducation.value;
    this.educationUpdate();
  }

  educationUpdate() {
    this._manageuserService.educationUpdate(this.finaldata)
      .then((data: any) => {
        this.response = data
        if (data == 1) {
          this.alertmsgSucc = 'Education changed successfully!';
          this.alertmsgClass = 'success';
          this.summary = 'Success!';
          this.showSuccess();
          this.schoolEdit = true;
        }
      },
        error => { }
      );
  }
  selectDateacc_valid_to(event) {
    this.acc_valid_to_calender = event;
    this.acc_valid_to = event.getFullYear() + '-' + (event.getMonth() + 1) + '-' + event.getDate();
  }
  selectDate(event) {
    this.acc_to_date = event;
    // this.acc_valid_to = event.getFullYear()+'-'+(event.getMonth()+1)+'-'+event.getDate();
    // console.log("acc_valid_to",this.acc_valid_to);
  }
  checked(event, value) {
    if (event == true) {
      this[value] = 1;
    } else {
      this[value] = 0;
    }
  }
  changeAccessControls() {
    var body = {
      "user_id": this.Check_user_id,
      "uac_id": this.uac_id,
      "created_by_admin": this.Check_admin_id,
      "acc_valid_to": this.accessControl.controls.acc_valid_to.value.getFullYear() + '-' + (this.accessControl.controls.acc_valid_to.value.getMonth() + 1) + '-' + this.accessControl.controls.acc_valid_to.value.getDate(),
      "oldvalidToDate": this.oldvalidToDate.split("-").reverse().join("-"),
      "user_acc_institute": this.user_acc_institute,
      "uac_restricted_access": this.uac_restricted_access,
      "uac_contnt_upload": this.uac_contnt_upload,
      "is_inst_access": this.is_inst_access,
      "uac_testcr_access": this.uac_testcr_access,
      "uac_testatnd_access": this.uac_testatnd_access,
      "uac_groupcr_access": this.uac_groupcr_access,
      "uac_qns_upload": this.uac_qns_upload,
      "uac_disc_create": this.uac_disc_create,
      "oldvalidFromDate": this.accessControl.controls.oldvalidFromDate.value.split("-").reverse().join("-")
    }

    this._manageuserService.changeAccessControls(body)
      .then((data: any) => {
        { this.accCntrlResp = data; }
        if (data == 2) {
          this.alertmsgSucc = 'Update possible only to extend validity period!';
          this.alertmsgClass = 'error';
          this.summary = 'Choose correct valid to date!';
          this.showSuccess();
        } else {
          this.alertmsgSucc = 'Changed Successfully!';
          this.alertmsgClass = 'success';
          this.summary = 'Success';
          this.profileEdit_15 = true;
          setTimeout(() => {
            this.showUser(this.accessControl.value.user_id);
          }, 100);
          this.showSuccess();
        }
      },
        error => { }
      );
  }
  resendActivation(value) {
    this._manageuserService.resendActivation({ login_name: value })
      .then(res => {
        if (res == 1) {
          this.alertmsgClass = 'success';
          this.summary = 'Success';
          this.alertmsgSucc = 'Resent Link Successfully Sent!';
          this.showSuccess();
        }

      });
  }
  reset($event) {
    this.paginatorRefresh = false;
    this.selectedUserId = [];
    this.selectedUserstatus = [];
    this.selectedUserType = [];
    this.selectedUsercountry = [];
    this.rstartDate = [];
    this.rendDate = [];
    this.selected = [];
    this.selectedUserConfirm = [];
    this.selectedDisplayNames = [];
    this.selectedFirstNames = [];
    this.selectedLastNames = [];
    this.selectedSchoolNames = [];
    this.selectedClasses = [];
    this.selectedStates = [];
    this.selectedCities = [];
    this.selectedfreeAccess = [];
    this.selectedgemsAccess = [];
    this.selectedverifyAccess = [];
    this.selectedInstitutes = [];
    this.selectedtestAttndAccess = [];
    this.selectedblockedAccess = [];
    this.selecteddeletedAccess = [];
    this.selectedschoolInstId = [];
    this.selectedmenotorId = [];
    this.selectedValues = [];
    this.rowsPerPage = 10;
    this.currentPage = 1;
    this.paginator.changePage(0);
    this.paginatorRefresh = true;
    this.getAllRegisteredUsers(this.currentPage, this.rowsPerPage, this.Check_inst_id)
  }
  paginate(event) {
    //alert(event.page+1);
    //alert('records' +event.first + 'event.rows' + event.rows + 'event.page' + event.page + 'event.pageCount' +event.pageCount);
    // event.rows = Number of rows to display in new page
    // event.page = Index of the new page
    // event.pageCount
    //alert(event.rows);
    this.pageCount = event.page + 1;
    this.currentPage = event.page + 1;
    this.getAllRegisteredUsers(this.currentPage, this.rowsPerPage, this.Check_inst_id);
  }
  getUserId(id) {
    this.userId = [];
    this._manageuserService.userIdGroup(id)
      .then(data => {
        for (let ids of data) {
          if (ids.user_id !== null) {
            this.userId.push({
              "label": ids.user_id, "value": ids.user_id
            })
          }
        }
      });

  }
  selectRowsperPage(event) {
    this.pageCount = 1;
    this.rowsPerPage = event;
    this.getAllRegisteredUsers(this.pageCount, this.rowsPerPage, this.Check_inst_id);
  }
  getAllRegisteredUsersCount(values) {

    this._manageuserService.getAllRegisteredUsersCount(values)
      .then((data: any) => {
        { this.pageNum = data; }
        this.totalPages = data;
      }
      ).catch((error) => {
      })
  }

  activeRow(x, status) {
    for (let i = 0; i < this.allUsers.length; i++) {
      if (x === i) {
        $('.instrow' + i).css('background-color', 'orange');
      } else if (x !== i) {
        if (this.allUsers[i].uac_is_deleted == '1') {
          $('.instrow' + i).css('background-color', '#ffc8bf');
        } else {
          if (i % 2 == 0) {
            $('.instrow' + i).css('background-color', '#d9edf7');
          } else {
            $('.instrow' + i).css('background-color', '#fffff');
          }
        }
      }
    }
  }
  onPageChange($event) {
    this.rowsPerPage = this.itemsPerPage;
    this.currentPage = $event.page + 1;
    this.getAllRegisteredUsers(this.currentPage, this.rowsPerPage, this.Check_inst_id)
  }
  addDropdownCss() {
    $('.ui-dropdown-panel .ui-dropdown-items').css('display', 'grid');
    $('.ui-dropdown-panel .ui-dropdown-items .ui-dropdown-item').css('width', '100%');
  }
  getAllRegisteredUsers(pageNum, rowsPerPage, inst_id) {
    this.selectedValues = {};
    this.getUserLoader = true;
    this.selectedValues = {
      "inst_id": inst_id,
    }
    if (this.selectedUserId.length > 0) {
      this.selectedValues["user_id"] = this.selectedUserId;
    }
    if (this.selectedUserstatus.length > 0) {
      this.selectedValues["user_status"] = this.selectedUserstatus;
    }
    if (this.selectedUserType.length > 0) {
      this.selectedValues["usertype_id"] = this.selectedUserType;
    }
    if (this.selectedUsercountry.length > 0) {
      this.selectedValues["user_country"] = this.selectedUsercountry;
    }
    if (this.rstartDate.length > 0) {
      this.selectedValues["rstartDate"] = this.rstartDate;
    }
    if (this.rendDate.length > 0) {
      this.selectedValues["rendDate"] = this.rendDate;
    }
    if (this.selectedUserConfirm.length > 0) {
      this.selectedValues["user_confirm"] = this.selectedUserConfirm;
    }
    if (this.selectedDisplayNames.length > 0) {
      this.selectedValues["user_dname"] = this.selectedDisplayNames;
    }
    if (this.selectedFirstNames.length > 0) {
      this.selectedValues["user_fname"] = this.selectedFirstNames;
    }
    if (this.selectedLastNames.length > 0) {
      this.selectedValues["user_lname"] = this.selectedLastNames;
    }
    if (this.selectedSchoolNames.length > 0) {
      this.selectedValues["user_school"] = this.selectedSchoolNames;
    }
    if (this.selectedClasses.length > 0) {
      this.selectedValues["user_class"] = this.selectedClasses;
    }
    if (this.selectedStates.length > 0) {
      this.selectedValues["user_states"] = this.selectedStates;
    }
    if (this.selectedCities.length > 0) {
      this.selectedValues["user_cities"] = this.selectedCities;
    }

    if (this.selectedfreeAccess.length > 0) {
      this.selectedValues["uac_free"] = this.selectedfreeAccess;
    }
    if (this.selectedgemsAccess.length > 0) {
      this.selectedValues["uac_gems"] = this.selectedgemsAccess;
    }
    if (this.selectedverifyAccess.length > 0) {
      this.selectedValues["user_verify"] = this.selectedverifyAccess;
    }
    if (this.selectedInstitutes.length > 0) {
      this.selectedValues["user_inst"] = this.selectedInstitutes;

    }
    if (this.selectedtestAttndAccess.length > 0) {
      this.selectedValues["user_testAttnd"] = this.selectedtestAttndAccess;
    }
    if (this.selectedblockedAccess.length > 0) {
      this.selectedValues["user_block"] = this.selectedblockedAccess;
    }
    if (this.selecteddeletedAccess.length > 0) {
      this.selectedValues["user_delete"] = this.selecteddeletedAccess;
    }
    if (this.selectedschoolInstId.length > 0) {
      this.selectedValues["schlinst_id"] = this.selectedschoolInstId;
    }
    if (this.selectedmenotorId.length > 0) {
      this.selectedValues["mentor_id"] = this.selectedmenotorId;
    }

    var userFilterValue = this.selectedValues;
    this.getAllRegisteredUsersCount(userFilterValue);
    this.selectedValues['rowsPerPage'] = rowsPerPage;
    this.selectedValues['pageNum'] = pageNum;
    this._manageuserService.getAllRegisteredUsers(this.selectedValues)
      .then((data: any) => {
        { this.allUsers = data }
        // this.userDname = [];
        // for (let usr of this.allUsers) {
        //   this.userDname.push({ "label": usr.user_dname, "value": usr.user_dname });
        // }

        this.uac_iusertypeId = this.allUsers.map(function (a) { return a["usertype_id"]; });
        if (this.uac_iusertypeId == 1) { this.uac_iusertypeId = 'Student'; }
        if (this.uac_iusertypeId == 2) { this.uac_iusertypeId = 'Faculty'; }
        if (this.uac_iusertypeId == 3) { this.uac_iusertypeId = 'Parent'; }
        if (this.uac_iusertypeId == 4) { this.uac_iusertypeId = 'School'; }
        for (let usr of this.allUsers) {
          this.uac_iusertypeId = this.allUsers.map(function (a) { return a["usertype_id"]; });
          if (this.uac_iusertypeId == 1) { this.uac_iusertypeId = 'Student'; }
          if (this.uac_iusertypeId == 2) { this.uac_iusertypeId = 'Faculty'; }
          if (this.uac_iusertypeId == 3) { this.uac_iusertypeId = 'Parent'; }
          if (this.uac_iusertypeId == 4) { this.uac_iusertypeId = 'School'; }
        }
        this.suser_id = this.allUsers.map(function (a) {
          return a["user_id"];
        });
        // this.getUserId(this.suser_id);
        this.uac_is_deleted = this.allUsers.map(function (a) { return a["uac_is_deleted"]; });
        this.uac_school = this.allUsers.map(function (a) { return a["uac_school"]; });
        this.uac_gems = this.allUsers.map(function (a) { return a["uac_gems"]; });
        this.uac_free = this.allUsers.map(function (a) { return a["uac_free"]; });

        if (inst_id == 1) { this.accessColumn = this.uac_free; }
        if (inst_id == 2) { this.accessColumn = this.uac_gems; }
        if (inst_id > 2) { this.accessColumn = this.uac_school; }
        this.getUserLoader = false;
        $('body').click();
      },
        error => { }
      );
  }
  resetAccess() {
    this.profileEdit_15 = true;
    this.uac_contnt_upload = Boolean(JSON.parse(this.userShow.control.uac_contnt_upload));
    this.uac_restricted_access = this.userShow.control.uac_restricted_access;
    this.uac_disc_create = Boolean(JSON.parse(this.userShow.control.uac_disc_create));
    this.uac_qns_upload = Boolean(JSON.parse(this.userShow.control.uac_qns_upload));
    this.uac_groupcr_access = Boolean(JSON.parse(this.userShow.control.uac_groupcr_access));
    this.uac_testatnd_access = Boolean(JSON.parse(this.userShow.control.uac_testatnd_access));
    this.uac_testcr_access = Boolean(JSON.parse(this.userShow.control.uac_testcr_access));
    this.acc_valid_to_calender = new Date(this.userShow.control.acc_valid_to);
    this.acc_valid_to = this.userShow.control.acc_valid_to;
  }
  getDate(pageNum, rowsPerPage, inst_id, event) {

    this.sdate = event.startDate._d.getDate();
    if (this.sdate.toString().length < 2) { this.sdate = '0' + this.sdate; }
    this.smonth = event.startDate._d.getMonth() + 1;
    if (this.smonth.toString().length < 2) { this.smonth = '0' + this.smonth; }
    this.syear = event.startDate._d.getFullYear();
    this.edate = event.endDate._d.getDate();
    if (this.edate.toString().length < 2) { this.edate = '0' + this.edate; }
    this.emonth = event.endDate._d.getMonth() + 1;
    if (this.emonth.toString().length < 2) { this.emonth = '0' + this.emonth; }
    this.eyear = event.endDate._d.getFullYear();

    this.rstartDate = this.syear + '-' + this.smonth + '-' + this.sdate;
    this.rendDate = this.eyear + '-' + this.emonth + '-' + this.edate;
    this.getAllRegisteredUsers(pageNum, rowsPerPage, inst_id);
  }
  showUser(userId) {
    this.Check_user_id = userId;
    this.userData = {
      "user_id": userId,
      "inst_id": this.Check_inst_id
    }
    this.schoolEditShow = false;
    this.schoolEdit = true;
    this.profileEdit_15 = true;
    this._manageuserService.showUser(this.userData).then((data: any) => {
      { this.userShow = data; }
      this.suser_id = data.user.user_id;
      this.user_dname = data.user.user_dname;
      if(data.user.usr_mentor_id == 0){
        this.is_show_user = false;
        this.show_mentor_edit_form = false;
        this.usr_mentor_id = data.user.usr_mentor_id;
      }else{
        this.is_show_user = true;
        this.show_mentor_edit_form = false;
        this.usr_mentor_id = data.user.usr_mentor_id;
      }
      if(data.user.usr_parnter == 0){
        this.is_show_user_partner = false;
        this.show_partner_edit_form = false;
        this.usr_parnter = data.user.usr_parnter;
      }else{
        this.is_show_user_partner = true;
        this.show_partner_edit_form = false;
        this.usr_parnter = data.user.usr_parnter;
      }
      
      // this.usr_parnter_id = data.user.usr_parnter;
      this.mentor_id = data.user.mentor_id;
      this.mentor_user_id = data.user.mentor_user_id;
      this.mentor_name = data.user.mentor_name;
      this.mentor_phone = data.user.mentor_phone;
      this.mentor_alt_phone = data.user.mentor_alt_phone;
      this.mentor_fax = data.user.mentor_fax;
      this.mentor_address = data.user.mentor_address;
      this.mentor_email = data.user.mentor_email;

      this.partner_id = data.user.partner_id;
      this.partner_user_id = data.user.partner_user_id;
      this.partner_name = data.user.partner_name;
      this.partner_phone = data.user.partner_phone;
      this.partner_alt_phone = data.user.partner_alt_phone;
      this.partner_fax = data.user.partner_fax;
      this.partner_address = data.user.partner_address;
      this.partner_email = data.user.partner_email;

      this.user_asind_partner = data.user.user_asind_partner;
      this.usr_asind_mentor = data.user.usr_asind_mentor;
      this.uac_valid_from = data.user.uac_valid_from;
      this.uac_valid_to = data.user.uac_valid_to;
      this.user_fname = data.user.user_fname;
      this.user_mname = data.user.user_mname;
      this.user_lname = data.user.user_lname;
      this.user_gender = data.user.user_gender;
      this.user_dob = data.user.user_dob;
      this.user_email = data.user.user_email;
      this.user_alt_email = data.user.user_alt_email;
      this.schoolInstitute = data.user.inst_id;
      this.userpCountry = '+ ' + data.user.user_phone_code;
      this.userapCountry = '+ ' + data.user.user_alt_phone_code;
      //this.userfaxCountry     = '+' + data.user_fax_code;
      this.user_phone = data.user.user_phone;
      this.user_alt_phone = data.user.user_alt_phone;
      this.user_course = data.user.user_course;
      this.user_alt_phone_code = data.user.user_alt_phone_code;
      this.user_fax = data.user.user_fax;
      this.user_fax_code = '+' + data.user.user_fax_code;
      this.user_school = data.user.user_school;
      this.user_class = data.user.user_class;
      this.user_country = data.user.user_country;
      this.user_state = data.user.user_state;
      this.user_city = data.user.user_city;
      this.user_address = data.user.user_address;
      this.uac_email = data.user.uac_email;
      this.uac_phone = data.user.uac_phone;
      this.usertype_id = data.user.usrtyp_id;
      this.user_type = data.user.usrtyp_id;
      this.usrtyp_name = data.user.usrtyp_name;
      this.userCity = data.user.city_name;
      this.userState = data.user.state_name;
      this.userCountry = data.user.cntry_name;
      this.user_regdate = data.user.user_regdate;
      // this.createdby_admin = data.user.createdby_admin;
      this.uac_is_reg_confiemed = data.user.uac_is_reg_confiemed;
      this.uac_reg_cnf_by = data.user.admintyp_name;
      this.uac_reg_cnf_date = data.user.uac_reg_cnf_date;
      this.is_user_verified = data.user.is_user_verified;
      this.user_verified_date = data.user.user_verified_date;
      this.user_verified_by = data.user.admintyp_name;
      this.uac_is_blocked = parseInt(data.user.uac_is_blocked);
      this.uac_blocked_by = data.user.admintyp_name;
      this.uac_blocked_date = data.user.uac_blocked_date;
      this.uac_is_deleted = data.user.uac_is_deleted;
      this.uac_deleted_by = data.user.admintyp_name;
      this.uac_deleted_date = data.user.uac_deleted_date;
      this.usrblock_reasond = data.user.usrblock_reason;
      this.uac_blocked_reasonid = data.user.uac_blocked_reasonid;
      this.uac_deleted_reasonid = data.user.uac_deleted_reasonid;
      this.usrblock_reason = data.user.usreBlockedRes;
      this.accessColumnf = data.uac_free;
      this.accessColumng = data.uac_gems;
      this.accessColumnt = data.uac_test_attended;
      this.accessColumnr = data.uac_rescticted;
      this.accessColumns = data.uac_school;
      if (this.uac_is_reg_confiemed == 0) { this.dataTarget = false; } else { this.dataTarget = true; }
      if (this.is_user_verified == 0) { this.verifyTarget = false; } else { this.verifyTarget = true; }
      if (this.uac_is_blocked == 0) { this.btnClass = 'btn-info'; this.uac_blocked_date = '--'; this.uac_blocked_by = '--'; this.btnText = 'Block'; } else { this.btnClass = 'btn-success'; this.btnText = 'Blocked'; }
      if (this.uac_is_deleted == 0) { this.btnClassd = 'btn-info'; this.uac_deleted_date = '--'; this.uac_deleted_by = '--'; this.btnTextd = 'Delete'; } else { this.btnClassd = 'btn-danger'; this.btnTextd = 'Deleted'; }

      if (data.config) {
        this.userAccessData = data.config;
        this.acc_valid_from = data.config.inst_ac_valid_from.split('-').reverse().join("-");
        this.acc_valid_to = data.config.inst_ac_valid_to;
        this.acc_valid_to_calender = new Date(data.config.inst_ac_valid_to);
        this.acc_to_date = new Date(data.config.inst_ac_valid_to);
        this.validToDate = data.config.inst_ac_valid_to.split('-').reverse().join("-");
        this.oldvalidToDate = data.config.inst_ac_valid_to.split('-').reverse().join("-");
        this.user_acc_institute = data.config.inst_id;
        this.uac_contnt_upload = Boolean(JSON.parse(data.config.inst_ac_contnt_upload));
        this.uac_restricted_access = data.config.inst_ac_restricted_access;
        this.is_inst_access = data.config.is_inst_access;
        this.uac_testcr_access = Boolean(JSON.parse(data.config.inst_ac_testcr_access));
        this.uac_qns_upload = Boolean(JSON.parse(data.config.inst_ac_qns_upload));
        this.uac_disc_create = Boolean(JSON.parse(data.config.inst_ac_disc_create));
        this.uac_testatnd_access = Boolean(JSON.parse(data.config.inst_ac_testatnd_access));
        this.uac_groupcr_access = Boolean(JSON.parse(data.config.inst_ac_groupcr_access));
        this.uac_id = ''; this.user_id = userId;
        if (this.user_acc_institute) { this.accessTrueFalse = true; } else { this.accessTrueFalse = false; }
      }
      if (data.control != 2 && data.control != false) {
        this.userAccessData = data.control;
        this.uac_id = data.control.uac_id;
        this.user_id = data.control.user_id;
        this.is_inst_access = data.control.is_inst_access;
        $('.ui-inputtext').css('width', '100px');
        this.acc_to_date = new Date(data.control.acc_valid_from);
        this.createdby_admin = data.control.created_by_admin;
        this.acc_valid_to = data.control.acc_valid_to;
        this.acc_valid_from = data.control.acc_valid_from.split('-').reverse().join("-");
        this.acc_valid_to_calender = new Date(data.control.acc_valid_to);
        this.validToDate = data.control.acc_valid_to.split('-').reverse().join("-");
        this.oldvalidToDate = data.control.acc_valid_to.split('-').reverse().join("-");
        this.user_acc_institute = data.control.inst_id;
        this.uac_contnt_upload = Boolean(JSON.parse(data.control.uac_contnt_upload));
        this.uac_restricted_access = data.control.uac_restricted_access;
        this.uac_testcr_access = Boolean(JSON.parse(data.control.uac_testcr_access));
        this.uac_qns_upload = Boolean(JSON.parse(data.control.uac_qns_upload));
        this.uac_disc_create = Boolean(JSON.parse(data.control.uac_disc_create));
        this.uac_testatnd_access = Boolean(JSON.parse(data.control.uac_testatnd_access));
        this.uac_groupcr_access = Boolean(JSON.parse(data.control.uac_groupcr_access));
        if (this.user_acc_institute) { this.accessTrueFalse = true; } else { this.accessTrueFalse = false; }

      }
      this.today = ((this.date.getFullYear()) + '-' + (this.date.getMonth() + 1) + '-' + (this.date.getDate()));
      this.yesterday = ((this.date.getFullYear()) + '-' + (this.date.getMonth() + 1) + '-' + (this.date.getDate() - 1));

      if (this.uac_id) {
        if (this.validToDate <= this.today) {
          this.dateTime.setDate(this.dateTime.getDate());
        } else {
          if (this.acc_valid_from < this.yesterday) {
            this.dateTime.setDate((this.dateTime.getDate()) - 1);
          } else {
            this.dateTime.setDate(this.dateTime.getDate());
          }
        }
      } else {
        this.dateTime.setDate(this.dateTime.getDate());
      }
      $('#user_detal').modal("show");
    },
      error => { }
    );
    /* Get Countries */
    this._defaultDataService.getcountryNamesforProfile().subscribe(
      data => {
        { this.country = data };

      },
      error => this.errorMessage = error
    );
    /* ./Get Countries */

  } s
  accessChange(value) {
    //this.date = new Date();
    $('#saveChangesId').css('display', 'inline-block');
    if (value == 'on') {
      this.accessChangeTrueFalse = true;
      return;
      // this.acc_valid_to = this.configDate;
    } else {
      this.accessChangeTrueFalse = false;
      return;
    }
    // this.accessChangeTrueFalse
    // this.configDate = this.validToDate;
    // if (value == 'on') {
    //   this.accessTrueFalse = true;
    //   this.acc_valid_to = this.configDate;
    // } else {
    //   this.accessTrueFalse = false;
    //   this.acc_valid_to = (this.date.getMonth() + 1) + '/' + this.date.getDate() + '/' + (this.date.getFullYear() - 1);

    // }
  }
  changeAccess(value) {
    // if(value == 1){
    //   this.uac_id = ''
    // }

    let body = {
      "uac_id": this.uac_id,
      "value": value,
      "user_id": this.Check_user_id,
      "inst_id": this.Check_inst_id
    }
    this._manageuserService.changeAccess(body)
      .then((data: any) => {
        if (data == 1) {
          this.showUser(this.Check_user_id);
          this.alertmsgSucc = 'Access Successfully Changed!';
          this.alertmsgClass = 'success';
          this.summary = 'Success';
          this.showSuccess();
        }
      })

  }
  saveAccessChanges(value) {
    this.accessChangeTrueFalse
    this.configDate = this.validToDate;
    if (value == true) {
      this.accessTrueFalse = true;
      this.acc_valid_to = this.configDate;
    } else {
      this.accessTrueFalse = false;
      this.acc_valid_to = (this.date.getMonth() + 1) + '/' + this.date.getDate() + '/' + (this.date.getFullYear() - 1);

    }

    $('#saveChangesId').css('display', 'none');
  }
  userRegConfirm(confirm) {
    this._manageuserService.userRegConfirm(confirm, this.suser_id, this.Check_admintype_id)
      .then((data: any) => {
        { this.response = data; }
        if (data == 2) {
          alert('Something went wrong!!');
        } else {
          if (confirm == 0) {
            this.uac_reg_cnf_date = data.date;
            this.uac_reg_cnf_by = data.by;
            this.dataTarget = true;
          }
        }
      },
      );
  }
  userRegVerified(verify) {
    this._manageuserService.userRegVerified(verify, this.suser_id, this.Check_admintype_id)
      .then((data: any) => {
        { this.response = data; }
        if (data == 2) {
          alert('Something went wrong!!');
        } else {
          if (verify == 0) {
            this.user_verified_date = data.date;
            this.user_verified_by = data.by;
            this.verifyTarget = true;
          }
        }
      }, error => { }
      );
  }
  getbldlreasonid(reasonid, num) {

    this._manageuserService.getbldlreasonid(reasonid)
      .then(data => {
        { this.reasonsvalues = data; }
        if (num == 1) {
          this.usrblock_reason = data.usrblock_reason;

        } else {
          this.usrblock_reasond = data.usrblock_reason;

        }

      },
        error => { }
      );
  }
  addDateCss() {
    $('.md-drppicker').css('color', 'black');
    $('.md-drppicker').css('display', 'flex');
    $('.md-drppicker').css('height', '280px');
    $('.md-drppicker').css('top', '57px');
    $('.md-drppicker').css('z-index', '13000');
    $('.ranges').css('overflow-x', 'hidden');
    $('.ranges').css('width', '135px');
    $('.md-drppicker .buttons .buttons_input .btn').css('top', '90px');
    $('.md-drppicker .buttons .buttons_input .btn').css('border-radius', '10px');
    $('.md-drppicker .buttons .buttons_input .btn-default').css('top', '175px');
    $('.md-drppicker .buttons .buttons_input .btn-default').css('border-radius', '10px');
    $('.md-drppicker .buttons .buttons_input .clear').css('top', '2px');
  }
  userRegBlocked(block, reason) {
    this.blockedData = {
      "block": this.uac_is_blocked,
      "suser_id": this.suser_id,
      "admintype_id": this.Check_admintype_id,
      "reason": reason
    }
    this._manageuserService.userRegBlocked(this.blockedData)
      .then((data: any) => {
        { this.response = data; }
        if (data == 2) {
        } else {
          this.uac_blocked_date = data.date;
          this.uac_blocked_by = data.by;
          if (data.value == 1) {
            this.btnClass = 'btn-success';
            this.btnText = 'Blocked';
            this.uac_is_blocked = 1;
            this.alertmsgSucc = 'User blocked!';
            this.alertmsgClass = 'success';
            this.summary = 'Success';
            this.showSuccess();
          } else if (data.value == 0) {
            this.btnClass = 'btn-info';
            this.btnText = 'Block';
            this.uac_is_blocked = 0;
          }
        }
      }, error => { }
      );
  }
  userRegDeleted(delet, reson, reasonid) {
    this._manageuserService.userRegDeleted(delet, this.suser_id, this.Check_admintype_id, reson)
      .then((data: any) => {
        { this.response = data; }
        if (data == 2) {
          alert('Something went wrong!!');
        } else {
          this.uac_deleted_date = data.date;
          this.uac_deleted_by = data.by;
          if (data.value == 1) {
            this.btnClassd = 'btn-danger';
            this.btnTextd = 'Deleted';
            this.uac_is_deleted = data.value;
            this.alertmsgSucc = 'User blocked!';
            this.alertmsgClass = 'success';
            this.summary = 'Success';
            this.showSuccess();
          } else {
            this.btnClassd = 'btn-info';
            this.btnTextd = 'Delete';
            this.uac_is_deleted = data.value;
          }
        }
      }, error => { }
      );
  }
  instAccess() {
    if (this.Check_inst_id == 1) {
      this.column = 'uac_free';
    }
    if (this.Check_inst_id == 2) {
      this.column = 'uac_gems';
    }
    if (this.Check_inst_id > 2) {
      this.column = 'uac_school';
    }
    if (this.accessColumn > 0) {
      this.accessColumn = 0;
    } else {
      this.accessColumn = this.Check_inst_id;
    }

    this._manageuserService.instAccess(this.column, this.suser_id, this.accessColumn).subscribe(
      data => {
        { this.response = data; }
        if (data == 1) {
          this.alertmsgSucc = 'Access is changed successfully!';
          this.alertmsgClass = 'success';
          this.summary = 'Sucess';
          this.showSuccess();
        } else {
          this.alertmsgSucc = 'Something went wrong!';
          this.alertmsgClass = 'error';
          this.summary = 'Error';
          this.showSuccess();
        }

      }, error => { }
    );
  }

  getCountry() {
    this._defaultDataService.getcountryNamesforProfile().subscribe(
      data => {
        { this.countries = data; }
        for (let ctry of this.countries) {
          this.userCountries.push({ "label": ctry.cntry_name, "value": ctry.cntry_id });
        }
      },
      error => this.errorMessage = error
    );
  }
  manageUserFilter() {
    this.selectedValues = {
      "user_dname": this.selectedDisplayNames
    }

    this._manageuserService.manageUserFilter(this.selectedValues).subscribe(
      data => {
        { this.allUsers = data; }

      },
      error => { }
    );
  }
  dnameGroup(id) {
    this.userDname = [];
    this._manageuserService.dnameGroup(id)
      .then((data: any) => {
        { this.dNames = data; }
        for (let usr of this.dNames) {
          this.userDname.push({ "label": usr.user_dname, "value": usr.user_dname });
        }

      },
        error => { }
      );
  }
  fnameGroup(id) {
    this.itemList2 = [];
    this.fNames = [];
    this._manageuserService.fnameGroup(id)
      .then((data: any) => {
        { this.fNames = data; }
        for (let usr of this.fNames) {
          if (usr.user_fname != '') {
            this.itemList2.push({ "label": usr.user_fname, "value": usr.user_fname });
          }
        }
      },
        error => { }
      );
  }
  lnameGroup(id) {
    this.userLname = [];
    this.lNames = [];
    this._manageuserService.lnameGroup(id)
      .then((data: any) => {
        { this.lNames = data; }
        for (let usr of this.lNames) {
          if (usr.user_lname != '') {
            this.userLname.push({ "label": usr.user_lname, "value": usr.user_lname });
          }
        }
      },
        error => { }
      );
  }
  snameGroup(id) {
    this.Schoolname = [];
    this._manageuserService.snameGroup(id)
      .then((data: any) => {
        { this.sNames = data; }
        for (let usr of this.sNames) {
          if (usr.schoolNames != null) {
            this.Schoolname.push({ "label": usr.schoolNames, "value": usr.user_school });
          }
        }
      },
        error => { }
      );
  }
  cnameGroup(id) {
    this._manageuserService.cnameGroup(id)
      .then((data: any) => {
        { this.cNames = data; }
        for (let usr of this.cNames) {
          this.Classname.push({ "label": usr.user_class, "value": usr.user_class });
        }
      },
        error => { }
      );
  }
  userConfirm() {
    this.UserConfirm = [
      { "label": 'Yes', "value": 1 },
      { "label": 'No', "value": 0 },
    ];
    this.freeAccess = [
      { "label": 1, "value": 1 },
      { "label": '', "value": '' },
    ];
    this.gemsAccess = [
      { "label": 2, "value": 2 },
      { "label": '', "value": '' },
    ];
    this.blockedAccess = [
      { "label": 'Yes', "value": 1 },
      { "label": 'No', "value": 0 },
    ];
    this.deletedAccess = [
      { "label": 'Yes', "value": 1 },
      { "label": 'No', "value": 0 },
    ];
    this.verifyAccess = [
      { "label": 'Yes', "value": 1 },
      { "label": 'No', "value": 0 }
    ];
    this.instNames = [
      { "label": 'Yes', "value": "1" },
      { "label": 'No', "value": "0" }
    ];
    this.testAttndAccess = [
      { "label": 'Yes', "value": 1 },
      { "label": 'No', "value": 0 }
    ];
  }
  schoolAccess() {
    this._manageuserService.schoolAccess().subscribe(
      data => {
        { this.asNames = data; }
        for (let usr of this.asNames) {
          this.schoolAccesss.push({ "label": usr.uac_school, "value": usr.uac_school });
        }
      },
      error => { }
    );
  }
  getAllStatesLimit(country) {
    this._defaultDataService.getAllStatesLimit(30, 0, '').subscribe(
      data => {
        { this.states = data; }
        this.cities = [];
      },
      error => this.errorMessage = error
    );
    this._defaultDataService.getCountryCode(country).subscribe(
      data => {
        {
          this.response = data;
        }
        this.userCountry = data.cntry_name;
      },
      error => { this.errorMessage = error }
    );
  }
  getStatesoncountry(country) {
    this._defaultDataService.getStatesoncountries(country).subscribe(
      data => {
        { this.states = data; }
        this.cities = [];
      },
      error => this.errorMessage = error
    );
    this._defaultDataService.getCountryCode(country).subscribe(
      data => {
        {
          this.response = data;
        }
        this.userCountry = data.cntry_name;
      },
      error => { this.errorMessage = error }
    );
  }
  getCitiesonstates(state) {
    this._defaultDataService.getCitiesonstates(state).subscribe(
      data => this.cities = data,
      error => this.errorMessage = error
    );
    this._defaultDataService.getStateonState(state).subscribe(
      data => {
        { this.states = data; }
        this.userState = this.states.map(function (a) { return a["state_name"]; });
      },
      error => this.errorMessage = error
    );
  }
  getCitiesoncity(city) {
    $('#country').keyup((event) => {
      if ((event.key === 'Alt' || event.key === 'Shift' || event.key === 'CapsLock' || event.key === 'Control')) {
        return;
      }
    });

    this._defaultDataService.getCitiesoncity(city).subscribe(
      data => {
        { this.cities = data; }
        this.userCity = this.cities.map(function (a) { return a["city_name"]; });
      },
      error => this.errorMessage = error
    );
  }
  getAllCountry(term) {
    if (this.cancelCountryCall !== 0) {
      this.cancelCountryCall.unsubscribe();
      this.cancelCountryCall = 0;
    }

    this.cancelCountryCall = this._defaultDataService.getCountriesLimit(30, 0, term).subscribe(
      data => {
        this.userCountries = [];
        { this.countries = data; }
        for (let ctry of this.countries) {
          this.userCountries.push({ "label": ctry.cntry_name, "value": ctry.cntry_id });
        }
      },
      error => this.errorMessage = error
    );
  }
  getAllStates(term) {
    this.stateNames = [];
    if (this.cancelCall !== 0) {
      this.cancelCall.unsubscribe();
      this.cancelCall = 0;
    }

    this.cancelCall = this._defaultDataService.getAllStatesLimit(30, 0, term)
      .pipe(debounceTime(500))
      .subscribe(
        data => {
          { this.allStates = data; }
          for (let ast of this.allStates) {
            this.stateNames.push({ "label": ast.state_name, "value": ast.state_id });
          }
        },
        error => { }
      );
  }
  keyup(event) {
  }
  getAllCities(term) {
    this.cityNames = [];
    if (this.cancelCityCall !== 0) {
      this.cancelCityCall.unsubscribe();
      this.cancelCityCall = 0;
    }
    this.cancelCityCall = this._defaultDataService.getAllCityLimit(30, 0, term)
      .pipe(debounceTime(500))
      .subscribe(
        data => {
          { this.allCities = data; }
          for (let act of this.allCities) {
            this.cityNames.push({ "label": act.city_name, "value": act.city_id });
          }
        },
        error => { }
      );
  }
  getuserTypes() {
    this._defaultDataService.getuserTypes().subscribe(
      data => this.userTypes = data,
      error => this.errorMessage = error
    )
  }
  UserUpdate(updateUser: FormGroup) {
    this.userUpdatedata = updateUser.value
    // this.userProfileUpdateByAdmin();
  }
  userProfileUpdateByAdmin(): any {
    this._manageuserService.userProfileUpdateByAdmin(this.userUpdatedata)
      .then((data: any) => { },
        error => { }
      );
    throw new Error("Method not implemented.");
  }
  getSchools() {
    this._manageuserService.getSchools()
      .then((data: any) => {
        { this.allSchools = data; }
        this.allSchoolNames.push({ "label": "No School", "value": 0 });
        for (let act of this.allSchools) {
          this.allSchoolNames.push({ "label": act.user_dname, "value": act.inst_id });
        }
      },
        error => { }
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
      this._manageuserService.profilefieldUpdate(value, column, this.suser_id)
        .then((data: any) => {
          { this.response = data }
          if (data == 1) {
            this.alertmsgSucc = 'Updated successfully';
            this.alertmsgClass = 'success';
            this.summary = 'Sucess';
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
        },
          error => { }
        );
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
      this._manageuserService.profilefieldUpdate(value, column, this.suser_id)
        .then((data: any) => {
          { this.response = data }
          if (data == 1) {
            this.alertmsgSucc = 'Updated successfully';
            this.alertmsgClass = 'success';
            this.summary = 'Sucess';
            this.fnameGroup(this.Check_inst_id);
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
        },
          error => { }
        );
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
      this._manageuserService.profilefieldUpdate(value, column, this.suser_id)
        .then((data: any) => {
          { this.response = data }
          if (data == 1) {
            this.alertmsgSucc = 'Updated successfully';
            this.alertmsgClass = 'success';
            this.summary = 'Sucess';
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
        },
          error => { }
        );
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
      this._manageuserService.profilefieldUpdate(value, column, this.suser_id)
        .then((data: any) => {
          { this.response = data }
          if (data == 1) {
            this.alertmsgSucc = 'Updated successfully';
            this.alertmsgClass = 'success';
            this.summary = 'Sucess';
            this.lnameGroup(this.Check_inst_id);
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
      this._manageuserService.profilefieldUpdate(value, column, this.suser_id)
        .then((data: any) => {
          { this.response = data }
          if (data == 1) {
            this.alertmsgSucc = 'Updated successfully';
            this.alertmsgClass = 'success';
            this.summary = 'Sucess';
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
      this._manageuserService.profilefieldUpdate(value, column, this.suser_id)
        .then((data: any) => {
          { this.response = data }
          if (data == 1) {
            this.alertmsgSucc = 'Updated successfully';
            this.alertmsgClass = 'success';
            this.summary = 'Sucess';
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
  }
  profilefieldUpdate_7(value, column) {
    if (this.profileEdit_7 == true) {
      this._manageuserService.profilefieldUpdate(value, column, this.suser_id)
        .then((data: any) => {
          { this.response = data }
          if (data == 1) {
            this.alertmsgSucc = 'Updated successfully';
            this.alertmsgClass = 'success';
            this.summary = 'Sucess';
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
  profilefieldUpdate_8(value, column) {
    if (this.profileEdit_8 == true) {
      this._manageuserService.profilefieldUpdate(value, column, this.suser_id)
        .then((data: any) => {
          { this.response = data }
          if (data == 1) {
            this.alertmsgSucc = 'Updated successfully';
            this.alertmsgClass = 'success';
            this.summary = 'Sucess';
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
        },
          error => { }
        );
      this.profileEdit_8 = false;

    } else {
      this.profileEdit_8 = true;
    }
  }
  profilefieldEdit_9(num) {
    if (this.profileEdit_9 == false) {
      this.profileEdit_9 = true;
    } else {
      this.profileEdit_9 = false;
    }
  }
  profilefieldUpdate_9(value, column) {
    if (this.profileEdit_9 == true) {
      this._manageuserService.profilefieldUpdate(value, column, this.suser_id)
        .then((data: any) => {
          { this.response = data }
          if (data == 1) {
            this.alertmsgSucc = 'Updated successfully';
            this.alertmsgClass = 'success';
            this.summary = 'Sucess';
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
        },
          error => { }
        );
      this.profileEdit_9 = false;

    } else {
      this.profileEdit_9 = true;
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
      this._manageuserService.profilefieldUpdate(value, column, this.suser_id)
        .then((data: any) => {
          { this.response = data }
          if (data == 1) {
            this.alertmsgSucc = 'Updated successfully';
            this.alertmsgClass = 'success';
            this.summary = 'Sucess';
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
    if (this.profileEdit_11 == true) {
      this._manageuserService.useraddressUpdate(usad, usct, usst, uscn, this.suser_id)
        .then((data: any) => {
          { this.response = data; }
          if (data == 1) {
            this.alertmsgSucc = 'Updated successfully';
            this.alertmsgClass = 'success';
            this.summary = 'Sucess';
            this.showSuccess();
            this.profileEdit_11 = false;
          } else if (data == 2) {
            this.msgSucc = true;
            this.alertmsgSucc = 'Data not updated';
            this.alertmsgClass = 'error';
            this.summary = 'Error!';
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
  profilefieldUpdate_12(pcvalue, pccolumn, pvalue, pcolumn) {
    this.userpCountry = '+' + pcvalue;
    if (this.profileEdit_12 == true) {
      this._manageuserService.profilephoneUpdate(pcvalue, pccolumn, pvalue, pcolumn, this.suser_id).subscribe(
        data => {
          { this.response = data }
          if (data == 1) {
            this.alertmsgSucc = 'Updated successfully';
            this.alertmsgClass = 'success';
            this.summary = 'Sucess';
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
        },
        error => { }
      );
      this.profileEdit_12 = false;

    } else {
      this.profileEdit_12 = true;
    }
  }
  profilefieldEdit_13(num) {
    if (this.profileEdit_13 == false) {
      this.profileEdit_13 = true;
    } else {
      this.profileEdit_13 = false;
    }
  }
  profilefieldUpdate_13(pcvalue, pccolumn, pvalue, pcolumn) {
    this.userapCountry = '+' + pcvalue;
    if (this.profileEdit_13 == true) {
      this._manageuserService.profilephoneUpdate(pcvalue, pccolumn, pvalue, pcolumn, this.suser_id).subscribe(
        data => {
          { this.response = data }
          if (data == 1) {
            this.alertmsgSucc = 'Updated successfully';
            this.alertmsgClass = 'success';
            this.summary = 'Sucess';
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
        },
        error => { }
      );
      this.profileEdit_13 = false;

    } else {
      this.profileEdit_13 = true;
    }
  }
  profilefieldEdit_14(num) {
    if (this.profileEdit_14 == false) {
      this.profileEdit_14 = true;
    } else {
      this.profileEdit_14 = false;
    }
  }
  profilefieldUpdate_14(pcvalue, pccolumn, pvalue, pcolumn) {
    this.user_fax_code = '+' + pcvalue;
    if (this.profileEdit_14 == true) {
      this._manageuserService.profilephoneUpdate(pcvalue, pccolumn, pvalue, pcolumn, this.suser_id).subscribe(
        data => {
          { this.response = data }
          if (data == 1) {
            this.alertmsgSucc = 'Updated successfully';
            this.alertmsgClass = 'success';
            this.summary = 'Sucess';
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
        },
        error => { }
      );
      this.profileEdit_14 = false;

    } else {
      this.profileEdit_14 = true;
    }
  }
  loginsfieldEdit_2() {
    if (this.loginsEdit_2 == false) {
      this.loginsEdit_2 = true;
    } else {
      this.loginsEdit_2 = false;
    }
  }
  changeMentor(mentor_id){
    console.log(mentor_id);
    this.mantor_id_value = mentor_id;
  }
  changePartner(partner_id){
    console.log(partner_id);
    this.partner_id_value = partner_id;
  }
  changeUsertype(utype) {
    if (utype == 1) {
      this.usrtyp_name = 'Student';
    } else if (utype == 2) {
      this.usrtyp_name = 'Faculty';
    } else if (utype == 3) {
      this.usrtyp_name = 'Parent';
    } else if (utype == 4) {
      this.usrtyp_name = 'School';
    }
  }
  loginsfieldUpdate_2(evalue, ecolumn, uvalue, ucolumn,mvalue, mcolumn,pvalue, pcolumn, schoolInstitute) {
    var body = {
      'value': evalue,
      'column': ecolumn,
      'uvalue': uvalue,
      'ucolumn': ucolumn,
      'mvalue': mvalue,
      'mcolumn': mcolumn,
      'pvalue': pvalue,
      'pcolumn': pcolumn,
      'user_id': this.suser_id,
      'admin_id': this.Check_admin_id,
      'inst_id': this.Check_inst_id
    }    
    this._manageuserService.updateLogins(body)
      .then((data: any) => {
        { this.response = data; }
        if (data == 1) {
          this.alertmsgSucc = 'Updated successfully';
          this.alertmsgClass = 'success';
          this.summary = 'Sucess';
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

      },
        error => { }
      );
    this.loginsEdit_2 = false;
    this.loginsEdit_3 = false;
  }
  getAllschoolinst() {
    this._manageuserService.getAllschoolinst()
      .then((data: any) => {
        { this.schoolInst = data; }
        for (let usr of this.schoolInst) {
          if (usr.inst_id != null) {
            this.schoolInstId.push({ "label": usr.inst_id, "value": usr.inst_id });
          }
        }
      },
        error => this.errorMessage = error
      );
  }
  getAllmentorId() {
    this._manageuserService.getAllmentorId()
      .then((data: any) => {
        { this.allmenotorId = data; }
        for (let usr of this.allmenotorId) {
          this.menotorId.push({ "label": usr.mentor_id, "value": usr.mentor_id });
        }
      },
        error => this.errorMessage = error
      );
  }
  getDlblReasons() {
    this._manageuserService.getDlblReasons()
      .then((data: any) => {
        { this.reasons = data; }
      },
        error => { }
      );
  }
  getCheckedValues(id: number, isChecked: boolean, i) {
    if (isChecked) {
      this.CheckedValues.push(id);
      this.checkedValuesIndexes.push(i);
      for (let x of this.checkedValuesIndexes) {
        if (i === parseInt(x)) {
          $('.instrow' + x).css('background-color', 'orange');
        }
      }

    } else {
      let index = this.CheckedValues.indexOf(id);
      let removeId = this.checkedValuesIndexes.indexOf(i);
      this.CheckedValues.splice(index, 1);
      this.checkedValuesIndexes.splice(removeId, 1);
      if (i % 2 == 0) {
        $('.instrow' + i).css('background-color', '#d9edf7');
      } else {
        $('.instrow' + i).css('background-color', '#fffff');

      }
      for (let y of this.checkedValuesIndexes) {
        if (this.checkedValuesIndexes.indexOf(y) != -1) {
          console.log(" this.checkedValuesIndexes splice", y);
          $('.instrow' + y).css('background-color', 'orange');
        }

      }
    }
  }
  verifyMultipleUsers(admin_id) {
    this.checkedData = {
      "admin_id": admin_id,
      "checked_users": this.CheckedValues
    }
    this._manageuserService.verifyMultipleUsers(this.checkedData)
      .then((data: any) => {
        { this.checkedResponse = data; }
        this.alertmsgClass = 'success';
        this.summary = 'success';
        this.alertmsgSucc = 'Successfully verified';
        this.showSuccess();
        this.getAllRegisteredUsers(this.pageCount, this.rowsPerPage, this.Check_inst_id);
      },
        error => { }
      );
  }
  trackById(index, item) {
    return item.UserId;
  }
  GeminstAccess(column, value, user_id) {
    alert(value);
    this.geminstAcc = {
      "column": column,
      "value": value,
      "user_id": user_id
    }
    this._manageuserService.GeminstAccess(this.geminstAcc).subscribe(
      data => {
        { this.response = data; }
        alert(data);
        this.alertmsgClass = 'success';
        this.summary = 'success';
        this.alertmsgSucc = 'Access changed verified';
        this.showSuccess();
      },
      error => { }
    );
  }

  onRightClick(event) {
    this.nRightClicks++;
    return false;
  }
  disableRightclick(evt) { }
  showSuccess() {
    this.messageService.add({ severity: this.alertmsgClass, summary: this.summary, detail: this.alertmsgSucc });
  }
  /* For Production */
  onReject() {

  }
  onItemSelect(item: any) {

    this._manageuserService.filterUser(this.selectedItems2).subscribe(
      data => {
        { this.response = data; }
      },
      error => { },
    );
  }
  selectItemsperpage(num) {
    this.rowsPerPage = num;
    // this.paginator.changePage(0);
    this.getAllRegisteredUsers(this.currentPage, this.rowsPerPage, this.Check_inst_id)
  }

  SaveMentorUser() {

  }
  SavePartnerUser() {
    //console.log(this.mentorUser, "partnerUser")
  }

  toggle() {
    this.EditMentorButton = true;
    this.CreateMentor = true;
    let MentorData = {
      "mentor_name": this.user_dname,
      "mentor_address": this.user_address,
      "mentor_user_id": this.suser_id,
      "inst_id": this.Check_inst_id,
      "mentor_phone": this.user_phone,
      "mentor_alt_phone": this.user_alt_phone,
      "mentor_fax": this.user_fax,
      "mentor_email": this.user_email,
    }
    this._manageuserService.SaveMentorUser(MentorData).subscribe(data => {
      { this.response = data; }
      this.is_show_user = true;
      this.alertmsgClass = 'success';
      this.summary = 'success';
      this.alertmsgSucc = 'Mentor Created successfully.';
      this.showUser(this.Check_user_id);
      this.showSuccess();
    },
      error => { }
    );
  }

  MentorSave() {
    this.EditMentorButton = true;
    this.SaveMentorButton = false;
    this.CancelMentorButton = false;
  }
  // mentor get Api
  // showMentorUser() {   

  //this._manageuserService.getMentorUser().subscribe((data: any) => { 
  //   console.log("=================",data);
  //   return false;   
  //   // this.mentor_name = data.mentor_name;
  //   // this.mentorAddress = data.mentorAddress;
  //   // this.mentor_user_id = data.mentor_user_id;
  //   // this.uac_valid_to = data.uac_valid_to;
  //   // this.user_fname = data.user_fname;
  // });
  // }
  editMentorForm(){
    this.show_mentor_edit_form = true;
    this.is_show_user = false;
  }
  editMentorFormBack(){
    this.is_show_user = true;
    this.show_mentor_edit_form = false;
  }
  EditMentor(mentorUser: FormGroup) {
    console.log(mentorUser);
    this.mentorfinaldata = mentorUser.value;
    this.EditMentorUser(this.mentorfinaldata);

  }
  EditMentorUser(mentorfinaldata) {

    let mentorupdatedata = {
      "mentor_name": mentorfinaldata.mentor_name,
      "mentor_address": mentorfinaldata.mentor_address,
      "mentor_user_id": mentorfinaldata.mentor_user_id,
      // "inst_id": this.mentorfinaldata.Check_inst_id,
      "mentor_phone": mentorfinaldata.mentor_phone,
      "mentor_alt_phone": mentorfinaldata.mentor_alt_phone,
      "mentor_fax": mentorfinaldata.mentor_fax,
      "mentor_email": mentorfinaldata.mentor_email,
    }
    this._manageuserService.EditMentorUser(mentorupdatedata)
      .subscribe((data: any) => {
        this.response = data
        if (data.status == 200) {
          this.is_show_user = true;
          this.show_mentor_edit_form = false;
          // this.alertmsgSucc = 'Mentor Updated successfully!';
          // this.alertmsgClass = 'success';
          // this.summary = 'Success!';
          // this.showSuccess();
          // this.schoolEdit = true;
          Swal.fire('success', 'Mentor Updated successfully!', 'success')

        }
      },
        error => { }
      );
  }
  // showMentorUser() {
  //   this._manageuserService.showMentorUser().subscribe((data: any) => {
  //     this.mentor_name = data.mentor_name;
  //     this.mentor_user_id = data.mentor_user_id;
  //     this.mentor_address = data.mentor_address;
  //     this.mentor_phone = data.mentor_phone;
  //     this.mentor_alt_phone = data.mentor_alt_phone;
  //     this.mentor_fax = data.mentor_fax;
  //     this.mentor_email = data.mentor_email;
  //   }
  //   );
  // }
  editPartnerForm(){
    this.show_partner_edit_form = true;
    this.is_show_user_partner = false;
  }
  editPartnerFormBack(){
    this.is_show_user_partner = true;
    this.show_partner_edit_form = false;
  }
  // CancelMentor() {
  //   this.EditMentorButton = true;
  //   this.CancelMentorButton = false;
  //   this.SaveMentorButton = false;
  // }
  Create_partner() {
    // this.EditMentorButton = true;
    this.CreateMentor = true;
    let PartnerData = {
      "partner_name": this.user_dname,
      "partner_address": this.user_address,
      "partner_user_id": this.suser_id,
      "inst_id": this.Check_inst_id,
      "partner_phone": this.user_phone,
      "partner_alt_phone": this.user_alt_phone,
      "partner_fax": this.user_fax,
      "partner_email": this.user_email,
    }
    this._manageuserService.SavePartnerUser(PartnerData).subscribe(data => {
      { this.response = data; }
      this.is_show_user_partner = true;
      this.alertmsgClass = 'success';
      this.summary = 'success';
      this.alertmsgSucc = 'Partner Created successfully.';
      this.showUser(this.Check_user_id);
      this.showSuccess();
    },
      error => { }
    );
  }
  EditPartner(partnerUser: FormGroup) {
    this.partnerfinaldata = partnerUser.value;
    this.PartnerEdit(this.partnerfinaldata);
  }
  PartnerEdit(partnerfinaldata) {
    // this.EditPartnerButton = true;
    // this.SavePartnerButton = false;
    // this.CancelPartnerButton = false;
    let partnereditdata = {
      "partner_name": partnerfinaldata.partner_name,
      "partner_address": partnerfinaldata.partner_address,
      "partner_user_id": partnerfinaldata.partner_user_id,
      //"inst_id": partnerfinaldata.Check_inst_id,
      "partner_phone": partnerfinaldata.partner_phone,
      "partner_alt_phone": partnerfinaldata.partner_alt_phone,
      "partner_fax": partnerfinaldata.partner_fax,
      "partner_email": partnerfinaldata.partner_email,
    }
    // this._manageuserService.EditPartnerUser(partnereditdata).subscribe(data => {
    //   { this.response = data; }
    //   this.alertmsgClass = 'success';
    //   this.summary = 'success';
    //   this.alertmsgSucc = 'Partner Created successfully.';
    //   this.showSuccess();
    // },
    this._manageuserService.EditPartnerUser(partnereditdata)
      .subscribe((data: any) => {
        this.response = data
        if (data.status == 200) {
          this.is_show_user_partner = true;
          this.show_partner_edit_form = false;
          Swal.fire('success', 'Updated Updated successfully!', 'success')

        }
      },
      error => { }
    );
  }

  // EditPartner(partnerUser: FormGroup) {
  //   this.EditPartnerButton = false;
  //   this.CancelPartnerButton = true;
  //   this.SavePartnerButton = true;
  //   this.partnereditdata = partnerUser.value;
  //   this.partnerUpdate();
  // }
  // partnerUpdate() {
  //   this._manageuserService.partnerUpdate(this.partnereditdata)
  //     .subscribe(data => {
  //       this.response = data
  //       if (data == 1) {
  //         this.alertmsgSucc = 'Education changed successfully!';
  //         this.alertmsgClass = 'success';
  //         this.summary = 'Success!';
  //         this.showSuccess();
  //         this.schoolEdit = true;
  //       }
  //     },
  //       error => { }
  //     );

  // }

  // CancelPartner() {
  //   this.EditPartnerButton = true;
  //   this.CancelPartnerButton = false;
  //   this.SavePartnerButton = false;
  // }

}