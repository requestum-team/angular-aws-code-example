import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharingTypeComponent } from './sharing-type.component';

describe('SharingTypeComponent', () => {
  let component: SharingTypeComponent;
  let fixture: ComponentFixture<SharingTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharingTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
