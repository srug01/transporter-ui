import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { OrderreportComponent } from './orderreport/orderreport.component';
import { SubordersComponent } from './orderreport/suborders/suborders.component';
import { BidsComponent } from './orderreport/bids/bids.component';
import { TableRowComponent } from './orderreport/table-row/table-row.component';
import { ReportsService} from './shared/services/reportservice.service';

import { ReportsMaterialModule } from './reports-material.module';

const routes: Routes = [
  { path: '', component: OrderreportComponent }
];

@NgModule({
  declarations: [
    OrderreportComponent,
    SubordersComponent,
    BidsComponent,
    TableRowComponent
  ],
  imports: [
    CommonModule,
    ReportsMaterialModule,
    HttpClientModule,
    HttpClientJsonpModule,
    RouterModule.forChild(routes,),
  ],
  providers: [
    ReportsService
  ],
  exports: [ OrderreportComponent ],
})
export class ReportsModule { }
