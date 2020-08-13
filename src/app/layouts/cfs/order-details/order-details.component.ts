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

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  public cfsMasters: Cfs[] = [];
  public yardMasters: Yard[] = [];
  public portMasters: Port[] = [];
  displayedColumns: string[] = [
    'From', 'To'
  ];
  containerColumns: string[] = [
    'Bid Name', 'Bid Name', 'Bid User Status', 'Sub Order Total Margin', 'SubOrder Status'
  ];
  public order: any;
  constructor(
    private _orderService: OrderService,
    private _route: ActivatedRoute,
    private _portService: PortService,
    private _userService: UserService,
    private _yardService: YardService,
    private _cfsService: CfsService
  ) { }

  ngOnInit(): void {
    this.getAllCFS();
    this.getAllPorts();
    this.getAllYards();
    this.getOrderDetails();
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
