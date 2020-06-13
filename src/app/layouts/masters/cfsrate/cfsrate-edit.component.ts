import { Cfsrate } from './../../../shared/models/cfsrate';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-cfsrate-edit',
  templateUrl: './cfsrate-edit.component.html',
  styleUrls: ['./cfsrate-edit.component.scss']
})
export class CfsrateEditComponent implements OnInit {
  public cfsrate: Cfsrate;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cfsrate = this.route.snapshot.data['cfsrateResolver'];
  }

}
