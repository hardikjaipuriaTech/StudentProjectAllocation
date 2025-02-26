import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/shared/login/login.component';
import { SignupComponent } from './components/shared/signup/signup.component';
import { ProjectListView } from './components/shared/project-list-view/project-list-view';
import { ViewProjectComponent } from './components/student/view-project/view-project.component';
import { MyPreferencesComponent } from './components/student/my-preferences/my-preferences.component';
import { ProjectAllocationComponent } from './components/admin/project-allocation/project-allocation.component';
import { ScheduleMeetingComponent } from "./components/student/schedule-meeting/schedule-meeting.component";
import { ManageStudentsComponent } from "./components/admin/manage-students/manage-students.component";
import { ManageSupervisorsComponent } from "./components/admin/manage-supervisors/manage-supervisors.component";
import { ManageProjectsComponent } from "./components/admin/manage-projects/manage-projects.component";
import {MeetingSlotsComponent} from "./components/supervisor/meeting-slots/meeting-slots.component";
import {ProjectProposalComponent} from "./components/shared/project-proposal/project-proposal.component";
import {ViewAllocationComponent} from "./components/supervisor/view-allocation/view-allocation.component";
import {
  ViewAllocationStudentComponent
} from "./components/student/view-allocation-student/view-allocation-student.component";
import {ProjectApprovalComponent} from "./components/admin/project-approval/project-approval.component";

const routes: Routes = [
  {path: "", component: LoginComponent },
  {path: "signup", component: SignupComponent },
  {path: "project-list-view", component: ProjectListView },
  {path: "view-project", component: ViewProjectComponent },
  {path: "view-project/:projectId", component: ViewProjectComponent },
  {path: "my-preferences", component: MyPreferencesComponent },
  {path: "manage-students", component: ManageStudentsComponent },
  {path: "manage-supervisors", component: ManageSupervisorsComponent },
  {path: "manage-projects", component: ManageProjectsComponent },
  {path: "schedule-meeting-slots", component: ScheduleMeetingComponent },
  {path: "meeting-slots", component: MeetingSlotsComponent },
  {path: "project-proposal", component: ProjectProposalComponent },
  {path: "project-approval", component: ProjectApprovalComponent },
  {path: "view-allocation", component: ViewAllocationComponent },
  {path: "view-allocation-student", component: ViewAllocationStudentComponent },
  {path: "project-allocation", component: ProjectAllocationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
