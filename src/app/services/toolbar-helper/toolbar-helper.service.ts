import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

export interface IToolbarData<T = any> {
  template: TemplateRef<any>;
  templateData?: T;
  isHidden?: boolean;
  pageName?: string;
  hint?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToolbarHelperService {
  constructor(private _router: Router) {
    this._router.events
      .pipe(
        filter((event: RouterEvent): boolean => event instanceof NavigationEnd),
        pairwise(),
        filter(([a, b]: RouterEvent[]): boolean => {
          const routeA: string = (a as NavigationEnd).urlAfterRedirects?.replace(/\?.*/gi, '');
          const routeB: string = (b as NavigationEnd).urlAfterRedirects?.replace(/\?.*/gi, '');

          return routeA !== routeB;
        })
      )
      .subscribe(() => {
        this.data = {
          template: null,
          templateData: null,
          isHidden: false,
          pageName: null,
          hint: null
        };
      });
  }

  private _infoViewerData$: BehaviorSubject<IToolbarData> = new BehaviorSubject<IToolbarData>({
    template: null,
    templateData: null,
    isHidden: false,
    pageName: null,
    hint: null
  });

  set data(data: IToolbarData) {
    this._infoViewerData$.next(data);
  }

  get data(): IToolbarData {
    return this._infoViewerData$.value;
  }

  get template(): TemplateRef<any> {
    return this._infoViewerData$.value?.template;
  }

  get templateData(): any {
    return this._infoViewerData$.value?.templateData;
  }
  get pageName(): string {
    return this._infoViewerData$.value?.pageName;
  }

  get hint(): string {
    return this._infoViewerData$.value?.hint;
  }

  get isHidden(): any {
    return this._infoViewerData$.value?.isHidden;
  }
}
