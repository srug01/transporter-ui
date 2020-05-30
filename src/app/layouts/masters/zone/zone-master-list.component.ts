import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { ZoneService } from '../services/zone.service';

@Component({
  selector: 'app-zone-master-list',
  templateUrl: './zone-master-list.component.html',
  styleUrls: ['./zone-master-list.component.scss']
})
export class ZoneMasterListComponent implements OnInit {
  displayedColumns: string[] = [
    'zone_syscode','zone_name','zone_description','pincode', 'is_active'
  ];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public zoneMasters: Array<any> = [];

  constructor(
    private _zoneService: ZoneService
  ) { }

  ngOnInit(): void {
    this.getAllZoneMasters();
  }

  getAllZoneMasters() {
    this._zoneService.getAllZoneMasters().subscribe(
      (zoneMasters) => {
        this.zoneMasters = zoneMasters;
      },
      (err)=>{
        console.log('could not fetch state masters');
      }
    );
  }

}
