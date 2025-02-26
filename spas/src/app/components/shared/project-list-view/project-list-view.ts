import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormsModule} from '@angular/forms';
import {ApiService} from 'src/app/services/api-service.service';
import {MatPaginator} from "@angular/material/paginator";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-project-list-view',
  templateUrl: './project-list-view.html',
  styleUrls: ['./project-list-view.css']
})
export class ProjectListView implements OnInit {
  constructor(
    private APIService: ApiService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private formsModule : FormsModule
  ) {
  }

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  userType = localStorage.getItem("isUserStudent") === "true" ? "student" : "supervisor";
  projectList: any = []
  assignedProject: any = {}
  projectStatus: string = ""
  searchQuery: string = '';
  sortOrder: string = 'title';

  // Pagination
  @ViewChild('paginator', {static: true}) paginator!: MatPaginator;
  pageSize = 5; // Number of items per page
  currentPage = 0; // Current page index


  changeSortOrder(field: string) {
    this.sortOrder = field;
    console.log("sortOrder is" + this.sortOrder)
  }

  get filteredProjects() {
    if (this.searchQuery) {
      return this.projectList.filter((project: { title: string; }) =>
        project.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      return this.projectList;
    }
  }

  viewProjectList() {
    this.APIService.viewProjectList('student')
      .subscribe((response: any) => {
          console.log(response);
          this.projectList = response.data;

          this.getdashboardAPI()
        },
        error => {

        })
  }

  viewAdminProjectList() {
    this.APIService.viewAdminProjectList()
      .subscribe((response: any) => {
          console.log(response);
          this.projectList = response.data;

          this.getdashboardAPI()
        },
        error => {

        })
  }

  shortlistProject(projectId: string) {
    this.APIService.shortListProject({projectId})
      .subscribe((response: any) => {
        console.log(response);
        this.getdashboardAPI()
      })
  }

  getdashboardAPI() {
    this.APIService.dashboardAPI()
      .subscribe((response: any) => {
        console.log(response);
        this.projectStatus = response?.data?.projectStatus || "";
        this.assignedProject = response?.data?.projectAssign;
        this.projectList = this.projectList.map((item: any) => {
          const result = response.data.studentProjectPreference.filter((i: any) => i._id === item._id)

          if (result.length) {
            item.isSelected = true
          } else item.isSelected = false;
          return item
        })
        console.log(this.projectList);
        this.dataSource = new MatTableDataSource<any>(this.projectList);
        console.log(this.dataSource);
        this.dataSource.paginator = this.paginator;

      })

  }

  updatePagination() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.dataSource.data = this.projectList.slice(startIndex, endIndex);
    console.log(startIndex, endIndex, this.dataSource.data)
  }

  // Function to handle page change
  onPageChange(event: any) {
    //this.currentPage = event.pageIndex;
    console.log("currentPage" + this.currentPage)
    this.updatePagination();
  }

  ngOnInit(): void {
    this.getdashboardAPI();
    this.viewProjectList();
    this.updatePagination();
  }
}
