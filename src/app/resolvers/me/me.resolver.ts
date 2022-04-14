import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersTableCrudService } from '@services/rest/dynamo-db/users-table/users-table.crud.service';
import { User } from '@models/classes/user.model';

@Injectable({
  providedIn: 'root'
})
export class MeResolver implements Resolve<Observable<User>> {
  constructor(private _usersTableCrudService: UsersTableCrudService) {}

  resolve(): Observable<User> {
    return this._usersTableCrudService.getMe();
  }
}
