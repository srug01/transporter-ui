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

@Component({
  selector: 'app-placed-bids',
  templateUrl: './placed-bids.component.html',
  styleUrls: ['./placed-bids.component.scss']
})
export class PlacedBidsComponent implements OnInit {
  displayedColumns: string[] = [
    'Bid ID', 'Bid Name', 'Source', 'Destination', 'Container Type',
    'Container Weight', 'Bid Rate', 'Margin %', 'Bid Value', 'Transport Date',
    'Created By', 'Action'
  ];
  bids: Bid[] = [];
  public currentUser: User;
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
    this.getAllPlacedBids();
  }

  getUserInfo() {
    this._userService.getUsersInfo().subscribe(
      (loggedUser: User) => {
        this.currentUser = loggedUser;
      }
    );
  }

  getAllPlacedBids() {
    this._bidService.getAllPlacedBids().subscribe(
      (bids: Bid[]) => {
        this.bids = bids;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  saveNotification(notification: Notification) {
    this._notificationService.saveNotification(notification).subscribe(
      (res) => {
        console.log('Saved Notification',res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  confirmBid(bid: any) {
    const bidMapping: BidUserMapping = this.transformBidObj(bid, 'confirmed');
    this._bidMappingService.saveBid(bidMapping).subscribe(
      (res) => {        
        console.log(res);
        const notification: Notification = {
          orderId: 1,
          assignedToRole: 1,
          assignedToUser: null,
          createdBy: this.currentUser.id,
          createdOn: new Date(),
          isRead: false,
          notificationDesc: `${this.currentUser.name} confirmed a bid on ${this.datePipe.transform(Date.now(), 'yyyy-MM-dd')}!`,
          notificationId: null,
          notificationType: 'orders'
        };
        this.saveNotification(notification);
        this.openSnackBar('Success !', 'Order placed successfully');
        this._router.navigate(['/default']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  rejectBid(bid: any) {
    const bidMapping: BidUserMapping = this.transformBidObj(bid, 'rejected');
    this._bidMappingService.saveBid(bidMapping).subscribe(
      (res) => {
        console.log(res);
        this._router.navigate(['/default']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  transformBidObj(bid: Bid, action: string): BidUserMapping {
    return {
      bidId: bid.bidId,
      bidName: bid.bidName,
      bidStatus: action,
      bidValue: bid.bidRate,
      userId: this.currentUser.id
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
