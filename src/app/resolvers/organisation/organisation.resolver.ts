import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { OrganizationsTableCrudService } from '@services/rest/dynamo-db/organizations-table/organizations-table-crud.service';
import { Organization } from '@models/classes/organisation.model';
import { UsersTableCrudService } from '@services/rest/dynamo-db/users-table/users-table.crud.service';

@Injectable({
  providedIn: 'root'
})
export class OrganisationResolver implements Resolve<Organization> {
  constructor(private _organisationsTableCrud: OrganizationsTableCrudService, private _usersTableCrud: UsersTableCrudService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Organization> {
    return this._organisationsTableCrud.getOrganisation();
  }
}
