import { Cfs } from './../../../shared/models/cfs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-cfs-edit',
  templateUrl: './cfs-edit.component.html',
  styleUrls: ['./cfs-edit.component.scss']
})
export class CfsEditComponent implements OnInit {
  public cfs: Cfs;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cfs = this.route.snapshot.data['cfsResolver'];
  }

}
