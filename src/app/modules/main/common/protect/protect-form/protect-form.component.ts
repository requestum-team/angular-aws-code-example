import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseFormAbstractComponent } from '@app/misc/abstracts/base-form.abstract.component';
import { recordOptions } from '@app/misc/constants/_base.constant';
import { Organization } from '@app/models/classes/organisation.model';
import { User } from '@app/models/classes/user.model';
import { IOption } from '@app/models/interfaces/forms/option.interface';
import { UsersTableCrudService } from '@app/services/rest/dynamo-db/users-table/users-table.crud.service';
import { TranslateService } from '@ngx-translate/core';
import { IServicesConfig } from '@services/http/http.service';
import { DigitalDocument } from '@models/classes/digital-document.model';

interface IFormData {
  document: string;
  doi: string;
  subjectId: string;
  organization: string;
  recordType: string;
  Releasability: string;
}

@Component({
  selector: 'protect-form',
  templateUrl: './protect-form.component.html',
  styleUrls: ['./protect-form.component.scss']
})
export class ProtectFormComponent extends BaseFormAbstractComponent implements OnInit {
  @Output() documentChange: EventEmitter<DigitalDocument> = new EventEmitter<DigitalDocument>();
  @Input() document: DigitalDocument;
  @Output() fileChange: EventEmitter<File> = new EventEmitter<File>();
  @Input() file: File;
  isLoading: boolean = false;
  recordOptions: IOption[] = recordOptions;
  organizations: IOption[] = [];

  constructor(private _fb: FormBuilder, private _translate: TranslateService, private _usersTableCrud: UsersTableCrudService) {
    super();
  }

  ngOnInit(): void {
    this._initOptions();
    this._initForm();
  }

  get me(): User {
    return this._usersTableCrud.me;
  }

  get myOrganization(): Organization {
    return this.me.organisation as Organization;
  }

  onSubmit(): void {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.invalid) {
      return;
    }

    const servicesConfig: IServicesConfig = { skipLoaderStart: true };
    console.log('SUBMIT');
  }

  private _initForm(): void {
    this.formGroup = this._fb.group({
      recordType: this._fb.control('', Validators.compose([Validators.required])),
      subjectId: this._fb.control('', Validators.compose([Validators.required])),
      doi: this._fb.control(new Date(), Validators.compose([Validators.required])),
      organization: this._fb.control(null, Validators.compose([Validators.required])),
      Releasability: this._fb.control(this.myOrganization?.sharingDefault, Validators.compose([Validators.required])),
      document: this._fb.control(null, Validators.compose([Validators.required]))
    });
  }

  private _initOptions(): void {
    this.recordOptions = this.recordOptions.map(
      (item: IOption): IOption => ({
        value: item.value,
        label: this._translate.instant(`RECORD.${item.label}`),
        disabled: false
      })
    );
    this.organizations = [this.myOrganization, ...this.me.secondaryOrganisations].map(
      ({ name, id }: Organization): IOption => ({ value: { id: String(id), name: name }, label: name })
    );
  }
}
