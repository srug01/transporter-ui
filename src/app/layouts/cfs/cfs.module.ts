import { MatDividerModule } from '@angular/material/divider';
import { AppDateFormats } from './../../shared/date-formats';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CfsComponent } from './cfs.component';

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
import { CreateOrderComponent } from './create-order/create-order.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatNativeDateModule, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { UserRegistrationListComponent } from './user-registration-list/user-registration-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { MatIconModule } from '@angular/material/icon';
import { AppDateAdapter } from 'src/app/shared/date-formats';
import { Platform } from '@angular/cdk/platform';
import { PendingOrderListComponent } from './pending-order-list/pending-order-list.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { CommonSharedModule } from 'src/app/shared/common.shared.module';
import { UserRegistrationEditComponent } from './user-registration-edit/user-registration-edit.component';
import { UserRegistrationResolver } from './resolvers/user-registration.resolver';
import { AuthGuardService } from 'src/app/services/auth.guard.service';
import { RoleGuardService } from 'src/app/services/role.guard.service';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { OverlayModule } from '@angular/cdk/overlay';

import { MatMomentDateModule, MomentDateAdapter, MAT_MOMENT_DATE_FORMATS, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatSortModule } from '@angular/material/sort';

//import {NumbersOnly} from './../../shared/directives/numbersonly.directive';

const routes: Routes = [
  {
    path: '', component: CfsComponent, data: { breadcrumb: 'cfs', roles: ['CFS Customer', 'CFS User admin', 'Admin', 'CFS User Super admin', 'CFS user Viewer'] },
    canActivate: [AuthGuardService, RoleGuardService]
  },
  {
    path: 'create-order', component: CreateOrderComponent, canActivate: [AuthGuardService, RoleGuardService],
    data: { breadcrumb: 'create-order', roles: ['CFS Customer', 'CFS User admin', 'Admin', 'CFS User Super admin', 'CFS User Viewer'] }
  },
  {
    path: 'register-user', component: UserRegistrationComponent, canActivate: [AuthGuardService, RoleGuardService],
    data: { breadcrumb: 'user-registration', roles: ['CFS Customer', 'CFS User admin', 'Admin', 'CFS User Super admin', 'CFS User Viewer'] }
  },
  {
    path: 'user-list', component: UserRegistrationListComponent, data: {
      breadcrumb: 'user-list',
      roles: ['CFS Customer', 'CFS User admin', 'Admin', 'CFS User Super admin', 'CFS User Viewer']
    },
    canActivate: [AuthGuardService, RoleGuardService]
  },
  {
    path: 'user-list-edit/:id', component: UserRegistrationEditComponent, resolve: {
      userRegistrationResolver: UserRegistrationResolver
    }, data: {
      breadcrumb: 'user-list-edit',
      roles: ['CFS Customer', 'CFS User admin', 'Admin', 'CFS User Super admin', 'CFS User Viewer']
    },
    canActivate: [AuthGuardService, RoleGuardService]
  },
  {
    path: 'order-list', component: OrderListComponent, data: {
      breadcrumb: 'order-list',
      roles: ['CFS Customer', 'CFS User admin', 'Admin', 'CFS User Super admin', 'CFS User Viewer']
    },
    canActivate: [AuthGuardService, RoleGuardService]
  },
  {
    path: ':id/edit', component: EditOrderComponent, data: {
      breadcrumb: 'edit-order',
      roles: ['CFS Customer', 'CFS User admin', 'Admin', 'CFS User Super admin', 'CFS User Viewer']
    },
    canActivate: [AuthGuardService, RoleGuardService]
  },
  {
    path: ':id/order-details', component: OrderDetailsComponent, data: {
      breadcrumb: 'order-details',
      roles: ['CFS Customer', 'CFS User admin', 'Admin', 'CFS User Super admin', 'CFS User Viewer']
    },
    canActivate: [AuthGuardService, RoleGuardService]
  }
];


@NgModule({
  declarations: [
    CfsComponent,
    CreateOrderComponent,
    UserRegistrationComponent,
    OrderListComponent,
    OrderDetailsComponent,
    UserRegistrationListComponent,
    PendingOrderListComponent,
    EditOrderComponent,
    UserRegistrationEditComponent
  ],
  imports: [
    CommonModule,
    CommonSharedModule,
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
    MatDividerModule,
    MatTooltipModule,
    MatSortModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    MatDatepickerModule,
    DatePipe,
    UserRegistrationResolver,
    {
      provide: DateAdapter, useClass: AppDateAdapter, deps: [MAT_DATE_LOCALE, Platform]
    },
    // Comment out the line below to turn off UTC:
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    // These should be provided by MatMomentDateModule, but it has never worked in stackblitz for some reason:
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }

  ]
})
export class CfsModule { }
