import { Component, OnInit, Input } from '@angular/core';

import { subOrder } from '../../shared/index';

@Component({
  selector: 'app-suborders',
  templateUrl: './suborders.component.html',
  styleUrls: ['./suborders.component.scss']
})
export class SubordersComponent{
  @Input() subOrders: subOrder[];
  displayedColumns: string[] = [
    'expandIcon',
    'SubOrder ID',
    'orderId',
    'subOrderTotal',
    'CutOffTime',
    'containerMasterName',
    'weightDesc',
    'suborderStatus'
  ];

  constructor() { }


}
