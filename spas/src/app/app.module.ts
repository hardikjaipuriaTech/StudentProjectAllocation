import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HeaderComponent } from './components/shared/header/header.component';
import { LoginComponent } from './components/shared/login/login.component';
import { SignupComponent } from './components/shared/signup/signup.component';
import { ProjectListView } from './components/shared/project-list-view/project-list-view';
import { ViewProjectComponent } from './components/student/view-project/view-project.component';
import { ApiService } from './services/api-service.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MyPreferencesComponent } from './components/student/my-preferences/my-preferences.component';
import { ProjectAllocationComponent } from './components/admin/project-allocation/project-allocation.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ScheduleMeetingComponent } from './components/student/schedule-meeting/schedule-meeting.component';
import { ManageStudentsComponent } from './components/admin/manage-students/manage-students.component';
import { ManageProjectsComponent } from './components/admin/manage-projects/manage-projects.component';
import { ManageSupervisorsComponent } from './components/admin/manage-supervisors/manage-supervisors.component';
import { DeadlineManagementComponent } from './components/admin/deadline-management/deadline-management.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import { EditPreferencesComponent } from './components/student/edit-preferences/edit-preferences.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule} from './material/material.module';
import { ProjectApprovalComponent } from './components/admin/project-approval/project-approval.component';
import { BulkuploadComponent } from './components/admin/bulkupload/bulkupload.component';
import { MeetingSlotsComponent } from './components/supervisor/meeting-slots/meeting-slots.component';
import { ProjectProposalComponent } from './components/shared/project-proposal/project-proposal.component';
import { ViewAllocationComponent } from './components/supervisor/view-allocation/view-allocation.component';
import { ViewAllocationStudentComponent } from './components/student/view-allocation-student/view-allocation-student.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProjectListView,
    HeaderComponent,
    ViewProjectComponent,
    MyPreferencesComponent,
    ProjectAllocationComponent,
    ScheduleMeetingComponent,
    ManageStudentsComponent,
    ManageProjectsComponent,
    ManageSupervisorsComponent,
    DeadlineManagementComponent,
    OrderByPipe,
    EditPreferencesComponent,
    HeaderComponent,
    ProjectApprovalComponent,
    BulkuploadComponent,
    MeetingSlotsComponent,
    ProjectProposalComponent,
    ViewAllocationComponent,
    ViewAllocationStudentComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    NgxPaginationModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],

  providers: [
    ApiService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
