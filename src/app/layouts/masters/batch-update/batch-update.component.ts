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

  constructor(
    private _masterTypeService: MasterTypeService
  ) { }

  ngOnInit(): void {
    this.getMasterTypes();
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
    console.log(this.selectedMasterType);
  }

}
