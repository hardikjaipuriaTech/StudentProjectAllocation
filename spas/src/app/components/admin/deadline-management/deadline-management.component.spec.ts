import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeadlineManagementComponent } from './deadline-management.component';

describe('DeadlineManagementComponent', () => {
  let component: DeadlineManagementComponent;
  let fixture: ComponentFixture<DeadlineManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeadlineManagementComponent]
    });
    fixture = TestBed.createComponent(DeadlineManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
