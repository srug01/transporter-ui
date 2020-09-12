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



import { ContainerComponent } from './container/container.component';
import { WeightComponent } from './weight/weight.component';
import { CfsportrateComponent } from './cfsportrate/cfsportrate.component';
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
import { CfsportrateMasterListComponent } from './cfsportrate/cfsportrate-master-list.component';




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
import { CfsPortRateDetailsComponent } from './cfsportrate/cfsportrate-details.component';
import { CfsportrateEditComponent } from './cfsportrate/cfsportrate-edit.component';
import { CfsportrateFormComponent } from './cfsportrate/cfsportrate-form.component';
import { CfsportrateNewComponent } from './cfsportrate/cfsportrate-new.component';
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
import { CfsResolver } from './resolvers/cfs.resolver';
import { CfsPortRateResolver } from './resolvers/cfsportrate.resolver';
import { NumbersOnly } from './../../shared/directives/numbersonly.directive';
import { LocationComponent } from './location/location.component';
import { LocationNewComponent } from './location/location-new.component';
import { LocationListComponent } from './location/location-list.component';
import { LocationEditComponent } from './location/location-edit.component';
import { LocationFormComponent } from './location/location-form.component';
import { LocationDetailsComponent } from './location/location-details.component';
import { LocationResolver } from './resolvers/location.resolver';
import { SettingFormComponent } from './setting/setting-form.component';
import { SettingEditComponent } from './setting/setting-edit.component';
import { SettingListComponent } from './setting/setting-list.component';
import { SettingDetailsComponent } from './setting/setting-details.component';
import { SettingNewComponent } from './setting/setting-new.component';
import { SettingComponent } from './setting/setting.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PortterminalmasterComponent } from './portterminalmaster/portterminalmaster.component';
import { PortterminalmasterDetailsComponent } from './portterminalmaster/portterminalmaster-details.component';
import { PortterminalmasterEditComponent } from './portterminalmaster/portterminalmaster-edit.component';
import { PortterminalmasterFormComponent } from './portterminalmaster/portterminalmaster-form.component';
import { PortterminalmasterNewComponent } from './portterminalmaster/portterminalmaster-new.component';
import { PortterminalmasterListComponent } from './portterminalmaster/portterminalmaster-list.component';
import { PortTerminalMasterResolver } from './resolvers/portTerminalMaster.resolver';
import { PortcfsrateComponent } from './portcfsrate/portcfsrate.component';
import { PortcfsrateNewComponent } from './portcfsrate/portcfsrate-new.component';
import { PortcfsrateMasterListComponent } from './portcfsrate/portcfsrate-master-list.component';
import { PortcfsrateFormComponent } from './portcfsrate/portcfsrate-form.component';
import { PortcfsrateEditComponent } from './portcfsrate/portcfsrate-edit.component';
import { PortcfsrateDetailsComponent } from './portcfsrate/portcfsrate-details.component';
import { CfsyardrateComponent } from './cfsyardrate/cfsyardrate.component';
import { CfsyardrateNewComponent } from './cfsyardrate/cfsyardrate-new.component';
import { CfsyardrateMasterListComponent } from './cfsyardrate/cfsyardrate-master-list.component';
import { CfsyardrateFormComponent } from './cfsyardrate/cfsyardrate-form.component';
import { CfsyardrateEditComponent } from './cfsyardrate/cfsyardrate-edit.component';
import { CfsyardrateDetailsComponent } from './cfsyardrate/cfsyardrate-details.component';
import { CfsYardRateResolver } from './resolvers/cfsyardrate.resolver';
import { PortCfsRateResolver } from './resolvers/portcfsrate.resolver';


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
    path: 'portterminalmaster', component: PortterminalmasterComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: PortterminalmasterListComponent },
      { path: 'new', component: PortterminalmasterNewComponent },
      { path: 'edit/:id', component: PortterminalmasterEditComponent,
       resolve: { portTerminalMasterResolver : PortTerminalMasterResolver  } },
      { path: 'details/:id', component: PortterminalmasterDetailsComponent }
    ]
  },



  {
    path: 'port', component: PortComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'port-list', component: PortMasterListComponent },
      { path: 'new', component: PortNewComponent },
      { path: 'edit/:id', component: PortEditComponent, resolve: { portsResolver: PortsResolver } },
      { path: 'details/:id', component: PortDetailsComponent }
    ]
  },
  {
    path: 'location', component: PortComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'location-list', component: LocationListComponent },
      { path: 'new', component: LocationNewComponent },
      { path: 'edit/:id', component: LocationEditComponent, resolve: { locationResolver: LocationResolver } },
      { path: 'details/:id', component: LocationDetailsComponent }
    ]
  },
  {
    path: 'mileage', component: MileageComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: MileageMasterListComponent },
      { path: 'new', component: MileageNewComponent },
      {
        path: 'edit/:id', component: MileageEditComponent,
        resolve: { mileagesResolver: MileagesResolver }
      },
      { path: 'details/:id', component: MileageDetailsComponent }

    ]
  },
  {
    path: 'yard', component: YardComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: YardMasterListComponent },
      { path: 'new', component: YardNewComponent },
      { path: 'edit/:id', component: YardEditComponent, resolve: { yardsResolver: YardsResolver } },
      { path: 'details/:id', component: YardDetailsComponent }

    ]
  },
  {
    path: 'yard-port-map', component: YardportmapComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: YardportmapMasterListComponent },
      { path: 'new', component: YardportmapNewComponent },
      { path: 'edit/:id', component: YardportmapEditComponent, resolve: { yardportmapResolver: YardPortMapResolver } },
      { path: 'details/:id', component: YardportmapDetailsComponent }

    ]


  },
  {
    path: 'container', component: ContainerComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ContainerMasterListComponent },
      { path: 'new', component: ContainerNewComponent },
      { path: 'edit/:id', component: ContainerEditComponent, resolve: { containerResolver: ContainerResolver } },
      { path: 'details/:id', component: ContainerDetailsComponent }

    ]
  },
  {
    path: 'weight', component: WeightComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: WeightMasterListComponent },
      { path: 'new', component: WeightNewComponent },
      { path: 'edit/:id', component: WeightEditComponent, resolve: { weightsResolver: WeightsResolver } },
      { path: 'details/:id', component: WeightDetailsComponent }
    ]
  },
  {
    path: 'state', component: StateComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: StateMasterListComponent },
      { path: 'new', component: StateNewComponent },
      {
        path: 'edit/:id', component: StateEditComponent,
        resolve: { statesResolver: StatesResolver }
      },
      { path: 'details/:id', component: StateDetailsComponent }
    ]
  },
  {
    path: 'yardcfsrate', component: YardcfsrateComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'yardcfsratelist', component: YardcfsrateMasterListComponent },
      { path: 'new', component: YardcfsrateNewComponent },
      {
        path: 'edit/:id', component: YardcfsrateEditComponent,
        resolve: { YardCFSRatesResolver: YardCFSRatesResolver }
      },
      { path: 'details/:id', component: YardcfsrateDetailsComponent }
    ]
  },
  {
    path: 'cfs-port-rate', component: CfsportrateComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'cfs-port-rate-list', component: CfsportrateMasterListComponent },
      { path: 'new', component: CfsportrateNewComponent },
      {
        path: 'edit/:id', component: CfsportrateEditComponent,
        resolve: { cfsportrateResolver: CfsPortRateResolver }
      },
      { path: 'details/:id', component: CfsPortRateDetailsComponent }

    ]
  },
  {
    path: 'cfs-yard-rate', component: CfsyardrateComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: CfsyardrateMasterListComponent },
      { path: 'new', component: CfsyardrateNewComponent },
      {
        path: 'edit/:id', component: CfsyardrateEditComponent,
        resolve: { cfsyardrateResolver: CfsYardRateResolver }
      },
      { path: 'details/:id', component: CfsyardrateDetailsComponent }

    ]
  },
  {
    path: 'port-cfs-rate', component: PortcfsrateComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: PortcfsrateMasterListComponent },
      { path: 'new', component: PortcfsrateNewComponent },
      {
        path: 'edit/:id', component: PortcfsrateEditComponent,
        resolve: { portcfsrateResolver: PortCfsRateResolver }
      },
      { path: 'details/:id', component: PortcfsrateDetailsComponent }

    ]
  },
  {
    path: 'settings', component: SettingComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: SettingListComponent },
      { path: 'new', component: SettingNewComponent },
      { path: 'edit/:id', component: SettingEditComponent },
      { path: 'details/:id', component: SettingDetailsComponent }

    ]
  },
  {
    path: 'diesel', component: DieselComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'diesel-list', component: DieselMasterListComponent },
      { path: 'new', component: DieselNewComponent },
      {
        path: 'edit/:id', component: DieselEditComponent,
        resolve: { dieselResolver: DieselResolver }
      },
      { path: 'details/:id', component: DieselDetailsComponent }
    ]

  },
  {
    path: 'zone', component: ZoneComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ZoneMasterListComponent },
      { path: 'new', component: ZoneNewComponent },
      { path: 'edit/:id', component: ZoneEditComponent, resolve: { zonesResolver: ZonesResolver } },
      { path: 'details/:id', component: ZoneDetailsComponent }
    ]
  },
  {
    path: 'zone-day', component: ZonedayComponent,

    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ZonedayMasterListComponent },
      { path: 'new', component: ZonedayNewComponent },
      {
        path: 'edit/:id', component: ZonedayEditComponent,
        resolve: { zonedayResolver: ZoneDayResolver }
      },
      { path: 'details/:id', component: ZonedayEditComponent }
    ]


  },
  /**
   * Lists
   */
  { path: 'cfs-port-rate-master-list', component: CfsportrateMasterListComponent },
  { path: 'yard-cfs-rate-master-list', component: YardcfsrateMasterListComponent },
  { path: 'mileage-master-list', component: MileageMasterListComponent },
  { path: 'zone-master-list', component: ZoneMasterListComponent },
  {
    path: 'zone-day-master-list', component: ZonedayMasterListComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ZonedayMasterListComponent },
      { path: 'new', component: ZonedayNewComponent },
      {
        path: 'edit/:id', component: ZonedayEditComponent,
        resolve: { zonedayResolver: ZoneDayResolver }
      },
      { path: 'details/:id', component: ZonedayEditComponent }
    ]
  },
  { path: 'state-master-list', component: StateMasterListComponent },
];

