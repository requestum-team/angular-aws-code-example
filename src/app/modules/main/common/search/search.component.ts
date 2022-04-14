import { AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '@app/common/shared/modal/modal.service';
import { RecordAvailabilityComponent } from '@app/common/shared/modal/modals/record-availability/record-availability.component';
import { ShareWithModalComponent } from '@app/common/shared/modal/modals/share-with-modal/share-with-modal.component';
import { User } from '@app/models/classes/user.model';
import { IOption } from '@app/models/interfaces/forms/option.interface';
import { UsersTableCrudService } from '@app/services/rest/dynamo-db/users-table/users-table.crud.service';
import { ToolbarHelperService } from '@app/services/toolbar-helper/toolbar-helper.service';
import { TranslateService } from '@ngx-translate/core';
import { mergeMap, Observable, of } from 'rxjs';
import { VerificationAbstractComponent } from '@misc/abstracts/verification.abstract.component';
import { OrganizationsTableCrudService } from '@services/rest/dynamo-db/organizations-table/organizations-table-crud.service';
import { DigitalDocument } from '@models/classes/digital-document.model';

export interface IShareWithParams {
  users?: Array<User>;
  email?: string;
  message?: string;
  shareType?: number;
}

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent extends VerificationAbstractComponent implements OnInit, AfterViewInit {
  @ViewChild('toolbarTemplate') toolbarTemplate: TemplateRef<any>;
  users: Array<User>;
  sortFilterOptions: IOption[] = [
    { value: '', label: this._translate.instant(`SEARCH.SORT`), disabled: false },
    { value: 'recent', label: this._translate.instant(`SEARCH_SELECT.RECENT`), disabled: false },
    { value: 'asc', label: this._translate.instant(`SEARCH_SELECT.ASC`), disabled: false },
    { value: 'desc', label: this._translate.instant(`SEARCH_SELECT.DESC`), disabled: false }
  ];

  constructor(
    protected _fb: FormBuilder,
    protected _translate: TranslateService,
    protected _organizationsTableCrud: OrganizationsTableCrudService,
    protected _cdr: ChangeDetectorRef,
    private _toolbarHelper: ToolbarHelperService,
    private _usersTableCrud: UsersTableCrudService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _modal: ModalService
  ) {
    super(_fb, _translate, _organizationsTableCrud, _cdr);
  }

  ngAfterViewInit(): void {
    this._toolbarHelper.data = {
      template: this.toolbarTemplate,
      pageName: this._translate.instant(`PAGE_NAME.VALIDATE`)
    };
    super.ngAfterViewInit();
  }

  ngOnInit(): void {
    super._initForm();
  }

  downloadAction(document: DigitalDocument) {
    this._router.navigate([document.txId], { relativeTo: this._activatedRoute });
  }

  copyAction(document: DigitalDocument) {}

  shareAction(document: DigitalDocument) {
    this._modal
      .open<IShareWithParams>(
        {
          title: 'MODALS.SHARE_WITH.TITLE',
          component: ShareWithModalComponent,
          context: { users: this.users }
        },
        { width: '100%', maxWidth: '52rem', panelClass: ['share-dialog', 'resizable-dialog'], autoFocus: false }
      )
      .pipe(
        mergeMap((params: IShareWithParams): Observable<void> => {
          return of();
        })
      )
      .subscribe();
  }

  recordAction(document: DigitalDocument) {
    this._modal
      .open<boolean>(
        {
          title: 'MODALS.RECORD_AVAILABILITY.TITLE',
          component: RecordAvailabilityComponent
        },
        { width: '100%', maxWidth: '44rem', panelClass: ['record-dialog', 'resizable-dialog'], autoFocus: false }
      )
      .pipe(
        mergeMap((params: boolean): Observable<void> => {
          return of();
        })
      )
      .subscribe();
  }

  sortChange(option: string): void {
    // TODO: add sort handling
    console.log('SORT', option);
  }
}
