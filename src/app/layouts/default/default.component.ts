import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  sideBarOpened= true;

  constructor(
    private _location: Location
  ) { }

  ngOnInit(): void {
  }

  sideBarToggler(){
    this.sideBarOpened=!this.sideBarOpened;
  }

  backClicked() {
    this._location.back();
  }

}
