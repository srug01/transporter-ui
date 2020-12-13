import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { EmailComponent } from './component/email.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { EmailMaterialModule } from './email-material.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

const routes: Routes = [
  { path: '', component: EmailComponent }
];

@NgModule({
  declarations: [
    EmailComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    CKEditorModule,
    EmailMaterialModule,
    RouterModule.forChild(routes,)
  ],
  providers: [],
  exports: [ EmailComponent ],
})
export class EmailModule { }
