import {Component, NgIterable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApiService} from "../../../services/api-service.service";

interface Deadline {
  type: string;
  date: string; // Update this to the correct date type if needed
}
@Component({
  selector: 'app-deadline-management',
  templateUrl: './deadline-management.component.html',
  styleUrls: ['./deadline-management.component.css']
})



export class DeadlineManagementComponent {

  deadlineForm: FormGroup;
  deadlines: Deadline[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    this.deadlineForm = this.formBuilder.group({
      dateType: 'project_proposal',
      deadlineDate: ''
    });
  }

  ngOnInit(): void {
    this.fetchDeadlines();
  }

  fetchDeadlines() {
    this.apiService.getDeadlines().subscribe(
      (data: any) => {
        this.deadlines = data;
      },
      error => {
        console.error('Error fetching deadlines:', error);
        // Handle error appropriately (e.g., show an error message)
      }
    );
  }

  submitDeadline() {
    console.log(this.deadlineForm.valid)
    if (this.deadlineForm.valid) {
      console.log(this.deadlineForm.value)
      this.apiService.createDeadline(this.deadlineForm.value).subscribe(() => {
        this.fetchDeadlines(); // Refresh the list after creating a deadline
        this.deadlineForm.reset();
      },
        error => {
          console.error('Error creating deadline:', error);
          // Handle error appropriately (e.g., show an error message)
        });
    }
  }

}
