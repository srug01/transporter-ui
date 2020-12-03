import { Component, Input } from '@angular/core';
import { InvoiceService } from '../service/tripinvoice.service';
import { TripInvoice } from '../../../shared/models/tripinvoice';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
//import { Bid, Trip } from '../../shared/index';


@Component({
  selector: 'app-invoice',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
    invoiceData: any[];
    invoiceId: number;
    originalAmount: number;
    invoiceAmount: number;
    otherAmount: number;
  displayedColumns: string[] = [
    'tripId',
    'invoiceNumber',
    'sourceName',
    'destinationName',
    'OrderContainer',
    'Orderweight',
    'TransporterName',
    'originalamount'

  ];
  constructor(public invoiceService: InvoiceService,
    private _route: ActivatedRoute,) { }
  ngOnInit() {
    this.getInvoicebyId();
  }

  getInvoicebyId()
  {

    this._route.params.subscribe(
      (params) => {
        this.invoiceId = parseInt(params.id,10) ;
        this.invoiceService.gettripInvoicebyInvoiceId(this.invoiceId).subscribe(
          (invoice: any) => {
            this.invoiceData = invoice;
            this.originalAmount = this.invoiceData[0].originalamount;
            this.otherAmount = this.invoiceData[0].otheramount;
            this.invoiceAmount = this.invoiceData[0].invoiceamount;

            // console.log(this.order);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    );

    // this.invoiceService
    //   .gettripInvoicebyInvoiceId()
    //   .subscribe(data => {this.dataSource = data; console.log(this.dataSource)});
  }
}
