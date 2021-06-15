import { Component,Inject } from '@angular/core';
//import * as $ from 'jquery';
import { WOW } from 'wowjs/dist/wow.min';
//import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { DOCUMENT } from "@angular/platform-browser";
declare var $;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  
  constructor() {
    localStorage.setItem('headerValue',null);
     
  }
  public ngOnInit()
  {

    $(document).ready(function(){
      //var $:any;
      $('.demo-icon').click(function () {
        //$('.form_holder').css('display', 'block');
        $('.form_holder').toggle('slow');
    });

  new WOW().init();
//   $(".e2").daterangepicker({
//     datepickerOptions: {
//     numberOfMonths :2,
//      maxDate: null
//     }
// });
   });

 
}





}
