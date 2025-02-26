import { Component } from '@angular/core';
import {StudentService} from 'src/app/services/student.service';
import {ApiService} from "../../../services/api-service.service";

@Component({
  selector: 'app-schedule-meeting',
  templateUrl: './schedule-meeting.component.html',
  styleUrls: ['./schedule-meeting.component.css']
})
export class ScheduleMeetingComponent {
  availableSlots: any[] = [];
  selectedSlot: any;
  projectAllocated: any = {}

  constructor(
    private APIService: ApiService,
    private StudentService: StudentService
  ) {
  }

  onSlotSelected(slot: any) {
    this.selectedSlot = slot;
  }

  scheduleAppointment() {
    if (this.selectedSlot) {
      console.log(this.selectedSlot?._id)
      this.StudentService.updateSlotStatus(this.selectedSlot)
        .subscribe((response: any) => {
          this.availableSlots = response?.data;
          console.log(response);
        })
      console.log('Appointment scheduled:', this.selectedSlot);
    }
  }

  ngOnInit(): void {
    this.loadMeetingSlots()
  }

  private loadMeetingSlots() {
    this.APIService.dashboardAPI()
      .subscribe((response: any) => {
        console.log(response);
        this.projectAllocated = response?.data?.projectAssign;
        console.log(this.projectAllocated.supervisor)
        if(this.projectAllocated != null && this.projectAllocated.supervisor!= null) {
          this.StudentService.loadMeetingSlots(this.projectAllocated.supervisor)
            .subscribe((response: any) => {
              this.availableSlots = response?.data;
              console.log(response);
            })
        }
      })

  }
}
