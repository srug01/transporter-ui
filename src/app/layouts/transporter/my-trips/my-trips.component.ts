import { Component, OnInit } from '@angular/core';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router,RouterModule } from '@angular/router';


@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: []
})
export class MyTripsComponent implements OnInit {
  ngOnInit(): void {
  }

}
