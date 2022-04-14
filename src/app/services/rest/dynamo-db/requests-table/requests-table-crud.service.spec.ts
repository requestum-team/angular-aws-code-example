import { TestBed } from '@angular/core/testing';

import { RequestsTableCrudService } from './requests-table-crud.service';

describe('RequestsTableCrudService', () => {
  let service: RequestsTableCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestsTableCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
