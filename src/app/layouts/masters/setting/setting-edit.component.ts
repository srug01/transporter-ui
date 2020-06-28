import { Component, OnInit } from '@angular/core';
import { Setting } from './../../../shared/models/setting';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-setting-edit',
  templateUrl: './setting-edit.component.html',
  styleUrls: ['./setting-edit.component.scss']
})
export class SettingEditComponent implements OnInit {

  public setting: Setting;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.setting = this.route.snapshot.data['settingResolver'];
  }

}
