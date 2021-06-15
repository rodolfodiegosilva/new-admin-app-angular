import { Component, OnInit, Input, ViewChild, TemplateRef, Inject, ɵConsole } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { DefaultDataService } from '../default-data.service';
import { ManageinstituteService } from './manageinstitute.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AdminprofileService } from '../adminprofilepage/adminprofile.service';
import { nextTick } from 'q';
declare let $: any;
@Component({
  selector: 'app-managegemsinstute',
  templateUrl: './managegemsinstute.component.html',
  styleUrls: [
    '../../assets/superadmin/plugins/bootstrap-toggle/bootstrap-toggle.min.css',
    './managegemsinstute.component.css',
  ],
  providers: [ManageinstituteService, MessageService]
})
export class ManagegemsinstuteComponent implements OnInit {
  createAdmin: FormGroup;
  updateUser: FormGroup;
  singleInstitute: FormGroup;
  instituteEditform: FormGroup;
  instsuperAdminEditform: FormGroup;
  createadminType: number = 4;
  acuserphone: number = 0;
  instId: any;
  @ViewChild('childModal') childModal: ModalDirective;
  @Input() name: string;
  Check_admin_id: any;
  instituteDetails: any;
  private emailpattern = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$';
  finaldata: any;
  country: any;
  msgSuccLogin: boolean;
  alertmsgClass: string;
  alertmsgSucc: string;
  errorMessage: any;
  cities: any;
  states: any;
  userState: any;
  response: any;
  userCountry: any;
  instAdmins: any;
  InstId: any;
  inst_name: any;
  inst_user_id: any;
  cntry_name: any;
  inst_state: any;
  inst_city: any;
  inst_address: any;
  inst_email: any;
  inst_phone: any;
  inst_alt_phone: any;
  inst_fax: any;
  inst_contact: any;
  inst_created_date: any;
  is_inst_validaccess: any;
  instaccess_from_date: any;
  instaccess_to_date: any;
  inst_access_updateadby: any;
  inst_access_updated_date: any;
  inst_superadmn_nam: any;
  inst_superadmn_eml: any;
  singleAdmin: any;
  admin_dname: any;
  admin_fname: any;
  admin_mname: any;
  admin_lname: any;
  admin_gender: any;
  admin_dob: any;
  admin_email: any;
  admin_alt_email: any;
  admin_phone_cont_code: any;
  admin_phone: any;
  admin_alt_phone_cont_code: any;
  admin_alt_phone: any;
  admin_fax_cnt_code: any;
  admin_fax: any;
  admin_country: any;
  admin_city: any;
  admin_state: any;
  admin_address: any;
  admintype_id: any;
  ac_user_email: any;
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
  profileEdit_102: boolean = false;
  profileEdit_20: boolean = false;
  disabled = false;
  profileEdit_13: boolean = false;
  profileEdit_14: boolean = false;
  msgSucc: boolean;
  admin_id: any;
  admin_created_date: any;
  admin_created_by: any;
  dataTarget: boolean;
  auc_is_reg_confiemed: number;
  ac_reg_cnf_date: any;
  ac_reg_cnf_by: any;
  ac_is_blocked: any;
  btnClass: string;
  btnText: string;
  ac_blocked_by: any;
  ac_blocked_date: string;
  ac_is_admin_deleted: any;
  btnClassd: string;
  ac_deleted_date: string;
  ac_deleted_by: string;
  btnTextd: string;
  branch_name: any;
  branch_id: any;
  branch_phone: any;
  barnch_email: any;
  branch_alt_phone: any;
  countryISDConde: any;
  loginsEdit_2: boolean = false;
  dateselect: any;
  phoneEnable_1: boolean;
  phoneEnable_2: boolean;
  phoneEnable_3: boolean;
  phoneEnable_12: boolean;
  phoneEnable_13: boolean;
  phoneEnable_14: boolean;
  submitPressed: any = false;
  branchPhoneEnable_1: any = true;
  branchPhoneEnable_2: any = true;
  adminAvail: any;
  instAdminEmail: boolean = false;
  instAdminEmailErrText: string;
  instituteEdit: boolean = false;
  instSAEdit: boolean = false;
  phonefield_1: boolean = false;
  summary: any;
  adminResponse: any;
  instituteData: any;
  instSAData: any;
  city_name: any;
  msgSummery: string;
  profileEdit_: any;
  updateVar: any;
  adminCity: any;
  adminCountry: any;
  adminState: any;
  adminphonecontcode: any;
  checkData: any;
  superAdminName: any;
  superAdminEmail: any;
  selected_admin_id: any;
  modelPic: any;
  instituteBranches: any;
  branchAddForm: FormGroup;
  branchFormType: any;
  instDefaultEditform: FormGroup;
  instituteEdit_3: boolean = false;
  inst_id: any;
  inst_ac_valid_to: any;
  inst_ac_contnt_upload: any;
  inst_ac_restricted_access: any;
  inst_ac_testatnd_access: any;
  inst_ac_testcr_access: any;
  inst_ac_groupcr_access: any;
  inst_ac_qns_upload: any;
  inst_ac_disc_create: any;
  inst_ac_url: any;
  updated_by_admin: any;
  userinst_id: any;
  admins: any = [];
  adminBranches: any = [];
  adminAddedBranches: any = [];
  adminsArray:any =  [];
  selectedAdminBranches: any = [];
  selectedAdminBranchesOld: any = [];
  selectedBranchId: any;
  selectedBranchTypeId: any;
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  showChildModal(): void {
    this.childModal.show();
  }
  hideChildModal(): void {
    this.childModal.hide();
  }
  modalRef: BsModalRef;
  options: any = {
    autoApply: false,
    alwaysShowCalendars: false,
    linkedCalendars: true,
    singleDatePicker: false,
    showWeekNumbers: false,
    showISOWeekNumbers: false,
  };
  constructor(
    private modalService: BsModalService,
    private _manageinstituteService: ManageinstituteService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private messageService: MessageService,
    private _router: Router,
    private _http: Http,
    private _defaultDataService: DefaultDataService,
    private _adminprofileService: AdminprofileService,
    private fb: FormBuilder
  ) {
    this.branchFormType = '';
    this.modelPic = './../assets/img/upload/avatar.png';
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  getInstituteBranches(id) {
    this._manageinstituteService.getInstituteBranches(id)
      .then((res: any) => {
        if (res !== 2) {
          this.instituteBranches = res;
          for(let brc of this.instituteBranches){
            this.adminAddedBranches.push({
              "label": brc.branch_name, "value": brc.branch_id
            })
          }
        } else {
          this.instituteBranches = [];
        }
      })
  }
  addbranchMethod() {
    $('.ui-multiselect.ui-widget.ui-state-default.ui-corner-all').css('width', '100%');
    $('.ui-multiselect-panel .ui-multiselect-header').css('width', '100%');
    this.submitPressed = false;
  }
  branchDetails(id,type) {
    $('.ui-multiselect.ui-widget.ui-state-default.ui-corner-all').css('width', '100%');
    $('.body .ui-multiselect-panel .ui-multiselect-header').css('width', '100%');
    this.adminsArray = [];
    this.selectedBranchId = id;
    this.selectedBranchTypeId = type;
    this._manageinstituteService.getBranchDetails(this.selectedBranchId)
      .then(res => {
        for (let adm of res) {
          this.adminsArray.push(adm.admin_id);
        }
        for (let i = 0; i < this.instituteBranches.length; i++) {
          if (this.instituteBranches[i].branch_id === id) {
            this.branchAddForm.controls.name.setValue(this.instituteBranches[i].branch_name);
            this.branchAddForm.controls.admins.setValue(this.adminsArray);
            this.branchAddForm.controls.address.setValue(this.instituteBranches[i].branch_address);
            this.branchAddForm.controls.phone.setValue(this.instituteBranches[i].branch_phone);
            this.branchAddForm.controls.alt_phone.setValue(this.instituteBranches[i].branch_alt_phone);
            this.branchAddForm.controls.fax.setValue(this.instituteBranches[i].branch_fax);
            this.branchAddForm.controls.email.setValue(this.instituteBranches[i].barnch_email);
            this.branchAddForm.controls.contact.setValue(this.instituteBranches[i].branch_contact);
          }
        }
      })

  }
  updateBranch() {
    this.submitPressed = true;
    if (this.branchAddForm.invalid) {
      return
    }
    var body = {
      "inst_id": this.InstId,
      'branch_type_id':this.selectedBranchTypeId,
      'branch_id':this.selectedBranchId,
      "branch_name": this.branchAddForm.controls.name.value,
      "branch_address": this.branchAddForm.controls.address.value,
      "admin_id": this.branchAddForm.controls.admins.value,
      "branch_phone": this.branchAddForm.controls.phone.value,
      "branch_alt_phone": this.branchAddForm.controls.alt_phone.value,
      "branch_fax": this.branchAddForm.controls.fax.value,
      "barnch_email": this.branchAddForm.controls.email.value,
      "branch_contact": this.branchAddForm.controls.contact.value
    }
    this._manageinstituteService.updateBranch(body)
      .then(res => {
        if (res === 1) {
          this.getInstituteBranches(this.instId);
          this.alertmsgClass = 'success';
          this.alertmsgSucc = 'Branch is updated Successfully!';
          this.summary = 'Success';
          this.showSuccess();
          $('#addbranchmodel').modal('hide');
        }
      })
  }
  createBranch() {
    this.submitPressed = true;
    if (this.branchAddForm.invalid) {
      return
    }
    if(this.branchFormType === 'Update Branch'){
      this.updateBranch();
    }else {
      var body = {
        "inst_id": this.InstId,
        "branch_name": this.branchAddForm.controls.name.value,
        "branch_address": this.branchAddForm.controls.address.value,
        "admin_id": this.branchAddForm.controls.admins.value,
        "branch_phone": this.branchAddForm.controls.phone.value,
        "branch_alt_phone": this.branchAddForm.controls.alt_phone.value,
        "branch_fax": this.branchAddForm.controls.fax.value,
        "barnch_email": this.branchAddForm.controls.email.value,
        "branch_contact": this.branchAddForm.controls.contact.value
      }
  
      this._manageinstituteService.createBranch(body)
        .then(res => {
          if (res === 1) {
            this.getInstituteBranches(this.instId);
            this.alertmsgClass = 'success';
            this.alertmsgSucc = 'Branch is created Successfully!';
            this.summary = 'Success';
            this.showSuccess();
            $('#addbranchmodel').modal('hide');
          }
  
        })
    }
    
  }

  ngOnInit() {
    this.Check_admin_id = localStorage.getItem('admin_id');
    this.superAdminName = '';
    this.superAdminEmail = '';
    this.instituteBranches = [];
    if (this.Check_admin_id == null) {
      this._router.navigate(['/']);
    } else {
      this.instId = localStorage.getItem('inst_id');
      this.getInstitute(this.instId);
      this.getInstituteBranches(this.instId);
      this.getCountry();
      this.getInstituteAdmins(this.instId);
      this.branchAddForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        admins: [[], [Validators.required]],
        phone: ['', [Validators.required]],
        alt_phone: ['', [Validators.required]],
        address: ['', [Validators.required]],
        fax: ['', [Validators.required]],
        contact: ['', [Validators.required]]
      })
      this.createAdmin = new FormGroup({
        admin_id: new FormControl(''),
        inst_id: new FormControl(''),
        admin_dname: new FormControl(''),
        admin_fname: new FormControl(''),
        admin_mname: new FormControl(''),
        admin_lname: new FormControl(''),
        admin_gender: new FormControl(''),
        admin_dob: new FormControl(''),
        admin_email: new FormControl('', {
          validators: [Validators.required, Validators.pattern(this.emailpattern)], updateOn: 'blur'
        }),
        admin_alt_email: new FormControl('', {
          validators: [Validators.required, Validators.pattern(this.emailpattern)], updateOn: 'blur'
        }),
        admin_phone_cont_code: new FormControl(''),
        admin_phone: new FormControl(''),
        admin_alt_phone_cont_code: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)], updateOn: 'blur'
        }),
        admin_alt_phone: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)], updateOn: 'blur'
        }),
        admin_fax_cnt_code: new FormControl(''),
        admin_fax: new FormControl(''),
        admin_country: new FormControl(''),
        admin_state: new FormControl(''),
        admin_city: new FormControl(''),
        admin_address: new FormControl(''),
        admintype_id: new FormControl(''),
        ac_user_email: new FormControl('', {
          validators: [Validators.required, Validators.pattern(this.emailpattern)], updateOn: 'blur'
        }),
        ac_user_phone: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)], updateOn: 'blur'
        }),
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
      this.singleInstitute = new FormGroup({
        inst_id: new FormControl(''),
        inst_name: new FormControl(''),
        inst_user_id: new FormControl(''),
        cntry_name: new FormControl(''),
        inst_state: new FormControl(''),
        city_name: new FormControl(''),
        inst_address: new FormControl(''),
        inst_url: new FormControl(''),
        inst_email: new FormControl(''),
        inst_phone: new FormControl(''),
        inst_alt_phone: new FormControl(''),
        inst_fax: new FormControl(''),
        inst_contact: new FormControl(''),
        inst_created_date: new FormControl(''),
        is_inst_validaccess: new FormControl(''),
        instaccess_from_date: new FormControl(''),
        instaccess_to_date: new FormControl(''),
        inst_access_updateadby: new FormControl(''),
        inst_access_updated_date: new FormControl(''),
        //inst_superadmn_nam : new FormControl(''),
        //inst_superadmn_eml : new FormControl(''),
      });
      this.updateUser = new FormGroup({
        admin_id: new FormControl(''),
        admin_dname: new FormControl(''),
        admin_fname: new FormControl(''),
        admin_mname: new FormControl(''),
        admin_lname: new FormControl(''),
        admin_gender: new FormControl(''),
        admin_dob: new FormControl(''),
        admin_email: new FormControl(''),
        admin_alt_email: new FormControl(''),
        admin_phone_cont_code: new FormControl(''),
        admin_phone: new FormControl(''),
        admin_alt_phone: new FormControl(''),
        admin_alt_phone_cont_code: new FormControl(''),
        admin_fax: new FormControl(''),
        admin_fax_cnt_code: new FormControl(''),
        //user_school         : new FormControl(''),
        //user_class          : new FormControl(''),
        admin_country: new FormControl(''),
        admin_state: new FormControl(''),
        admin_city: new FormControl(''),
        admin_address: new FormControl(''),
        ac_user_email: new FormControl(''),
        //uac_phone           : new FormControl(''),
        admintype_id: new FormControl(''),
        usrtyp_name: new FormControl('')
      });

      this.instsuperAdminEditform = new FormGroup({
        inst_id: new FormControl(''),
        inst_superadmn_nam: new FormControl(''),
        inst_superadmn_eml: new FormControl('', {
          validators: [Validators.required, Validators.pattern(this.emailpattern)], updateOn: 'blur'
        }),
      });
    }
    // setTimeout(() => {
    //   $('.selectpicker').selectpicker('refresh');
    // }, 1000);
  }
  updateAdminBranch(){
    var body ={
      "admin_id": this.admin_id,
      "institute_id": this.instId,
      "branch_ids":this.selectedAdminBranches
    }
    this._manageinstituteService.updateAdminBranch(body)
    .then(res=>{
      if(res === 1){
        this.getBranchesByAdmin(this.admin_id);
        this.alertmsgClass = 'success';
        this.alertmsgSucc = 'Brnaches Successfully Updated!';
        this.summary = 'Success';
        this.showSuccess();
        this.profileEdit_20 = false;
      }
    })
  }
  getBranchesByAdmin(admin_id){
    this._manageinstituteService.getBranchsByAdmin(admin_id)
          .then(res => {
            if (res !== 2) {
              this.selectedAdminBranches = [];
              this.adminBranches = res;
              for(let brc of this.adminBranches){
                this.selectedAdminBranchesOld.push(brc.branch_id);
                this.selectedAdminBranches.push(brc.branch_id);
              }
              
            } else {

              this.adminBranches = [];
            }
          })
  }
  showAdmin(admin_id) {
    $('.ui-multiselect.ui-widget.ui-state-default.ui-corner-all').css('width','290px')
    this.selected_admin_id = admin_id;
    this._manageinstituteService.showAdmin(admin_id)
      .then((data: any) => {
        this.getBranchesByAdmin(admin_id)
        { this.singleAdmin = data; }
        this.admin_id = data.admin_id;
        this.admin_dname = data.admin_dname;
        this.admin_fname = data.admin_fname;
        this.admin_mname = data.admin_mname;
        this.admin_lname = data.admin_lname;
        this.admin_gender = data.admin_gender;
        this.admin_dob = data.admin_dob;
        this.admin_email = data.admin_email;
        this.admin_alt_email = data.admin_alt_email;
        this.admin_phone_cont_code = data.admin_phone_cont_code;
        this.admin_phone = data.admin_phone;
        this.admin_alt_phone_cont_code = data.admin_alt_phone_cont_code;
        this.admin_alt_phone = data.admin_alt_phone;
        this.admin_fax_cnt_code = data.admin_fax_cnt_code;
        this.admin_fax = data.admin_fax;
        this.admin_country = data.admin_country;
        this.adminCountry = data.cntry_name;
        this.admin_city = data.admin_city;
        this.adminCity = data.city_name;
        this.admin_state = data.admin_state;
        this.adminState = data.state_name;
        this.admin_address = data.admin_address;
        this.admintype_id = data.admintype_id;
        this.ac_user_email = data.ac_user_email;
        this.admin_created_date = data.admin_created_date;
        this.admin_created_by = data.admin_created_by;
        this.auc_is_reg_confiemed = data.auc_is_reg_confiemed;
        this.ac_reg_cnf_date = data.ac_reg_cnf_date;
        this.ac_reg_cnf_by = data.ac_reg_cnf_by;
        this.ac_is_blocked = data.ac_is_blocked;
        this.ac_blocked_by = data.ac_blocked_by;
        this.ac_blocked_date = data.ac_blocked_date;
        if (data.admin_pic !== '') {
          this.modelPic = 'http://157.230.1.22:83/assets/Admin/profilePics/admin_' + data.admin_id + '/' + data.admin_pic;
        } else {
          this.modelPic = './../assets/img/upload/avatar.png';
        }
        this.ac_is_admin_deleted = data.ac_is_admin_deleted;
        this.ac_deleted_date = data.ac_deleted_date;
        this.ac_deleted_by = data.ac_deleted_by;
        this.branch_name = data.branch_name;
        this.branch_id = data.branch_id;
        this.branch_phone = data.branch_phone;
        this.barnch_email = data.barnch_email;
        this.branch_alt_phone = data.branch_alt_phone;
        if (this.auc_is_reg_confiemed == 0) { this.dataTarget = false; } else { this.dataTarget = true; }
        if (this.ac_is_blocked == 0) { this.btnClass = 'btn-info'; this.ac_blocked_date = '--'; this.ac_blocked_by = '--'; this.btnText = 'Block'; } else { this.btnClass = 'btn-success'; this.btnText = 'Blocked'; }
        if (this.ac_is_admin_deleted == 0) { this.btnClassd = 'btn-info'; this.ac_deleted_date = '--'; this.ac_deleted_by = '--'; this.btnTextd = 'Delete'; } else { this.btnClassd = 'btn-danger'; this.btnTextd = 'Deleted'; }
        if (data == 1) {
          this.msgSuccLogin = true;
          this.alertmsgClass = 'alert-success';
          this.alertmsgSucc = 'Created Successfully!';
        }
      },
        error => this.errorMessage = error
      );
  }
  cancelUpdateDefault(){
    this.inst_ac_valid_to = new Date(this.instituteDetails.inst_ac_valid_to);
    this.inst_ac_restricted_access = this.instituteDetails.inst_ac_restricted_access;
    this.inst_ac_testatnd_access = this.instituteDetails.inst_ac_testatnd_access;
    this.inst_ac_testcr_access = this.instituteDetails.inst_ac_testcr_access;
    this.inst_ac_groupcr_access = this.instituteDetails.inst_ac_groupcr_access;
    this.inst_ac_qns_upload = this.instituteDetails.inst_ac_qns_upload;
  }
  getInstitute(inst_id) {
    this._manageinstituteService.getInstitute(inst_id).subscribe(
      data => {
        this.instituteDetails = data;
        this.InstId = data.inst_id;
        this.inst_name = data.inst_name;
        this.inst_user_id = data.inst_user_id;
        this.cntry_name = data.cntry_name;
        this.inst_state = data.state_name;
        this.city_name = data.city_name;
        this.inst_address = data.inst_address;
        this.inst_email = data.inst_email;
        this.inst_phone = data.inst_phone;
        this.inst_alt_phone = data.inst_alt_phone;
        this.inst_fax = data.inst_fax;
        this.inst_contact = data.inst_contact;
        this.inst_created_date = this.getFormattedDate(data.inst_created_date);
        this.is_inst_validaccess = data.is_inst_validaccess;
        this.instaccess_from_date = this.getFormattedDate(data.instaccess_from_date);
        this.instaccess_to_date = this.getFormattedDate(data.instaccess_to_date);
        this.inst_access_updateadby = this.getFormattedDate(data.inst_access_updateadby);
        this.inst_access_updated_date = this.getFormattedDate(data.inst_access_updated_date);
        this.inst_superadmn_nam = data.inst_superadmn_nam;
        this.superAdminName = data.inst_superadmn_nam;
        this.superAdminEmail = data.inst_superadmn_eml;
        this.inst_superadmn_eml = data.inst_superadmn_eml;
        this.inst_id = data.inst_id;
        this.userinst_id = data.inst_id;
        this.inst_ac_url = data.inst_url;
        this.inst_ac_valid_to = new Date(data.inst_ac_valid_to);
        this.inst_ac_contnt_upload = data.inst_ac_contnt_upload;
        this.inst_ac_restricted_access = data.inst_ac_restricted_access;
        this.inst_ac_testatnd_access = data.inst_ac_testatnd_access;
        this.inst_ac_testcr_access = data.inst_ac_testcr_access;
        this.inst_ac_groupcr_access = data.inst_ac_groupcr_access;
        this.inst_ac_qns_upload = data.inst_ac_qns_upload;
        this.inst_ac_disc_create = data.inst_ac_disc_create;
        this.updated_by_admin = data.updated_by_admin;
      },
      error => {
      });
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
  getStatesoncountry(country) {
    this._defaultDataService.getStatesoncountries(country).subscribe(
      data => {
        {
          this.states = data;
          this.cities = [];
        }
      },
      error => this.errorMessage = error
    );
    this._defaultDataService.getCountryCode(country).subscribe(
      data => {
        {
          this.response = data;
        }
        this.adminCountry = data.cntry_name;
      },
      error => { this.errorMessage = error }
    );
  }
  getCitiesonstates(state) {
    this.adminCity = '';
    this._defaultDataService.getCitiesonstates(state).subscribe(
      data => this.cities = data,
      error => this.errorMessage = error
    );
    this._defaultDataService.getStateonState(state).subscribe(
      data => {
        { this.states = data; }
        this.adminState = this.states.map(function (a) { return a["state_name"]; });
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
  adminCreates(createAdmin: FormGroup) {
    this.finaldata = createAdmin.value
    if (this.finaldata.ac_user_email) {
      if (this.instAdminEmail == false && this.instAdminEmail != undefined) {
        this.createsAdmin();
      }
    } else {
      this.instAdminEmail = true;
      this.instAdminEmailErrText = 'Please enter email';
    }
  }
  createsAdmin() {
    this._manageinstituteService.createsAdmin(this.finaldata)
      .then((data: any) => {
        { this.adminResponse = data; }
        if (data == 1) {
          this.getInstituteAdmins(this.InstId);
          this.alertmsgClass = 'success';
          this.alertmsgSucc = 'Admin is created Successfully!';
          this.summary = 'Success';
          this.showSuccess();
          this.createAdmin.reset();
        } else {
          this.alertmsgClass = 'error';
          this.alertmsgSucc = 'Something went wrong!';
          this.summary = 'Error';
          this.showSuccess();
        }
      })
      .catch((error) => {
        if (!error.status) {
          this.errorMessage = error.message;
        }
      })
  }
  getInstituteAdmins(instId) {
    this._manageinstituteService.getInstituteAdmins(instId).subscribe(
      data => {
        { this.instAdmins = data; }
        for (let usr of this.instAdmins) {
          this.admins.push(
            { "label": usr.admin_dname, "value": usr.admin_id }
          );
        }
      },
      error => this.errorMessage = error
    );
  }
  profilefieldEdit(num) {
    if (this['profileEdit_' + num] == false) {
      this['profileEdit_' + num] = true;
    } else {
      this['profileEdit_' + num] = false;
    }
  }
  enablePhone(value, column) {
    if (value) { this['phoneEnable_' + column] = true; } else { this['phoneEnable_' + column] = false; }
  }
  enableBranchPhone(value, column) {
    if (value) {
      this['branchPhoneEnable_' + column] = false;
    } else {
      this['branchPhoneEnable_' + column] = true;
    }
  }
  sendInvite() {
  }
  profilefieldUpdate(value, column, num, id) {
    if (value) {
      if (this['profileEdit_' + num] == true) {
        this._adminprofileService.profilefieldUpdate(value, column, id).then(
          (data: any) => {
            { this.response = data }
            if (data == 1) {
              this['phoneEnable_' + column] = false;
              this.alertmsgClass = 'success';
              this.alertmsgSucc = 'Updated successfully!';
              this.summary = 'Success';
              this.showAdmin(this.selected_admin_id);
              this.showSuccess();
            } else if (data == 2) {
              this['phoneEnable_' + column] = false;
              this.alertmsgClass = 'error';
              this.alertmsgSucc = 'Data not updated!';
              this.summary = 'Error';
              this.showSuccess();
            } else if (data == 3) {
              this['phoneEnable_' + column] = false;
              this.alertmsgClass = 'error';
              this.alertmsgSucc = 'You have not changed the value!';
              this.summary = 'Error';
              this.showSuccess();
            } else if (data == 4) {
              this['profileEdit_' + num] = true;
              this['phoneEnable_' + column] = true;
              this.alertmsgClass = 'error';
              this.alertmsgSucc = 'This value is already existed. Please try with another!';
              this.summary = 'Error';
              this.showSuccess();
            }
          },
          error => { }
        );
        this['profileEdit_' + num] = false;
      } else {
        this['profileEdit_' + num] = true;
      }
    } else {
      this.alertmsgClass = 'error';
      this.alertmsgSucc = 'Please enter value!';
      this.summary = 'Error';
      this.showSuccess();
    }
  }
  profilephonefieldUpdate(valuec, columnc, value, column, num, id) {
    this.adminphonecontcode = valuec;
    if (this['profileEdit_' + num] == true) {
      this._adminprofileService.profilePhoneUpdate(valuec, columnc, value, column, id).then(
        (data: any) => {
          { this.response = data }
          if (data == 1) {
            this['phoneEnable_' + num] = false;
            this.alertmsgSucc = 'Updated successfully';
            this.alertmsgClass = 'success';
            this.summary = 'Success';
            this.showSuccess();
            this.getInstituteAdmins(this.InstId);
          } else if (data == 2) {
            this['phoneEnable_' + num] = false;
            this.alertmsgSucc = 'Data not updated';
            this.alertmsgClass = 'error';
            this.summary = 'Error';
            this.showSuccess();
          } else if (data == 3) {
            this['phoneEnable_' + num] = false;
            this.alertmsgSucc = 'You have not changed the value';
            this.alertmsgClass = 'error';
            this.summary = 'Error';
            this.showSuccess();
          } else if (data == 4) {
            this['profileEdit_' + num] = true;
            this['phoneEnable_' + num] = true;
            this.alertmsgSucc = 'This value is already existed. Please try with another';
            this.alertmsgClass = 'error';
            this.summary = 'Error';
            this.showSuccess();
          }
        })
        .catch((error) => {
        })
      this['profileEdit_' + num] = false;
      this['phoneEnable_' + num] = false;

    } else {
      this['profileEdit_' + num] = true;
    }
  }
  profilefieldUpdate_11(usad, usct, usst, uscn, id) {
    if (this.profileEdit_11 == true) {
      this._adminprofileService.useraddressUpdate(usad, usct, usst, uscn, id)
        .then((data: any) => {
          { this.response = data; }
          if (data == 1) {
            this.profileEdit_11 = false;
            this.alertmsgSucc = 'Updated successfully';
            this.alertmsgClass = 'success';
            this.summary = 'Success';
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
  loginsfieldUpdate_2(value, column, num, id) {
    if (this.instAdminEmail == true) {
      return false;
    }
    this._adminprofileService.updateLogins(value, column, id).then(
      (data: any) => {
        { this.response = data; }
        if (data == 1) {
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
          this.loginsEdit_2 = true;
          this.alertmsgSucc = 'This value is already existed. Please try with another';
          this.alertmsgClass = 'error';
          this.summary = 'Error';
          this.showSuccess();
        }

      },
      error => { }
    );
    this['profileEdit_' + num] = false;
  }
  userRegConfirm(confirm) {
    this._manageinstituteService.userRegConfirm(confirm, this.admin_id, this.Check_admin_id)
      .then((data: any) => {
        { this.response = data; }
        if (data == 2) {
          alert('Something went wrong!!');
        } else {
          if (confirm == 0) {
            this.ac_reg_cnf_date = data.date;
            this.ac_reg_cnf_by = data.by;
            this.dataTarget = true;
          }
        }
      });
  }

  instDefaultUpdateform() {
    this._manageinstituteService.instDefaultUpdate(this.instDefaultEditform.value).subscribe(
      data => {
        { this.response = data; }
        if (data) {
          this.getInstitute(this.instId);
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
  userRegBlocked(block) {
    this._manageinstituteService.userRegBlocked(block, this.admin_id, this.Check_admin_id)
      .then((data: any) => {
        { this.response = data; }
        if (data == 2) {
          alert('Something went wrong!!');
        } else {
          this.ac_blocked_date = data.date;
          this.ac_blocked_by = data.by;
          if (data.value == 1) {
            this.btnClass = 'btn-success';
            this.btnText = 'Blocked';
            this.ac_is_blocked = data.value;
          } else {
            this.btnClass = 'btn-info';
            this.btnText = 'Block';
            this.ac_is_blocked = data.value;
          }
        }
      }, error => { }
      );
  }
  userRegDeleted(delet) {
    this._manageinstituteService.userRegDeleted(delet, this.admin_id, this.Check_admin_id)
      .then((data: any) => {
        { this.response = data; }
        if (data == 2) {
          alert('Something went wrong!!');
        } else {
          this.ac_deleted_date = data.date;
          this.ac_deleted_by = data.by;
          if (data.value == 1) {
            this.btnClassd = 'btn-danger';
            this.btnTextd = 'Deleted';
            this.ac_is_admin_deleted = data.value;
          } else {
            this.btnClassd = 'btn-info';
            this.btnTextd = 'Delete';
            this.ac_is_admin_deleted = data.value;
          }
        }
      }, error => { }
      );
  }
  CheckAdminAvailability(value, column) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(value).toLowerCase())) {
      this.instAdminEmail = true;
      this.instAdminEmailErrText = "This email is invalid!";
      return
    } else {
      this.instAdminEmail = false;
      this.instAdminEmailErrText = "";
    }
    this.checkData = {
      "value": value,
      "column": column,
      "availId": this.Check_admin_id,
      "w_column": "admin_id",
      "table": "admin_access"
    }
    this._manageinstituteService.CheckAdminAvailability(this.checkData)
      .then((data: any) => {
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
      })
      .catch((error) => {
      })
  }
  editInstSADetails() {
    if (this.instSAEdit == false) {
      this.instSAEdit = true;
    } else {
      this.instSAEdit = false;
    }
  }
  resetInstituteDetails() {
    var data = this.instituteDetails;
    this.InstId = data.inst_id;
    this.inst_name = data.inst_name;
    this.inst_user_id = data.inst_user_id;
    this.cntry_name = data.cntry_name;
    this.inst_state = data.state_name;
    this.city_name = data.city_name;
    this.inst_address = data.inst_address;
    this.inst_email = data.inst_email;
    this.inst_phone = data.inst_phone;
    this.inst_alt_phone = data.inst_alt_phone;
    this.inst_fax = data.inst_fax;
    this.inst_contact = data.inst_contact;
    this.inst_created_date = this.getFormattedDate(data.inst_created_date);
    this.is_inst_validaccess = data.is_inst_validaccess;
    this.instaccess_from_date = this.getFormattedDate(data.instaccess_from_date);
    this.instaccess_to_date = this.getFormattedDate(data.instaccess_to_date);
    this.inst_access_updateadby = this.getFormattedDate(data.inst_access_updateadby);
    this.inst_access_updated_date = this.getFormattedDate(data.inst_access_updated_date);
    this.inst_superadmn_nam = data.inst_superadmn_nam;
    this.superAdminName = data.inst_superadmn_nam;
    this.superAdminEmail = data.inst_superadmn_eml;
    this.inst_superadmn_eml = data.inst_superadmn_eml;
    this.instituteEdit = false;
  }
  editInstituteDetails() {
    if (this.instituteEdit == false) {
      this.instituteEdit = true;
      /* Get Countries */
      this._defaultDataService.getcountryNamesforProfile().subscribe(
        data => this.country = data,
        error => this.errorMessage = error
      );
      /* ./Get Countries */
    } else {
      this.instituteEdit = false;
    }
  }
  editInstituteAccess(form) {
    if (this['instituteEdit_' + form] == false) {
      this['instituteEdit_' + form] = true;
      /* Get Countries */
      this._defaultDataService.getcountryNamesforProfile().subscribe(
        data => this.country = data,
        error => this.errorMessage = error
      );
      /* ./Get Countries */
    } else {
      this['instituteEdit_' + form] = false;
    }
  }
  instituteUpdateform(singleInstitute: FormGroup) {
    this.instituteData = singleInstitute.value
    this.updateInstitute();
  }
  updateInstitute() {
    this._manageinstituteService.updateInstitute(this.instituteData).subscribe(
      data => {
        { this.response = data; }
        if (this.response == 1) {
          this.instituteEdit = false;
          this.alertmsgClass = 'success';
          this.msgSummery = 'Success';
          this.alertmsgSucc = 'Institute updated!';
          this.showSuccess();
        } else {
          this.instituteEdit = false;
          this.alertmsgClass = 'error';
          this.msgSummery = 'Error';
          this.alertmsgSucc = 'Something went wrong';
          this.showSuccess();
        }
      },
      error => { }
    );
  }
  instSAUpdateform(instsuperAdminEditform: FormGroup) {
    this.instSAData = instsuperAdminEditform.value
    if (instsuperAdminEditform.value.inst_superadmn_eml != '') {
      if (this.instsuperAdminEditform.valid && this.instAdminEmail == false) {
        this.updateinstSA();
        this.instSAEdit = false;
      } else {
        this.instSAEdit = true;
      }
    } else {
      this.alertmsgClass = 'error';
      this.summary = 'Error';
      this.alertmsgSucc = 'Plesae enter institute superadmin email';
      this.showSuccess();
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
  showSuccess() {
    this.messageService.add({ severity: this.alertmsgClass, summary: this.summary, detail: this.alertmsgSucc });
  }
  /* For Production */
  onReject() { }
}