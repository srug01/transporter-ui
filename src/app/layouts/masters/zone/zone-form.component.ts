import { Zone } from './../../../shared/models/zone';
import { Component, OnInit, Input } from '@angular/core';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ZoneService } from '../services/zone.service';

@Component({
  selector: 'app-zone-form',
  templateUrl: './zone-form.component.html',
  styleUrls: ['./zone-form.component.scss']
})
export class ZoneFormComponent implements OnInit {
  @Input('zoneData') zoneData: Zone;
  matcher = new FormErrorStateMatcher();
  public zoneForm: FormGroup;

  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,

    private _zoneService: ZoneService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    if (this.zoneData) {
      this.zoneForm = this.fb.group({
        zoneMasterId: [this.zoneData.zoneMasterId ? this.zoneData.zoneMasterId : ''],
        zoneName: [this.zoneData.zoneName ? this.zoneData.zoneName : '', Validators.required],
        zoneDesc: [this.zoneData.zoneDesc ? this.zoneData.zoneDesc : '', Validators.required],
        pincode: [this.zoneData.pincode ? this.zoneData.pincode : ''],
        isActive: [this.zoneData.isActive ? this.zoneData.isActive : '', Validators.required]
      });
    } else {
      this.zoneForm = this.fb.group({
        zoneMasterId: [''],
        zoneName: ['', Validators.required],
        zoneDesc: ['', Validators.required],
        pincode: [''],
        isActive: ['', Validators.required]
      });
    }

  }


  submitZoneForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.zoneForm.valid) {
      if (!this.zoneData) {
        this.saveZoneMaster(this.zoneForm);
      } else {
        this.updateZoneMaster(this.zoneForm);
      }
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
    }
  }
  saveZoneMaster(zoneForm: any) {
    this._zoneService.saveZoneMaster(zoneForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Zone Master Created Successfully');
        this._router.navigate(['/default/masters/zone/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not create Zone!');
      }
    );
  }
  updateZoneMaster(zoneForm: any) {
    this._zoneService.updateZoneMaster(zoneForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Zone Master Updated Successfully');
        this._router.navigate(['/default/masters/zone/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not update Zone!');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


}
