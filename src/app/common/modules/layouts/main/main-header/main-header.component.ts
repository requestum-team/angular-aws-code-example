import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '@models/classes/user.model';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { DestroyableAbstractComponent } from '@misc/abstracts/destroyable-abstract.component';
import { UsersTableCrudService } from '@services/rest/dynamo-db/users-table/users-table.crud.service';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent extends DestroyableAbstractComponent {
  @Output() toggleSidenav = new EventEmitter();

  constructor(private _router: Router, private _translate: TranslateService, private _usersTableCrud: UsersTableCrudService) {
    super();
  }

  get me(): User {
    return this._usersTableCrud.me;
  }

  get userName(): string {
    return `${this._translate.instant('MESSAGE.HELLO')} <b>${this.me?.fullName}</b>!`;
  }

  toggleNav() {
    this.toggleSidenav.emit();
  }
}
