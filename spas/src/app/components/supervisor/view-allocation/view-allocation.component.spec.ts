import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllocationComponent } from './view-allocation.component';

describe('ViewAllocationComponent', () => {
  let component: ViewAllocationComponent;
  let fixture: ComponentFixture<ViewAllocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAllocationComponent]
    });
    fixture = TestBed.createComponent(ViewAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
