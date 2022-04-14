import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainInfoFormComponent } from './main-info-form.component';

describe('MainInfoFormComponent', () => {
  let component: MainInfoFormComponent;
  let fixture: ComponentFixture<MainInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainInfoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
