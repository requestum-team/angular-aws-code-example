import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, TemplateRef } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { IDropdownItem } from '@models/interfaces/dropdown-item.interface';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent {
  @Input() items: IDropdownItem<any>[] = [];
  @Input() menuCustomTemplate: TemplateRef<any>;
  @Input() isActive: boolean = false;
  @Input() disablePadding: boolean = false;
  @Input() isDivider: boolean = true;
  @Input() iconName: string;
  @Input() panelClass: string;
  @Input() isTranslateY: boolean = false;
  @Input() displayArrow: boolean = true;
  @Input() openOnHover: boolean = false;
  timedOutCloser;
  isOnHover = false;
  isMenuOpen = false;

  constructor(private _cdr: ChangeDetectorRef) {}

  mouseEnter(trigger: MatMenuTrigger) {
    if (this.timedOutCloser) {
      clearTimeout(this.timedOutCloser);
    }
    this.isOnHover = true;
    trigger.openMenu();
    this._cdr.markForCheck();
  }

  mouseLeave(trigger: MatMenuTrigger) {
    this.timedOutCloser = setTimeout(() => {
      trigger.closeMenu();
      this.isOnHover = false;
      this._cdr.markForCheck();
    }, 50);
  }
}
