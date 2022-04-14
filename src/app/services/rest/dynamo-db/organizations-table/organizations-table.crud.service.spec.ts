import { TestBed } from '@angular/core/testing';

import { OrganizationsTableCrudService } from './organizations-table-crud.service';

describe('OrganizationsTableCrudService', () => {
  let service: OrganizationsTableCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizationsTableCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
