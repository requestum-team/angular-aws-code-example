import { AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BaseFormAbstractComponent } from '@app/misc/abstracts/base-form.abstract.component';
import { User } from '@app/models/classes/user.model';
import { ToolbarHelperService } from '@app/services/toolbar-helper/toolbar-helper.service';
import { TranslateService } from '@ngx-translate/core';
import { OrganizationsTableCrudService } from '@app/services/rest/dynamo-db/organizations-table/organizations-table-crud.service';
import { Organization } from '@models/classes/organisation.model';
import { UsersTableCrudService } from '@services/rest/dynamo-db/users-table/users-table.crud.service';
import { RequestsTableCrudService } from '@services/rest/dynamo-db/requests-table/requests-table-crud.service';
import { ColumnPlacement } from '@app/models/enums/column-placement.enum';
import { IDropdownItem } from '@app/models/interfaces/dropdown-item.interface';
import { MainInfoFormComponent } from './main-info-form/main-info-form.component';
import { Request } from '@models/classes/request.model';
import { mergeMap, Observable, of, zip } from 'rxjs';
import { ModalService } from '@shared/modal/modal.service';
import { Router } from '@angular/router';
import { IItemsListColumns } from '@shared/components/items-list/items-list.component';

interface IPendingMenuItem {
  title: string;
  link?: string;
  action?: (...params: any[]) => any;
}

@Component({
  selector: 'organisation-edit',
  templateUrl: './organisation-edit.component.html',
  styleUrls: ['./organisation-edit.component.scss']
})
export class OrganisationEditComponent extends BaseFormAbstractComponent implements OnInit, AfterViewInit {
  dropdownItems: WeakMap<Request, IDropdownItem<IPendingMenuItem>[]> = new WeakMap<Request, IDropdownItem<IPendingMenuItem>[]>();
  @ViewChild('toolbarTemplate') toolbarTemplate: TemplateRef<any>;
  @ViewChild('searchTemplate') searchTemplate: TemplateRef<any>;
  @ViewChild('avatarTemplate') avatarTemplate: TemplateRef<any>;
  @ViewChild('logoTemplate') logoTemplate: TemplateRef<any>;
  @ViewChild('imgTemplate') imgTemplate: TemplateRef<any>;
  @ViewChild('statusTemplate') statusTemplate: TemplateRef<any>;
  @ViewChild('deleteTemplate') deleteTemplate: TemplateRef<any>;
  @ViewChild('deletePartnerTemplate') deletePartnerTemplate: TemplateRef<any>;
  @ViewChild('dropdownPendingItemTemplate') dropdownPendingItemTemplate: TemplateRef<any>;
  @ViewChild('editForm') editForm: MainInfoFormComponent;
  partnerOrganisations: Organization[] = [];
  organizations: Organization[] = [];
  partnersColumns: IItemsListColumns;
  usersColumns: IItemsListColumns;
  requests: Request[] = [];
  users: User[] = [];

  constructor(
    protected translate: TranslateService,
    private _modal: ModalService,
    private _router: Router,
    private _toolbarHelper: ToolbarHelperService,
    private _fb: FormBuilder,
    private _organizationsTableCrud: OrganizationsTableCrudService,
    private _requestsTableCrud: RequestsTableCrudService,
    private _usersTableCrud: UsersTableCrudService,
    private _cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this._getListData();
  }

  private _getListData(): void {
    this._requestsTableCrud.scanByMember().subscribe((requests: any): void => {
      this.requests = requests;
      this._initMenuItems();
    });
    this._getOrganizations();
  }

  get me(): User {
    return this._usersTableCrud.me;
  }

  get myOrganisation(): Organization {
    return this.me?.organisation as Organization;
  }

  ngAfterViewInit(): void {
    this.usersColumns = {
      searchTemplate: this.searchTemplate,
      columns: [
        { columnName: 'member.avatar', title: '', columnTemplate: this.avatarTemplate, columnPlacement: ColumnPlacement.start },
        { columnName: 'member.fullName', title: 'User name', isCropped: true },
        { columnName: 'member.id', title: 'User ID' },
        { columnName: 'member.email', title: 'User Email', isCropped: true },
        { columnName: 'status', title: 'Status', columnTemplate: this.statusTemplate },
        { columnName: 'delete', title: '', columnTemplate: this.deleteTemplate, columnPlacement: ColumnPlacement.end }
      ]
    };

    this.partnersColumns = {
      columns: [
        { columnName: 'logo', title: '', columnTemplate: this.logoTemplate, columnPlacement: ColumnPlacement.start },
        { columnName: 'name', title: 'Organization', isCropped: true },
        { columnName: 'id', title: 'Organization ID' },
        { columnName: 'primaryContact.email', title: 'Organization Email', isCropped: true },
        { columnName: 'delete', title: '', columnTemplate: this.deletePartnerTemplate, columnPlacement: ColumnPlacement.end }
      ]
    };
    this._toolbarHelper.data = {
      template: this.toolbarTemplate,
      pageName: this.translate.instant(`PAGE_NAME.ORGANIZATION`)
    };

    this._cdr.detectChanges();
  }

