import { TripDetails } from './../../../shared/models/TripDetails';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent implements OnInit {

  public tripData: TripDetails;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.tripData = this.route.snapshot.data['tripDetailsResolver'][0];
  }

}
