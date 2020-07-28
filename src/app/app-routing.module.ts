import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './shared/auth/auth.component';
import { RegistrationComponent } from './registration/registration.component';
import { TransporterSignupComponent } from './registration/transporter-signup/transporter-signup.component';
import { CustomerSignupComponent } from './registration/customer-signup/customer-signup.component';
import { DriverSignupComponent } from './registration/driver-signup/driver-signup.component';


const routes: Routes = [
  { path: '', component: AuthComponent },
  {
    path: 'signup', component: RegistrationComponent,
    children: [
      { path: '', redirectTo: 'customer', pathMatch: 'full' },
      { path: 'customer', component: CustomerSignupComponent },
      { path: 'driver', component: DriverSignupComponent },
      { path: 'transporter', component: TransporterSignupComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
