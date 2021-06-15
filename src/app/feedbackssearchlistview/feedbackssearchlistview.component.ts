import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedbackssearchlistview',
  templateUrl: './feedbackssearchlistview.component.html',
  styleUrls: ['./feedbackssearchlistview.component.css']
})
export class FeedbackssearchlistviewComponent implements OnInit {
 /******for producation******/
 classification:any;
 clascountry:any;
 clascourse:any;
 clasclass:any;
 classubject:any;
 clasverify:any;
 crationdate:any;
 clasverifyedadmin:any;
 clasnocontent:any;
 clasnoquest:any;
 verifydate:any;
 selecteclasnoquest:any;
 selecteclasnocontent:any;
 selecteclasverifyadmin:any;
 selecteclasverify:any;
 selecteclassubject:any;
 selecteclasclass:any;
 selecteclascourse:any;
 selecteclascountry:any;
 selectedclasid:any;
 clasnonotific:any;
 clasnotest:any;
 selecteclasnotest:any;
 selecteclasnonotifi:any;
 
  constructor() { }

  ngOnInit() {
  }

}
