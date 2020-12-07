import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { OrderFilter } from './../../../shared/models/OrderFilter';
import { MasterType } from './../../../shared/models/masterType';
import { Yard } from 'src/app/shared/models/yard';
import { Port } from './../../../shared/models/port';
import { Cfs } from './../../../shared/models/cfs';
import { LocationMaster } from './../../../shared/models/location';
import { LocationService } from './../../masters/services/location.service';
import { Order } from './../../../shared/models/order';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { OrderService } from '../services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';
import { DateFormatPipe } from './../../../shared/pipe/date-format.pipe';
import { PortService } from '../../masters/services/port.service';
import { CfsService } from '../../masters/services/cfs.service';
import { YardService } from '../../masters/services/yard.service';
import { InvoiceService} from '../../invoice/service/tripinvoice.service'
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MasterTypeService } from '../services/master-type.service';
import { UserRegistrationService } from '../services/user-registration.service';
import * as _moment from 'moment';
import { ThreeparamObj } from 'src/app/shared/models/threeparamObj';
// tslint:disable-next-line:no-duplicate-imports
// import {default as _rollupMoment} from 'moment';

const moment = _moment;

interface OrderDetails {
  CreatedOn: any;
  CustomerName: string;
  OrderDate: string;
  destinationName: string;
  destinationType: string;
  orderId: number;
  orderRemarks: string;
  orderStatus: string;
  sourceName: string;
  sourceType: string;
  terminal: string;
  totalRate: number;
  isInvoiceGenerated?: boolean;
  orderInvoiceId?: number;

}

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    '#','orderId', 'sourceType', 'destinationType', 'sourceName', 'destinationName', 'CustomerName', 'OrderDate', 'orderRemarks',
    'CreatedOn', 'orderStatus', 'Action'
  ];
  public locations: Array<LocationMaster> = [];
  public orders: MatTableDataSource<OrderDetails>;
  public currentUser: User;
  public users: User[] = [];
  // public orderUserIds: Array<{ id: number }> = null;
  public cfsMasters: Cfs[] = [];
  public portMasters: Port[] = [];
  public yardMasters: Yard[];
  public masterTypes: MasterType[] = [];
  public masterTypeSelectedId: number;
  public selectedMasterType: MasterType;
  public source: any;
  public destination: any;
  public cfsUsers: any;
  public userId = parseInt(localStorage.getItem('userID'), 10);
  public roleId = parseInt(localStorage.getItem('roleID'), 10);
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  public orderFilter: OrderFilter = new OrderFilter();

  constructor(
    private _orderService: OrderService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _userService: UserService,
    private _yardService: YardService,
    private _cfsService: CfsService,
    private _portService: PortService,
    private _masterTypeService: MasterTypeService,
    private _userRegistrationService: UserRegistrationService,
    private _invoiceService: InvoiceService

  ) { }

  ngOnInit(): void {
    this.getAllCustomers();
    this.getMasterTypes();
    this.getAllCfs();
    this.getAllPorts();
    this.getAllYards();
    // this.getAllOrders();
    this.applyFilter();
  }


  ngAfterViewInit() {
  }

  getAllCustomers() {
    this._userRegistrationService.getAllCFSUsers().subscribe(
      (users) => {
        this.cfsUsers = users;
      }
    );
  }

  getMasterTypes() {
    this._masterTypeService.getAllMasterTypes().subscribe(
      (masterTypes) => {
        this.masterTypes = masterTypes;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  applyFilter() {
    const filter: OrderFilter = {
      custId: this.orderFilter.custId ? this.orderFilter.custId : 0,
      destinationId: this.orderFilter.destinationId ? this.orderFilter.destinationId : 0,
      fromDate: this.orderFilter.fromDate ? this.orderFilter.fromDate : "",
      toDate: this.orderFilter.toDate ? this.orderFilter.toDate : "",
      orderStatus: this.orderFilter.orderStatus ? this.orderFilter.orderStatus : 0,
      orderType: this.orderFilter.orderType ? this.orderFilter.orderType : 0,
      sourceId: this.orderFilter.sourceId ? this.orderFilter.sourceId : 0,
      currentUserId: this.userId
    };
    //  console.log(JSON.stringify(filter));
    this._orderService.getOrderListForFilters(filter).subscribe(
      (orders) => {
        this.orders = new MatTableDataSource<OrderDetails>(orders);
        this.orders.sort = this.sort;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  resetFilter() {
    this.orderFilter = new OrderFilter();
  }

  masterTypeSelected(masterTypeId) {
    this.masterTypeSelectedId = masterTypeId;
    this._masterTypeService.getMasterTypeById(masterTypeId).subscribe(
      (masterType: MasterType) => {
        this.selectedMasterType = masterType;
        this.source = this.selectedMasterType.sourceType;
        this.destination = this.selectedMasterType.destinationType;
        switch (this.source) {
          case 'CFS':
            this.getAllCfs();
            break;
          case 'PORT':
            this.getAllPorts();
            break;
          case 'YARD':
            this.getAllYards();
            break;
          default:
            break;
        }
        switch (this.destination) {
          case 'CFS':
            this.getAllCfs();
            break;
          case 'PORT':
            this.getAllPorts();
            break;
          case 'YARD':
            this.getAllYards();
            break;
          default:
            break;
        }

      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllCfs() {
    this._cfsService.getAllCfsMasters().subscribe(
      (cfsMasters: Cfs[]) => {
        this.cfsMasters = cfsMasters;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getAllPorts() {
    this._portService.getAllPortMasters().subscribe(
      (portMasters: Port[]) => {
        this.portMasters = portMasters;
      },
      (err) => {
        console.log(err);

      }
    );
  }
  getAllYards() {
    this._yardService.getAllYardMasters().subscribe(
      (yardMasters: Yard[]) => {
        this.yardMasters = yardMasters;
      }
    );
  }

  getUserInfo() {
    this._userService.getUsersInfo().subscribe(
      (loggedUser: User) => {
        this.currentUser = loggedUser;
      }
    );
  }

  generateInvoice() {
    const selectedOrders = this.orders.data.filter((order) => {
      return order.isInvoiceGenerated === true;
    });
    const threeParam = {
      varOne : JSON.stringify(selectedOrders),
      varTwo : this.userId,
      varThree : moment().format('YYYY-MM-DD h:mm:ss a').toString()

    } as ThreeparamObj
    console.log(threeParam);
    this._invoiceService.saveorderInvoices(threeParam).subscribe(
      (orders) => {
        this.applyFilter();
        //this.tripMasters = new MatTableDataSource(trips);
        //this.tripMasters.sort = this.tripSort;
      },
      (err) => {
        console.log(err);
      }
    );
    console.log(selectedOrders);
  }
  /* getAllOrders() {
    this._orderService.getAllOrders().subscribe(
      (orders: Order[]) => {
        this.orders = new MatTableDataSource(orders);
        this.orderUserIds = orders.map((order) => {
          return { id: order.createdBy };
        });
        this.orderUserIds = this.orderUserIds.reduce((accumulator, currentValue) => {
          const indx = accumulator.findIndex((val) => val.id === currentValue.id);
          if (indx < 0) {
            accumulator.push(currentValue);
          }
          return accumulator;
        }, []);
        this.getAllUsers();
      }
    );
  } */



  openDialog(ev, orderId: number) {
    if (ev) {
      ev.preventDefault();
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteOrderById(orderId);
      }
    });
  }

  deleteOrderById(orderId: number) {
    this._orderService.deleteOrderById(orderId).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Order Deleted Successfully');
        // this.getAllOrders();
        this.applyFilter();
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  searchSourceById(sourceType: string, sourceId: number): string {
    switch (sourceType) {
      case 'CFS':
        for (let i = 0; i < this.cfsMasters.length; i++) {
          if (this.cfsMasters[i].cfsMasterId === sourceId) {
            return `${this.cfsMasters[i].cfsName} - (${sourceType})`;
          }
        }
        break;
      case 'PORT':
        for (let i = 0; i < this.portMasters.length; i++) {
          if (this.portMasters[i].portMasterId === sourceId) {
            return `${this.portMasters[i].portName} - (${sourceType})`;
          }
        }
        break;
      case 'YARD':
        for (let i = 0; i < this.yardMasters.length; i++) {
          if (this.yardMasters[i].yardMasterId === sourceId) {
            return `${this.yardMasters[i].yardName} - (${sourceType})`;
          }
        }
        break;
      default:
        break;
    }
    return '';
  }

  searchDestinationById(destinationType: string, destinationId: number): string {
    switch (destinationType) {
      case 'CFS':
        for (let i = 0; i < this.cfsMasters.length; i++) {
          if (this.cfsMasters[i].cfsMasterId === destinationId) {
            return `${this.cfsMasters[i].cfsName} - (${destinationType})`;
          }
        }
        break;
      case 'PORT':
        for (let i = 0; i < this.portMasters.length; i++) {
          if (this.portMasters[i].portMasterId === destinationId) {
            return `${this.portMasters[i].portName} - (${destinationType})`;
          }
        }
        break;
      case 'YARD':
        for (let i = 0; i < this.yardMasters.length; i++) {
          if (this.yardMasters[i].yardMasterId === destinationId) {
            return `${this.yardMasters[i].yardName} - (${destinationType})`;
          }
        }
        break;
      default:
        break;
    }
    return '';
  }

  searchUserById(userId): string {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].userId === userId) {
        return `${this.users[i].email}`;
      }
    }
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
