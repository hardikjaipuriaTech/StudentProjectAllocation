import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListView } from './project-list-view';

describe('DashboardComponent', () => {
  let component: ProjectListView;
  let fixture: ComponentFixture<ProjectListView>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectListView]
    });
    fixture = TestBed.createComponent(ProjectListView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
