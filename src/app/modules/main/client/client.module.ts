import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ProtectModule } from '../common/protect/protect.module';
import { ProfileModule } from '@modules/main/common/profile/profile.module';
import { OrganisationModule } from '@modules/main/common/organisation/organisation.module';
import { NotFoundPageComponent } from '@modules/main/common/not-found-page/not-found-page.component';
import { NotFoundPageModule } from '@modules/main/common/not-found-page/not-found-page.module';
import { HomeModule } from '@modules/main/common/home/home.module';
import { AnalyticsModule } from '@modules/main/common/analytics/analytics.module';
import { SearchModule } from '@modules/main/common/search/search.module';
import { SettingsModule } from '../common/settings/settings.module';
import { HelpModule } from '../common/help/help.module';
import { NotificationsModule } from '@modules/main/common/notifications/notifications.module';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: (): Promise<HomeModule> =>
      import('@modules/main/common/home/home.module').then((m: { HomeModule: HomeModule }): HomeModule => m.HomeModule)
  },
  {
    path: 'protect',
    loadChildren: (): Promise<ProtectModule> =>
      import('@modules/main/common/protect/protect.module').then((m: { ProtectModule: ProtectModule }): ProtectModule => m.ProtectModule)
  },
  {
    path: 'validate',
    loadChildren: (): Promise<SearchModule> =>
      import('@modules/main/common/search/search.module').then((m: { SearchModule: SearchModule }): SearchModule => m.SearchModule)
  },
  {
    path: 'profile',
    loadChildren: (): Promise<ProfileModule> =>
      import('@modules/main/common/profile/profile.module').then((m: { ProfileModule: ProfileModule }): ProfileModule => m.ProfileModule)
  },
  {
    path: 'organization',
    loadChildren: (): Promise<OrganisationModule> =>
      import('@modules/main/common/organisation/organisation.module').then(
        (m: { OrganisationModule: OrganisationModule }): OrganisationModule => m.OrganisationModule
      )
  },
  {
    path: 'settings',
    loadChildren: (): Promise<SettingsModule> =>
      import('@modules/main/common/settings/settings.module').then(
        (m: { SettingsModule: SettingsModule }): SettingsModule => m.SettingsModule
      )
  },
  {
    path: 'analytics',
    loadChildren: (): Promise<AnalyticsModule> =>
      import('@modules/main/common/analytics/analytics.module').then(
        (m: { AnalyticsModule: AnalyticsModule }): AnalyticsModule => m.AnalyticsModule
      )
  },
  {
    path: 'help',
    loadChildren: (): Promise<HelpModule> =>
      import('@modules/main/common/help/help.module').then((m: { HelpModule: HelpModule }): HelpModule => m.HelpModule)
  },
  {
    path: 'notifications',
    loadChildren: (): Promise<NotificationsModule> =>
      import('@modules/main/common/notifications/notifications.module').then(
        (m: { NotificationsModule: NotificationsModule }): NotificationsModule => m.NotificationsModule
      )
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: '404',
    component: NotFoundPageComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule, NotFoundPageModule]
})
export class ClientModule {}
