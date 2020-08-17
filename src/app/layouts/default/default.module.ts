import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { DashboardService } from 'src/app/modules/dashboard.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AuthGuardService } from 'src/app/services/auth.guard.service';
import { DashboardResolver } from '../masters/resolvers/dashboard.resolver';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'default', component: DefaultComponent,
        children: [
          { path: '', component: DashboardComponent, resolve: { dashboardResolver: DashboardResolver } },
          { path: 'cfs', loadChildren: () => import('./../cfs/cfs.module').then(m => m.CfsModule), canActivate: [AuthGuardService] },
          {
            path: 'transporter', loadChildren: () => import('./../transporter/transporter.module')
              .then(m => m.TransporterModule), canActivate: [AuthGuardService]
          },
          {
            path: 'masters', loadChildren: () => import('./../masters/master.module')
              .then(m => m.MasterModule), canActivate: [AuthGuardService]
          },
          {
            path: 'profile', loadChildren: () => import('./../profile/profile.module')
              .then(m => m.ProfileModule), canActivate: [AuthGuardService]
          },
          {
            path: 'settings', loadChildren: () => import('./../settings/settings.module')
              .then(m => m.SettingsModule), canActivate: [AuthGuardService]
          }
        ]
      }
    ]),
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [
    DashboardService,
    AuthGuardService,
    DashboardResolver
  ]
})
export class DefaultModule { }
