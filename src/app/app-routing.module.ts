import { NgModule } from '@angular/core';
import { Routes, RouterModule, ROUTES } from '@angular/router';
import { UnauthGuard } from '@guards/unauth/unauth.guard';
import { MeResolver } from '@resolvers/me/me.resolver';
import { MainLayoutComponent } from '@layouts/main/main-layout.component';
import { UserRole } from '@models/enums/user-role.enum';
import { CommonModule } from '@angular/common';
import { ClientModule } from '@modules/main/client/client.module';

const routes: Routes = [
  {
    path: '',
    canActivate: [UnauthGuard],
    resolve: { me: MeResolver },
    component: MainLayoutComponent,
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: '',
        loadChildren: (): Promise<ClientModule> =>
          import('@modules/main/client/client.module').then((m: { ClientModule: ClientModule }): ClientModule => m.ClientModule),
        data: { roles: [UserRole.user, UserRole.organizationAdmin] }
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      paramsInheritanceStrategy: 'always',
      enableTracing: false,
      scrollPositionRestoration: 'enabled',
      initialNavigation: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
