import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../../service/tripinvoice.service';

@Component({
  selector: 'app-orderinvoice',
  templateUrl: './orderinvoice.component.html',
  styleUrls: ['./orderinvoice.component.scss']
})
export class OrderinvoiceComponent implements OnInit {
  public orderinvoiceData: any[];
  invoiceTotal: any;
  orderinvoiceId: number;
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

  ngOnInit(): void {
    this.getOrderInvoicebyId();
  }

  getOrderInvoicebyId()
  {

    this._route.params.subscribe(
      (params) => {
        this.orderinvoiceId = parseInt(params.id,10) ;
        this.invoiceService.getorderInvoicedetailsbyInvoiceId(this.orderinvoiceId).subscribe(
          (invoice: any) => {

             this.orderinvoiceData = invoice;
             this.getInvoiceTotal();
            /* this.originalAmount = this.invoiceData[0].originalamount;
            this.otherAmount = this.invoiceData[0].otheramount;
            this.invoiceAmount = this.invoiceData[0].invoiceamount; */

            // console.log(this.order);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    );

  }

  getInvoiceTotal()
  {
    this.invoiceService.getorderInvoicebyInvoiceId(this.orderinvoiceId).subscribe(
      (invoice: any) => {

         this.invoiceTotal = invoice;


        this.originalAmount = this.invoiceTotal.invoiceamount;
        this.otherAmount = this.invoiceTotal.otheramount;
        this.invoiceAmount = this.invoiceTotal.invoiceamount;


      },
      (err) => {
        console.log(err);
      }
    );
  }


}
