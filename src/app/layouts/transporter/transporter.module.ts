import { AppDateFormats } from './../../shared/date-formats';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TransporterComponent } from './transporter.component';

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
import { VehicleRegistrationComponent } from './vehicle-registration/vehicle-registration.component';
import { VehicleListComponent } from './vehilcle-list/vehicle-list.component';
import { VehicleService } from './services/vehicle.service';
import { TransporterRegistrationComponent } from './transporter-registration/transporter-registration.component';
import { DriverRegistrationComponent } from './driver-registration/driver-registration.component';
import { TransporterListComponent } from './transporter-list/transporter-list.component';
import { MaterialFileInputModule, FileInputConfig, NGX_MAT_FILE_INPUT_CONFIG } from 'ngx-material-file-input';
import { PlacedBidsComponent } from './placed-bids/placed-bids.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatNativeDateModule, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter } from 'src/app/shared/date-formats';
import { Platform } from '@angular/cdk/platform';
import { BidsComponent } from './bids/bids.component';
import { config } from 'rxjs';
import { MyTripsComponent } from './my-trips/my-trips.component';

import { MyTripsListComponent } from './my-trips/my-trips-list.component';
import { MyTripsNewComponent } from './my-trips/my-trips-new.component';
import { MyTripsEditComponent } from './my-trips/my-trips-edit.component';
import { MyTripsFormComponent } from './my-trips/my-trips-form.component';


const routes: Routes = [
  { path: '', component: TransporterComponent },
  { path: 'register-vehicle', component: VehicleRegistrationComponent },
  { path: 'vehicle-list', component: VehicleListComponent },
  { path: 'register-transporter', component: TransporterRegistrationComponent },
  { path: 'register-driver', component: DriverRegistrationComponent },
  { path: 'transporter-list', component: TransporterListComponent },
  { path: 'placed-bids', component: PlacedBidsComponent },
  { path: 'bids', component: BidsComponent },
  {
    path: 'my-trips', component: MyTripsComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: MyTripsListComponent },
      { path: 'new', component: MyTripsNewComponent },
     { path: 'edit/:id', component: MyTripsEditComponent},
    //resolve: { portsResolver: PortsResolver } },
    ]
  }
];

const toasterConfig: MatSnackBarConfig = {
  horizontalPosition: 'right',
  verticalPosition: 'top',
  duration: 2500
};

//export const config: FileInputConfig = {
//sizeUnit: 'Octet'
//};


@NgModule({
  declarations: [
    TransporterComponent,
    VehicleRegistrationComponent,
    VehicleListComponent,
    TransporterRegistrationComponent,
    DriverRegistrationComponent,
    TransporterListComponent,
    PlacedBidsComponent,
    BidsComponent,

    MyTripsComponent,
    MyTripsListComponent,
    MyTripsNewComponent,
    MyTripsEditComponent,
    MyTripsFormComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MaterialFileInputModule,
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
    VehicleService,
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
export class TransporterModule { }
