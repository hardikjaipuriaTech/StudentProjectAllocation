import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {
  }

  private baseURL = "http://localhost:8086/api/v1/";

  getHeaders(): any {
    const token = localStorage.getItem("token");
    let headersA = new Headers();
    headersA.append("Authorization", "Bearer " + token);
    return headersA
  }

  submitProjectPreferences(preferences: any) {
    return this.http.post(this.baseURL + "student/project/list/submit", preferences, {
      headers: this.getHeaders()
    })
  }

  updateSlotStatus(slot: any) {
    return this.http.post(this.baseURL + "student/schedule/appointment", slot, {
      headers: this.getHeaders()
    })
  }
  loadMeetingSlots(payload: any) {
    return this.http.get(this.baseURL + "student/fetch/meetingslots/" + payload, {
      headers: this.getHeaders()
    })
  }
}
