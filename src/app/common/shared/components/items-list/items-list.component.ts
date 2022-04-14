import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ColumnPlacement } from '@app/models/enums/column-placement.enum';
import { InputType } from '@app/models/enums/input-type.enum';
import { map, Observable, startWith } from 'rxjs';
import { BaseModel } from '@models/classes/_base.model';
import { get } from 'lodash';

export interface IItemsListColumn {
  columnName: string;
  title?: string;
  isCropped?: boolean;
  columnTemplate?: TemplateRef<any>;
  columnPlacement?: ColumnPlacement;
}

export interface IItemsListColumns {
  columns: IItemsListColumn[];
  searchTemplate?: TemplateRef<any>;
  detailsTemplate?: TemplateRef<any>;
}

@Component({
  selector: 'items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent<T extends BaseModel> implements OnChanges {
  readonly InputType: typeof InputType = InputType;
  readonly ColumnPlacement: typeof ColumnPlacement = ColumnPlacement;
  @ViewChild('autocompleteInput', { read: ElementRef }) autocompleteInput: ElementRef;
  @Input() primaryQuery: string;
  @Input() columns: IItemsListColumns;
  @Input() data = [];
  @Input() initialData: any[];
  @Input() btnIcon: string = 'search';
  @Input() customTableClass: string = '';
  @Input() showSearch: boolean = true;
  @Input() isExpandable: boolean = false;
  @Input() isExpandableOpen: boolean = false;
  @Input() searchField: string = 'name';
  @Input() onRowClick: (row: any) => any;
  @Output() actionEvent = new EventEmitter<T>();
  organizations: any[] = [];
  displayData: any[] = [];
  myControl = new FormControl();
  filteredOptions: Observable<any[]>;
  selected: T;

  ngOnChanges({ initialData, columns }: SimpleChanges) {
    if (initialData?.currentValue || initialData?.previousValue) {
      this.displayData = this.initialData;
    }
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : get(value, this.searchField))),
      map(name => (name ? this._filter(name) : [...this.data].slice()))
    );
  }

  selectOption(option: MatAutocompleteSelectedEvent) {
    this.selected = option.option.value;
  }

  getOptionText(option: any) {
    return option && get(option, this.searchField) ? get(option, this.searchField) : '';
  }

  btnClick() {
    this.actionEvent.emit(this.selected);
  }

  onClear() {
    this.myControl.setValue('');
    this.displayData = [...this.initialData];
    this.selected = null;
  }

  onSearch() {
    if (this.selected) {
      const item = this.data.find(item => item.id === this.selected?.id);
      this.displayData = [item];
    }
  }

  private _filter(value: string): any[] {
    const filterValue = value?.toLowerCase();

    return [...this.data].filter(option => get(option, this.searchField)?.toLowerCase().includes(filterValue));
  }
}
