import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { ManageuserService } from '../manageuser/manageuser.service';
@Component({
  selector: 'app-superadmindashboard',
  templateUrl: './superadmindashboard.component.html',
  styleUrls: [
    '../../assets/superadmin/dist/css/app.min.css',
    '../../assets/superadmin/dist/css/component_ui.min.css',
    '../../assets/superadmin/material_icons/materia_icons.css',
    '../../assets/superadmin/dist/css/custom.css',
    './superadmindashboard.component.css'
  ],
  providers: [ManageuserService]
})
export class SuperadmindashboardComponent implements OnInit {
  Check_admin_id: any;
  Check_admin_type: any;
  Check_inst_id: any;
  pageNum: any;
  userCount: number = 0;
  questionCount: number = 0;
  mrequesteCount: number = 0;
  contentCount: number = 0;
  partnerCount: number = 0;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private _manageuserService: ManageuserService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.Check_admin_id = localStorage.getItem('admin_id');
    this.Check_admin_type = localStorage.getItem('admintype_id');
    this.Check_inst_id = localStorage.getItem('inst_id');
    //alert(this.Check_inst_id);
    if (this.Check_admin_id == null) {
      this._router.navigate(['/']);
    }
    this.getAllRegisteredUsersCount(this.Check_inst_id);
  }

  getAllRegisteredUsersCount(id) {
    var body ={
      'inst_id':this.Check_inst_id
    };
    this._manageuserService.getAllRegisteredUsersCount(body)
      .then((data: any) => {       
          this.userCount = data.userCount;
          this.questionCount = data.questionCount;
          this.mrequesteCount = data.mentorCount;
          this.contentCount = data.contentCount;
          this.partnerCount = data.partnerCount;

        //alert(data);     
      }
      ).catch((error) => {
        if (!error.error.status) {
          localStorage.clear();
          this._router.navigate(['/'])
        }
      })
  }

}
