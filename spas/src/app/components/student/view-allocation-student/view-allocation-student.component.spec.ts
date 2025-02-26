import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllocationStudentComponent } from './view-allocation-student.component';

describe('ViewAllocationStudentComponent', () => {
  let component: ViewAllocationStudentComponent;
  let fixture: ComponentFixture<ViewAllocationStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAllocationStudentComponent]
    });
    fixture = TestBed.createComponent(ViewAllocationStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
