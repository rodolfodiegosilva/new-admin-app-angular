import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-timelinesearchlistview',
  templateUrl: './timelinesearchlistview.component.html',
  styleUrls: ['./timelinesearchlistview.component.css']
})
export class TimelinesearchlistviewComponent implements OnInit {
  /*******justfor production***** */
  selectedids:any; 
  ids:any;
  timelinetype:any;
  timelienuser:any;
  timlneadmin:any;
  feeddateselected:any;
  contentid:any;
  discussionid:any;
  testid:any;
  notificationid:any;
  commercialid:any;
  sourcetimeline:any;
  verify:any;
  block:any;
  delete:any;
  selecteddiscussionid:any;
  selectetestid:any;
  selectenotificationid:any;
  selectedcommercialid:any;
  selectedsourcetimeline:any;
  selectedverify:any;
  selectedblock:any
  selectedelete:any;
  selectetimelitype: any;
  selectetimlineuser: any;
  selectetimelineadmin: any;
  selectedcontentid: any;



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
    'Last Week (Mo-Su)':[	moment().subtract('days', 7).isoWeekday(1), moment().subtract('days', 7).isoWeekday(7) ],
    'Month to Date': [ moment().startOf('month'), moment() ],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    'Year to Date':[moment().startOf('year'), moment()]
};

isInvalidDate = (m: moment.Moment) =>  {
  return this.invalidDates.some(d => d.isSame(m, 'day') )
}
  constructor() { }

  ngOnInit() {
  }

}
