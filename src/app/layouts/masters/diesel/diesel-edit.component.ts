import { Diesel } from './../../../shared/models/diesel';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-diesel-edit',
  templateUrl: './diesel-edit.component.html',
  styleUrls: ['./diesel-edit.component.scss']
})
export class DieselEditComponent implements OnInit {
  public diesel: Diesel;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.diesel = this.route.snapshot.data['dieselResolver'];
  }

}
