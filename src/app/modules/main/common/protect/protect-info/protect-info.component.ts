import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DigitalDocument } from '@models/classes/digital-document.model';
import { Organization } from '@models/classes/organisation.model';
import { DATE_FORMAT } from '@misc/constants/_base.constant';

@Component({
  selector: 'protect-info',
  templateUrl: './protect-info.component.html',
  styleUrls: ['./protect-info.component.scss']
})
export class ProtectInfoComponent {
  readonly DATE_FORMAT: typeof DATE_FORMAT = DATE_FORMAT;
  @Input() document: DigitalDocument | null;
  @Input() file: File | null;

  constructor(private _translate: TranslateService) {}

  get documentOrganization(): Organization {
    return this.document.organization as Organization;
  }

  sharingName(value: string): string {
    return this._translate.instant(`ORGANISATION_SHARING.${value?.toLocaleUpperCase?.()}`);
  }
}
