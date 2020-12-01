import { Component, Input } from '@angular/core';
import { InvoiceService } from '../service/tripinvoice.service';
import { TripInvoice } from '../../../shared/models/tripinvoice';
import { MatTableDataSource } from '@angular/material/table';
//import { Bid, Trip } from '../../shared/index';


@Component({
  selector: 'app-invoice',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
    dataSource: TripInvoice[];
  displayedColumns: string[] = [
    'orderId',
    'Source',
    'Destination',
    'OrderTotal'
    // 'OrderDate',
    // 'OrderTotal',
    // 'Remarks',
    // 'orderStatus'
  ];
  constructor(public invoiceService: InvoiceService) { }
  ngOnInit() {
    this.invoiceService
      .repTreeViewOrder()
      .subscribe(data => {this.dataSource = data; console.log(this.dataSource)});
  }
}
