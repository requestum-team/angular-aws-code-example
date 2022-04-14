import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BaseFormAbstractComponent } from '@app/misc/abstracts/base-form.abstract.component';
import { TranslateService } from '@ngx-translate/core';
import { UsersTableCrudService } from '@app/services/rest/dynamo-db/users-table/users-table.crud.service';
import { User } from '@app/models/classes/user.model';
import { Organization } from '@app/models/classes/organisation.model';
import { InputType } from '@app/models/enums/input-type.enum';
import { map, Observable, startWith } from 'rxjs';
import { OrganizationsTableCrudService } from '@app/services/rest/dynamo-db/organizations-table/organizations-table-crud.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent extends BaseFormAbstractComponent implements OnInit {
  @ViewChild('autocompleteInput', { read: ElementRef }) autocompleteInput: ElementRef;
  @Input() formGroup: FormGroup;
  @Output() submitted: EventEmitter<void> = new EventEmitter<void>();
  organizations: Organization[] = [];
  organizationsData: Organization[] = [];
  readonly InputType: typeof InputType = InputType;
  filteredOptions$: Observable<any[]>;
  organizationInput = new FormControl();
  showOnlyMyOrganisations = true;

  constructor(
    private _fb: FormBuilder,
    private _translate: TranslateService,
    private _usersTableCrud: UsersTableCrudService,
    private _organizationsTableCrud: OrganizationsTableCrudService
  ) {
    super();
  }

  get me(): User {
    return this._usersTableCrud.me;
  }

  get myOrganisation(): Organization {
    return this.me?.organisation as Organization;
  }

  ngOnInit(): void {
    this._getOrganizations();
  }

  onClear() {
    this.organizationInput.setValue('');
    this.form?.organisation.patchValue('');
  }

  getOptionText(option: any) {
    return option && option.name ? option.name : '';
  }

  private _filter(value: string): any[] {
    const filterValue = value?.toLowerCase();

    return [...this.organizationsData].filter(option => option.name?.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }

    this.submitted.emit();
  }

  private _getOrganizations(): void {
    this._organizationsTableCrud.getOrganisations().subscribe((organizations: Organization[]): void => {
      this.organizations = organizations;
      if (this.showOnlyMyOrganisations) {
        this.organizationsData = [this.myOrganisation];
      } else {
        this.organizationsData = [...this.organizations];
      }

      this.filteredOptions$ = this.setDataFilter();
    });
  }

  onToggleChange($event: MatSlideToggleChange) {
    this.showOnlyMyOrganisations = !!$event.checked;
    if (this.showOnlyMyOrganisations) {
      this.organizationsData = [...[this.myOrganisation]];
    } else {
      this.organizationsData = [...this.organizations];
    }
    this.filteredOptions$ = this.setDataFilter();
  }

  setDataFilter() {
    return this.organizationInput.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : [...this.organizationsData].slice()))
    );
  }
}
