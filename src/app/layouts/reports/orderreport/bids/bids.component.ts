import { Component, OnInit, Input } from '@angular/core';

import { Bid, Trip } from '../../shared/index';


@Component({
  selector: 'app-bids',
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.scss']
})
export class BidsComponent  implements OnInit{

  @Input() bids: Bid[];
  @Input() trip: Trip[];

  displayedColumns: string[] = [
    'subOrderId',
    'bidSeq',
    'bidValue',
    'biduserStatus',
    'originalRate',
    'exhibitionDate'
  ];
  constructor() { }

  ngOnInit() {
    console.log(this.trip);
  }
}
