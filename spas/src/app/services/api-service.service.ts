import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient) {
  }

  private baseURL = "http://localhost:8086/api/v1/";

  getHeaders(): any {
    const token = localStorage.getItem("token");
    let headersA = new Headers();
    headersA.append("Authorization", "Bearer " + token);

    return headersA
  }

  dashboardAPI() {
    return this.http.get(this.baseURL + "auth", {
      headers: this.getHeaders()
    })
  }

  addNewProject(payload: any) {
    return this.http.post(this.baseURL + "supervisor/project/create", payload, {
      headers: this.getHeaders()
    })
  }

  deleteProject(payload: any) {
    const token = localStorage.getItem("token");
    const idToken = "Bearer " + token;
    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: idToken,
        body: payload
      })
    };
    return this.http.delete(this.baseURL + "/admin/project/delete/" + payload, httpOptions)
  }

  getDeadlines() {
    return this.http.get(this.baseURL + "/fetch/deadlines", {
      headers: this.getHeaders()
    });
  }

  createDeadline(deadline: any) {
    return this.http.post(this.baseURL + "admin/create/deadlines", deadline, {
      headers: this.getHeaders()
    });
  }

  updateProject(project: any) {
    return this.http.post(this.baseURL + "admin/project/update", project, {
      headers: this.getHeaders()
    });
  }

  viewProjectList(type: string) {
    return this.http.get(this.baseURL + type + "/project/list", {
      headers: this.getHeaders()
    })
  }

  viewAdminProjectList() {
    return this.http.get(this.baseURL + "/admin/project/list", {
      headers: this.getHeaders()
    })
  }

  viewAdminStudentList() {
    return this.http.get(this.baseURL + "/admin/student/list", {
      headers: this.getHeaders()
    })
  }

  shortListProject(payload: any) {
    return this.http.post(this.baseURL + "student/project/add/preferences", payload, {
      headers: this.getHeaders()
    })
  }

  getAssignedProject() {
    return this.http.get(this.baseURL + "admin/student/list/assign", {
      headers: this.getHeaders()
    })
  }

  autoAssignProjects() {
    return this.http.get(this.baseURL + "admin/student/assign", {
      headers: this.getHeaders()
    })
  }

  viewAssignedProjects() {
    return this.http.get(this.baseURL + "admin/student/list/assign", {
      headers: this.getHeaders()
    })
  }


  getProposals() {
    return this.http.get(this.baseURL + "student/list/projectProposals", {
      headers: this.getHeaders()
    })
  }

  createMeetingSlots(payload: any) {
    return this.http.post(this.baseURL + "supervisor/create/meetingslots", payload, {
      headers: this.getHeaders()
    })
  }
}
