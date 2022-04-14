import { TestBed } from '@angular/core/testing';

import { SidenavHelperService } from './sidenav-helper.service';

describe('SidenavHelperService', () => {
  let service: SidenavHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidenavHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
