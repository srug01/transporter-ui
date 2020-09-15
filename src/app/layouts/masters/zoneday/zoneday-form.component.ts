import { ZoneDay } from './../../../shared/models/zoneday';
import { Component, OnInit, Input } from '@angular/core';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StateMasterService } from '../services/state-master.service';
import { ZonedayService } from '../services/zoneday.service';
import { PortService } from '../services/port.service';

@Component({
  selector: 'app-zoneday-form',
  templateUrl: './zoneday-form.component.html',
  styleUrls: ['./zoneday-form.component.scss']
})
export class ZonedayFormComponent implements OnInit {
  @Input('zonedayData') zonedayData: ZoneDay;
  matcher = new FormErrorStateMatcher();
  public zonedayForm: FormGroup;
  public zonedayMasters: Array<any> = [];
  public portMasters: Array<any> = [];
  //   { port_syscode: 1, port_name: 'Jazira' },
  //   { port_syscode: 2, port_name: 'Gujrat' },
  //   { port_syscode: 3, port_name: 'Mumbai' },
  //   { port_syscode: 4, port_name: 'Goa' },
  // ];

  constructor(private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _portService: PortService,

    private _zonedayService: ZonedayService,
    private _router: Router) { }

  ngOnInit(): void {
    if (this.zonedayData) {
      this.zonedayForm = this.fb.group({
        zoneDayMasterId: [this.zonedayData.zoneDayMasterId ? this.zonedayData.zoneDayMasterId : ''],
        zoneName: [this.zonedayData.zoneName ? this.zonedayData.zoneName : '', Validators.required],
        portId: [this.zonedayData.portId ? this.zonedayData.portId : '', Validators.required],
        import: [this.zonedayData.import ? this.zonedayData.import : '', Validators.required],
        createdBy: [this.zonedayData.createdBy ? this.zonedayData.createdBy : ''],
        export: [this.zonedayData.export ? this.zonedayData.export : '', Validators.required],
        isActive: [this.zonedayData.isActive ? this.zonedayData.isActive : true, Validators.required]
      });
    } else {
      this.zonedayForm = this.fb.group({
        zoneDayMasterId: [''],
        zoneName: ['', Validators.required],
        portId: ['', Validators.required],
        import: ['', Validators.required],
        createdBy: [''],
        export: ['', Validators.required],
        isActive: [true, Validators.required]
      });
    }
    this.getAllPortMasters();
  }
  getAllZoneDayMasters() {
    this._zonedayService.getAllZoneDayMasters().subscribe(
      (zonedayMasters) => {
        this.zonedayMasters = zonedayMasters;
      },
      (err) => {
        console.log('could not fetch zone day masters');
      }
    );
  }

  submitZoneDayForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.zonedayForm.valid) {
      if (!this.zonedayData) {
        this.saveZoneDayMaster(this.zonedayForm);
      } else {
        this.updateZoneDayMaster(this.zonedayForm);
      }
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
    }
  }

  saveZoneDayMaster(zonedayForm: any) {
    this._zonedayService.saveZoneDaytMaster(zonedayForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Zone Day Master Created Successfully');
        this._router.navigate(['/default/masters/zoneday/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not create Zone Day!');
      }
    );
  }

  updateZoneDayMaster(zonedayForm: any) {
    this._zonedayService.updateZoneDayMaster(zonedayForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Zone Day Master Updated Successfully');
        this._router.navigate(['/default/masters/zoneday/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not update Zone Day!');
      }
    );
  }

  getAllPortMasters() {
    this._portService.getAllPortMasters().subscribe(
      (portMasters) => {
        this.portMasters = portMasters;
      },
      (err) => {
        console.log('could not fetch Port masters');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
