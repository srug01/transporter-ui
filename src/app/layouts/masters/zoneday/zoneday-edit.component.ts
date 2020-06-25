import { ZoneDay } from './../../../shared/models/zoneday';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-zoneday-edit',
  templateUrl: './zoneday-edit.component.html',
  styleUrls: ['./zoneday-edit.component.scss']
})
export class ZonedayEditComponent implements OnInit {
  public zoneday: ZoneDay;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.zoneday = this.route.snapshot.data['zonedayResolver'];   
  }

}
