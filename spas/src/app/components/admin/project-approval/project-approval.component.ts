import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {AdminService} from "../../../services/admin.service";

@Component({
  selector: 'app-project-approval',
  templateUrl: './project-approval.component.html',
  styleUrls: ['./project-approval.component.css']
})
export class ProjectApprovalComponent implements OnInit {
  displayedColumns: string[] = ['title', 'description', 'justification','status', 'action'];
  projects: any[] = [];
  supervisors: any[] = [];
 // supervisors = ['Supervisor 1', 'Supervisor 2', 'Supervisor 3'];

  constructor(private AdminService: AdminService) {
  }

  ngOnInit(): void {
    this.viewAdminProposedProjectList()
    this.fetchSupervisorList()
  }

  viewAdminProposedProjectList() {
    this.AdminService.viewAdminProposedProjectList()
      .subscribe((response: any) => {
          console.log(response);
          this.projects = response.data;
        },
        error => {

        })
  }

  fetchSupervisorList() {
    this.AdminService.viewAdminSupervisorList()
      .subscribe((response: any) => {
          console.log(response);
          this.supervisors = response.data;
        },
        error => {

        })
  }

  approveProject(project: any): void {
    if(project.supervisor) {
      this.AdminService.adminProjectStatusApprove(project)
        .subscribe((response: any) => {
            console.log(response);
            project.status = 'approved';
          },
          error => {

          })
    }
  }

  rejectProject(project: any): void {
    this.AdminService.adminProjectStatusReject(project)
      .subscribe((response: any) => {
          console.log(response);
          project.status = 'rejected';
        },
        error => {

        })

  }
}
