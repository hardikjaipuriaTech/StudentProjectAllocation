import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  private baseURL = "http://localhost:8086/api/v1/";

  getHeaders(): any {
    const token = localStorage.getItem("token");
    let headersA = new Headers();
    headersA.append("Authorization", "Bearer " + token);

    return headersA
  }

  viewAdminSupervisorList() {
    return this.http.get(this.baseURL + "/admin/supervisor/list", {
      headers: this.getHeaders()
    })
  }

  saveSupervisor(payload: any) {
    return this.http.post(this.baseURL + "admin/supervisor/save", payload, {
      headers: this.getHeaders()
    })
  }

  viewAdminProposedProjectList() {
    return this.http.get(this.baseURL + "/admin/proposed/list", {
      headers: this.getHeaders()
    })
  }

  adminProjectStatusApprove(payload: any) {
    return this.http.patch(this.baseURL + "/admin/proposed/approve", payload, {
      headers: this.getHeaders()
    })
  }
  adminProjectStatusReject(payload: any) {
    return this.http.patch(this.baseURL + "/admin/proposed/reject", payload, {
      headers: this.getHeaders()
    })
  }
}
