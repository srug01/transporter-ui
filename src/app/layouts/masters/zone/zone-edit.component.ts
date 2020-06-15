import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Zone } from './../../../shared/models/zone';

@Component({
  selector: 'app-zone-edit',
  templateUrl: './zone-edit.component.html',
  styleUrls: ['./zone-edit.component.scss']
})
export class ZoneEditComponent implements OnInit {
  public zone: Zone;
  constructor(
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.zone = this.route.snapshot.data['zonesResolver']; 
  }


}
