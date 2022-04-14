import { Injectable } from '@angular/core';
import { ClassConstructor } from 'class-transformer';
import { Organization } from '@models/classes/organisation.model';
import { IServicesConfig } from '@services/http/http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { organisations, organisation } from '@misc/mock-data/api/organisations';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsTableCrudService {
  protected MODEL: ClassConstructor<Organization> = Organization;

  getOrganisations(): Observable<Organization[]> {
    return of(organisations);
  }

  getOrganisation(): Observable<Organization> {
    return of(organisation);
  }
}
