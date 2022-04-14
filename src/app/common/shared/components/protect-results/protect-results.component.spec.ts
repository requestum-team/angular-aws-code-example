import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectResultsComponent } from './protect-results.component';

describe('ProtectResultsComponent', () => {
  let component: ProtectResultsComponent;
  let fixture: ComponentFixture<ProtectResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtectResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