@NgModule({
  declarations: [
    PortComponent,
    YardComponent,
    YardportmapComponent,
    ContainerComponent,
    WeightComponent,
    CfsportrateComponent,
    YardcfsrateComponent,
    MileageComponent,
    NumbersOnly,
    ZoneComponent,
    ZonedayComponent,
    StateComponent,
    PortMasterListComponent,
    CfsportrateMasterListComponent,
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
    CfsPortRateDetailsComponent,
    CfsportrateEditComponent,
    CfsportrateFormComponent,
    CfsportrateNewComponent,
    ZonedayDetailsComponent,
    ZonedayEditComponent,
    ZonedayFormComponent,
    ZonedayNewComponent,
    YardcfsrateDetailsComponent,
    YardcfsrateEditComponent,
    YardcfsrateFormComponent,
    YardcfsrateNewComponent,
    CfsComponent,
    CfsDetailsComponent,
    CfsEditComponent,
    CfsFormComponent,
    CfsMasterListComponent,
    CfsNewComponent,
    LocationComponent,
    LocationNewComponent,
    LocationListComponent,
    LocationEditComponent,
    LocationFormComponent,
    LocationDetailsComponent,
    SettingFormComponent,
    SettingEditComponent,
    SettingListComponent,
    SettingDetailsComponent,
    SettingNewComponent,
    SettingComponent,
    PortterminalmasterComponent,
    PortterminalmasterDetailsComponent,
    PortterminalmasterEditComponent,
    PortterminalmasterFormComponent,
    PortterminalmasterNewComponent,
    PortterminalmasterListComponent,
    PortcfsrateComponent,
    PortcfsrateNewComponent,
    PortcfsrateMasterListComponent,
    PortcfsrateFormComponent,
    PortcfsrateEditComponent,
    PortcfsrateDetailsComponent,
    CfsyardrateComponent,
    CfsyardrateNewComponent,
    CfsyardrateMasterListComponent,
    CfsyardrateFormComponent,
    CfsyardrateEditComponent,
    CfsyardrateDetailsComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgSelectModule,
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
    MatSnackBarModule
  ],
  providers: [
    StateMasterService,
    PortsResolver,
    LocationResolver,
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
    CfsResolver,
    CfsPortRateResolver,
    PortTerminalMasterResolver,
    CfsYardRateResolver,
    PortCfsRateResolver,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: toasterConfig }
  ]
})
export class MasterModule { }
