import { Component, OnInit } from '@angular/core';
import { BaseFormAbstractComponent } from '@misc/abstracts/base-form.abstract.component';
import { UsersTableCrudService } from '@services/rest/dynamo-db/users-table/users-table.crud.service';
import { User } from '@models/classes/user.model';
import { FormBuilder, Validators } from '@angular/forms';
import { VALIDATORS_SET } from '@misc/constants/validators-set.constant';
import { Params, Router } from '@angular/router';
import { ChangePasswordModalComponent } from '@shared/modal/modals/change-password-modal/change-password-modal.component';
import { mergeMap, Observable, of } from 'rxjs';
import { ModalService } from '@shared/modal/modal.service';
import { Country } from 'country-state-city';
import { ICountry } from 'country-state-city/dist/lib/interface';
import { IOption } from '@models/interfaces/forms/option.interface';
import { Organization } from '@models/classes/organisation.model';
import { OrganizationsTableCrudService } from '@services/rest/dynamo-db/organizations-table/organizations-table-crud.service';
import { RequestsTableCrudService } from '@services/rest/dynamo-db/requests-table/requests-table-crud.service';

interface IChangePasswordParams {
  newPassword: string;
  oldPassword: string;
}

@Component({
  selector: 'main-info-form',
  templateUrl: './main-info-form.component.html',
  styleUrls: ['./main-info-form.component.scss']
})
export class MainInfoFormComponent extends BaseFormAbstractComponent implements OnInit {
  readonly COUNTRIES: IOption[] = Country.getAllCountries().map(
    ({ isoCode, name }: ICountry): IOption => ({ value: isoCode, label: name })
  );
  organisations: Organization[];

  constructor(
    private _router: Router,
    private _modal: ModalService,
    private _usersTableCrud: UsersTableCrudService,
    private _requestsTableCrud: RequestsTableCrudService,
    private _organizationsTableCrud: OrganizationsTableCrudService,
    private _fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this._initForm();
  }

  get me(): User {
    return this._usersTableCrud.me;
  }

  onOrganisationKeywordDefined(query: string): void {
    this._organizationsTableCrud.getOrganisations().subscribe((organisations: Organization[]): void => {
      this.organisations = organisations;
    });
  }

  cancel() {
    this.form.email.setValue(this.me?.email, { onlySelf: true, emitEvent: false });
    this.form.firstName.setValue(this.me?.firstName, { onlySelf: true, emitEvent: false });
    this.form.lastName.setValue(this.me?.lastName, { onlySelf: true, emitEvent: false });
    this.form.organisation.setValue(this.me?.organisation, { onlySelf: true, emitEvent: false });
    this.form.country.setValue(this.me?.country, { onlySelf: true, emitEvent: false });
    this.form.avatar.setValue(this.me?.avatar, { onlySelf: true, emitEvent: false });
  }

  logout() {
    console.log('LOGOUT');
  }

  changePassword() {
    this._modal
      .open<IChangePasswordParams>(
        {
          title: 'MESSAGE.CHANGE_PASSWORD_TITLE',
          component: ChangePasswordModalComponent
        },
        { width: '100%', maxWidth: '48rem', panelClass: 'change-password-dialog', autoFocus: false }
      )
      .pipe(mergeMap((params: IChangePasswordParams): Observable<void> => of()))
      .subscribe();
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }

    console.log('SUBMIT');
  }

  deleteAccount() {
    this._modal.open<boolean>(
      {
        title: 'MESSAGE.DELETE_ACCOUNT_TITLE',
        message: 'MESSAGE.DELETE_ACCOUNT_DESC',
        actions: [
          { type: 'submit', value: true, color: 'primary', name: 'BUTTON_NAME.DELETE' },
          { type: 'close', value: false, color: 'primary', name: 'BUTTON_NAME.CANCEL' }
        ]
      },
      { width: '100%', maxWidth: '48rem', panelClass: ['resizable-dialog', 'delete-account'], autoFocus: false }
    );
  }

  private _initForm(): void {
    this.formGroup = this._fb.group({
      avatar: this._fb.control(this.me?.avatar),
      firstName: this._fb.control(this.me?.firstName, Validators.compose([VALIDATORS_SET.NAME, Validators.required])),
      lastName: this._fb.control(this.me?.lastName, Validators.compose([VALIDATORS_SET.NAME, Validators.required])),
      email: this._fb.control(this.me?.email, Validators.compose([VALIDATORS_SET.EMAIL, Validators.required])),
      organisation: this._fb.control(this.me?.organisation, Validators.compose([Validators.required])),
      country: this._fb.control(this.me?.country)
    });
  }
}
