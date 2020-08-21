import { Constants } from './../../shared/constants/constants';
import { Order } from './../../shared/models/order';
import { Trip } from './../../shared/models/mytrip';
import { TripService } from './../../layouts/transporter/services/trip.service';
import { OrderService } from './../../layouts/cfs/services/order.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';
import { Dashboard } from 'src/app/shared/models/dashboard';
import { mapTo } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser: User;
  roleId: number = 0;
  bigChart = [];
  cards = [];
  pieData = [];
  tripCount: number = 0;
  bidCount: number = 0;
  orderCount: number = 0;
  suborderCount: number = 0;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  detailsAwaited = Constants.detailsAwaited;
  displayedColumnsForOrders: string[] = [
    'Order ID', 'Source', 'Destination', 'Containers', 'Created On', 'orderStatus'

  ];
  displayedColumnsForAdminOrders: string[] = [
    'orderId', 'sourceType', 'destinationType', 'sourceName', 'destinationName', 'terminal',
    'orderRemarks', 'totalRate', 'orderStatus', 'OrderDate', 'CreatedOn'

  ];
  displayedColumnsForAdminSubOrders: string[] = [
    'orderId', 'subOrderId', 'subOrderTotalMargin', 'CutOffTime', 'suborderStatus', 'containerMasterName',
    'weightDesc', 'SubOrderDate'

  ];
  displayedColumnsForTrips: string[] = [
    'tripId', 'subOrderId', 'TransporterName', 'AssignedVehicle', 'AssignedDriver', 'TransporterContainer',
    'TransporterWeight', 'OrderContainer', 'Orderweight', 'tripstatus'
  ];

  displayedColumnsForBids: string[] = [
    'bidName', 'subOrderId', 'bidStatus', 'originalRate', 'bidValue', 'AwardStatus', 'TransporterName',
    'sourceType', 'destinationType', 'containerMasterName', 'weightDesc'
  ];

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dashboard: Dashboard;
  orders: any[] = [];
  suborders: any[] = [];
  bids: any[] = [];
  trips: any[] = [];


  constructor(
    private dashboardService: DashboardService,
    private _orderService: OrderService,
    private _tripService: TripService,
    private _userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.roleId = parseInt(localStorage.getItem('roleID'), 10);
    this.dashboard = this.route.snapshot.data['dashboardResolver'];
    this.setupDashboard();
    this.getUserInfo();
    this.bigChart = this.dashboardService.bigChart();
    this.cards = this.dashboardService.cards();
    this.pieData = this.dashboardService.pieData();
    this.dataSource.paginator = this.paginator;
  }

  getUserInfo() {
    this._userService.getUsersInfo().subscribe(
      (loggedUser: User) => {
        this.currentUser = loggedUser;
      },
      (err) => {
        console.log(err);
      }
    );
  }


  setupDashboard() {
    if (this.roleId === 1) {
      this.orderCount = this.dashboard.TotalOrders;
      this.suborderCount = this.dashboard.TotalSubOrders;
      this.bidCount = this.dashboard.TotalBids;
      this.tripCount = this.dashboard.TotalTrips;
      this.orders = this.dashboard.Orders;
      this.suborders = this.dashboard.SubOrders;
      this.bids = this.dashboard.Bids;
      this.trips = this.dashboard.Trips;
    } else if (this.roleId === 4 || this.roleId === 7 || this.roleId === 8 || this.roleId === 9) {
      this.orderCount = this.dashboard.TotalOrders;
      this.tripCount = this.dashboard.TotalTrips;
      this.orders = this.dashboard.Orders;
      this.trips = this.dashboard.Trips;
    } else if (this.roleId === 5) {
      this.suborderCount = this.dashboard.TotalSubOrders;
      this.bidCount = this.dashboard.TotalBids;
      this.tripCount = this.dashboard.TotalTrips;
      this.suborders = this.dashboard.SubOrders;
      this.bids = this.dashboard.Bids;
      this.trips = this.dashboard.Trips;
    } else if (this.roleId === 6) {
      this.tripCount = this.dashboard.TotalTrips;
      this.trips = this.dashboard.Trips;
    }
  }

  getTotalTrips() {
    this.dashboardService.getTotalTrips().subscribe(
      (res) => {
        this.tripCount = res.count;
      },
      (err) => { }
    );
  }

  getTotalOrders() {
    this.dashboardService.getTotalOrders().subscribe(
      (res) => {
        this.orderCount = res.count;
      },
      (err) => { }
    );
  }

  getTotalBids() {
    this.dashboardService.getTotalBids().subscribe(
      (res) => {
        this.bidCount = res.count;
      },
      (err) => { }
    );
  }

  getTotalCfsMasters() {
    this.dashboardService.getTotalCFSMasters().subscribe(
      (res) => {
        // this.cfsCount = res.count;
      },
      (err) => { }
    );
  }

  getNewlyCreatedOrders() {
    this._orderService.getAllNewlyCreatedOrders().subscribe(
      (res) => {
        this.orders = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getNewlyCreatedTrips() {
    this._tripService.getAllNewlyCreatedTrips().subscribe(
      (res) => {
        this.trips = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
