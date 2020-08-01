import { DatePipe } from '@angular/common';
import { Notification } from './../../../shared/models/notification';
import { NotificationService } from './../../../shared/services/notification.service';
import { BidUserMapping } from './../../../shared/models/bidusermapping';
import { Bid } from './../../../shared/models/bid';
import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { BidsService } from '../services/bids.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';
import { BidUserMappingService } from '../services/bid-user-mapping.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginComponent } from 'src/app/default/welcome/login/login.component';

@Component({
  selector: 'app-bids',
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.scss']
})
export class BidsComponent implements OnInit {
  displayedColumns: string[] = [
    'Bid Mapping ID', 'Bid Name', 'Bid Status', 'Bid Value', 
    'SourceName','destinationName','containerMasterName', 'weightDesc',
    'bidValue','originalRate', 'Details','Action'
  ];
  bids: BidUserMapping[] = [];
  id:number;
  public currentUser: User;
  public userid=localStorage.getItem('userID');

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(
    private _ngZone: NgZone,
    private _bidService: BidsService,
    private _userService: UserService,
    private _bidMappingService: BidUserMappingService,
    private _router: Router,
    private _notificationService: NotificationService,
    private datePipe: DatePipe,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
   //this.getAllConfirmedBids();
   this.getAllBidsByUserID();
  }

  getUserInfo() {
    this._userService.getUsersInfo().subscribe(
      (loggedUser: User) => {
        this.currentUser = loggedUser;
      }
    );
  }

  getAllConfirmedBids() {
    this._bidMappingService.getAllConfirmedBids().subscribe(
      (bids: BidUserMapping[]) => {
        this.bids = bids;
        console.log(this.bids);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  GetBidDetailsByBidId(id:number) {
   
    this._bidMappingService.GetBidDetailsByBidId(id).subscribe(
      (bids: BidUserMapping[]) => {
        this.bids = bids;
        console.log(this.bids);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllBidsByUserID() {   
    console.log(localStorage.getItem('userID'));

    this._bidMappingService.GetBidsbyUserId(Number(this.userid)).subscribe(
      (bids: BidUserMapping[]) => {
        this.bids = bids;
        console.log(this.bids);
      },
      (err) => {
        console.log(err);
      }
    );
  }





  saveNotification(notification: Notification) {
    this._notificationService.saveNotification(notification).subscribe(
      (res) => {
        console.log('Saved Notification', res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  confirmBid(bid: any) {
    console.log(bid);
  }


  transformBidObj(bid: Bid, action: string): BidUserMapping {
    return {
      bidId: bid.bidId,
      bidName: bid.bidName,
      bidStatus: action,
      bidValue: bid.bidRate,
      userId: this.currentUser.userId
    } as BidUserMapping;
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
