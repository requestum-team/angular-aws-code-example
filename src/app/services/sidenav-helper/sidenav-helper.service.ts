import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavHelperService {
  public isHalfExpanded$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  toggleExpanded() {
    this.isHalfExpanded$.next(!this.isHalfExpanded$.value);
  }
}
