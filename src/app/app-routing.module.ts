import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './shared/auth/auth.component';
import { AuthResolver } from './services/auth.resolver';

const routes: Routes = [
  { path: '', component: AuthComponent, resolve: { authResolver: AuthResolver } },
  {
    path: 'signup', loadChildren: () => import('./layouts/registration/registration.module')
      .then(m => m.RegistrationModule),
    data: { breadcrumb: 'signup'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [AuthResolver]
})
export class AppRoutingModule { }
