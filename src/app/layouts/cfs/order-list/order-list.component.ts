import { StateMasterService } from './../../masters/services/state-master.service';
import { State } from './../../../shared/models/state';
import { Order } from './../../../shared/models/order';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  displayedColumns: string[] = [
    'Order ID', 'Source', 'Destination',
    'Containers', 'Created By', 'Created On', 'Action'
  ];
  public states: Array<State> = [];
  orders: Array<Order> = [];

  constructor(
    private _orderService: OrderService,
    private _stateService: StateMasterService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getStates();
    this.getAllOrders();
  }

  getStates() {
    this._stateService.getAllStateMasters().subscribe(
      (states) => {
        this.states = states;
      }
    );
  }

  getAllOrders() {
    this._orderService.getAllOrders().subscribe(
      (orders) => {
        this.orders = orders;
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

  searchStateById(id): string {
    for (let i = 0; i < this.states.length; i++) {
      if (this.states[i].state_syscode === id) {
        return this.states[i].state;
      }
    }
  }

}
