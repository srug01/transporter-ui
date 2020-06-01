import { PortsResolver } from './resolvers/port.resolver';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortComponent } from './port/port.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { YardComponent } from './yard/yard.component';
import { YardportmapComponent } from './yardportmap/yardportmap.component';
import { ContainerComponent } from './container/container.component';
import { WeightComponent } from './weight/weight.component';
import { CfsrateComponent } from './cfsrate/cfsrate.component';
import { YardcfsrateComponent } from './yardcfsrate/yardcfsrate.component';
import { MileageComponent } from './mileage/mileage.component';
import { DieselrateComponent } from './dieselrate/dieselrate.component';
import { ZoneComponent } from './zone/zone.component';
import { ZonedayComponent } from './zoneday/zoneday.component';
import { StateComponent } from './state/state.component';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';

/**
 * Services
 */
import { StateMasterService } from './services/state-master.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PortMasterListComponent } from './port/port-master-list.component';
import { CfsrateMasterListComponent } from './cfsrate/cfsrate-master-list.component';

import { YardportmapMasterListComponent } from './yardportmap/yardportmap-master-list.component';

import { WeightMasterListComponent } from './weight/weight-master-list.component';
import { YardcfsrateMasterListComponent } from './yardcfsrate/yardcfsrate-master-list.component';
import { MileageMasterListComponent } from './mileage/mileage-master-list.component';
import { DieselrateMasterListComponent } from './dieselrate/dieselrate-master-list.component';
import { ZoneMasterListComponent } from './zone/zone-master-list.component';
import { ZonedayMasterListComponent } from './zoneday/zoneday-master-list.component';
import { StateMasterListComponent } from './state/state-master-list.component';

import { PortEditComponent } from './port/port-edit.component';
import { PortNewComponent } from './port/port-new.component';
import { PortDetailsComponent } from './port/port-details.component';
import { PortFormComponent } from './port/port-form.component';

import { YardDetailsComponent } from './yard/yard-details.component';
import { YardEditComponent } from './yard/yard-edit.component';
import { YardFormComponent } from './yard/yard-form.component';
import { YardNewComponent } from './yard/yard-new.component';
import { YardMasterListComponent } from './yard/yard-master-list.component';
import { YardsResolver } from './resolvers/yard.resolver';

import { ContainerDetailsComponent } from './container/container-details.component';
import { ContainerEditComponent } from './container/container-edit.component';
import { ContainerFormComponent } from './container/container-form.component';
import { ContainerNewComponent } from './container/container-new.component';
import { ContainerMasterListComponent } from './container/container-master-list.component';
import { ContainerResolver } from './resolvers/container.resolver';

// "./node_modules/@angular/material/prebuilt-themes/deeppurple-amber.css",

const toasterConfig: MatSnackBarConfig = {
  horizontalPosition: 'right',
  verticalPosition: 'top',
  duration: 2500
};

const routes: Routes = [
  {
    path: 'port', component: PortComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: PortMasterListComponent },
      { path: 'new', component: PortNewComponent },
      { path: 'edit/:id', component: PortEditComponent, resolve: { portsResolver: PortsResolver } },
      { path: 'details/:id', component: PortDetailsComponent }
    ]
  },
  { path: 'yard', component: YardComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: YardMasterListComponent },
      { path: 'new', component: YardNewComponent },
      { path: 'edit/:id', component: YardEditComponent, resolve: { yardsResolver: YardsResolver } },
      { path: 'details/:id', component: YardDetailsComponent }

    ]
  },
  { path: 'yard-port-map', component: YardportmapComponent },
  { path: 'container', component: ContainerComponent,
  children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ContainerMasterListComponent },
    { path: 'new', component: ContainerNewComponent },
    { path: 'edit/:id', component: ContainerEditComponent, resolve: { containerResolver: ContainerResolver } },
    { path: 'details/:id', component: ContainerDetailsComponent }

  ]
  },
  { path: 'weight', component: WeightComponent },
  { path: 'cfs-rate', component: CfsrateComponent },
  { path: 'yard-cfs-rate', component: YardcfsrateComponent },
  { path: 'mileage', component: MileageComponent },
  { path: 'diesel-rate', component: DieselrateComponent },
  { path: 'zone', component: ZoneComponent },
  { path: 'zone-day', component: ZonedayComponent },
  { path: 'state', component: StateComponent },
  /**
   * Lists
   */

  { path: 'yard-port-map-master-list', component: YardportmapMasterListComponent },
  { path: 'weight-master-list', component: WeightMasterListComponent },
  { path: 'cfs-rate-master-list', component: CfsrateMasterListComponent },
  { path: 'yard-cfs-rate-master-list', component: YardcfsrateMasterListComponent },
  { path: 'mileage-master-list', component: MileageMasterListComponent },
  { path: 'diesel-rate-master-list', component: DieselrateMasterListComponent },
  { path: 'zone-master-list', component: ZoneMasterListComponent },
  { path: 'zone-day-master-list', component: ZonedayMasterListComponent },
  { path: 'state-master-list', component: StateMasterListComponent },
];

@NgModule({
  declarations: [
    PortComponent,
    YardComponent,
    YardportmapComponent,
    ContainerComponent,
    WeightComponent,
    CfsrateComponent,
    YardcfsrateComponent,
    MileageComponent,
    DieselrateComponent,
    ZoneComponent,
    ZonedayComponent,
    StateComponent,
    PortMasterListComponent,
    CfsrateMasterListComponent,
    YardMasterListComponent,
    YardportmapMasterListComponent,
    ContainerMasterListComponent,
    WeightMasterListComponent,
    YardcfsrateMasterListComponent,
    MileageMasterListComponent,
    DieselrateMasterListComponent,
    ZoneMasterListComponent,
    ZonedayMasterListComponent,
    StateMasterListComponent,
    PortEditComponent,
    PortNewComponent,
    PortDetailsComponent,
    PortFormComponent,
    YardDetailsComponent,
    YardEditComponent,
    YardFormComponent,
    YardNewComponent,
    ContainerDetailsComponent,
    ContainerEditComponent,
    ContainerFormComponent,
    ContainerNewComponent
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
    RouterModule.forChild(routes)
  ],
  providers: [
    StateMasterService,
    PortsResolver,
    YardsResolver,
    ContainerResolver,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: toasterConfig }
  ]
})
export class MasterModule { }