  onOrganizationClick(org: Organization): void {
    this._router.navigate(['', 'organization', org.id]);
  }

  submitForm(): void {
    this.editForm.onSubmit();
  }

  cancel(): void {
    this.editForm.cancel();
  }

  deleteRequest(request: Request): void {
    this._modal
      .open<boolean>({
        title: 'MODALS.DELETE_REQUEST.TITLE',
        message: 'MODALS.DELETE_REQUEST.MESSAGE',
        actions: [
          { type: 'close', isFlatButton: true, value: true, color: 'primary', name: 'BUTTON_NAME.DELETE' },
          { type: 'close', value: false, color: 'primary', name: 'BUTTON_NAME.CANCEL' }
        ]
      })
      .pipe(
        mergeMap((): Observable<void> => {
          console.log('DELETE REQUEST');
          return;
        })
      )
      .subscribe(() => {
        this._getListData();
      });
  }
  deleteOrganisation(partnerOrganisation: Organization): void {
    this._modal
      .open({
        title: 'MODALS.DELETE_PARTNER.TITLE',
        message: 'MODALS.DELETE_PARTNER.MESSAGE',
        actions: [
          { type: 'close', isFlatButton: true, value: true, color: 'primary', name: 'BUTTON_NAME.OK' },
          { type: 'close', value: false, color: 'primary', name: 'BUTTON_NAME.CANCEL' }
        ]
      })
      .pipe(
        mergeMap((): Observable<void> => {
          console.log('REMOVE ORGNIZATION');
          return;
        }),
        mergeMap((): Observable<User> => this._usersTableCrud.getMe())
      )
      .subscribe((): void => this._getListData());
  }

  acceptAction(request: Request): void {
    this._modal
      .open({
        title: 'MODALS.ACCEPT_REQUEST.TITLE',
        message: 'MODALS.ACCEPT_REQUEST.MESSAGE',
        actions: [
          { type: 'close', isFlatButton: true, value: true, color: 'primary', name: 'BUTTON_NAME.OK' },
          { type: 'close', value: false, color: 'primary', name: 'BUTTON_NAME.CANCEL' }
        ]
      })
      .pipe(mergeMap((): Observable<User> => this._usersTableCrud.getMe()))
      .subscribe((): void => this._getListData());
  }

  rejectAction(request: Request): void {
    this._modal
      .open({
        title: 'MODALS.REJECT_REQUEST.TITLE',
        message: 'MODALS.REJECT_REQUEST.MESSAGE',
        actions: [
          { type: 'close', isFlatButton: true, value: true, color: 'primary', name: 'BUTTON_NAME.OK' },
          { type: 'close', value: false, color: 'primary', name: 'BUTTON_NAME.CANCEL' }
        ]
      })
      .pipe(
        mergeMap(() => of()),
        mergeMap((): Observable<User> => this._usersTableCrud.getMe())
      )
      .subscribe((): void => this._getListData());
  }

  addPartnerOrganization(partnerOrganisation: Organization) {
    this._modal
      .open({
        title: 'MODALS.ADD_PARTNER.TITLE',
        message: 'MODALS.ADD_PARTNER.MESSAGE',
        actions: [
          { type: 'close', isFlatButton: true, value: true, color: 'primary', name: 'BUTTON_NAME.OK' },
          { type: 'close', value: false, color: 'primary', name: 'BUTTON_NAME.CANCEL' }
        ]
      })
      .pipe(mergeMap((): Observable<User> => this._usersTableCrud.getMe()))
      .subscribe((): void => this._getListData());
  }

  addPartnerUser(id: string) {
    this._modal
      .open({
        title: 'MODALS.ADD_MEMBER.TITLE',
        message: 'MODALS.ADD_MEMBER.MESSAGE',
        actions: [
          { type: 'close', isFlatButton: true, value: true, color: 'primary', name: 'BUTTON_NAME.OK' },
          { type: 'close', value: false, color: 'primary', name: 'BUTTON_NAME.CANCEL' }
        ]
      })
      .pipe(mergeMap((): Observable<void> => of()))
      .subscribe((): void => {
        return this._getListData();
      });
  }

  toPendingMenuItemType(item: IPendingMenuItem): IPendingMenuItem {
    return item as IPendingMenuItem;
  }

  private _initMenuItems(): void {
    const key: string = 'PENDING_MENU';

    this.requests.forEach((request: Request) => {
      this.dropdownItems.set(request, [
        {
          content: {
            title: `${key}.ACCEPT`,
            action: this.acceptAction.bind(this, request)
          },
          template: this.dropdownPendingItemTemplate
        },
        {
          content: {
            title: `${key}.REJECT`,
            action: this.rejectAction.bind(this, request)
          },
          template: this.dropdownPendingItemTemplate
        }
      ]);
    });
  }

  private _getOrganizations(): void {
    this._organizationsTableCrud.getOrganisations().subscribe((organizations: Organization[]): void => {
      this.partnerOrganisations = organizations;
      this.organizations = organizations;
    });
  }
}
