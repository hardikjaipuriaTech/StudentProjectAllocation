import { Component } from '@angular/core';
import {ApiService} from 'src/app/services/api-service.service';
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-view-allocation',
  templateUrl: './view-allocation.component.html',
  styleUrls: ['./view-allocation.component.css']
})
export class ViewAllocationComponent {

  constructor(
    private APIService: ApiService
  ) {
  }
  studentAssignedProjectList: any = []


  viewAssignedProjects() {
    this.APIService.viewAssignedProjects()
      .subscribe((response: any) => {
        console.log(response);
        this.studentAssignedProjectList = response?.data || []
      })
  }

  ngOnInit(): void {
    this.viewAssignedProjects()
  }

}
