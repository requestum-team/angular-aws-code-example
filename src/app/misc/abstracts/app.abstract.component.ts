import { Component } from '@angular/core';
import { IconsService } from '@services/icons/icons.service';
import { UsersTableCrudService } from '@services/rest/dynamo-db/users-table/users-table.crud.service';

@Component({
  template: ''
})
export abstract class AppAbstractComponent {
  constructor(private _icons: IconsService, private _usersTableCRUD: UsersTableCrudService) {}
}
