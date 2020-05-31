import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { PortService } from '../services/port.service';

@Component({
  selector: 'app-port-master-list',
  templateUrl: './port-master-list.component.html',
  styleUrls: ['./port-master-list.component.scss']
})
export class PortMasterListComponent implements OnInit {
  displayedColumns: string[] = [
    'port_syscode', 'port_name', 'state_syscode', 'location_syscode', 'is_active', 'action'
  ];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public portMasters: Array<any> = [];

  constructor(
    private _portService: PortService
  ) { }

  ngOnInit(): void {
    this.getAllPortMasters();
  }

  getAllPortMasters() {
    this._portService.getAllPortMasters().subscribe(
      (portMasters) => {
        console.log(portMasters);
        this.portMasters = portMasters;
      },
      (err) => {
        console.log('could not fetch port masters');
      }
    );
  }

}
