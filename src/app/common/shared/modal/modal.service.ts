import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IModalData, ModalComponent } from '@shared/modal/modal.component';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

export type IModalProperties = Omit<MatDialogConfig, 'data'>;

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private _dialog: MatDialog) {}

  open<T = any>(data: IModalData<T>, properties?: IModalProperties, shouldHandleFalse?: boolean): Observable<T> {
    return this._dialog
      .open(ModalComponent, {
        ...(properties ?? { width: '100%', maxWidth: '48rem', panelClass: 'resizable-dialog', autoFocus: false }),
        data
      })
      .afterClosed()
      .pipe(filter((res: T): boolean => shouldHandleFalse || Boolean(res)));
  }
}
