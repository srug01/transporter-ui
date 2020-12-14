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
    transporterName: string;
    transporterNumber: string;
    transporterAddress: string;
    transporterEmail: string;
    createdBy: string;
    createdByNumber: string;
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

            this.originalAmount = this.invoiceData[0].originalamount? this.invoiceData[0].originalamount : 0 ;
            this.otherAmount = this.invoiceData[0].otheramount? this.invoiceData[0].otheramount : 0;
            this.invoiceAmount = this.invoiceData[0].invoiceamount? this.invoiceData[0].invoiceamount : 0;
            this.transporterName = this.invoiceData[0].TransporterName? this.invoiceData[0].TransporterName : "";
            this.transporterEmail = this.invoiceData[0].transporterEmail? this.invoiceData[0].transporterEmail : "";
            this.transporterNumber = this.invoiceData[0].transporterMobileNumber?this.invoiceData[0].transporterMobileNumber : "" ;
            this.transporterAddress = this.invoiceData[0].transporterAddress?this.invoiceData[0].transporterAddress : "";
            this.createdBy = this.invoiceData[0].CreatedBy? this.invoiceData[0].CreatedBy : "";
            this.createdByNumber = this.invoiceData[0].CreatedByNumber? this.invoiceData[0].CreatedByNumber : "";


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
