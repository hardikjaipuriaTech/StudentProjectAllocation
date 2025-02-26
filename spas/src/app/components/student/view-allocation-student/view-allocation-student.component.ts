import { Component } from '@angular/core';
import {ApiService} from "../../../services/api-service.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-view-allocation-student',
  templateUrl: './view-allocation-student.component.html',
  styleUrls: ['./view-allocation-student.component.css']
})
export class ViewAllocationStudentComponent {

  constructor(
    private APIService: ApiService
  ) {
  }

  assignedProject: any = {}
  userData = JSON.parse(localStorage.getItem("data") || '');

  getdashboardAPI() {
    this.APIService.dashboardAPI()
      .subscribe((response: any) => {
        console.log(response);
        this.assignedProject = response?.data?.projectAssign;
      })

  }

  ngOnInit(): void {
    this.getdashboardAPI()
  }



}
