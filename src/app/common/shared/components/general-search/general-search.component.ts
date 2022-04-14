import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { InputType } from '@app/models/enums/input-type.enum';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'general-search',
  templateUrl: './general-search.component.html',
  styleUrls: ['./general-search.component.scss']
})
export class GeneralSearchComponent implements OnInit {
  @Output() searchSubmit = new EventEmitter<string>();
  searchControl = new FormControl();
  readonly InputType: typeof InputType = InputType;
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<any[]>;
  selected: string;

  constructor() {}

  ngOnInit(): void {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  selectOption(option: MatAutocompleteSelectedEvent) {
    this.selected = option.option.value;
  }

  onClear(control: FormControl) {
    control.setValue('');
  }

  btnClick() {
    this.searchSubmit.emit(this.selected);
  }
}
