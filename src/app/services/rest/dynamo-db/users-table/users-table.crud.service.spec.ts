import { TestBed } from '@angular/core/testing';

import { UsersTableCrudService } from './users-table.crud.service';

describe('UsersTableCrudService', () => {
  let service: UsersTableCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersTableCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
