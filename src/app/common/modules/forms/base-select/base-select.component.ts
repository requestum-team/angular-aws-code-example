import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { BaseFormFieldAbstractComponent } from '@misc/abstracts/base-form-field.abstract.component';
import { IOption } from '@models/interfaces/forms/option.interface';

@Component({
  selector: 'base-select',
  templateUrl: './base-select.component.html',
  styleUrls: ['./base-select.component.scss']
})
export class BaseSelectComponent extends BaseFormFieldAbstractComponent {
  @Output() selectOption = new EventEmitter<string>();
  @Input() options: IOption[];
  @Input() multiple: boolean;
  @Input() triggerTemplate: TemplateRef<any>;
  @Input() optionTemplate: TemplateRef<any>;
  @Input() getValue: (item: IOption) => any = item => (item as IOption).value;

  getTitle(item: IOption): string {
    return `${item.label || item.value}`;
  }

  onSelectChange(event: MatSelectChange) {
    this.selectOption.emit(event.value);
  }
}
