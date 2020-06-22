import { StateMasterService } from './../../masters/services/state-master.service';
import { State } from './../../../shared/models/state';
import { Order } from './../../../shared/models/order';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

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
    private _stateService: StateMasterService
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

  searchStateById(id): string {
    for (let i = 0; i < this.states.length; i++) {
      if (this.states[i].state_syscode === id) {
        return this.states[i].state;
      }
    }
  }

}
