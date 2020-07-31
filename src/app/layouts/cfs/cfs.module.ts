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
import { DateFormatPipe } from 'src/app/shared/pipe/date-format.pipe';
import { EditOrderComponent } from './edit-order/edit-order.component';



//import {NumbersOnly} from './../../shared/directives/numbersonly.directive';

const routes: Routes = [
  { path: '', component: CfsComponent },
  { path: 'create-order', component: CreateOrderComponent },
  { path: 'register-user', component: UserRegistrationComponent },
  { path: 'user-list', component: UserRegistrationListComponent },
  { path: 'order-list', component: OrderListComponent },
  { path: ':id/edit', component: EditOrderComponent },
  { path: ':id/order-details', component: OrderDetailsComponent },
  { path: 'user-list', component: UserRegistrationListComponent }
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
    DateFormatPipe,
    EditOrderComponent
  
  ],
  imports: [
    CommonModule,
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
    RouterModule.forChild(routes)
  ],
  providers: [
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
export class CfsModule { }
