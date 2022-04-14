import { AfterViewInit, ChangeDetectorRef, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { IDropdownItem } from '@app/models/interfaces/dropdown-item.interface';
import { ModalService } from '@shared/modal/modal.service';
import { PhotoModalComponent } from '@shared/modal/modals/photo-modal/photo-modal.component';
import { BaseFormFieldAbstractComponent } from '@misc/abstracts/base-form-field.abstract.component';
import { TranslateService } from '@ngx-translate/core';
import { mergeMap, Observable, of } from 'rxjs';
import { v4 } from 'uuid';

interface IPhotoMenuItem {
  title: string;
  link?: string;
  action?: (...params: any[]) => any;
}

@Component({
  selector: 'photo-menu',
  templateUrl: './photo-menu.component.html',
  styleUrls: ['./photo-menu.component.scss']
})
export class PhotoMenuComponent extends BaseFormFieldAbstractComponent implements AfterViewInit {
  @ViewChild('dropdownPhotoItemTemplate') dropdownPhotoItemTemplate: TemplateRef<any>;
  @Input() name: string;
  translationKey: string = 'PHOTO_MENU.';
  items: IDropdownItem<IPhotoMenuItem>[] = [];

  constructor(protected cdr: ChangeDetectorRef, protected translate: TranslateService, private _modal: ModalService) {
    super(cdr, translate);
  }

  ngAfterViewInit(): void {
    this.initMenuItems();
  }

  toPhotoMenuItemType(item: IPhotoMenuItem): IPhotoMenuItem {
    return item as IPhotoMenuItem;
  }

  get key(): string {
    return typeof this.control?.value === 'string' ? this.control.value : null;
  }

  get initials() {
    return this.name.match(/\b(\w)/g).join('');
  }

  protected initMenuItems(): void {
    const items: IDropdownItem<IPhotoMenuItem>[] = this.items;
    items.length = 0;

    switch (true) {
      case !!this.key:
        items.push(
          {
            content: {
              title: `${this.translationKey}CHANGE`,
              action: this.photoChange.bind(this)
            },
            template: this.dropdownPhotoItemTemplate
          },
          {
            content: {
              title: `${this.translationKey}DELETE`,
              action: this.photoDelete.bind(this)
            },
            template: this.dropdownPhotoItemTemplate
          }
        );
        break;
      default:
        items.push({
          content: {
            title: `${this.translationKey}ADD`,
            action: this.photoChange.bind(this)
          },
          template: this.dropdownPhotoItemTemplate
        });
        break;
    }
  }

  photoChange(): void {
    const Key: string = v4();

    this._modal.open<File>(
      {
        title: 'MESSAGE.PHOTO_CHANGE_TITLE',
        component: PhotoModalComponent,
        context: { control: this.control }
      },
      { width: '100%', maxWidth: '48rem', panelClass: 'change-password-dialog', autoFocus: false }
    );
  }

  photoDelete(): void {
    this._modal
      .open<boolean>({
        title: 'MESSAGE.PHOTO_DELETE_TITLE',
        message: 'MESSAGE.PHOTO_DELETE_DESC',
        actions: [
          { type: 'close', isFlatButton: true, value: true, color: 'primary', name: 'BUTTON_NAME.DELETE' },
          { type: 'close', value: false, color: 'primary', name: 'BUTTON_NAME.CANCEL' }
        ]
      })
      .subscribe((): void => this.control.reset(''));
  }
}
