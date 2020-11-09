import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Constants } from './../../../shared/constants/constants';
import { Port } from './../../../shared/models/port';
import { Yard } from './../../../shared/models/yard';
import { Cfs } from './../../../shared/models/cfs';
import { Order } from './../../../shared/models/order';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { PortService } from '../../masters/services/port.service';
import { UserService } from 'src/app/services/user.service';
import { YardService } from '../../masters/services/yard.service';
import { CfsService } from '../../masters/services/cfs.service';
import { SubOrderFilter } from 'src/app/shared/models/subOrderFilter';
import * as _moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { BidFilter } from 'src/app/shared/models/bidFilter';
import { TripFilter } from 'src/app/shared/models/tripFilter';
import { TransporterRegistrationService } from '../../transporter/services/transporter-registration.service';
import { animate, state, style, transition, trigger } from '@angular/animations';


export interface PeriodicElement {
  SubOrderDate: string;
  bids: Array<any>;
  containerMasterName: string;
  orderId: number;
  subOrderId: number;
  subOrderSeq: string;
  subOrderTotalMargin: number;
  suborderStatus: string;
  trip: any;
  weightDesc: string;
}

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrderDetailsComponent implements OnInit {
  public cfsMasters: Cfs[] = [];
  public yardMasters: Yard[] = [];
  public portMasters: Port[] = [];
  public subOrderFilter: SubOrderFilter = new SubOrderFilter();
  public bidFilter: BidFilter = new BidFilter();
  public tripFilter: TripFilter = new TripFilter();
  public statuses: any;
  public biduserstatuses: any;
  public tripstatuses: any;
  public containerMasters: any;
  public weights: any;
  public order_Id: number;
  public transporters: [];
  detailsAwaited = Constants.detailsAwaited;
  expandedElement: PeriodicElement | null;
  displayedColumns: string[] = [
    'From', 'To'
  ];
  bidColumns: string[] = [
    'bidId', 'bidSeq', 'originalRate', 'bidValue', 'biduserStatus', 'CutOffTime',
    'TranporterName'
  ];
  subOrderColumns: string[] = [
    'subOrderId', 'subOrderTotal', 'CutOffTime', 'suborderStatus',
    'containerMasterName', 'weightDesc', 'SubOrderDate'
  ];

  tripColumns: string[] = [
    'tripId', 'subOrderId', 'sourceName', 'destinationName',
    'TransporterName', 'AssignedVehicle', 'AssignedDriver',
    'TransporterContainer', 'TransporterWeight', 'OrderContainer',
    'Orderweight', 'tripstatus', 'billedAmount', 'OrderDate',
    'StartedBy', 'StartedAt', 'StoppedBy', 'StoppedAt'
  ];

  public order: any;
  public suborders: MatTableDataSource<any>;
  public bids: MatTableDataSource<any>;
  public trips: MatTableDataSource<any>;
  public roleId = parseInt(localStorage.getItem('roleID'), 10);
  constructor(
    private _orderService: OrderService,
    private _route: ActivatedRoute,
    private _portService: PortService,
    private _userService: UserService,
    private _yardService: YardService,
    private _cfsService: CfsService,
    private _transporterService: TransporterRegistrationService
  ) { }

  ngOnInit(): void {
    this.getAllContainerMasters();
    this.getAllStatus();
    this.getAllBidStatus();
    this.getAllTripStatus();
    this.getAllWeights();
    this.getAllCFS();
    this.getAllPorts();
    this.getAllYards();
    this.getAllTransporters();
    this.getOrderDetails();
    /* this.applyFilter();
    this.applyBidFilter();
    this.applyTripFilter(); */


  }

  getAllStatus() {
    this._orderService.getAllStatuses().subscribe(
      (statuses) => {
        this.statuses = statuses;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllBidStatus() {
    this._orderService.getAllBidUserStatuses().subscribe(
      (biduserstatuses) => {
        this.biduserstatuses = biduserstatuses;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllTripStatus() {
    this._orderService.getAllTripStatuses().subscribe(
      (tripstatuses) => {
        this.tripstatuses = tripstatuses;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllTransporters() {
    this._transporterService.getAllTransporters().subscribe(
      (transporters) => {
        this.transporters = transporters;
      },
      (err) => {
        console.log(err);

      }
    );
  }


  getAllWeights() {
    this._orderService.getAllWeights().subscribe(
      (weights) => {
        this.weights = weights;
      },
      (err) => {
        console.log(err);
      }
    );
  }


  getAllContainerMasters() {
    this._orderService.getAllContainerMasters().subscribe(
      (containerMasters) => {
        this.containerMasters = containerMasters;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getOrderDetails() {
    this._route.params.subscribe(
      (params) => {
        this._orderService.getOrderDetailsbyOrderId(params.id).subscribe(
          (order: any) => {
            this.order = order;
            this.order_Id = parseInt(params.id);
            this.applyFilter();
            this.applyBidFilter();
            this.applyTripFilter();
            // console.log(this.order);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    );
  }

  applyFilter() {

    this.subOrderFilter.orderId = this.order_Id;
    const filter: SubOrderFilter = {
      orderId: this.subOrderFilter.orderId ? this.subOrderFilter.orderId : 0,
      containerType: this.subOrderFilter.containerType ? this.subOrderFilter.containerType : 0,
      cutOffTime: this.subOrderFilter.cutOffTime ? this.subOrderFilter.cutOffTime : "",
      subOrderDate: this.subOrderFilter.subOrderDate ? this.subOrderFilter.subOrderDate : "",
      subOrderStatus: this.subOrderFilter.subOrderStatus ? this.subOrderFilter.subOrderStatus : 0,
      weightType: this.subOrderFilter.weightType ? this.subOrderFilter.weightType : 0
    };



    // call suborder api for order along with this filter

    this._orderService.getSubOrderListForFilters(filter).subscribe(
      (suborders) => {
        this.suborders = new MatTableDataSource(suborders);

      },
      (err) => {
        console.log(err);
      }
    );
  }

  applyBidFilter() {

    this.bidFilter.orderId = this.order_Id;
    const filter: BidFilter = {
      orderId: this.bidFilter.orderId ? this.bidFilter.orderId : 0,
      transporterId: this.bidFilter.transporterId ? this.bidFilter.transporterId : 0,
      bidUserStatusId: this.bidFilter.bidUserStatusId ? this.bidFilter.bidUserStatusId : 0
    };



    // call bid api for order along with this filter
    console.log("Bid Filter : " + JSON.stringify(filter));
    this._orderService.getBidListForFilters(filter).subscribe(
      (bids) => {
        this.bids = new MatTableDataSource(bids);

      },
      (err) => {
        console.log(err);
      }
    );
  }

  applyTripFilter() {

    this.tripFilter.orderId = this.order_Id;
    const filter: TripFilter = {
      orderId: this.tripFilter.orderId ? this.tripFilter.orderId : 0,
      sourceId: this.tripFilter.sourceId ? this.tripFilter.sourceId : 0,
      destinationId: this.tripFilter.destinationId ? this.tripFilter.destinationId : 0,
      containerType: this.tripFilter.containerType ? this.tripFilter.containerType : 0,
      weightType: this.tripFilter.weightType ? this.tripFilter.weightType : 0,
      tripStatus: this.tripFilter.tripStatus ? this.tripFilter.tripStatus : 0
    };



    // call bid api for order along with this filter

    this._orderService.getTripListForFilters(filter).subscribe(
      (trips) => {
        this.trips = new MatTableDataSource(trips);

      },
      (err) => {
        console.log(err);
      }
    );
  }


  resetFilter() {
    this.subOrderFilter = new SubOrderFilter();
  }
  resetBidFilter() {
    this.bidFilter = new BidFilter();
  }

  resetTripFilter() {
    this.tripFilter = new TripFilter();
  }

  getAllCFS() {
    this._cfsService.getAllCfsMasters().subscribe(
      (cfsMasters) => {
        this.cfsMasters = cfsMasters;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllPorts() {
    this._portService.getAllPortMasters().subscribe(
      (ports) => {
        this.portMasters = ports;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllYards() {
    this._yardService.getAllYardMasters().subscribe(
      (yards) => {
        this.yardMasters = yards;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  searchPortById(id): string {
    for (let i = 0; i < this.portMasters.length; i++) {
      if (this.portMasters[i].portMasterId === id) {
        return this.portMasters[i].portName;
      }
    }
  }

  searchCfsById(id): string {
    for (let i = 0; i < this.cfsMasters.length; i++) {
      if (this.cfsMasters[i].cfsMasterId === id) {
        return this.cfsMasters[i].cfsName;
      }
    }
  }

  searchYardById(id): string {
    for (let i = 0; i < this.yardMasters.length; i++) {
      if (this.yardMasters[i].yardMasterId === id) {
        return this.yardMasters[i].yardName;
      }
    }
  }

}
