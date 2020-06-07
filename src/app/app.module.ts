import { TokenInterceptor } from './interceptors/token.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AuthenticationService } from './services/authentication.service';
import { LocalStorageService } from './services/storage.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfirmDialogComponent } from './shared/dialogs/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';
import { RegistrationComponent } from './registration/registration.component';
import { CustomerSignupComponent } from './registration/customer-signup/customer-signup.component';
import { DriverSignupComponent } from './registration/driver-signup/driver-signup.component';
import { TransporterSignupComponent } from './registration/transporter-signup/transporter-signup.component';
import { SignupComponent } from './registration/signup/signup.component';
import { MatIconModule } from '@angular/material/icon';
import { SignupService } from './services/signup.service';
import { SignupHeaderComponent } from './shared/component/signup-header/signup-header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { SignupSidebarComponent } from './shared/component/signup-sidebar/signup-sidebar.component';
import { MatListModule } from '@angular/material/list';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const toasterConfig: MatSnackBarConfig = {
  horizontalPosition: 'right',
  verticalPosition: 'top',
  duration: 2500
};

@NgModule({
  declarations: [
    AppComponent,
    SignupHeaderComponent,
    ConfirmDialogComponent,
    RegistrationComponent,
    CustomerSignupComponent,
    DriverSignupComponent,
    TransporterSignupComponent,
    SignupComponent,
    SignupHeaderComponent,
    SignupSidebarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    HttpClientModule,
    DefaultModule,
    RouterModule,
    MatDialogModule,
    AppRoutingModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    HighchartsChartModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  providers: [
    LocalStorageService,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: toasterConfig },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    // {provide: ErrorHandler, useClass: GlobalErrorHandler},
    AuthenticationService,
    SignupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
