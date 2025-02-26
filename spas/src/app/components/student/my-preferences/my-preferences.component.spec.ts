import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPreferencesComponent } from './my-preferences.component';

describe('MyPreferencesComponent', () => {
  let component: MyPreferencesComponent;
  let fixture: ComponentFixture<MyPreferencesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyPreferencesComponent]
    });
    fixture = TestBed.createComponent(MyPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
