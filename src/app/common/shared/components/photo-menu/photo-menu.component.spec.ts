import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoMenuComponent } from './photo-menu.component';

describe('PhotoMenuComponent', () => {
  let component: PhotoMenuComponent;
  let fixture: ComponentFixture<PhotoMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
