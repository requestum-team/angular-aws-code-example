import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseFormFieldAbstractComponent } from '@app/misc/abstracts/base-form-field.abstract.component';
import { IMultipleSelectItem } from '@app/models/interfaces/multiple-select-item.interface';
import { TranslateService } from '@ngx-translate/core';
import get from 'lodash.get';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'multiselect-autocomplete',
  templateUrl: './multiselect-autocomplete.component.html',
  styleUrls: ['./multiselect-autocomplete.component.scss']
})
export class MultiselectAutocompleteComponent extends BaseFormFieldAbstractComponent implements OnChanges {
  @Output() selectChange = new EventEmitter<{ key: string; data: Array<any> }>();
  @Input() data: Array<any> = [];
  @Input() key: string = '';
  @Input() searchFields: Array<string> = ['name'];
  @Input() displaySearchField: string = 'name';
  @Input() optionTemplate?: TemplateRef<any>;

  selectControl = new FormControl();
  rawData: Array<any> = [];
  selectData: Array<IMultipleSelectItem> = [];
  filteredData: Observable<Array<IMultipleSelectItem>>;
  filterString: string = '';

  constructor(protected cdr: ChangeDetectorRef, protected translate: TranslateService) {
    super(cdr, translate);
    this.filteredData = this.selectControl.valueChanges.pipe(
      startWith<string>(''),
      map(value => (typeof value === 'string' ? value : get(value, this.displaySearchField))),
      map(filter => this.filter(filter))
    );
  }

  ngOnChanges({ data }: SimpleChanges): void {
    if (data?.currentValue || data?.previousValue) {
      data?.currentValue.forEach((item: any) => {
        this.rawData.push({ item, selected: false });
      });
    }
  }

  filter(filter: string): Array<IMultipleSelectItem> {
    this.filterString = filter;
    if (filter?.length > 0) {
      return this.rawData.filter(option => {
        const searchValues = this.searchFields.map(item => get(option.item, item).toLowerCase());
        return searchValues.some(el => el.indexOf(filter.toLowerCase()) >= 0);
      });
    } else {
      return this.rawData.slice();
    }
  }
  displayFn(option: any) {
    return option && get(option, this.displaySearchField) ? get(option, this.displaySearchField) : '';
  }

  optionClicked(event: Event, data: IMultipleSelectItem): void {
    event.stopPropagation();
    this.toggleSelection(data);
  }

  toggleSelection(data: IMultipleSelectItem): void {
    data.selected = !data.selected;
    if (data.selected === true) {
      this.selectData.push(data);
    } else {
      const i = this.selectData.findIndex(value => value.item === data.item);
      this.selectData.splice(i, 1);
    }

    this.emitAdjustedData();
  }

  emitAdjustedData(): void {
    const results: Array<string> = [];
    this.selectData.forEach((data: IMultipleSelectItem) => {
      results.push(data.item);
    });
    this.selectChange.emit({ key: this.key, data: results });
  }

  removeChip(data: IMultipleSelectItem): void {
    this.toggleSelection(data);
  }
}
