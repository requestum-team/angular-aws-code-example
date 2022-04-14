import { AfterViewInit, ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { User } from '@models/classes/user.model';
import { IDropdownItem } from '@models/interfaces/dropdown-item.interface';
import { Router } from '@angular/router';
import { UsersTableCrudService } from '@services/rest/dynamo-db/users-table/users-table.crud.service';
import { UserRole } from '@models/enums/user-role.enum';

interface IProfileMenuItem {
  title: string;
  icon: string;
  link?: string;
  action?: (...params: any[]) => any;
}

@Component({
  selector: 'profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss']
})
export class ProfileMenuComponent implements AfterViewInit {
  @ViewChild('dropdownMenuItemTemplate') dropdownMenuItemTemplate: TemplateRef<any>;
  translationKey: string = 'PROFILE_MENU.';
  items: IDropdownItem<IProfileMenuItem>[] = [];

  constructor(private _usersTableCrud: UsersTableCrudService, private _router: Router, private _cdr: ChangeDetectorRef) {}

  get name(): string {
    return this.me.fullName;
  }

  get me(): User {
    return this._usersTableCrud?.me;
  }

  get key(): string {
    return this.me?.avatar;
  }

  ngAfterViewInit(): void {
    this.initMenuItems();
    this._cdr.detectChanges();
  }

  toProfileMenuItemType(item: IProfileMenuItem): IProfileMenuItem {
    return item as IProfileMenuItem;
  }

  protected initMenuItems(): void {
    this.items = [
      {
        content: {
          title: `${this.translationKey}PROFILE`,
          icon: 'profile',
          link: '/profile'
        },
        template: this.dropdownMenuItemTemplate
      }
    ];

    switch (this._usersTableCrud.myRole) {
      case UserRole.user:
        this.items.push({
          content: {
            title: `${this.translationKey}ORGANIZATION`,
            icon: 'logout',
            link: '/organization/my/view'
          },
          template: this.dropdownMenuItemTemplate
        });
        break;
      case UserRole.organizationAdmin:
        this.items.push({
          content: {
            title: `${this.translationKey}ORGANIZATION`,
            icon: 'logout',
            link: '/organization/my/edit'
          },
          template: this.dropdownMenuItemTemplate
        });
        break;
    }
  }
}
