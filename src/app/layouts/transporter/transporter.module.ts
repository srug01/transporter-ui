import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { MatIconModule} from '@angular/material/icon';
import { VehicleRegistrationComponent } from './vehicle-registration/vehicle-registration.component';
import { VehicleListComponent } from './vehilcle-list/vehicle-list.component';
import { VehicleService } from './services/vehicle.service';
import { TransporterRegistrationComponent } from './transporter-registration/transporter-registration.component';
import { DriverRegistrationComponent } from './driver-registration/driver-registration.component';
import { TransporterListComponent } from './transporter-list/transporter-list.component';
import { MaterialFileInputModule, FileInputConfig, NGX_MAT_FILE_INPUT_CONFIG } from 'ngx-material-file-input';


const routes: Routes = [
  { path: '', component: TransporterComponent },
  { path: 'register-vehicle', component: VehicleRegistrationComponent },
  { path: 'vehicle-list', component: VehicleListComponent },
  { path: 'register-transporter', component: TransporterRegistrationComponent },
  { path: 'register-driver', component: DriverRegistrationComponent },
  { path: 'transporter-list', component: TransporterListComponent }
];

const toasterConfig : MatSnackBarConfig = {
  horizontalPosition: 'right',
  verticalPosition: 'top',
  duration : 2500
};

export const config: FileInputConfig = {
  sizeUnit: 'Octet'
};


@NgModule({
  declarations: [
    TransporterComponent,
    VehicleRegistrationComponent,
    VehicleListComponent,
    TransporterRegistrationComponent,
    DriverRegistrationComponent,
    TransporterListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatGridListModule,
    MatDatepickerModule,
    MatInputModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatIconModule,
    RouterModule.forChild(routes),
    MaterialFileInputModule
  ],
  providers: [
    VehicleService,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: toasterConfig },
    { provide: NGX_MAT_FILE_INPUT_CONFIG, useValue: config }
  ]
})
export class TransporterModule { }
