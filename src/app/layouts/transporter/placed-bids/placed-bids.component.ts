import { ConfirmBidDialogComponent } from './../confirm-bid-dialog/confirm-bid-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Constants } from './../../../shared/constants/constants';
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
import { StausEnum } from '../../../shared/Enum/statusEnum';
import { BidRate } from 'src/app/shared/models/bidRate';

@Component({
  selector: 'app-placed-bids',
  templateUrl: './placed-bids.component.html',
  styleUrls: ['./placed-bids.component.scss']
})
export class PlacedBidsComponent implements OnInit {
  displayedColumns: string[] = [
    'subOrderId', 'Source', 'Destination', 'Container Type',
    'Container Weight', 'Bid Rate', 'Bid Value', 'Action'
  ];
  bids: Bid[] = [];
  public currentUser: User;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public detailsAwaited = Constants.detailsAwaited;

  constructor(
    private _ngZone: NgZone,
    private _bidService: BidsService,
    private _userService: UserService,
    private _bidMappingService: BidUserMappingService,
    private _router: Router,
    private _notificationService: NotificationService,
    private datePipe: DatePipe,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    //this.getAllPlacedBids();

  }

  getUserInfo() {
    this._userService.getUsersInfo().subscribe(
      (loggedUser: User) => {
        this.currentUser = loggedUser;
        this.getAllPlacedBidsbyUserId();
      }
    );
  }

  // getAllPlacedBids() {
  //   this._bidService.getAllPlacedBids().subscribe(
  //     (bids: Bid[]) => {
  //       this.bids = bids;
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  getAllPlacedBidsbyUserId() {
    this._bidService.getAllBidsforBidding(this.currentUser.userId).subscribe(
      (bids) => {
        this.bids = bids;
        console.log(this.bids);
        this.bids.forEach((bid) => {
          if (!bid.bidValue) {
            bid.bidValue = bid.originalRate;
          }
        });
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

  updateBid(bid: any) {
     //const bidMapping: BidUserMapping = this.transformBidObj(bid, 'BID_USER_EDIT');
    // this._bidMappingService.updateBid(bidMapping).subscribe(
      const bidRate: BidRate = this.transformBidRateObj(bid);
      this._bidService.savebidForTransporter(bidRate).subscribe(
      (res) => {
        console.log(res);
        const notification: Notification = {
          orderId: 1,
          assignedToRole: 1,
          assignedToUser: null,
          createdBy: this.currentUser.userId,
          createdOn: new Date(),
          isRead: false,
          notificationDesc: `${this.currentUser.name} confirmed a bid on ${this.datePipe.transform(Date.now(), 'yyyy-MM-dd')}!`,
          notificationId: null,
          notificationType: 'orders'
        };
        this.saveNotification(notification);
        this.openSnackBar('Success !', 'Order placed successfully');
      },
      (err) => {
        if (err.error.error.message) {
          this.openSnackBar('Failure !', `${err.error.error.message}`);
        }
        console.log();
      },
      () => {
        this.getAllPlacedBidsbyUserId();
      }
    );
  }
  /* confirmBid(bid: any) {
    const bidMapping: BidUserMapping = this.transformBidObj(bid, 'BID_USER_EDIT');
    this._bidMappingService.saveBid(bidMapping).subscribe(
      (res) => {
        console.log(res);
        const notification: Notification = {
          orderId: 1,
          assignedToRole: 1,
          assignedToUser: null,
          createdBy: this.currentUser.userId,
          createdOn: new Date(),
          isRead: false,
          notificationDesc: `${this.currentUser.name} confirmed a bid on ${this.datePipe.transform(Date.now(), 'yyyy-MM-dd')}!`,
          notificationId: null,
          notificationType: 'orders'
        };
        this.saveNotification(notification);
        this.openSnackBar('Success !', 'Order placed successfully');
      },
      (err) => {
        if (err.error.error.message) {
          this.openSnackBar('Failure !', `${err.error.error.message}`);
        }
        console.log();
      },
      () => {
        this.getAllPlacedBidsbyUserId();
      }
    );
  } */
  confirmBid(bid: any) {
    //const bidMapping: BidUserMapping = this.transformBidObj(bid, 'BID_USER_EDIT');
    console.log(bid);
    const bidRate: BidRate = this.transformBidRateObj(bid);
    console.log(bidRate);
    this._bidService.savebidForTransporter(bidRate).subscribe(
      (res) => {
        console.log(res);
        const notification: Notification = {
          orderId: 1,
          assignedToRole: 1,
          assignedToUser: null,
          createdBy: this.currentUser.userId,
          createdOn: new Date(),
          isRead: false,
          notificationDesc: `${this.currentUser.name} confirmed a bid on ${this.datePipe.transform(Date.now(), 'yyyy-MM-dd')}!`,
          notificationId: null,
          notificationType: 'orders'
        };
        this.saveNotification(notification);
        this.openSnackBar('Success !', 'Order placed successfully');
      },
      (err) => {
        if (err.error.error.message) {
          this.openSnackBar('Failure !', `${err.error.error.message}`);
        }
        console.log();
      },
      () => {
        this.getAllPlacedBidsbyUserId();
      }
    );

  }
  openSaveDialog(ev, bid: any) {
    if (ev) {
      ev.preventDefault();
    }
    const dialogRef = this._dialog.open(ConfirmBidDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.confirmBid(bid);
      }
    });
  }

  openUpdateDialog(ev, bid: any) {
    if (ev) {
      ev.preventDefault();
    }
    const dialogRef = this._dialog.open(ConfirmBidDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateBid(bid);
      }
    });
  }

  transformBidObj(bid: any, action: string): BidUserMapping {
    console.log(bid);
    return {
      bidId: bid.bidId,
      bidName: bid.bidName,
      biduserStatus: action,
      biduserStatusId: StausEnum.BID_USER_EDIT,
      bidValue: bid.bidValue,
      userId: this.currentUser.userId,
      bidusermappingId: bid.bidusermappingId ? bid.bidusermappingId : 0
    } as BidUserMapping;
  }

  transformBidRateObj(bid: any): BidRate {
    console.log(bid);
    return {
      suborderId: bid.subOrderId,
      userId: this.currentUser.userId,
      bidRate: bid.bidLowerLimit,
      bidValue: bid.bidValue,
    } as BidRate;
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
