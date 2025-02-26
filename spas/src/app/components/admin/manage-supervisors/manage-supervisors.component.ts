import { Component } from '@angular/core';
import {AdminService} from "../../../services/admin.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-manage-supervisors',
  templateUrl: './manage-supervisors.component.html',
  styleUrls: ['./manage-supervisors.component.css']
})
export class ManageSupervisorsComponent {

  constructor(
    private AdminService: AdminService,
    private router: Router
  ) { }
  supervisors: any[] = []; // Array to store supervisors
  supervisor: any = {}; // Current supervisor being edited or added
  modalType: 'add' | 'edit' = 'add'; // Modal type (add or edit)
  isModalActive: boolean = false; // To control modal visibility
  isAdmin: boolean = true; // Indicate if the user is an administrator

  openSupervisorModal(type: 'add' | 'edit', supervisor?: any): void {
    this.modalType = type;
    this.supervisor = supervisor ? { ...supervisor } : {}; // Copy the supervisor object if editing
    this.isModalActive = true;
  }

  closeSupervisorModal(): void {
    this.isModalActive = false;
    this.supervisor = {}; // Clear supervisor data
  }

  saveSupervisor(): void {
    this.AdminService.saveSupervisor(this.supervisor)
      .subscribe((response: any) => {
          console.log(response);
          this.supervisors = response.data;
        },
        error => {

        })
    this.closeSupervisorModal();
  }
  viewAdminSupervisorList() {
    this.AdminService.viewAdminSupervisorList()
      .subscribe((response: any) => {
          console.log(response);
          this.supervisors = response.data;
        },
        error => {

        })
  }

  ngOnInit(): void {
    this.viewAdminSupervisorList()
  }


}
