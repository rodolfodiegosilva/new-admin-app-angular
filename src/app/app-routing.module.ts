import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from './login/login.component';
import {RgesterComponent} from './rgester/rgester.component';
import {ManagegemsinstuteComponent} from './managegemsinstute/managegemsinstute.component';
import {CreateuserprofileadminComponent} from'./createuserprofileadmin/createuserprofileadmin.component';
import { SuperadmindashboardComponent } from './superadmindashboard/superadmindashboard.component';
import { InstutesmanageComponent} from './instutesmanage/instutesmanage.component';
import { ManageuserComponent } from './manageuser/manageuser.component';
import { AdminprofilepageComponent } from './adminprofilepage/adminprofilepage.component';
import { CreateadminprofileComponent } from './createadminprofile/createadminprofile.component';
import { ContentsearchComponent } from './contentsearch/contentsearch.component';
import { ContentviewComponent } from './contentview/contentview.component';
import { ContntuploadmanageComponent } from './contntuploadmanage/contntuploadmanage.component';
import { QuestionsearchlistComponent} from './questionsearchlist/questionsearchlist.component';
import { QuestionsdetailedviewComponent} from'./questionsdetailedview/questionsdetailedview.component';
import {QuestionsanswersuploadComponent } from './questionsanswersupload/questionsanswersupload.component';
import {QuestionmanageviewComponent } from './questionmanageview/questionmanageview.component';
import { DiscussiondetailedpageComponent } from'./discussiondetailedpage/discussiondetailedpage.component';
import {DiscussonsearhlistviewComponent} from './discussonsearhlistview/discussonsearhlistview.component';
import {TestCreatePageComponent} from './test-create-page/test-create-page.component';
import {MeetCreatePageComponent} from './meet-create-page/meet-create-page.component';
import { TestattendpageComponent } from './testattendpage/testattendpage.component';
import { TestresultpageComponent } from './testresultpage/testresultpage.component';
import { FeedbackssearchlistviewComponent } from'./feedbackssearchlistview/feedbackssearchlistview.component';
import { ClassifsearchlistviewComponent } from'./classifsearchlistview/classifsearchlistview.component';
import {NotificationmanageComponent} from './notificationmanage/notificationmanage.component';
import {TimelinesearchlistviewComponent} from'./timelinesearchlistview/timelinesearchlistview.component';
import { CreatenotificationComponent} from'./createnotification/createnotification.component';
import { ManagetestComponent } from './managetest/managetest.component';
import { ManagemeetComponent } from './managemeet/managemeet.component';
import { LessonsComponent } from './lessons/lessons.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { ClassesComponent } from './classes/classes.component';
import { CourseComponent } from './course/course.component';
import { SearchandListTestsComponent } from './searchand-list-tests/searchand-list-tests.component';
import { SearchandListMeetComponent } from './searchand-list-meet/searchand-list-meet.component';
import { MentorrequestComponent } from './mentorrequest/mentorrequest.component';
import { PartnerrequestComponent } from './partnerrequest/partnerrequest.component';
import { UserPartnerRequestComponent } from './user-partner-request/user-partner-request.component';

const routes: Routes = [{ path: '', component: LoginComponent },
{ path: '', redirectTo: '/', pathMatch: 'full' },
{ path: 'managegemsinstute', component: ManagegemsinstuteComponent },
{path: 'rgester',component:RgesterComponent},
{ path: 'rgester/:id/:type', component: RgesterComponent }, 
{path:'superadmin',component:SuperadmindashboardComponent}, 
{path:'instutesmanage',component:InstutesmanageComponent},
{path:'createuserprofile',component:CreateuserprofileadminComponent}, 
{path:'manageuser',component:ManageuserComponent},
{path:'manageuser/:page',component:ManageuserComponent},  
{path: 'adminprofile', component:AdminprofilepageComponent},
{path:'createadmin',component:CreateadminprofileComponent},
{path:'contentupload',component:ContntuploadmanageComponent},
{path:'contentsearch',component:ContentsearchComponent},
{path:'contentview',component:ContentviewComponent},
{path:'questionsearch',component:QuestionsearchlistComponent},
{path:'questiondetailedview',component:QuestionsdetailedviewComponent},
{path:'questiondetailedview/:question_id',component:QuestionsdetailedviewComponent},
{path:'questionmangeview',component:QuestionmanageviewComponent},
{path:'questionanswerupload',component:QuestionsanswersuploadComponent},
{path:'questionansweruploads',component:QuestionsanswersuploadComponent},
{path:'discussionsearchpage',component:DiscussonsearhlistviewComponent},
{path:'discussiondetailedview/:discus_id',component:DiscussiondetailedpageComponent},
{path:'createtest',component:TestCreatePageComponent},
{path:'manageTest/:test_id',component:ManagetestComponent},
{path:'manageMeet/:meeting_id',component:ManagemeetComponent},
{path:'testcreate',component:TestCreatePageComponent},
{path:'createmeet',component:MeetCreatePageComponent},
{path:'attendtest',component:TestattendpageComponent},
{path:'testresult/:test_id/:user_id',component:TestresultpageComponent},
{path:'feedbacksearchlist',component:FeedbackssearchlistviewComponent},
{path:'classification',component:ClassifsearchlistviewComponent},
{path:'timeline',component:TimelinesearchlistviewComponent},
{path:'createnotification',component:CreatenotificationComponent},
{path:'lessons',component:LessonsComponent},
{path:'subjects',component:SubjectsComponent},
{path:'classes',component:ClassesComponent},
{path:'course',component:CourseComponent},
{path:'notification',component:NotificationmanageComponent},
{path:'SearchandListTests',component:SearchandListTestsComponent},
{path:'SearchandListMeet',component:SearchandListMeetComponent},
{ path: 'contentview/:content_id', component: ContentviewComponent },
{ path: 'contentupload/:content_id', component: ContntuploadmanageComponent },
{ path: 'mentorrequest', component: MentorrequestComponent },
{ path: 'partnerrequest', component: PartnerrequestComponent },
{ path: 'user-partner-request', component: UserPartnerRequestComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)
  ],
  
exports: [RouterModule],
 /* imports: [
    CommonModule
  ],
  declarations: []*/
  providers: []
})
export class AppRoutingModule {
  
 }

