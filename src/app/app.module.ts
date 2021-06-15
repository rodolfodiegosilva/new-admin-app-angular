import { AdminLoginService } from './login/admin-login.service';
import { ManageinstituteService } from './instutesmanage/manageinstitute.service';
import { DefaultDataService } from './default-data.service';
import { AdminprofileService } from './adminprofilepage/adminprofile.service';
import { CreateadminprofileService } from './createadminprofile/createadminprofile.service';
import { CreateuserbyadminService } from './createuserprofileadmin/createuserbyadmin.service';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login/login.component';
import { RgesterComponent } from './rgester/rgester.component';
import { AppRoutingModule } from './app-routing.module';
import { SuperadmindashboardComponent } from './superadmindashboard/superadmindashboard.component';
import { SdahshmenuComponent } from './sdahshmenu/sdahshmenu.component';
import { SdashheaderComponent } from './sdashheader/sdashheader.component';
import { InstutesmanageComponent } from './instutesmanage/instutesmanage.component';
import { SadminfooterComponent } from './sadminfooter/sadminfooter.component';
import { ManagegemsinstuteComponent } from './managegemsinstute/managegemsinstute.component';
import { AdminprofilepageComponent } from './adminprofilepage/adminprofilepage.component';
import { CreateuserprofileadminComponent } from './createuserprofileadmin/createuserprofileadmin.component';
import { ManageuserComponent } from './manageuser/manageuser.component';
import { CreateadminprofileComponent } from './createadminprofile/createadminprofile.component';
import { ContentsearchComponent } from './contentsearch/contentsearch.component';
import { ContentviewComponent } from './contentview/contentview.component';
import { ContntuploadmanageComponent } from './contntuploadmanage/contntuploadmanage.component';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { CalendarModule } from 'primeng/calendar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StorageServiceModule } from 'angular-webstorage-service';
import { MultiSelectModule } from 'primeng/multiselect';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { CKEditorModule } from 'ng2-ckeditor';
import { AccordionModule } from 'primeng/accordion';
import { PasswordModule } from 'primeng/password';
//import { OwlDateTimeModule, OwlNativeDateTimeModule } from '../../node_modules/ng-pick-datetime';
/***----------Ngx Bootstrap Modal----- */

import { ModalModule } from 'ngx-bootstrap';
import { PaginatorModule } from 'primeng/paginator';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { QuestionsearchlistComponent } from './questionsearchlist/questionsearchlist.component';

