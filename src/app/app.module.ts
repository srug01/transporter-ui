import { TokenInterceptor } from './interceptors/token.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AuthenticationService } from './services/authentication.service';
import { LocalStorageService } from './services/storage.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    DefaultModule,
    RouterModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    LocalStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    // {provide: ErrorHandler, useClass: GlobalErrorHandler},
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
