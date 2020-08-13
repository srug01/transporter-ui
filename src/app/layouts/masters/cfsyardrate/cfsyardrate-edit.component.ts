import { CfsYardRateMaster } from './../../../shared/models/cfsyardrate';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cfsyardrate-edit',
  templateUrl: './cfsyardrate-edit.component.html',
  styleUrls: ['./cfsyardrate-edit.component.scss']
})
export class CfsyardrateEditComponent implements OnInit {
  public cfsyardrate: CfsYardRateMaster;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cfsyardrate = this.route.snapshot.data['cfsyardrateResolver'];
  }

}
