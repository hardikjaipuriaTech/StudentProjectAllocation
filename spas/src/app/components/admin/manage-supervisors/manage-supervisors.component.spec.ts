import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSupervisorsComponent } from './manage-supervisors.component';

describe('ManageSupervisorsComponent', () => {
  let component: ManageSupervisorsComponent;
  let fixture: ComponentFixture<ManageSupervisorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageSupervisorsComponent]
    });
    fixture = TestBed.createComponent(ManageSupervisorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
