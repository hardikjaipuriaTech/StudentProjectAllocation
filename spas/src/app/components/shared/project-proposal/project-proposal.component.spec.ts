import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectProposalComponent } from './project-proposal.component';

describe('ProjectProposalComponent', () => {
  let component: ProjectProposalComponent;
  let fixture: ComponentFixture<ProjectProposalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectProposalComponent]
    });
    fixture = TestBed.createComponent(ProjectProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
