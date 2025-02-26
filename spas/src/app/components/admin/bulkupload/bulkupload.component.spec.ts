import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkuploadComponent } from './bulkupload.component';

describe('BulkuploadComponent', () => {
  let component: BulkuploadComponent;
  let fixture: ComponentFixture<BulkuploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BulkuploadComponent]
    });
    fixture = TestBed.createComponent(BulkuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
