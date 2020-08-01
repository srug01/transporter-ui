
import { NotificationService } from './../../../shared/services/notification.service';
import { BidUserMapping } from './../../../shared/models/bidusermapping';

import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';

import { BidsService } from '../services/bids.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';
import { BidUserMappingService } from '../services/bid-user-mapping.service';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-biddetails',
  templateUrl: './biddetails.component.html',
  styleUrls: ['./biddetails.component.scss']
})
export class BiddetailsComponent implements OnInit {
  displayedColumns: string[] = [
    'bidName', 'exhibitionDate', 'subOrderId', 'createdBy', 
    'originalRate','bidValue', 'bidStatus',
    'firstName' , 'email'
  ];
  bidsdetails: BidUserMapping[] = [];
  public userid=localStorage.getItem('userID');
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor( private _ngZone: NgZone,
    private _bidService: BidsService,
    private _userService: UserService,
    private _bidMappingService: BidUserMappingService,
    private _router: Router,
    private _notificationService: NotificationService, 
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllBidsByUserID(1);
  }

  getAllBidsByUserID(bidID:Number) {   
    //console.log(localStorage.getItem('bidId'));

    this._bidMappingService.GetBidDetailsByBidId(1).subscribe(
      (bidsdetails: BidUserMapping[]) => {
        this.bidsdetails = bidsdetails;
        console.log(this.bidsdetails);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
