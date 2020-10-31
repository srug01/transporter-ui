import { MatDialogModule } from '@angular/material/dialog';
import { BidsResolver } from './resolvers/biddetails.resolver';
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
import { VehicleService } from './services/vehicle.service';
import { TransporterRegistrationComponent } from './transporter-registration/transporter-registration.component';
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
import { VehicleRegistrationNewComponent } from './vehicle-registration/vehicle-registration-new.component';
import { VehicleRegistrationListComponent } from './vehicle-registration/vehicle-registration-list.component';
import { VehicleRegistrationFormComponent } from './vehicle-registration/vehicle-registration-form.component';
import { VehicleRegistrationEditComponent } from './vehicle-registration/vehicle-registration-edit.component';
import { VehicleResolver } from './resolvers/vehicle.resolver';
import { TripResolver } from './resolvers/trip.resolver';
import { DriverDetailsComponent } from './driver-registration/driver-details.component';
import { DriverEditComponent } from './driver-registration/driver-edit.component';
import { DriverFormRegisterComponent } from './driver-registration/driver-register-form.component';
import { DriverMasterListComponent } from './driver-registration/driver-master-list.component';
import { DriverNewComponent } from './driver-registration/driver-new.component';
import { DriverComponent } from './driver-registration/driver.component';
import { DriverResolver } from './resolvers/driver.resolver';
import { BiddetailsComponent } from './bids/biddetails.component';
import { BidEditComponent } from './bid-edit/bid-edit.component';
import { TripDetailsComponent } from './my-trips/trip-details.component';
import { TripDetailsResolver } from './resolvers/tripDetailsResolver';
import { CommonSharedModule } from 'src/app/shared/common.shared.module';
import { MatDividerModule } from '@angular/material/divider';
import { ConfirmBidDialogComponent } from './confirm-bid-dialog/confirm-bid-dialog.component';
import { EditTransporterComponent } from './edit-transporter/edit-transporter.component';
import { TransporterResolver } from './resolvers/transporter.resolver';
import { TripsComponent } from './trips/trips.component';
import { TripsListComponent } from './trips/trips-list.component';
import { TripsNewComponent } from './trips/trips-new.component';
import { TripsEditComponent } from './trips/trips-edit.component';
import { TripsDetailsComponent } from './trips/trips-details.component';
import { TransporterFormComponent } from './transporter-form/transporter-form.component';
import { MatSortModule } from '@angular/material/sort';

