import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  template: ''
})
export abstract class ItemsFilterAbstractComponent {
  @Input() filterName: string;
  @Input() placeholder: string;
  control: FormControl = this._fb.control('');

  constructor(private _fb: FormBuilder) {}
}
