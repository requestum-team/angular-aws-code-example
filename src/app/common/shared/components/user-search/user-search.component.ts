import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { User } from '@app/models/classes/user.model';
import { InputType } from '@app/models/enums/input-type.enum';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {
  @Input() data: User[] = [];
  @Output() actionEvent = new EventEmitter<string>();
  readonly InputType: typeof InputType = InputType;
  filteredUserNameOptions: Observable<any[]>;
  filteredUserEmailOptions: Observable<any[]>;
  userNameControl = new FormControl();
  userEmailControl = new FormControl();
  selectedId: string;

  ngOnInit(): void {
    this.filteredUserNameOptions = this.userNameControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.fullName)),
      map(name => (name ? this._filterName(name) : this.data.slice()))
    );
    this.filteredUserEmailOptions = this.userEmailControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.email)),
      map(email => (email ? this._filterEmail(email) : this.data.slice()))
    );
  }

  selectNameOption(option: MatAutocompleteSelectedEvent) {
    this.selectedId = option.option.value.id;
    this.userEmailControl.setValue(option.option.value);
  }

  selectEmailOption(option: MatAutocompleteSelectedEvent) {
    this.selectedId = option.option.value.id;
    this.userNameControl.setValue(option.option.value);
  }

  getNameOption(option: any) {
    return option && option.fullName ? option.fullName : '';
  }
  getEmailOption(option: any) {
    return option && option.email ? option.email : '';
  }

  btnClick() {
    this.actionEvent.emit(this.selectedId);
  }

  onClear(control: FormControl) {
    control.setValue('');
  }

  private _filterName(value: string): any[] {
    const filterValue = value?.toLowerCase();
    return [...this.data].filter(option => option.fullName?.toLowerCase().includes(filterValue));
  }

  private _filterEmail(value: string): any[] {
    const filterValue = value?.toLowerCase();
    return [...this.data].filter(option => option.email?.toLowerCase().includes(filterValue));
  }
}