import { QuestionsdetailedviewComponent } from './questionsdetailedview/questionsdetailedview.component';
import { QuestionmanageviewComponent } from './questionmanageview/questionmanageview.component';
import { QuestionsanswersuploadComponent } from './questionsanswersupload/questionsanswersupload.component';
import { DiscussonsearhlistviewComponent } from './discussonsearhlistview/discussonsearhlistview.component';
import { DiscussiondetailedpageComponent } from './discussiondetailedpage/discussiondetailedpage.component';
import { TestCreatePageComponent } from './test-create-page/test-create-page.component';
import { TestattendpageComponent } from './testattendpage/testattendpage.component';
import { MeetCreatePageComponent } from './meet-create-page/meet-create-page.component';
import { TestresultpageComponent } from './testresultpage/testresultpage.component';
import { ClassifsearchlistviewComponent } from './classifsearchlistview/classifsearchlistview.component';
import { FeedbackssearchlistviewComponent } from './feedbackssearchlistview/feedbackssearchlistview.component';
import { NotificationmanageComponent } from './notificationmanage/notificationmanage.component';
import { TimelinesearchlistviewComponent } from './timelinesearchlistview/timelinesearchlistview.component';
import { CreatenotificationComponent } from './createnotification/createnotification.component';
import { ChartsModule } from 'ng2-charts';
import { ToastModule } from 'primeng/toast';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
//import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ChecklistModule } from 'angular-checklist';
import { PipeComponent } from './pipe/pipe.component';
import { AngularPaginatorModule } from 'angular-paginator';
import { EditorModule } from "primeng/components/editor/editor";
import { SharedModule } from "primeng/components/common/shared";
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { NgSelectModule } from '@ng-select/ng-select';
import { SafePipe } from './safe.pipe';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';
import { SafeurlPipe } from './safeurl.pipe';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TooltipModule } from 'primeng/tooltip';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { CheckboxModule } from 'primeng/checkbox';
import { ChartModule } from 'primeng/chart';
import { ManagetestComponent } from './managetest/managetest.component';
import { ManagemeetComponent } from './managemeet/managemeet.component';
import { Interceptor } from './shared/shared.interceptor';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { LessonsComponent } from './lessons/lessons.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { ClassesComponent } from './classes/classes.component';
import { CourseComponent } from './course/course.component';
import { SearchandListTestsComponent } from './searchand-list-tests/searchand-list-tests.component';
import { SearchandListMeetComponent } from './searchand-list-meet/searchand-list-meet.component';
import { MentorrequestComponent } from './mentorrequest/mentorrequest.component';
import { PartnerrequestComponent } from './partnerrequest/partnerrequest.component';
import { UserPartnerRequestComponent } from './user-partner-request/user-partner-request.component';
import { NgSwitcheryModule } from 'angular-switchery-ios';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
//import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RgesterComponent,
    SuperadmindashboardComponent,
    SdahshmenuComponent,
    SdashheaderComponent,
    InstutesmanageComponent,
    SadminfooterComponent,
    ManagegemsinstuteComponent,
    AdminprofilepageComponent,
    CreateuserprofileadminComponent,
    ManageuserComponent,
    CreateadminprofileComponent,
    ContentsearchComponent,
    ContentviewComponent,
    ContntuploadmanageComponent,
    QuestionsearchlistComponent,
    QuestionsdetailedviewComponent,
    QuestionmanageviewComponent,
    QuestionsanswersuploadComponent,
    DiscussonsearhlistviewComponent,
    DiscussiondetailedpageComponent,
    TestCreatePageComponent,
    MeetCreatePageComponent,
    TestattendpageComponent,
    TestresultpageComponent,
    ClassifsearchlistviewComponent,
    FeedbackssearchlistviewComponent,
    NotificationmanageComponent,
    TimelinesearchlistviewComponent,
    CreatenotificationComponent,
    FieldErrorDisplayComponent,
    PipeComponent,
    SafePipe,
    SanitizeHtmlPipe,
    SafeurlPipe,
    ManagetestComponent,
    ManagemeetComponent,
    LessonsComponent,
    SubjectsComponent,
    ClassesComponent,
    CourseComponent,
    SearchandListTestsComponent,
    SearchandListMeetComponent,
    MentorrequestComponent,
    PartnerrequestComponent,
    UserPartnerRequestComponent
  ],
  imports: [
    BrowserModule,
    //StorageServiceModule,
    CalendarModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    HttpModule,
    AppRoutingModule,
    AutoCompleteModule,
    // DropdownModule
    //FormsModule
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StorageServiceModule,
    MultiSelectModule,
    AngularMultiSelectModule,
    ModalModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    PaginatorModule,
    NgxDaterangepickerMd,
    CKEditorModule,
    ChartsModule,
    ToastModule,
    AccordionModule,
    PasswordModule,
    ChecklistModule,
    AngularPaginatorModule,
    SharedModule,
    EditorModule,
    DropdownModule,
    ProgressSpinnerModule,
    DialogModule,
    TooltipModule,
    NgSelectModule,
    ScrollPanelModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    ChartModule,
    NgSwitcheryModule
    // OwlDateTimeModule, 
    // OwlNativeDateTimeModule,
    // FroalaEditorModule.forRoot(), 
    // FroalaViewModule.forRoot()     
  ],

  providers: [
    AdminLoginService,
    ManageinstituteService,
    DefaultDataService,
    AdminprofileService,
    CreateadminprofileService,
    CreateuserbyadminService,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  exports: [SanitizeHtmlPipe],
})
export class AppModule { }
