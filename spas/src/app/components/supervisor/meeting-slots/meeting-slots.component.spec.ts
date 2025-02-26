import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingSlotsComponent } from './meeting-slots.component';

describe('MeetingSlotsComponent', () => {
  let component: MeetingSlotsComponent;
  let fixture: ComponentFixture<MeetingSlotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeetingSlotsComponent]
    });
    fixture = TestBed.createComponent(MeetingSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
