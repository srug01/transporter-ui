import { Component, OnInit, Input } from '@angular/core';

import { Trip } from '../../shared/index';


@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent{

  @Input() trip: Trip[];

  displayedColumns: string[] = [
    'subOrderId',
    'tripstatus',
    'tripId',
    'TransporterName',
    'TransporterContainer'
  ];
  constructor() { }


}
