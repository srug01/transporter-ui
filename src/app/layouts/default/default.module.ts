import { MatInputModule } from '@angular/material/input';
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
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { RoleGuardService } from 'src/app/services/role.guard.service';
import { AuthComponent } from 'src/app/shared/auth/auth.component';
import { AuthResolver } from 'src/app/services/auth.resolver';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'default', component: DefaultComponent,
        canActivate: [AuthGuardService],
        children: [
          {
            path: '', component: DashboardComponent, resolve: { dashboardResolver: DashboardResolver },
            canActivate: [AuthGuardService],
            data: { breadcrumb: 'home' }
          },
          {
            path: 'cfs', loadChildren: () => import('./../cfs/cfs.module').then(m => m.CfsModule),
            canActivate: [AuthGuardService, RoleGuardService],
            data: { breadcrumb: 'cfs', roles: ['CFS Customer', 'CFS User admin', 'Admin'] }
          },
          {
            path: 'transporter', loadChildren: () => import('./../transporter/transporter.module')
              .then(m => m.TransporterModule),
            canActivate: [AuthGuardService, RoleGuardService],
            data: { breadcrumb: 'transporter', roles: ['Transporter', 'Driver', 'Admin'] }
          },
          {
            path: 'masters', loadChildren: () => import('./../masters/master.module')
              .then(m => m.MasterModule),
            canActivate: [AuthGuardService, RoleGuardService],
            data: { breadcrumb: 'masters', roles: ['Admin'] }
          },
          {
            path: 'profile', loadChildren: () => import('./../profile/profile.module')
              .then(m => m.ProfileModule), canActivate: [AuthGuardService],
            data: {
              title: 'profile',
              breadcrumb: [
                {
                  label: 'profile',
                  url: ''
                }
              ]
            }
          },
          {
            path: 'settings', loadChildren: () => import('./../settings/settings.module')
              .then(m => m.SettingsModule),
            canActivate: [AuthGuardService, RoleGuardService],
            data: { breadcrumb: 'settings', roles: ['Admin'] }
          },
          {
            path: 'reports', loadChildren: () => import('./../reports/reports.module')
              .then(m => m.ReportsModule),
            canActivate: [AuthGuardService, RoleGuardService],
            data: { breadcrumb: 'reports', roles: ['Admin'] }
          },
        ],
      },
      { path: '**', component: AuthComponent, resolve: { authResolver: AuthResolver } }
    ]),
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule
  ],
  providers: [
    DashboardService,
    AuthGuardService,
    RoleGuardService,
    DashboardResolver
  ]
})
export class DefaultModule { }
