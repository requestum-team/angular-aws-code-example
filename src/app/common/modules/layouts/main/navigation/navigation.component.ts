import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { INavItem } from '@app/models/interfaces/nav-item.interface';
import { SidenavHelperService } from '@app/services/sidenav-helper/sidenav-helper.service';
import { navItems } from '@layouts/main/navigation/nav-items.config';
import { Observable } from 'rxjs';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @Input() shouldCloseOnNav: boolean = false;
  @Output() navClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  constructor(private _sidenavHelper: SidenavHelperService) {}

  onNavigation(event: MouseEvent): void {
    if (this.shouldCloseOnNav) {
      this.navClick.emit(event);
    }
  }

  get isHalfExpanded$(): Observable<boolean> {
    return this._sidenavHelper.isHalfExpanded$;
  }

  get links(): INavItem[] {
    return navItems ?? [];
  }

  logout(): void {}

  toggleHalf() {
    this._sidenavHelper.toggleExpanded();
  }
}
