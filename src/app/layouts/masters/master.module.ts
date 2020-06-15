import { PortsResolver } from './resolvers/port.resolver';
import { DriversResolver } from "./resolvers/driver.resolver";


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



import { ContainerComponent } from './container/container.component';
import { WeightComponent } from './weight/weight.component';
import { CfsrateComponent } from './cfsrate/cfsrate.component';
import { YardcfsrateComponent } from './yardcfsrate/yardcfsrate.component';
import { MileageComponent } from './mileage/mileage.component';

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




import { YardcfsrateMasterListComponent } from './yardcfsrate/yardcfsrate-master-list.component';
import { MileageMasterListComponent } from './mileage/mileage-master-list.component';

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
import { YardComponent } from './yard/yard.component';

import { ContainerDetailsComponent } from './container/container-details.component';
import { ContainerEditComponent } from './container/container-edit.component';
import { ContainerFormComponent } from './container/container-form.component';
import { ContainerNewComponent } from './container/container-new.component';
import { ContainerMasterListComponent } from './container/container-master-list.component';
import { ContainerResolver } from './resolvers/container.resolver';

import { YardportmapDetailsComponent } from './yardportmap/yardportmap-details.component';
import { YardportmapEditComponent } from './yardportmap/yardportmap-edit.component';
import { YardportmapFormComponent } from './yardportmap/yardportmap-form.component';
import { YardportmapNewComponent } from './yardportmap/yardportmap-new.component';
import { YardportmapComponent } from './yardportmap/yardportmap.component';
import { YardportmapMasterListComponent } from './yardportmap/yardportmap-master-list.component';
import { YardPortMapResolver } from './resolvers/yardportmap.resolver';

import { MileagesResolver } from './resolvers/mileage.resolver';

import { WeightDetailsComponent } from './weight/weight-details.component';
import { WeightEditComponent } from './weight/weight-edit.component';
import { WeightFormComponent } from './weight/weight-form.component';
import { WeightNewComponent } from './weight/weight-new.component';
import { WeightMasterListComponent } from './weight/weight-master-list.component';
import { WeightsResolver } from './resolvers/weight.resolver';

import { ZoneDetailsComponent } from './zone/zone-details.component';
import { ZoneEditComponent } from './zone/zone-edit.component';
import { ZoneFormComponent } from './zone/zone-form.component';
import { ZoneNewComponent } from './zone/zone-new.component';
import { ZoneMasterListComponent } from './zone/zone-master-list.component';
import { ZonesResolver } from "./resolvers/zone.resolver";
import { MileageNewComponent } from './mileage/mileage-new.component';
import { MileageDetailsComponent } from './mileage/mileage-details.component';
import { MileageEditComponent } from './mileage/mileage-edit.component';
import { MileageFormComponent } from './mileage/mileage-form.component';
import { StateDetailsComponent } from './state/state-details.component';
import { StateEditComponent } from './state/state-edit.component';
import { StateFormComponent } from './state/state-form.component';
import { StateNewComponent } from './state/state-new.component';
import { StatesResolver } from './resolvers/state.resolver';
import { DieselResolver } from './resolvers/diesel.resolver';
import { DieselDetailsComponent } from './diesel/diesel-details.component';
import { DieselEditComponent } from './diesel/diesel-edit.component';
import { DieselFormComponent } from './diesel/diesel-form.component';
import { DieselMasterListComponent } from './diesel/diesel-master-list.component';
import { DieselNewComponent } from './diesel/diesel-new.component';
import { DieselComponent } from './diesel/diesel.component';

import { CfsrateDetailsComponent } from './cfsrate/cfsrate-details.component';
import { CfsrateEditComponent } from './cfsrate/cfsrate-edit.component';
import { CfsrateFormComponent } from './cfsrate/cfsrate-form.component';
import { CfsrateNewComponent } from './cfsrate/cfsrate-new.component';
import { ZonedayDetailsComponent } from './zoneday/zoneday-details.component';
import { ZonedayEditComponent } from './zoneday/zoneday-edit.component';
import { ZonedayFormComponent } from './zoneday/zoneday-form.component';
import { ZonedayNewComponent } from './zoneday/zoneday-new.component';
import { ZoneDayResolver } from './resolvers/zonday.resolver';
import { YardcfsrateDetailsComponent } from './yardcfsrate/yardcfsrate-details.component';
import { YardcfsrateEditComponent } from './yardcfsrate/yardcfsrate-edit.component';
import { YardcfsrateFormComponent } from './yardcfsrate/yardcfsrate-form.component';
import { YardcfsrateNewComponent } from './yardcfsrate/yardcfsrate-new.component';
import { YardCFSRatesResolver } from './resolvers/yardcfsrate.resolver';

import { CfsComponent } from './cfs/cfs.component';
import { CfsDetailsComponent } from './cfs/cfs-details.component';
import { CfsEditComponent } from './cfs/cfs-edit.component';
import { CfsFormComponent } from './cfs/cfs-form.component';
import { CfsMasterListComponent } from './cfs/cfs-master-list.component';
import { CfsNewComponent } from './cfs/cfs-new.component';
import { CfsResolver} from './resolvers/cfs.resolver';
import { CfsrateResolver} from './resolvers/cfsrate.resolver';

import { NumbersOnly} from './../../shared/directives/numbersonly.directive';
// "./node_modules/@angular/material/prebuilt-themes/deeppurple-amber.css",

const toasterConfig: MatSnackBarConfig = {
  horizontalPosition: 'right',
  verticalPosition: 'top',
  duration: 2500
};

