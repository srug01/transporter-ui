import { Setting } from './../../shared/models/setting';
import { Component, OnInit } from '@angular/core';
import { SettingService } from '../masters/services/setting.service';
import { FormErrorStateMatcher } from 'src/app/shared/matchers/error.matcher';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor() {}
  
  ngOnInit(): void {
  }

}
