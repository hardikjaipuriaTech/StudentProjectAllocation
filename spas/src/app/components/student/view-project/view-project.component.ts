import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {
  constructor(
    private APIService: ApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  projectData: any = []
  URLProjectID: any = null
  projectList: any = []

  getdashboardAPI() {
    this.APIService.dashboardAPI()
      .subscribe((response: any) => {
        console.log(response);
        this.projectData = response?.data?.projectAssign;
      })
  }

  viewProjectList() {
    const localData = JSON.parse(localStorage.getItem("data") || "")
    this.APIService.viewProjectList(localData?.userType)
      .subscribe((response: any) => {
        console.log(response);
        this.projectList = response.data;
        const result = this.projectList.filter((i:any) => i._id === this.URLProjectID)
        if(result.length) this.projectData = result[0]
        console.log(this.projectData);

      },
        error => {

        })
  }

  ngOnInit(): void {
    this.getdashboardAPI()

    this.URLProjectID = this.activatedRoute.snapshot.paramMap.get('projectId');
    console.log(this.URLProjectID);
    if(this.URLProjectID){
      this.viewProjectList();
    }
  }
}
