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
    cfsName: string;
    cfsCode: string;
    cfscontactNumber: string;
    cfsEmail: string;
    cfsAddress: string;
    cfslandmark: string;
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
            this.cfsName = this.invoiceData[0].cfsName? this.invoiceData[0].cfsName : "";
            this.cfsCode = this.invoiceData[0].cfsCode? this.invoiceData[0].cfsCode : "";
            this.cfscontactNumber = this.invoiceData[0].contactNumber?this.invoiceData[0].contactNumber : "" ;
            this.cfsEmail = this.invoiceData[0].email?this.invoiceData[0].email : "" ;
            this.cfsAddress = this.invoiceData[0].cfsAddress?this.invoiceData[0].cfsAddress : "";
            this.cfslandmark = this.invoiceData[0].landmark?this.invoiceData[0].landmark : "";
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
