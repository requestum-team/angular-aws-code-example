import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareWithModalComponent } from './share-with-modal.component';

describe('ShareWithModalComponent', () => {
  let component: ShareWithModalComponent;
  let fixture: ComponentFixture<ShareWithModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareWithModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareWithModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
