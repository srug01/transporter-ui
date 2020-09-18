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
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  public cfsMasters: Cfs[] = [];
  public yardMasters: Yard[] = [];
  public portMasters: Port[] = [];
  public subOrderFilter: SubOrderFilter = new SubOrderFilter();
  public statuses: any;
  public containerMasters: any;
  public weights: any;
  detailsAwaited = Constants.detailsAwaited;
  displayedColumns: string[] = [
    'From', 'To'
  ];
  containerColumns: string[] = [
    'Bid Name', 'Bid Value', 'Bid User Status', 'SubOrder Status'
  ];
  subOrderColumns: string[] = [
    'subOrderId', 'subOrderTotalMargin', 'CutOffTime', 'suborderStatus',
    'containerMasterName','weightDesc','SubOrderDate'
  ];

  public order: any;
  public suborders: MatTableDataSource<any>;
  constructor(
    private _orderService: OrderService,
    private _route: ActivatedRoute,
    private _portService: PortService,
    private _userService: UserService,
    private _yardService: YardService,
    private _cfsService: CfsService
  ) { }

  ngOnInit(): void {
    this.getAllContainerMasters();
    this.getAllStatus();
    this.getAllWeights();
    this.getAllCFS();
    this.getAllPorts();
    this.getAllYards();
    this.getOrderDetails();
    this.applyFilter();
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
            console.log(this.order);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    );
  }

  applyFilter() {
    const filter: SubOrderFilter = {
      orderId: this.order.orderId,
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

  resetFilter() {
    this.subOrderFilter = new SubOrderFilter();
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
