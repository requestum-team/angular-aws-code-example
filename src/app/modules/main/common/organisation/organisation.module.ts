import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganisationDetailsModule } from '@modules/main/common/organisation/organisation-details/organisation-details.module';
import { OrganisationEditModule } from '@modules/main/common/organisation/organisation-edit/organisation-edit.module';
import { RouterModule, Routes } from '@angular/router';
import { OrganisationEditComponent } from '@modules/main/common/organisation/organisation-edit/organisation-edit.component';
import { OrganisationDetailsComponent } from '@modules/main/common/organisation/organisation-details/organisation-details.component';
import { OrganisationResolver } from '@resolvers/organisation/organisation.resolver';

const routes: Routes = [
  {
    path: 'my',
    children: [
      {
        path: 'view',
        component: OrganisationDetailsComponent
      },
      {
        path: 'edit',
        component: OrganisationEditComponent
      }
    ]
  },
  {
    path: ':organisationId',
    resolve: { organisation: OrganisationResolver },
    component: OrganisationDetailsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes), OrganisationDetailsModule, OrganisationEditModule]
})
export class OrganisationModule {}
