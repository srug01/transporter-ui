import { YardPortMap } from './../../../shared/models/yardportmap';
import { Component, OnInit, Input } from '@angular/core';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { YardService } from '../services/yard.service';
import { PortService } from '../services/port.service';
import { YardportmapService } from '../services/yardportmap.service';

@Component({
  selector: 'app-yardportmap-form',
  templateUrl: './yardportmap-form.component.html',
  styleUrls: ['./yardportmap-form.component.scss']
})
export class YardportmapFormComponent implements OnInit {
  @Input('yardportmapData') yardportmapData: YardPortMap;
  matcher = new FormErrorStateMatcher();
  public yardportmapForm: FormGroup;
  public yardMasters: Array<any> = [];
  public portMasters: Array<any> = [];

  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _yardService: YardService,
    private _portService: PortService,
    private _yardportmapService: YardportmapService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    if (this.yardportmapData) {
      this.yardportmapForm = this.fb.group({
        yard_port_mapping_syscode : [this.yardportmapData.yard_port_mapping_syscode ? this.yardportmapData.yard_port_mapping_syscode : ''],
        port_syscode: [this.yardportmapData.port_syscode ? this.yardportmapData.port_syscode : ''],
        yard_syscode: [this.yardportmapData.yard_syscode ? this.yardportmapData.yard_syscode : '', Validators.required],
        is_active: [this.yardportmapData.is_active ? this.yardportmapData.is_active : '', Validators.required]
      });
    } else {
      this.yardportmapForm = this.fb.group({
        yard_port_mapping_syscode: [''],
        port_syscode: ['', Validators.required],
        yard_syscode: ['', Validators.required],
        is_active: ['', Validators.required]
      });
    }
    this.getAllYardMasters();
    this.getAllPortMasters();
  }

  getAllYardMasters() {
    this._yardService.getAllYardMasters().subscribe(
      (yardMasters) => {
        this.yardMasters = yardMasters;
      },
      (err) => {
        console.log('could not fetch yard masters');
      }
    );
  }

  getAllPortMasters() {
    this._portService.getAllPortMasters().subscribe(
      (portMasters) => {
        this.portMasters = portMasters;
      },
      (err) => {
        console.log('could not fetch port masters');
      }
    );
  }

  submityardportmapForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.yardportmapForm.valid) {
      if (!this.yardportmapData) {
        this.saveYardPortMapMaster(this.yardportmapForm);
      } else {
        this.updateYardPortMapMaster(this.yardportmapForm);
      }
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
    }
  }

  saveYardPortMapMaster(yardportmapForm: any) {
    this._yardportmapService.saveYardPortMapMaster(yardportmapForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Yard Port Mapping Created Successfully');
        this._router.navigate(['/default/masters/yard-port-map/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not create Mapping!');
      }
    );
  }

  updateYardPortMapMaster(yardportmapForm: any) {
    this._yardportmapService.updateYardPortMapMaster(yardportmapForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Yard Port Mappings Updated Successfully');
        this._router.navigate(['/default/masters/yard-port-map/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not update Mappings!');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


}
