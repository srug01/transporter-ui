import { Setting } from './../../../shared/models/setting';
import { Component, OnInit } from '@angular/core';
import { FormErrorStateMatcher } from 'src/app/shared/matchers/error.matcher';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingService } from '../../masters/services/setting.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  errorStateMatcher = new FormErrorStateMatcher();
  public settingsForm: FormGroup;

  constructor(
    private _settingService: SettingService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getSettings();
  }

  initialiseSettingsForm() {
    this.settingsForm = this.fb.group({
      settings: this.fb.array([])
    });
  }

  getSettings() {
    this.initialiseSettingsForm();
    this._settingService.getAllSetting().subscribe(
      (res) => {
        res.forEach((setting) => {
          this.populatedSettingControl(setting);
        });
      },
      (err) => {
        console.log(err);

      }
    );
  }

  submitSettingsForm(ev) {
    if (ev) {
      ev.preventDefault();
    }

  }

  populatedSettingControl(setting: Setting) {
    const settingsArray = this.settingsForm.controls.settings as FormArray;
    const arraylen = settingsArray.length;
    const settingRow: FormGroup = this.fb.group({
      settingsId: [setting.settingsId],
      settingsName: [setting.settingsName],
      settingsValue: [setting.settingsValue],
      isActive: [setting.isActive]
    });
    settingsArray.insert(arraylen, settingRow);
  }

  removeFormControl(i) {
    const settingsArray = this.settingsForm.controls.settings as FormArray;
    settingsArray.removeAt(i);
  }

  transformSetting(settingRow: Setting): Setting {
    return {
      settingsId: settingRow.settingsId,
      isActive: settingRow.isActive ? settingRow.isActive : false,
      settingsName: settingRow.settingsName ? settingRow.settingsName : '',
      settingsValue: settingRow.settingsValue ? settingRow.settingsValue : ''
    } as Setting;
  }

  saveSetting(settingRow: FormControl) {
    if (settingRow.valid) {
      const setting = this.transformSetting(settingRow.value);
      if (setting.settingsId) {
        this._settingService.updateSetting(setting).subscribe(
          (res) => {
            console.log(res);
            this.openSnackBar('Success !', `${setting.settingsName} saved`);
          },
          (err) => {
            console.log(err);
            this.openSnackBar('Failure !', 'could not save the setting');
          },
          () => {
            this.getSettings();
          }
        );
      } else {
        this._settingService.saveSetting(setting).subscribe(
          (res) => {
            console.log(res);
            this.openSnackBar('Success !', `${setting.settingsName} saved`);
          },
          (err) => {
            console.log(err);
            this.openSnackBar('Failure !', 'could not save the setting');
          },
          () => {
            this.getSettings();
          }
        );
      }
    } else {
      this.openSnackBar('Failure !', 'Invalid Data');
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  addFormControl() {
    const settingsArray = this.settingsForm.controls.settings as FormArray;
    const arraylen = settingsArray.length;
    const settingRow: FormGroup = this.fb.group({
      settingsId: [''],
      settingsName: [''],
      settingsValue: [''],
      isActive: [null]
    });
    settingsArray.insert(arraylen, settingRow);
  }

}
