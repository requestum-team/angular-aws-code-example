import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MatDrawerMode } from '@angular/material/sidenav';
import { isPlatformBrowser } from '@angular/common';
import { Params } from '@angular/router';
import { User } from '@models/classes/user.model';
import { SidenavHelperService } from '@app/services/sidenav-helper/sidenav-helper.service';
import { UsersTableCrudService } from '@services/rest/dynamo-db/users-table/users-table.crud.service';

@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  private readonly _DESTROYED$: Subject<void> = new Subject<void>();

  constructor(
    private _usersTableCrud: UsersTableCrudService,
    private _breakpointObserver: BreakpointObserver,
    private _sidenavHelper: SidenavHelperService,
    @Inject(PLATFORM_ID) private _platformId: Params
  ) {}

  get me(): User {
    return this._usersTableCrud?.me;
  }

  ngOnInit() {
    this.shouldBeHalfOpen$
      .pipe(
        takeUntil(this._DESTROYED$),
        map((shouldBeOpen: boolean): void => {
          if (shouldBeOpen) {
            return this._sidenavHelper.isHalfExpanded$.next(true);
          } else {
            return this._sidenavHelper.isHalfExpanded$.next(false);
          }
        })
      )
      .subscribe();
  }

  get shouldBeOpen$(): Observable<boolean> {
    if (isPlatformBrowser(this._platformId)) {
      const style: CSSStyleDeclaration = window.getComputedStyle(document.documentElement);
      return this._breakpointObserver.observe(`(max-width: ${style.getPropertyValue('--tablet-xs')})`).pipe(
        takeUntil(this._DESTROYED$),
        map(({ matches }: BreakpointState): boolean => !matches)
      );
    } else {
      return of(true);
    }
  }

  get shouldBeHalfOpen$(): Observable<boolean> {
    if (isPlatformBrowser(this._platformId)) {
      const style: CSSStyleDeclaration = window.getComputedStyle(document.documentElement);
      return this._breakpointObserver
        .observe(`(min-width: ${style.getPropertyValue('--tablet-s')}) and (max-width: ${style.getPropertyValue('--tablet-l')})`)
        .pipe(
          takeUntil(this._DESTROYED$),
          map(({ matches }: BreakpointState): boolean => !matches)
        );
    } else {
      return of(true);
    }
  }

  get isHalfExpanded$(): Observable<boolean> {
    return this._sidenavHelper.isHalfExpanded$;
  }

  get sidenavMode$(): Observable<MatDrawerMode> {
    return this.shouldBeOpen$.pipe(
      takeUntil(this._DESTROYED$),
      map((shouldBeOpen: boolean): MatDrawerMode => (!shouldBeOpen ? 'over' : 'side'))
    );
  }

  ngOnDestroy(): void {
    this._DESTROYED$.next();
    this._DESTROYED$.complete();
  }
}
