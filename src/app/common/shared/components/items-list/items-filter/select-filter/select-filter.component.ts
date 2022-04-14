import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IOption } from '@app/models/interfaces/forms/option.interface';
import { ItemsFilterAbstractComponent } from '../items-filter.abstract.component';

@Component({
  selector: 'select-filter',
  templateUrl: './select-filter.component.html',
  styleUrls: ['./select-filter.component.scss']
})
export class SelectFilterComponent extends ItemsFilterAbstractComponent {
  @Input() options: IOption[];
  @Output() changeSelectFilter = new EventEmitter<string>();

  optionChange(val: string) {
    this.changeSelectFilter.emit(val);
  }
}
