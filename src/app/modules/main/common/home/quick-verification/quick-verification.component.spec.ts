import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickVerificationComponent } from './quick-verification.component';

describe('QuickVerificationComponent', () => {
  let component: QuickVerificationComponent;
  let fixture: ComponentFixture<QuickVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
