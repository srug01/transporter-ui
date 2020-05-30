import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { StateMasterService } from '../services/state-master.service';

@Component({
  selector: 'app-state-master-list',
  templateUrl: './state-master-list.component.html',
  styleUrls: ['./state-master-list.component.scss']
})
export class StateMasterListComponent implements OnInit {

  displayedColumns: string[] = [
    'state_syscode', 'state', 'is_active'
  ];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public stateMasters: Array<any> = [];

  constructor(
    private _stateService: StateMasterService
  ) { }

  ngOnInit(): void {
    this.getAllStateMasters();
  }

  getAllStateMasters() {
    this._stateService.getAllStateMasters().subscribe(
      (stateMasters) => {
        console.log(stateMasters);
        this.stateMasters = stateMasters;
      },
      (err) => {
        console.log('could not fetch state masters');
      }
    );
  }
}
