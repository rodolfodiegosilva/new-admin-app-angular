import { Component, OnInit,Inject,Input } from '@angular/core';
import { Router } from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { ConfigVariable } from '../shared/app.config';
@Component({
  selector: 'app-sdashheader',
  templateUrl: './sdashheader.component.html',
  styleUrls: ['./sdashheader.component.css','../../assets/superadmin/dist/css/app.min.css','../../assets/superadmin/dist/css/component_ui.min.css',
              '../../assets/superadmin/material_icons/materia_icons.css']
})
export class SdashheaderComponent implements OnInit {
  @Input() profileImage: any;
  @Input() profileName: any;
  adminData: any;

  constructor( @Inject(LOCAL_STORAGE) private storage: WebStorageService,
  private _router: Router) {
    this.profileImage = '';
    this.profileName = '';
    this.adminData = JSON.parse(localStorage.getItem('adminData'));
   }

  ngOnInit() {
    this.profileName = localStorage.getItem('admin_dname');
    if(JSON.parse(localStorage.getItem('adminData')).data.adminData.admin_pic !== ''){
      this.profileImage = ConfigVariable.BASE_API_URL+"assets/Admin/profilePics/admin_"+ this.adminData.data.adminData.admin_id+'/'+ this.adminData.data.adminData.admin_pic;
    }else{
      this.profileImage = '../../assets/superadmin/dist/img/avatar.png';
    }
  }
  profileLogout(){
      
      localStorage.removeItem('admin_id');
      localStorage.removeItem('ac_user_email');
      localStorage.removeItem('ac_branch_id');
      localStorage.removeItem('inst_id');
      localStorage.removeItem('ac_status');
      localStorage.clear();
      this._router.navigate(['/']);
    
  }
}