const routes: Routes = [
  {
    path: 'cfs', component: CfsComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: CfsMasterListComponent },
      { path: 'new', component: CfsNewComponent },
      { path: 'edit/:id', component: CfsEditComponent, resolve: { cfsResolver: CfsResolver } },
      { path: 'details/:id', component: CfsDetailsComponent }
    ]
  },
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

  { path: 'mileage', component: MileageComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: MileageMasterListComponent },
      { path: 'new', component: MileageNewComponent },
      { path: 'edit/:id', component: MileageEditComponent,
      resolve: { mileagesResolver: MileagesResolver } },
      { path: 'details/:id', component: MileageDetailsComponent }

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
  { path: 'yard-port-map', component: YardportmapComponent,
  children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: YardportmapMasterListComponent },
    { path: 'new', component: YardportmapNewComponent },
    { path: 'edit/:id', component: YardportmapEditComponent, resolve: { yardportmapResolver: YardPortMapResolver } },
    { path: 'details/:id', component: YardportmapDetailsComponent }

  ]


  },
  { path: 'container', component: ContainerComponent,
  children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ContainerMasterListComponent },
    { path: 'new', component: ContainerNewComponent },
    { path: 'edit/:id', component: ContainerEditComponent, resolve: { containerResolver: ContainerResolver } },
    { path: 'details/:id', component: ContainerDetailsComponent }

  ]},
  { path: 'weight', component: WeightComponent,
  children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: WeightMasterListComponent },
    { path: 'new', component: WeightNewComponent },
    { path: 'edit/:id', component: WeightEditComponent, resolve: { weightsResolver: WeightsResolver } },
    { path: 'details/:id', component: WeightDetailsComponent }
  ]},

  { path: 'state', component: StateComponent,
  children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: StateMasterListComponent },
    { path: 'new', component: StateNewComponent },
    { path: 'edit/:id', component: StateEditComponent,
      resolve: { statesResolver: StatesResolver } },
    { path: 'details/:id', component: StateDetailsComponent }
  ]},

  
  { path: 'yardcfsrate', component: YardcfsrateComponent ,
  children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: YardcfsrateMasterListComponent },
    { path: 'new', component: YardcfsrateNewComponent },
    { path: 'edit/:id', component: YardcfsrateEditComponent, 
        resolve: { YardCFSRatesResolver: YardCFSRatesResolver } },
    { path: 'details/:id', component: YardcfsrateDetailsComponent }
  ]},

  { path: 'cfs-rate', component: CfsrateComponent,
  children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: CfsrateMasterListComponent },
    { path: 'new', component: CfsrateNewComponent },
    { path: 'edit/:id', component: CfsrateEditComponent, resolve: { cfsrateResolver: CfsrateResolver } },
    { path: 'details/:id', component: CfsrateDetailsComponent }

  ]},
  
  
  { path: 'diesel', component: DieselComponent ,
  children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: DieselMasterListComponent },
    { path: 'new', component: DieselNewComponent },
    { path: 'edit/:id', component: DieselEditComponent,
        resolve: { dieselResolver: DieselResolver } },
    { path: 'details/:id', component: DieselDetailsComponent }
  ]

},
  { path: 'zone', component: ZoneComponent,
  children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ZoneMasterListComponent },
    { path: 'new', component: ZoneNewComponent },
    { path: 'edit/:id', component: ZoneEditComponent, resolve: { zonesResolver: ZonesResolver } },
    { path: 'details/:id', component: ZoneDetailsComponent }
  ]
  },
  { path: 'zone-day', component: ZonedayComponent ,

  children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ZonedayMasterListComponent },
    { path: 'new', component: ZonedayNewComponent },
    { path: 'edit/:id', component: ZonedayEditComponent, 
    resolve: { zonedayResolver: ZoneDayResolver } },
    { path: 'details/:id', component: ZonedayEditComponent }
  ]


},
  
  /**
   * Lists
   */



  { path: 'cfs-rate-master-list', component: CfsrateMasterListComponent },
  { path: 'yard-cfs-rate-master-list', component: YardcfsrateMasterListComponent },
  { path: 'mileage-master-list', component: MileageMasterListComponent },

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
    NumbersOnly,
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
    ContainerNewComponent,
    YardportmapDetailsComponent,
    YardportmapEditComponent,
    YardportmapFormComponent,
    YardportmapNewComponent,
    WeightDetailsComponent,
    WeightEditComponent,
    WeightFormComponent,
    WeightNewComponent,
    ZoneMasterListComponent,
    ZoneComponent,
    ZoneDetailsComponent,
    ZoneEditComponent,
    ZoneNewComponent,
    ZoneFormComponent,
    MileageNewComponent,
    MileageDetailsComponent,
    MileageEditComponent,
    MileageFormComponent,
    StateDetailsComponent,
    StateEditComponent,
    StateFormComponent,
    StateNewComponent,
    DieselDetailsComponent,
    DieselEditComponent,
    DieselFormComponent,
    DieselMasterListComponent,
    DieselNewComponent,
    DieselComponent,
    CfsrateDetailsComponent,
    CfsrateEditComponent,
    CfsrateFormComponent,
    CfsrateNewComponent,
    ZonedayDetailsComponent,
    ZonedayEditComponent,
    ZonedayFormComponent,
    ZonedayNewComponent,
    YardcfsrateDetailsComponent,
    YardcfsrateEditComponent,
    YardcfsrateFormComponent,
    YardcfsrateNewComponent,

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
    YardPortMapResolver,
    WeightsResolver,
    ZonesResolver,
    MileagesResolver,
    StatesResolver,
    DieselResolver,
    ZoneDayResolver,
    YardCFSRatesResolver,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: toasterConfig }
  ]
})
export class MasterModule { }
