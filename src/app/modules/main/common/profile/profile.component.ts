import { AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ToolbarHelperService } from '@app/services/toolbar-helper/toolbar-helper.service';
import { TranslateService } from '@ngx-translate/core';
import { OrganizationsTableCrudService } from '@app/services/rest/dynamo-db/organizations-table/organizations-table-crud.service';
import { Organization } from '@app/models/classes/organisation.model';
import { Router } from '@angular/router';
import { RequestsTableCrudService } from '@services/rest/dynamo-db/requests-table/requests-table-crud.service';
import { User } from '@models/classes/user.model';
import { UsersTableCrudService } from '@services/rest/dynamo-db/users-table/users-table.crud.service';
import { Request } from '@models/classes/request.model';
import { ColumnPlacement } from '@app/models/enums/column-placement.enum';
import { mergeMap, Observable, of, tap } from 'rxjs';
import { ModalService } from '@shared/modal/modal.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  @ViewChild('toolbarTemplate') toolbarTemplate: TemplateRef<any>;
  @ViewChild('requestTemplate') requestTemplate: TemplateRef<any>;
  @ViewChild('statusTemplate') statusTemplate: TemplateRef<any>;
  @ViewChild('deleteTemplate') deleteTemplate: TemplateRef<any>;
  @ViewChild('imgTemplate') imgTemplate: TemplateRef<any>;
  organizations: Organization[] = [];
  requests: Request[] = [];
  requestsColumns;
  organizationsColumns;

  constructor(
    private _modal: ModalService,
    private _toolbarHelper: ToolbarHelperService,
    private _translate: TranslateService,
    private _router: Router,
    private _organizationsTableCrud: OrganizationsTableCrudService,
    private _requestsTableCrud: RequestsTableCrudService,
    private _usersTableCrud: UsersTableCrudService,
    private _cdr: ChangeDetectorRef
  ) {}

  get me(): User {
    return this._usersTableCrud?.me;
  }

  get myOrganisation(): Organization {
    return this.me?.organisation as Organization;
  }

  ngOnInit(): void {
    this._getListsData();
  }

  ngAfterViewInit(): void {
    this._toolbarHelper.data = {
      template: this.toolbarTemplate,
      pageName: this._translate.instant(`PAGE_NAME.PROFILE`)
    };

    this.requestsColumns = {
      columns: [
        { columnName: 'organisation.logo', title: '', columnTemplate: this.imgTemplate, columnPlacement: ColumnPlacement.start },
        { columnName: 'organisation.name', title: 'Organization', isCropped: true },
        { columnName: 'organisation.id', title: 'Organization ID' },
        { columnName: 'status', title: 'Status', columnTemplate: this.statusTemplate },
        { columnName: 'delete', title: '', columnTemplate: this.deleteTemplate, columnPlacement: ColumnPlacement.end }
      ]
    };

    this.organizationsColumns = {
      columns: [
        { columnName: 'logo', title: '', columnTemplate: this.imgTemplate, columnPlacement: ColumnPlacement.start },
        { columnName: 'name', title: 'Organization', isCropped: true },
        { columnName: 'id', title: 'Organization ID' },
        { columnName: 'allowExternalUsers', columnTemplate: this.requestTemplate }
      ]
    };
    this._cdr.detectChanges();
  }

  onOrganizationClick(data: Organization | Request): void {
    if (data instanceof Organization) {
      this._router.navigate(['', 'organization', data.id]);
    } else if (data?.organisation instanceof Organization) {
      this._router.navigate(['', 'organization', (data?.organisation as Organization)?.id]);
    }
  }

  logout() {
    console.log('LOGOUT');
  }

  removeRequest(request: Request): void {
    this._modal
      .open<boolean>({
        title: 'MODALS.DELETE_REQUEST.TITLE',
        message: 'MODALS.DELETE_REQUEST.MESSAGE',
        actions: [
          { type: 'close', isFlatButton: true, value: true, color: 'primary', name: 'BUTTON_NAME.DELETE' },
          { type: 'close', value: false, color: 'primary', name: 'BUTTON_NAME.CANCEL' }
        ]
      })
      .pipe(mergeMap((): Observable<void> => of()))
      .subscribe(() => {
        this._getListsData();
      });
  }

  requestToJoin(organization: Organization): void {
    this._modal
      .open<boolean>({
        title: 'MODALS.JOIN_TO_ORGANISATION.TITLE',
        message: 'MODALS.JOIN_TO_ORGANISATION.MESSAGE',
        actions: [
          { type: 'close', isFlatButton: true, value: true, color: 'primary', name: 'BUTTON_NAME.JOIN' },
          { type: 'close', value: false, color: 'primary', name: 'BUTTON_NAME.CANCEL' }
        ]
      })
      .pipe(mergeMap((): Observable<void> => of()))
      .subscribe(() => {
        this._getListsData();
      });
  }

  private _getListsData(): void {
    this._requestsTableCrud
      .scanByMember()
      .pipe(
        tap((requests: Request[]): void => {
          this.requests = requests;
        }),
        mergeMap((): Observable<Organization[]> => this._organizationsTableCrud.getOrganisations()),
        tap((organizations: Organization[]): void => {
          this.organizations = organizations.filter(
            ({ id }: Organization): boolean => !this.requests.find(({ organisation }: Request) => String(organisation) === id)
          );
        })
      )
      .subscribe();
  }
}
