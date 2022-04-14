import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { RouterModule } from '@angular/router';
import { MainHeaderComponent } from './main-header/main-header.component';
import { SharedModule } from '@shared/shared.module';
import { ToolbarComponent } from '@layouts/main/toolbar/toolbar.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { NotificationsMenuComponent } from './notifications-menu/notifications-menu.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    MainHeaderComponent,
    ToolbarComponent,
    NavigationComponent,
    ProfileMenuComponent,
    NotificationsMenuComponent
  ],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [MainLayoutComponent]
})
export class MainLayoutModule {}
