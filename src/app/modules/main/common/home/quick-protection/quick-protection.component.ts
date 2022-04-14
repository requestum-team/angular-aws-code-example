import { Component, OnInit } from '@angular/core';
import { BaseFormAbstractComponent } from '@misc/abstracts/base-form.abstract.component';
import { FormBuilder } from '@angular/forms';
import { UsersTableCrudService } from '@services/rest/dynamo-db/users-table/users-table.crud.service';
import { User } from '@models/classes/user.model';
import { Organization } from '@models/classes/organisation.model';
import { IServicesConfig } from '@services/http/http.service';
import { DigitalDocumentUploadResponse } from '@models/classes/digital-document-upload-response.model';

interface IFormData {
  doi: string;
  subjectId: string;
  document: File;
}

@Component({
  selector: 'quick-protection',
  templateUrl: './quick-protection.component.html',
  styleUrls: ['../home.component.scss', './quick-protection.component.scss']
})
export class QuickProtectionComponent extends BaseFormAbstractComponent implements OnInit {
  response: DigitalDocumentUploadResponse;
  isLoading: boolean = false;

  constructor(private _fb: FormBuilder, private _usersTableCrud: UsersTableCrudService) {
    super();
  }

  ngOnInit(): void {
    this._initForm();
  }

  get me(): User {
    return this._usersTableCrud.me;
  }

  get myOrganization(): Organization {
    return this.me.organisation as Organization;
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }
    console.log('SUBMIT');
  }

  get shouldDisableButton(): boolean {
    return !this.form.subjectId.value || !this.form.document.value || !this.form.doi.value;
  }

  private _initForm(): void {
    this.formGroup = this._fb.group({
      subjectId: this._fb.control(''),
      doi: this._fb.control(new Date().toISOString()),
      document: this._fb.control('')
    });
  }
}
