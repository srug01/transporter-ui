import { Component, OnInit } from '@angular/core';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StateMasterService } from '../services/state-master.service';
import { MileageService } from '../services/mileage.service';

@Component({
  selector: 'app-mileage',
  templateUrl: './mileage.component.html',
  styles: []
})
export class MileageComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }


}
