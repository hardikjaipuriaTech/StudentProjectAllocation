import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectApprovalComponent } from './project-approval.component';

describe('ProjectApprovalComponent', () => {
  let component: ProjectApprovalComponent;
  let fixture: ComponentFixture<ProjectApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectApprovalComponent]
    });
    fixture = TestBed.createComponent(ProjectApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
