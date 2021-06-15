import { Component, OnInit, Inject } from '@angular/core';
import * as $ from 'jquery';
import { WOW } from 'wowjs/dist/wow.min';
import { DOCUMENT } from "@angular/platform-browser";
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
@Component({
  selector: 'app-sdahshmenu',
  templateUrl: './sdahshmenu.component.html',
  styleUrls: ['./sdahshmenu.component.css',
 
]
})
export class SdahshmenuComponent implements OnInit {
  Check_admin_id: any;
  Check_admin_type: any;
  superadminMenu : boolean;
  oneAtATime: boolean = true;
  instSuperadmin: boolean;
  instAdmin: boolean;
  headerValue: any
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
  ) { 
    if(localStorage.getItem('headerValue') !== null){
      this.headerValue = localStorage.getItem('headerValue')
    }
  }

  setHeader(value){
    this.headerValue = value;
    localStorage.setItem('headerValue',this.headerValue);
  }
 public ngOnInit() {
   this.Check_admin_id = localStorage.getItem('admin_id');
   this.Check_admin_type = localStorage.getItem('admintype_id');
   //alert('admin type===='+this.Check_admin_type);
  //  if(this.Check_admin_type==1){
  //   this.superadminMenu = true;
  //  }else{
  //   this.superadminMenu = false;
  //  }
  if(this.Check_admin_type==3){
    this.instSuperadmin = true;
  }else if(this.Check_admin_type==4){
    this.instAdmin = true;
  }else{
    this.superadminMenu = true;
  }
   //alert(this.adminMenu);
  // alert(this.Check_admin_type);
  $('.toggle-side').click(function(e) {
  	e.preventDefault();
    var $this = $(this);
  
    if ($this.next().hasClass('show')) {
        $this.next().removeClass('show');
        $this.next().slideUp(350);
    } else {
        $this.parent().parent().find('li .sideinner').removeClass('show');
        $this.parent().parent().find('li .sideinner').slideUp(350);
        $this.next().toggleClass('show');
        $this.next().slideToggle(350);
    }
});






  }
  
}
