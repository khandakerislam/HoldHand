import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegisterAsDonorComponent } from './register-as-donor.component';

describe('RegisterAsDonorComponent', () => {
  let component: RegisterAsDonorComponent;
  let fixture: ComponentFixture<RegisterAsDonorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterAsDonorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAsDonorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
