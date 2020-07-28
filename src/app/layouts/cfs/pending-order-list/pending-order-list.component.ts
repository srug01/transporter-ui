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

@Component({
  selector: 'app-pending-order-list',
  templateUrl: './pending-order-list.component.html',
  styleUrls: ['./pending-order-list.component.scss']
})
export class PendingOrderListComponent implements OnInit {
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
    this.getLocations();
    this.getAllOrders();
  }

  getLocations() {
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
    this._orderService.getAllSavedOrders().subscribe(
      (orders: Order[]) => {
        this.orders = orders;
        this.orderUserIds = this.orders.map((order) => {
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
      if (this.locations[i].locationMasterId === id) {
        return this.locations[i].locationName;
      }
    }
  }

  searchUserById(userId): string {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].userId === userId) {
        return `${this.users[i].firstName} ${this.users[i].lastName}`;
      }
    }
  }

}
