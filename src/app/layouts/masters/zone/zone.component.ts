import { Component, OnInit } from '@angular/core';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ZoneService } from '../services/zone.service';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit {

  //matcher = new FormErrorStateMatcher();
 // public zoneForm: FormGroup;


  constructor(
    // private fb: FormBuilder,
    // private _snackBar: MatSnackBar,
    // private _router: Router,
    // private _zoneService: ZoneService
  ) { }

  ngOnInit() {
    // this.zoneForm = this.fb.group({
    //   zone_name: ['', Validators.required],
    //   zone_description:['', Validators.required],
    //   pincode:['', Validators.required],
    //   is_active: ['', Validators.required]
    }
  //}
/*
  submitZoneForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.zoneForm.valid) {
      this.saveZoneMaster(this.zoneForm);
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
      console.log(this.zoneForm);
    }
  }

  saveZoneMaster(zoneForm: any) {
    this._zoneService.saveZoneMaster(zoneForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Zone Master Created Successfully');
        this._router.navigate(['/default/masters/zone-master-list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not create Zone!');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }*/
}
