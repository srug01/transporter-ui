import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfsComponent } from './cfs.component';

import { Routes, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';


import { CreateOrderComponent } from './create-order/create-order.component';
import { PlacedBidsComponent } from './placed-bids/placed-bids.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import {NumbersOnly} from './../../shared/directives/numbersonly.directive';

const routes: Routes = [
  { path: '', component: CfsComponent },
  { path: 'create-order', component: CreateOrderComponent },
  { path: 'placed-bids', component: PlacedBidsComponent },
  { path: 'register-user', component: UserRegistrationComponent }
];


@NgModule({
  declarations: [CfsComponent, CreateOrderComponent, PlacedBidsComponent, UserRegistrationComponent,
    NumbersOnly
  ],
  imports: [
    CommonModule,
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
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],

})
export class CfsModule { }
