import { Constants } from './../../../shared/constants/constants';
import { DatePipe } from '@angular/common';
import { Notification } from './../../../shared/models/notification';
import { MatDialog } from '@angular/material/dialog';

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
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CommonConfirmdialogComponent, ConfirmDialogModel } from 'src/app/shared/dialogs/common-confirmdialog.component';

@Component({
  selector: 'app-bids',
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.scss']
})
export class BidsComponent implements OnInit {
  displayedColumns: string[] = [
    'Bid Mapping ID', 'bidSeq', 'biduserStatus',
    'sourceName', 'destinationName', 'containerMasterName', 'weightDesc',
    'bidValue', 'originalRate','TransporterName', 'Details'
  ];
  public bids: MatTableDataSource<Bid>;
  @ViewChild(MatSort) bidsSort: MatSort;
  id: number;
  public currentUser: User;
  public userid = localStorage.getItem('userID');
  public detailsAwaited = Constants.detailsAwaited;
  public result: string = '';
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
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
        this.bids = new MatTableDataSource(bids);
        this.bids.sort = this.bidsSort;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  opendialogueBid(ev,bid: any)
  {
    if (ev) {
      ev.preventDefault();
    }
    const message = `Are you sure you want to Award this Bid?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this._dialog.open(CommonConfirmdialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (this.result) {
        this.AwardBid(bid);
      }
    });
  }

  AwardBid(bid: any)
  {
    this._bidMappingService.AwardBidbymappingId(bid.bidusermappingId,bid.subOrderId).subscribe(
      (bids: any) => {
        console.log(bids);
      },
      (err) => {
        console.log(err);
      }
    );
  }


  GetBidDetailsByBidId(id: number) {
    this._bidMappingService.GetBidDetailsByBidId(id).subscribe(
      (bids: any) => {
        this.bids = new MatTableDataSource(bids);
        this.bids.sort = this.bidsSort;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllBidsByUserID() {
    this._bidMappingService.GetBidsbyUserId(Number(this.userid)).subscribe(
      (bids: any) => {
        this.bids = new MatTableDataSource(bids);
        this.bids.sort = this.bidsSort;
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
      // bidName: bid.bidName,
      biduserStatus: action,
      biduserStatusId: StausEnum.BID_USER_EDIT,
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
