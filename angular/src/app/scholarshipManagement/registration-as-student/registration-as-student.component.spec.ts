import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegistrationAsStudentComponent } from './registration-as-student.component';

describe('RegistrationAsStudentComponent', () => {
  let component: RegistrationAsStudentComponent;
  let fixture: ComponentFixture<RegistrationAsStudentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationAsStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationAsStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
