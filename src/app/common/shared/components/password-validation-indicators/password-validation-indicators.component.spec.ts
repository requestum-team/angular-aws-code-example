import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordValidationIndicatorsComponent } from './password-validation-indicators.component';

describe('PasswordValidationIndicatorsComponent', () => {
  let component: PasswordValidationIndicatorsComponent;
  let fixture: ComponentFixture<PasswordValidationIndicatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordValidationIndicatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordValidationIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