const routes: Routes = [
  { path: '', component: TransporterComponent, data: { breadcrumb: 'home' } },
  {
    path: 'register-vehicle', component: VehicleRegistrationComponent,
    data: { breadcrumb: 'register-vehicle', roles: ['Transporter', 'Admin'] },
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: VehicleRegistrationListComponent, data: { breadcrumb: 'vehicle-list', roles: ['Transporter', 'Admin'] } },
      { path: 'new', component: VehicleRegistrationNewComponent, data: { breadcrumb: 'new-vehicle', roles: ['Transporter', 'Admin'] } },
      {
        path: 'edit/:id', component: VehicleRegistrationEditComponent, resolve: { vehicleResolver: VehicleResolver },
        data: { breadcrumb: 'edit-vehicle', roles: ['Transporter', 'Admin'] }
      }
    ]
  },

  {
    path: 'register-transporter', component: TransporterRegistrationComponent,
    data: { breadcrumb: 'register-transporter', roles: ['Transporter', 'Admin'] }
  },
  {
    path: 'register-driver', component: DriverComponent,
    data: { breadcrumb: 'register-driver', roles: ['Transporter', 'Admin'] },
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: DriverMasterListComponent, data: { breadcrumb: 'driver-list', roles: ['Transporter', 'Admin'] } },
      { path: 'new', component: DriverNewComponent, data: { breadcrumb: 'new-driver', roles: ['Transporter', 'Admin'] } },
      {
        path: 'edit/:id', component: DriverEditComponent, resolve: { driverResolver: DriverResolver },
        data: { breadcrumb: 'edit-driver', roles: ['Transporter', 'Admin'] }
      }
    ]

  },
  { path: 'transporter-list', component: TransporterListComponent, 
    data: { breadcrumb: 'transporter-list', roles: ['Transporter','Admin'] } },
  {
    path: 'transporter-edit/:id', component: EditTransporterComponent, resolve: { transporterResolver: TransporterResolver },
    data: { breadcrumb: 'edit-transporter', roles: ['Transporter','Admin'] }
  },
  { path: 'placed-bids', component: PlacedBidsComponent, data: { breadcrumb: 'placed-bids', roles: ['Transporter','Admin'] } },
  { path: 'bids', component: BidsComponent, data: { breadcrumb: 'bids', roles: ['Transporter','Admin'] } },
  {
    path: 'bids/:id', component: BiddetailsComponent, resolve: { bidResolver: BidsResolver },
    data: { breadcrumb: 'bid-details', roles: ['Transporter','Admin'] }
  },
  {
    path: 'bid-edit/:id', component: BidEditComponent, resolve: { bidResolver: BidsResolver },
    data: { breadcrumb: 'bid-edit', roles: ['Transporter','Admin'] }
  },
  {
    path: 'my-trips', component: MyTripsComponent,
    data: { breadcrumb: 'my-trips', roles: ['Transporter'] },
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: MyTripsListComponent, data: { breadcrumb: 'list', roles: ['Transporter'] } },
      { path: 'new', component: MyTripsNewComponent, data: { breadcrumb: 'new', roles: ['Transporter'] } },
      {
        path: 'edit/:id', component: MyTripsEditComponent, data: { breadcrumb: 'edit', roles: ['Transporter'] },
        resolve: { tripResolver: TripResolver }
      },
      {
        path: 'details/:id', component: TripDetailsComponent, data: { breadcrumb: 'my-trip-details', roles: ['Transporter'] },
        resolve: { tripDetailsResolver: TripDetailsResolver }
      }
    ]
  },
  {
    path: 'trips', component: TripsComponent,
    data: { breadcrumb: 'trips', roles: ['Admin'] },
    children: [
      { path: '', redirectTo: 'trip-list', pathMatch: 'full' },
      { path: 'trip-list', component: TripsListComponent, data: { breadcrumb: 'trip-list', roles: ['Admin'] } },
      { path: 'trip-new', component: TripsNewComponent, data: { breadcrumb: 'trip-new', roles: ['Admin'] } },
      {
        path: 'trip-edit/:id', component: TripsEditComponent, data: { breadcrumb: 'trip-edit', roles: ['Admin'] },
        resolve: { tripResolver: TripResolver }
      },
      {
        path: 'trip-details/:id', component: TripsDetailsComponent, data: { breadcrumb: 'trip-details', roles: ['Admin'] },
        resolve: { tripDetailsResolver: TripDetailsResolver }
      }
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
    TransporterRegistrationComponent,
    TransporterListComponent,
    PlacedBidsComponent,
    BidsComponent,
    MyTripsComponent,
    MyTripsListComponent,
    MyTripsNewComponent,
    MyTripsEditComponent,
    MyTripsFormComponent,
    VehicleRegistrationNewComponent,
    VehicleRegistrationListComponent,
    VehicleRegistrationFormComponent,
    VehicleRegistrationEditComponent,
    DriverComponent,
    DriverMasterListComponent,
    DriverEditComponent,
    DriverDetailsComponent,
    DriverFormRegisterComponent,
    DriverNewComponent,
    BiddetailsComponent,
    BidEditComponent,
    TripDetailsComponent,
    ConfirmBidDialogComponent,
    EditTransporterComponent,
    TripsComponent,
    TripsListComponent,
    TripsEditComponent,
    TripsDetailsComponent,
    TransporterFormComponent
  ],
  imports: [
    CommonModule,
    CommonSharedModule,
    MatSnackBarModule,
    MaterialFileInputModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatInputModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule.forChild(routes,),
    MatDialogModule,
    MatSortModule
  ],
  providers: [
    VehicleService,
    VehicleResolver,
    TripResolver,
    TripDetailsResolver,
    DriverResolver,
    BidsResolver,
    TransporterResolver,
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
