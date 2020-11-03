import { Component, OnInit, Input } from '@angular/core';

import { subOrder, Trip } from '../../shared/index';

@Component({
  selector: 'app-suborders',
  templateUrl: './suborders.component.html',
  styleUrls: ['./suborders.component.scss']
})
export class SubordersComponent {
  @Input() subOrders: subOrder[];
  displayedColumns: string[] = [
    'expandIcon',
    'subOrderId',
    'subOrderSeq',
    'orderId',
    'subOrderTotalMargin',
    'SubOrderDate',
    'containerMasterName',
    'weightDesc',
    'suborderStatus'
  ];

  constructor() {

  }


}
