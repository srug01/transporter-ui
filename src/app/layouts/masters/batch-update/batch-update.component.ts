import { ActivatedRoute } from '@angular/router';
import { MasterType } from './../../../shared/models/masterType';
import { Component, OnInit } from '@angular/core';
import { MasterTypeService } from '../../cfs/services/master-type.service';

@Component({
  selector: 'app-batch-update',
  templateUrl: './batch-update.component.html',
  styleUrls: ['./batch-update.component.scss']
})
export class BatchUpdateComponent implements OnInit {
  public masterTypes: MasterType[] = [];
  public selectedMasterType: any;
  public cfsId: number;

  constructor(
    private _route: ActivatedRoute,
    private _masterTypeService: MasterTypeService
  ) { }

  ngOnInit(): void {
    this.getCfsIdFromRouteParams();
    this.getMasterTypes();
  }

  getCfsIdFromRouteParams() {
    this._route.params.subscribe(
      (params) => {
        this.cfsId = params.id;
      }
    );
  }

  getRateTableForCFS() {
    console.log(this.cfsId);
    console.log(this.selectedMasterType);
  }

  getMasterTypes() {
    this._masterTypeService.getAllMasterTypes().subscribe(
      (masterTypes) => {
        this.masterTypes = masterTypes;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  masterTypeSelected(ev) {
    this.selectedMasterType = ev;
    this.getRateTableForCFS();
  }

}
