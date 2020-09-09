import { Component, Input, Output, EventEmitter } from '@angular/core';

import { expandableTableRowAnimation, Order, subOrder, Bid } from '../../shared/index';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss', '../../shared/css/table.scss'],
  animations: [ expandableTableRowAnimation ]
})
export class TableRowComponent {

  @Input() dataSource: Order[] | subOrder[] | Bid[];
  @Input() displayedColumns: string[];
  @Input() title: string;
  @Input() referenceId: string;
  @Input() iconKeyReference: string;
  @Input() renderTemplate: string;

  @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();

  expandedId: string = '';
  constructor() { }

  toggleExpandableSymbol(id: string): void {
    this.expandedId = this.expandedId === id ? '' : id;
  }

}
