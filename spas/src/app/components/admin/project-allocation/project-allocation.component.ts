import {Component, OnInit} from '@angular/core';
import {ApiService} from 'src/app/services/api-service.service';
import {AdminService} from 'src/app/services/admin.service';

@Component({
  selector: 'app-project-allocation',
  templateUrl: './project-allocation.component.html',
  styleUrls: ['./project-allocation.component.css']
})
export class ProjectAllocationComponent implements OnInit {

  allocationStatus: string = 'idle';
  projectAllocations: any[] = [];
  displayedColumns: string[] = ['studentName', 'projectTitle', 'supervisor', 'allocatedDate'];
  constructor(
    private APIService: ApiService,
    private AdminService: AdminService
  ) {
  }

  alertMessage = ""

  autoAssignProjects() {
    this.allocationStatus = 'running';
    this.APIService.autoAssignProjects()
      .subscribe((response: any) => {
        console.log(response);
        if (response?.status) {
          this.allocationStatus = 'complete';
          this.alertMessage = "Project Allocation successfully completed."
        }
      },error => {
        console.error(error);
        this.allocationStatus = 'idle';
      })
  }

  ngOnInit(): void {
    this.APIService.viewAssignedProjects()
      .subscribe((response: any) => {
        console.log(response);
        if (response?.status) {
         this.projectAllocations = response.data;
        }
      },error => {
        console.error(error);
        this.allocationStatus = 'idle';
      })
  }
}
