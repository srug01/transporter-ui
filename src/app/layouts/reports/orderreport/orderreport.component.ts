import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { ReportsService, expandableTableRowAnimation, Order } from '../shared/index';


@Component({
  selector: 'app-orderreport',
  templateUrl: './orderreport.component.html',
  styleUrls: ['../shared/css/table.scss' ],
  animations: [ expandableTableRowAnimation ]
})
export class OrderreportComponent implements OnInit {

  orders: Order[];

  displayedColumns: string[] = [
    'expandIcon',
    'orderId',
    'Source',
    'Destination',
    'OrderDate',
    'OrderTotal',
    'Remarks',
    'orderStatus'

  ];
  constructor(private reportService: ReportsService) { }


  ngOnInit() {
    this.reportService
      .repTreeViewOrder()
      .subscribe(data => this.orders = data);
  }

  /* deleteUser(index: number): void {
    this.orders.splice(index, 1);
    this.orders = [...this.orders];
  } */
}
