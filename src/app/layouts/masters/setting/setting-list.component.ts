import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog.component';

import {  SettingService } from './../services/setting.service';
import { Setting } from 'src/app/shared/models/setting';


@Component({
  selector: 'app-setting-list',
  templateUrl: './setting-list.component.html',
  styleUrls: ['./setting-list.component.scss']
})
export class SettingListComponent implements OnInit {
  displayedColumns: string[] = [
    'setting_syscode', 'setting_name', 'setting_value', 'is_active', 'action'
  ];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public SettingsArray: Array<any> = [];
  constructor(
    private _settingService: SettingService,  
    private _snackBar: MatSnackBar,
    private _router: Router,
    public dialog: MatDialog
  ) { }


  openDialog(ev, stateId: number) {
    if (ev) {
      ev.preventDefault();
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteSettingById(stateId);
      }
    });
  }

  ngOnInit(): void {
    this.getAllSettingMasters();
  }
  getAllSettingMasters() {
    this._settingService.getAllSetting().subscribe(
      (settingMasters) => {
        console.log(settingMasters);
        this.SettingsArray = settingMasters;
      },
      (err) => {
        console.log('could not fetch Setting masters');
      }
    );
  }
  deleteSettingById(settingId: number) {
    this._settingService.deleteSettingById(settingId).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Setting Deleted Successfully');
        this.getAllSettingMasters();
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
