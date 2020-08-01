import { Trip } from './../../../shared/models/Mytrip';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../services/trip.service';

@Component({
  selector: 'app-my-trips-edit',
  templateUrl: './my-trips-edit.component.html',
  styleUrls: ['./my-trips-edit.component.scss']
})
export class MyTripsEditComponent implements OnInit {
  public tripData: Trip;

  constructor(
    private route: ActivatedRoute,
    private _tripService: TripService
  ) { }

  ngOnInit(): void {
    this.tripData = this.route.snapshot.data['tripResolver'];  
  }

}
