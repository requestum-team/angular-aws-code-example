import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Params, Router } from '@angular/router';
import { OrganizationsTableCrudService } from '@app/services/rest/dynamo-db/organizations-table/organizations-table-crud.service';
import { UsersTableCrudService } from '@app/services/rest/dynamo-db/users-table/users-table.crud.service';
import { ModalService } from '@shared/modal/modal.service';
import { User } from '@models/classes/user.model';
import { BaseFormAbstractComponent } from '@app/misc/abstracts/base-form.abstract.component';
import { Organization } from '@models/classes/organisation.model';
import { VALIDATORS_SET } from '@misc/constants/validators-set.constant';
import { mergeMap, Observable } from 'rxjs';
import { ApiKey } from '@models/classes/api-key.model';

@Component({
  selector: 'main-info-form',
  templateUrl: './main-info-form.component.html',
  styleUrls: ['./main-info-form.component.scss']
})
export class MainInfoFormComponent extends BaseFormAbstractComponent implements OnInit {
  constructor(
    private _router: Router,
    private _modal: ModalService,
    private _usersTableCrud: UsersTableCrudService,
    private _organizationsTableCrud: OrganizationsTableCrudService,
    private _fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this._initForm();
  }

  cancel() {
    this.form.name.setValue(this.myOrganisation?.name, { onlySelf: true, emitEvent: false });
    this.form.logo.setValue(this.myOrganisation?.logo, { onlySelf: true, emitEvent: false });
    this.getGroup('primaryContact').get('email').setValue(this.myOrganisation?.primaryContact?.email, { onlySelf: true, emitEvent: false });
    this.form.sharingDefault.setValue(this.myOrganisation?.sharingDefault, { onlySelf: true, emitEvent: false });
    this.form.allowExternalUsers.setValue(this.myOrganisation?.allowExternalUsers, { onlySelf: true, emitEvent: false });
    this.form.shouldUseVault.setValue(this.myOrganisation?.shouldUseVault, { onlySelf: true, emitEvent: false });
  }

  onSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      return;
    }
  }

  get myOrganisation(): Organization {
    return this.me?.organisation as Organization;
  }

  get apiKey(): ApiKey {
    return this.myOrganisation?.apiKey as ApiKey;
  }

  get me(): User {
    return this._usersTableCrud.me;
  }

  private _initForm(): void {
    this.formGroup = this._fb.group({
      name: this._fb.control(this.myOrganisation?.name, Validators.compose([Validators.required, VALIDATORS_SET.NAME])),
      logo: this._fb.control(this.myOrganisation?.logo),
      primaryContact: this._fb.group({
        email: this._fb.control(this.myOrganisation?.primaryContact.email, Validators.compose([Validators.required, VALIDATORS_SET.EMAIL]))
      }),
      sharingDefault: this._fb.control(this.myOrganisation?.sharingDefault),
      allowExternalUsers: this._fb.control(this.myOrganisation?.allowExternalUsers),
      shouldUseVault: this._fb.control(this.myOrganisation?.allowExternalUsers)
    });
  }

  private _openConfirmationModal(key: string): Observable<boolean> {
    return this._modal.open({
      title: `${key}.TITLE`,
      message: `${key}.MESSAGE`,
      actions: [
        { type: 'close', isFlatButton: true, value: true, color: 'primary', name: 'BUTTON_NAME.OK' },
        { type: 'close', value: false, color: 'primary', name: 'BUTTON_NAME.CANCEL' }
      ]
    });
  }
}
