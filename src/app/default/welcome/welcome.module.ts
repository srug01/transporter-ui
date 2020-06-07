

import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import {
  LoginComponent,
} from './login/login.component';
import { WelcomeComponent } from './welcome.component';
import { CommonModule } from '@angular/common';

export const routes: Routes = [
  {
    path: '', component: WelcomeComponent,
    children: [
      { path: 'customer-tab', component: LoginComponent },
      { path: 'transporter-tab', component: LoginComponent },
      { path: 'driver-tab', component: LoginComponent },
    ]
  }
];


@NgModule({
  declarations: [
    LoginComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [],
})

export class WelcomeModule { }
