import { CfsPortRateMaster } from '../../../shared/models/cfsportrate';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-cfsportrate-edit',
  templateUrl: './cfsportrate-edit.component.html',
  styleUrls: ['./cfsportrate-edit.component.scss']
})
export class CfsportrateEditComponent implements OnInit {
  public cfsportrate: CfsPortRateMaster;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cfsportrate = this.route.snapshot.data['cfsportrateResolver'];
  }

}
