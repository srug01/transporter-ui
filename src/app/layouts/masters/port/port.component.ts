import { Component, OnInit } from '@angular/core';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
//import { StateMasterService } from '../services/state-master.service';
//import { PortService } from '../services/port.service';

@Component({
  selector: 'app-port',
  templateUrl: './port.component.html',
  styles: []
})
export class PortComponent implements OnInit {
  ngOnInit() { }
}
