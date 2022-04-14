import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordAvailabilityComponent } from './record-availability.component';

describe('RecordAvailabilityComponent', () => {
  let component: RecordAvailabilityComponent;
  let fixture: ComponentFixture<RecordAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordAvailabilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
