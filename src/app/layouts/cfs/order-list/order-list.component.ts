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
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'Order ID', 'Source', 'Destination',
    'Containers', 'Created By', 'Created On', 'orderStatus', 'Action'
  ];
  public locations: Array<LocationMaster> = [];
  orders: MatTableDataSource<Order>;
  public currentUser: User;
  public users: User[] = [];
  public orderUserIds: Array<{ id: number }> = null;
  public cfsMasters: Cfs[] = [];
  public portMasters: Port[] = [];
  public yardMasters: Yard[];

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _orderService: OrderService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _userService: UserService,
    private _yardService: YardService,
    private _cfsService: CfsService,
    private _portService: PortService
  ) { }

  ngOnInit(): void {
    this.getAllCfs();
    this.getAllPorts();
    this.getAllYards();
    this.getAllOrders();
  }
  ngAfterViewInit() {
    // this.orders.sort = this.sort;
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

  getAllOrders() {
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
  }

  applyOrdersFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.orders.filter = filterValue.trim().toLowerCase();
  }

  getAllUsers() {
    this._userService.getAllUsersByFilter(this.orderUserIds).subscribe(
      (users) => {
        this.users = users;
      }
    );
  }

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
        this.getAllOrders();
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
