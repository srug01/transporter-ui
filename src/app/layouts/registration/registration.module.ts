import { SignupComponent } from './signup/signup.component';
import { AppDateFormats } from './../../shared/date-formats';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { Platform } from '@angular/cdk/platform';
import { ToastrModule } from 'ngx-toastr';
import {
    MatMomentDateModule,
    MomentDateAdapter,
    MAT_MOMENT_DATE_FORMATS,
    MAT_MOMENT_DATE_ADAPTER_OPTIONS
} from '@angular/material-moment-adapter';
import { RegistrationComponent } from './registration.component';
import { CustomerSignupComponent } from './customer-signup/customer-signup.component';
import { DriverSignupComponent } from './driver-signup/driver-signup.component';
import { TransporterSignupComponent } from './transporter-signup/transporter-signup.component';
import { LocalStorageService } from 'src/app/services/storage.service';
import { TokenInterceptor } from 'src/app/interceptors/token.interceptor';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SignupService } from 'src/app/services/signup.service';
import { AppDateAdapter } from 'src/app/shared/date-formats';
import { SignupHeaderComponent } from 'src/app/shared/component/signup-header/signup-header.component';
import { SignupSidebarComponent } from 'src/app/shared/component/signup-sidebar/signup-sidebar.component';
import { StartDialogComponent } from 'src/app/shared/startDialog/start-dialog.component';
import { CommonModule } from '@angular/common';
//import {NumbersOnly} from './directives/numbersonly.directive';


const toasterConfig: MatSnackBarConfig = {
    horizontalPosition: 'right',
    verticalPosition: 'top',
    duration: 2500
};

const routes: Routes = [
    {
        path: '', component: RegistrationComponent,
        children: [
            { path: '', redirectTo: 'customer', pathMatch: 'full' },
            { path: 'customer', component: CustomerSignupComponent },
            { path: 'driver', component: DriverSignupComponent },
            { path: 'transporter', component: TransporterSignupComponent }
        ]
    }
];


@NgModule({
    declarations: [
        SignupHeaderComponent,
        SignupSidebarComponent,
        StartDialogComponent,
        RegistrationComponent,
        SignupComponent,
        CustomerSignupComponent,
        DriverSignupComponent,
        TransporterSignupComponent,

    ],
    imports: [
        CommonModule,
        MatSnackBarModule,
        HttpClientModule,
        RouterModule.forChild(routes),
        MatDialogModule,
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
        FormsModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
        })
    ],
    providers: [
        LocalStorageService,
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: toasterConfig },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
        // These should be provided by MatMomentDateModule, but it has never worked in stackblitz for some reason:
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
        // {provide: ErrorHandler, useClass: GlobalErrorHandler},
        AuthenticationService,
        SignupService,
        {
            provide: DateAdapter, useClass: AppDateAdapter, deps: [MAT_DATE_LOCALE, Platform]
        },
        {
            provide: MAT_DATE_FORMATS, useValue: AppDateFormats
        }
    ]
})
export class RegistrationModule { }
