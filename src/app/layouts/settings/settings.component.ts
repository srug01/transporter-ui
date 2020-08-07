import { Setting } from './../../shared/models/setting';
import { Component, OnInit } from '@angular/core';
import { SettingService } from '../masters/services/setting.service';
import { FormErrorStateMatcher } from 'src/app/shared/matchers/error.matcher';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  errorStateMatcher = new FormErrorStateMatcher();
  public settingsForm: FormGroup;

  constructor(
    private _settingService: SettingService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initialiseSettingsForm();
    this.getSettings();
  }

  initialiseSettingsForm() {
    this.settingsForm = this.fb.group({
      settings: this.fb.array([])
    });
  }

  getSettings() {
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
