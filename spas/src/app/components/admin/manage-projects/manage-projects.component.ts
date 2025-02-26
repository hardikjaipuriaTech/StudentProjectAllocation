import {Component} from '@angular/core';
import {ApiService} from "../../../services/api-service.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup} from '@angular/forms';

interface Project {
  title: string;
  description: string;
}

@Component({
  selector: 'app-manage-projects',
  templateUrl: './manage-projects.component.html',
  styleUrls: ['./manage-projects.component.css']
})
export class ManageProjectsComponent {
  projects: any[] = []; // Array to store projects
  project: any = {}; // Current project being edited or added
  modalType: 'add' | 'edit' = 'add'; // Modal type (add or edit)
  isModalActive: boolean = false; // To control modal visibility
  uploadForm: FormGroup;
  uploadData: Project[] = [];

  constructor(private formBuilder: FormBuilder,
              private APIService: ApiService,
              private router: Router,
              private modalService: NgbModal
  ) {
    this.uploadForm = this.formBuilder.group({
      file: ['']
    });
  }
  confirmDelete() {

  }

  openProjectModal(type: 'add' | 'edit', project?: any): void {
    this.modalType = type;
    this.project = project ? {...project} : {}; // Copy the project object if editing
    this.isModalActive = true;
  }

  closeProjectModal(): void {
    this.isModalActive = false;
    this.project = {}; // Clear project data
  }

  saveProject(): void {
    this.closeProjectModal();
  }

  deleteProject(project: any): void {
    console.log("Project name to be delete is: " + project.title)
    this.APIService.deleteProject(project._id).subscribe((response: any) => {
        console.log(response);
        this.projects = response.data;
      },
      error => {

      })
     this.viewAdminProjectList()
    //this.projects = this.projects.filter(p => p !== project);
  }

  viewAdminProjectList() {
    this.APIService.viewAdminProjectList()
      .subscribe((response: any) => {
          console.log(response);
          this.projects = response.data;
        },
        error => {

        })
  }

  ngOnInit(): void {
    this.viewAdminProjectList()
  }

}
