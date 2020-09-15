import { HttpClientModule } from '@angular/common/http';
import { SettingsComponent } from './settings.component';
import { AppDateFormats } from './../../shared/date-formats';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MaterialFileInputModule, FileInputConfig, NGX_MAT_FILE_INPUT_CONFIG } from 'ngx-material-file-input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatNativeDateModule, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter } from 'src/app/shared/date-formats';
import { Platform } from '@angular/cdk/platform';
import { config } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserManagementComponent } from './user-management/user-management.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AuthGuardService } from 'src/app/services/auth.guard.service';
import { RoleGuardService } from 'src/app/services/role.guard.service';

const routes: Routes = [
  {
    path: '', component: SettingsComponent, data: { breadcrumb: 'cfs', roles: ['Admin'] },
    canActivate: [AuthGuardService, RoleGuardService]
  },
  {
    path: 'configuration', component: ConfigurationComponent, canActivate: [AuthGuardService, RoleGuardService],
    data: { breadcrumb: 'configuration', roles: ['Admin'] }
  },
  {
    path: 'user-management', component: UserManagementComponent, canActivate: [AuthGuardService, RoleGuardService],
    data: { breadcrumb: 'user-management', roles: ['Admin'] }
  }
];

const toasterConfig: MatSnackBarConfig = {
  horizontalPosition: 'right',
  verticalPosition: 'top',
  duration: 2500
};

@NgModule({
  declarations: [
    SettingsComponent,
    UserManagementComponent,
    ConfigurationComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    HttpClientModule,
    RouterModule,
    MatDialogModule,
    MatDividerModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    HighchartsChartModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: toasterConfig },
    { provide: NGX_MAT_FILE_INPUT_CONFIG, useValue: config },
    MatDatepickerModule,
    DatePipe,
    {
      provide: DateAdapter, useClass: AppDateAdapter, deps: [MAT_DATE_LOCALE, Platform]
    },
    {
      provide: MAT_DATE_FORMATS, useValue: AppDateFormats
    }
  ]
})
export class SettingsModule { }