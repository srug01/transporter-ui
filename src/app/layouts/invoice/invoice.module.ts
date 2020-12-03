import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
//import { TableRowComponent } from '../reports/orderreport/table-row/table-row.component';
import { GridComponent } from './component/grid.component';
import { InvoiceService } from './service/tripinvoice.service';
import { InvoiceMaterialModule } from './invoice-material.module';

const routes: Routes = [
  { path: 'edit/:id', component: GridComponent}
  // children: [
  //   { path: 'edit/:id', component: GridComponent },
  // ] }
];

@NgModule({
  declarations: [
    //TableRowComponent
    GridComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientJsonpModule,
    InvoiceMaterialModule,
    RouterModule.forChild(routes),

  ],
  providers: [
    InvoiceService
  ],
  exports: [ GridComponent ],
})
export class InvoiceModule { }
