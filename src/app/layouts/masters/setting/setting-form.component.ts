import { LocationService } from './../services/location.service';
import { Setting } from './../../../shared/models/setting';
import { Component, OnInit, Input } from '@angular/core';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { SettingService } from '../services/setting.service';


@Component({
  selector: 'app-setting-form',
  templateUrl: './setting-form.component.html',
  styleUrls: ['./setting-form.component.scss']
})
export class SettingFormComponent implements OnInit {
  @Input('settingData') settingData: Setting;
  matcher = new FormErrorStateMatcher();
  public settingForm: FormGroup;

  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,  
    private _settingService: SettingService,

    private _router: Router

  ) { }

  ngOnInit(): void {
    if (this.settingData) {
      this.settingForm = this.fb.group({
        setting_syscode: [this.settingData.settings_syscode ? this.settingData.settings_syscode : ''],
        setting_value: [this.settingData.settings_value ? this.settingData.settings_value : '', Validators.required],
        is_active: [this.settingData.is_active ? this.settingData.is_active : '', Validators.required]
      });
    } else {
      this.settingForm = this.fb.group({
        setting_syscode: [''],
        setting_value: ['', Validators.required],
       
        is_active: ['', Validators.required]
      });
    }
  }
 



  submitSettingForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.settingForm.valid) {
      if (!this.settingData) {
        this.saveSettingMaster(this.settingForm);
      } else {
        this.updateSettingMaster(this.settingForm);
      }
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
    }
  }

  saveSettingMaster(settingForm: any) {
    this._settingService.saveSetting(settingForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Setting Created Successfully');
        this._router.navigate(['/default/masters/setting/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not create Setting!');
      }
    );
  }

  updateSettingMaster(settingForm: any) {
    this._settingService.updateSetting(settingForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Setting Updated Successfully');
        this._router.navigate(['/default/masters/setting/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not update Setting!');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
