
import { NotificationService } from './../../../shared/services/notification.service';
import { BidUserMapping } from './../../../shared/models/bidusermapping';

import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';

import { BidsService } from '../services/bids.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';
import { BidUserMappingService } from '../services/bid-user-mapping.service';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-biddetails',
  templateUrl: './biddetails.component.html',
  styleUrls: ['./biddetails.component.scss']
})
export class BiddetailsComponent implements OnInit {
  public bidsdetails: BidUserMapping;
  displayedColumns: string[] = [
    'bidName', 'exhibitionDate', 'subOrderId', 'createdBy', 
    'originalRate','bidValue', 'bidStatus',
    'firstName' , 'email'
  ];

  public userid=localStorage.getItem('userID');
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor( private _ngZone: NgZone,
    // private _bidService: BidsService,
    // private _userService: UserService,
    // private _bidMappingService: BidUserMappingService,
    // private _router: Router,
    // private _notificationService: NotificationService, 
    // private _snackBar: MatSnackBar) 
    private router: Router,
    private route: ActivatedRoute)
    { }

  ngOnInit(): void {
    this.bidsdetails = this.route.snapshot.data['biddetailsResolver'];
  }

  

}
