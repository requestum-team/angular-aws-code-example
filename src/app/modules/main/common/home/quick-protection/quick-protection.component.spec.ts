import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickProtectionComponent } from './quick-protection.component';

describe('QuickProtectionComponent', () => {
  let component: QuickProtectionComponent;
  let fixture: ComponentFixture<QuickProtectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickProtectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickProtectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
