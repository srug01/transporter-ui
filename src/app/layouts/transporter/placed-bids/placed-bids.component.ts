import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { BidsService } from '../services/bids.service';

@Component({
  selector: 'app-placed-bids',
  templateUrl: './placed-bids.component.html',
  styleUrls: ['./placed-bids.component.scss']
})
export class PlacedBidsComponent implements OnInit {
  displayedColumns: string[] = [
    'Bid ID', 'Bid Name', 'Source', 'Destination', 'Container Type',
    'Container Weight', 'Bid Rate', 'Transport Date',
    'Created By', 'Action'
  ];
  bids: [] = [];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(
    private _ngZone: NgZone,
    private _bidService: BidsService
  ) { }

  ngOnInit(): void {
    this.getAllPlacedBids();
  }

  getAllPlacedBids() {
    this._bidService.getAllPlacedBids().subscribe(
      (bids) => {
        this.bids = bids;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

}
