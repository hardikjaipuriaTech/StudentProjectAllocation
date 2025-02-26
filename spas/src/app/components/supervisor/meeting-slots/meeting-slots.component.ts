import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ApiService} from 'src/app/services/api-service.service';
import {StudentService} from 'src/app/services/student.service';

@Component({
  selector: 'app-meeting-slots',
  templateUrl: './meeting-slots.component.html',
  styleUrls: ['./meeting-slots.component.css']
})
export class MeetingSlotsComponent implements OnInit {
  meetingSlotsForm: FormGroup;
  submitted = false;
  availableSlots: string[] = [];

  constructor(private formBuilder: FormBuilder, private APIService: ApiService, private StudentService: StudentService) {
    this.meetingSlotsForm = this.formBuilder.group({
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  get formControls() {
    return this.meetingSlotsForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.meetingSlotsForm.invalid) {
      return;
    }

    const selectedSlot =
      this.meetingSlotsForm.value.date +
      ' ' +
      this.meetingSlotsForm.value.startTime +
      ' - ' +
      this.meetingSlotsForm.value.endTime;

    console.log(selectedSlot)

    this.APIService.createMeetingSlots(this.meetingSlotsForm.value)
      .subscribe((response: any) => {
        console.log(response);
      })

    /*this.StudentService.loadMeetingSlots()
      .subscribe((response: any) => {
        console.log(response);
      })*/

    this.availableSlots.push(selectedSlot);

    this.meetingSlotsForm.reset();
    this.submitted = false;
  }
}
