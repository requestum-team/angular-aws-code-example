import { AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BaseFormAbstractComponent } from '@misc/abstracts/base-form.abstract.component';
import { Organization } from '@models/classes/organisation.model';
import { User } from '@models/classes/user.model';
import { OrganizationsTableCrudService } from '@services/rest/dynamo-db/organizations-table/organizations-table-crud.service';
import { ToolbarHelperService } from '@services/toolbar-helper/toolbar-helper.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersTableCrudService } from '@services/rest/dynamo-db/users-table/users-table.crud.service';
import { ColumnPlacement } from '@models/enums/column-placement.enum';

@Component({
  selector: 'organisation-details',
  templateUrl: './organisation-details.component.html',
  styleUrls: ['./organisation-details.component.scss']
})
export class OrganisationDetailsComponent extends BaseFormAbstractComponent implements OnInit, AfterViewInit {
  @ViewChild('toolbarTemplate') toolbarTemplate: TemplateRef<any>;
  @ViewChild('avatarTemplate') avatarTemplate: TemplateRef<any>;
  @ViewChild('logoTemplate') logoTemplate: TemplateRef<any>;
  organizations: Organization[] = [];
  users: User[] = [];
  partnersColumns;
  usersColumns;

  constructor(
    protected translate: TranslateService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _toolbarHelper: ToolbarHelperService,
    private _fb: FormBuilder,
    private _organizationsTableCrud: OrganizationsTableCrudService,
    private _usersTableCrud: UsersTableCrudService,
    private _cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this._toolbarHelper.data = {
      template: this.toolbarTemplate,
      pageName: this.translate.instant(`PAGE_NAME.ORGANIZATION`)
    };
    this.usersColumns = {
      columns: [
        { columnName: 'avatar', columnTemplate: this.avatarTemplate, columnPlacement: ColumnPlacement.start },
        { columnName: 'fullName', title: 'User name', isCropped: true },
        { columnName: 'id', title: 'User ID' },
        { columnName: 'email', title: 'User Email', isCropped: true }
      ]
    };
    this.partnersColumns = {
      columns: [
        { columnName: 'logo', columnTemplate: this.logoTemplate, columnPlacement: ColumnPlacement.start },
        { columnName: 'name', title: 'Organization', isCropped: true },
        { columnName: 'id', title: 'Organization ID' },
        { columnName: 'primaryContact.email', title: 'Organization Email', isCropped: true }
      ]
    };
    this._cdr.detectChanges();
  }

  private _getDataList(): void {
    this._organizationsTableCrud.getOrganisations().subscribe((organizations: Organization[]): void => {
      this.organizations = organizations;
    });
  }

  ngOnInit(): void {
    this._getDataList();
  }

  get me(): User {
    return this._usersTableCrud.me;
  }

  get organization(): Organization {
    return this._activatedRoute.snapshot.data?.organisation ?? this.me?.organisation;
  }

  get initials() {
    return this.organization?.name.match(/\b(\w)/g).join('');
  }

  onOrganizationClick(org: Organization): void {
    this._router.navigate(['', 'organization', org.id]);
  }
}
