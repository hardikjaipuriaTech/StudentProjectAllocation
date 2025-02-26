import { Component } from '@angular/core';
import {ApiService} from "../../../services/api-service.service";
import {Router} from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms';

interface Student {
  email: string;
  password: string;
  registrationNumber: string;
}

@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.css']
})
export class ManageStudentsComponent {
  uploadForm: FormGroup;
  uploadData: Student[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.uploadForm = this.formBuilder.group({
      file: ['']
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const contents = e.target.result;
        const lines = contents.split('\n');
        this.uploadData = lines.map((line: { split: (arg0: string) => [any, any, any]; }) => {
          const [email, password, registrationNumber] = line.split(',');
          return { email, password, registrationNumber };
        });
      };
      reader.readAsText(file);
    }
  }

  uploadFile(): void {
    // You can implement the upload logic here, e.g., sending data to the server
  }

  editStudent(student: Student): void {
    // Implement edit logic
  }

  deleteStudent(student: Student): void {
    const index = this.uploadData.indexOf(student);
    if (index > -1) {
      this.uploadData.splice(index, 1);
    }
  }








/*viewAdminStudentList() {
    this.APIService.viewAdminStudentList()
      .subscribe((response: any) => {
          console.log(response);
          this.students = response.data;
        },
        error => {

        })
  }*/

  ngOnInit(): void {
  }

}
