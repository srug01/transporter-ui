import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-placed-bids',
  templateUrl: './placed-bids.component.html',
  styleUrls: ['./placed-bids.component.scss']
})
export class PlacedBidsComponent implements OnInit {
  displayedColumns: string[] = [
    'position', 'Source', 'Destination', 'ContainerType',
    'ContainerWeight', 'TripRate', 'TransportDate',
    'Time', 'BidRate', 'Action'
  ];
  public dataSource: any[];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(private _ngZone: NgZone) { }

  ngOnInit(): void {
    this.dataSource = [
      {
        position: 1, Source: 'Pune', Destination: 'Mumbai',
        ContainerType: '10 FT', ContainerWeight: '1 TON', TripRate: 'Rs. 45000',
        TransportDate: '05/05/2020', Time: '10.00 AM', BidRate: 'Rs.50000', Action: 'Edit'
      },
      {
        position: 2, Source: 'Pune', Destination: 'Mumbai',
        ContainerType: '10 FT', ContainerWeight: '1 TON',
        TripRate: 'Rs. 44000', TransportDate: '05/05/2020',
        Time: '10.00 AM', BidRate: 'Rs.50000', Action: 'Edit'
      },
      {
        position: 3, Source: 'Pune', Destination: 'Mumbai',
        ContainerType: '20 FT', ContainerWeight: '1 TON',
        TripRate: 'Rs. 45000', TransportDate: '05/05/2020',
        Time: '10.00 AM', BidRate: 'Rs.50000', Action: 'Edit'
      },
      {
        position: 4, Source: 'Pune', Destination: 'Mumbai',
        ContainerType: '20 FT', ContainerWeight: '1 TON',
        TripRate: 'Rs. 45000', TransportDate: '05/05/2020',
        Time: '10.00 AM', BidRate: 'Rs.50000', Action: 'Edit'
      },
      {
        position: 5, Source: 'Pune', Destination: 'Mumbai',
        ContainerType: '20 FT', ContainerWeight: '1 TON',
        TripRate: 'Rs. 45000', TransportDate: '05/05/2020',
        Time: '10.00 AM', BidRate: 'Rs.50000', Action: 'Edit'
      },
      {
        position: 6, Source: 'Pune', Destination: 'Mumbai',
        ContainerType: '20 FT', ContainerWeight: '1 TON',
        TripRate: 'Rs. 45000', TransportDate: '05/05/2020',
        Time: '10.00 AM', BidRate: 'Rs.50000', Action: 'Edit'
      },
      {
        position: 7, Source: 'Pune', Destination: 'Mumbai',
        ContainerType: '20 FT', ContainerWeight: '1 TON',
        TripRate: 'Rs. 45000', TransportDate: '05/05/2020',
        Time: '10.00 AM', BidRate: 'Rs.50000', Action: 'Edit'
      },
    ];
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

}
