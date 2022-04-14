import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectInfoComponent } from './protect-info.component';

describe('ProtectInfoComponent', () => {
  let component: ProtectInfoComponent;
  let fixture: ComponentFixture<ProtectInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtectInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
