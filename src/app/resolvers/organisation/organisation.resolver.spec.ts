import { TestBed } from '@angular/core/testing';

import { OrganisationResolver } from './organisation.resolver';

describe('OrganisationResolver', () => {
  let resolver: OrganisationResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(OrganisationResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
