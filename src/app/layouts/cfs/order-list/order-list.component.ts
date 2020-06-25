import { LocationMaster } from './../../../shared/models/location';
import { LocationService } from './../../masters/services/location.service';
import { Order } from './../../../shared/models/order';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';
import { DateFormatPipe } from './../../../shared/pipe/date-format.pipe';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  displayedColumns: string[] = [
    'Order ID', 'Source', 'Destination',
    'Containers', 'Created By', 'Created On', 'Status', 'Action'
  ];
  public locations: Array<LocationMaster> = [];
  orders: Array<Order> = [];
  public currentUser: User;
  public users: User[] = [];
  public orderUserIds: Array<{ id: number }> = null;


  constructor(
    private _orderService: OrderService,
    private _locationService: LocationService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.getStates();
    this.getAllOrders();

  }

  getStates() {
    this._locationService.getAllLocationMasters().subscribe(
      (locations) => {
        this.locations = locations;
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
        this.orders = orders;
        this.orderUserIds = this.orders.map((order) => {
          return { id: order.created_by };
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

  searchLocationById(id): string {
    for (let i = 0; i < this.locations.length; i++) {
      if (this.locations[i].locationId === id) {
        return this.locations[i].locationName;
      }
    }
  }

  searchUserById(userId): string {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === userId) {
        return `${ this.users[i].firstName } ${ this.users[i].lastName }`;
      }
    }
  }

}
