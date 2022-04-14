import { AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BaseFormAbstractComponent } from '@misc/abstracts/base-form.abstract.component';
import { IDropdownItem } from '@models/interfaces/dropdown-item.interface';
import { FormBuilder } from '@angular/forms';
import { ColumnPlacement } from '@models/enums/column-placement.enum';
import { IItemsListColumns } from '@shared/components/items-list/items-list.component';
import { DigitalDocument } from '@models/classes/digital-document.model';
import { fileToBase64 } from '@misc/helpers/file/file-to-base64.helper';
import { mergeMap, Observable, of, switchMap, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrganizationsTableCrudService } from '@services/rest/dynamo-db/organizations-table/organizations-table-crud.service';
import { DATE_FORMAT } from '@misc/constants/_base.constant';
import { TranslateService } from '@ngx-translate/core';

export interface IExpansionItem {
  title: string;
  link?: string;
  action?: (...params: any[]) => any;
}

export interface IVerificationFormData {
  id?: string;
  document?: string;
  subjectId?: string;
  doi?: string;
  organization?: string;
}

@Component({
  template: ''
})
export abstract class VerificationAbstractComponent extends BaseFormAbstractComponent implements OnInit, AfterViewInit {
  readonly DATE_FORMAT: typeof DATE_FORMAT = DATE_FORMAT;
  @ViewChild('availableTemplate') availableTemplate: TemplateRef<any>;
  @ViewChild('detailsTemplate') detailsTemplate: TemplateRef<any>;
  @ViewChild('dropdownExpansionItemTemplate') dropdownExpansionItemTemplate: TemplateRef<any>;
  @ViewChild('imgTemplate') imgTemplate: TemplateRef<any>;
  @ViewChild('dateTemplate') dateTemplate: TemplateRef<any>;
  dropdownItems: WeakMap<DigitalDocument, IDropdownItem<IExpansionItem>[]> = new WeakMap<
    DigitalDocument,
    IDropdownItem<IExpansionItem>[]
  >();
  filesColumns: IItemsListColumns;
  documents: DigitalDocument[];
  isLoading: boolean = false;

  constructor(
    protected _fb: FormBuilder,
    protected _translate: TranslateService,
    protected _organizationsTableCrud: OrganizationsTableCrudService,
    protected _cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this._initForm();
  }

  ngAfterViewInit(): void {
    this.filesColumns = {
      columns: [
        { columnName: 'organization.logo', title: '', columnTemplate: this.imgTemplate, columnPlacement: ColumnPlacement.start },
        { columnName: 'subjectId', title: 'Student ID' },
        { columnName: 'organization.name', title: 'Organization', isCropped: true },
        { columnName: 'doi', title: 'Date of Information', columnTemplate: this.dateTemplate },
        { columnName: 'isAvailable', title: 'File Available', columnTemplate: this.availableTemplate }
      ],
      detailsTemplate: this.detailsTemplate
    };
    this._cdr.detectChanges();
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }

    console.log('SUBMIT');
  }

  downloadAction(document: DigitalDocument) {
    console.log(document);
  }

  copyAction(document: DigitalDocument) {
    console.log(document);
  }

  shareAction(document: DigitalDocument) {
    console.log(document);
  }

  recordAction(document: DigitalDocument) {
    console.log(document);
  }

  protected _getRawValue(): Observable<IVerificationFormData> {
    const raw: Omit<IVerificationFormData, 'document'> & { document: File | null } = this.formGroup.getRawValue() ?? {};

    if (raw.document) {
      return fileToBase64(raw.document).pipe(map((base64: string): IVerificationFormData => ({ document: base64 })));
    } else if (raw.id) {
      return of({ id: raw.id });
    } else if (raw.subjectId) {
      return of({ subjectId: raw.subjectId, doi: raw.doi, organization: raw.organization });
    }
  }

  protected _initForm(): void {
    this.formGroup = this._fb.group({
      subjectId: this._fb.control(''),
      doi: this._fb.control(new Date()),
      organization: this._fb.control(''),
      id: this._fb.control(''),
      document: this._fb.control(null)
    });
  }

  protected _initMenuItems(): void {
    const key: string = 'EXPANSION_MENU';

    this.documents.forEach((digitalDocument: DigitalDocument) => {
      this.dropdownItems.set(digitalDocument, [
        {
          content: {
            title: this._translate.instant(`${key}.DOWNLOAD`),
            action: this.downloadAction.bind(this, digitalDocument)
          },
          template: this.dropdownExpansionItemTemplate
        },
        {
          content: {
            title: this._translate.instant(`${key}.COPY`),
            action: this.copyAction.bind(this, digitalDocument)
          },
          template: this.dropdownExpansionItemTemplate
        },
        {
          content: {
            title: this._translate.instant(`${key}.SHARE`),
            action: this.shareAction.bind(this, digitalDocument)
          },
          template: this.dropdownExpansionItemTemplate
        },
        {
          content: {
            title: this._translate.instant(`${key}.RECORD_AVAILABILITY`),
            action: this.recordAction.bind(this, digitalDocument)
          },
          template: this.dropdownExpansionItemTemplate
        }
      ]);
    });
  }
}
