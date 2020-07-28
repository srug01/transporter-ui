import { Mytrip } from './../../../shared/models/Mytrip';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-trips-edit',
  templateUrl: './my-trips-edit.component.html',
  styleUrls: ['./my-trips-edit.component.scss']
})
export class MyTripsEditComponent implements OnInit {
  public tripData: Mytrip;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

}
