import { Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core/common-behaviors/color';
export interface IAction<T = string> {
  name: string;
  value: T;
  icon?: string;
  color?: ThemePalette;
  disabled?: boolean;
}

export interface IModalAction<T> extends IAction<T> {
  type: 'submit' | 'close';
  isFlatButton?: boolean;
}

@Component({
  selector: 'modal-actions',
  templateUrl: './modal-actions.component.html',
  styleUrls: ['./modal-actions.component.scss']
})
export class ModalActionsComponent<T> {
  @Input() actions: IModalAction<T>[];
}
