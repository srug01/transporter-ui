import { Component, OnInit } from '@angular/core';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StateMasterService } from '../services/state-master.service';
import { PortService } from '../services/port.service';

@Component({
  selector: 'app-port',
  templateUrl: './port.component.html',
  styles: []
})
export class PortComponent implements OnInit {
  matcher = new FormErrorStateMatcher();
  public portForm: FormGroup;
  public stateMasters: Array<any> = [];
  public locations: Array<any> = [
    { location_syscode: 1, location: 'Nashik' },
    { location_syscode: 2, location: 'Pune' },
    { location_syscode: 3, location: 'Mumbai' },
    { location_syscode: 4, location: 'Goa' },
  ];
  public ports: Array<any> = [
    { port_syscode: 1, port: 'Nashik' },
    { port_syscode: 2, port: 'Pune' },
    { port_syscode: 3, port: 'Mumbai' },
    { port_syscode: 4, port: 'Goa' },
  ];
  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _stateService: StateMasterService,
    private _portService: PortService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.portForm = this.fb.group({
      port_name: ['', Validators.required],
      state_syscode: ['', Validators.required],
      location_syscode: ['', Validators.required],
      is_active: ['', Validators.required]
    });
    this.getAllStateMasters();
  }

  getAllStateMasters() {
    this._stateService.getAllStateMasters().subscribe(
      (stateMasters) => {
        console.log(stateMasters);
        this.stateMasters = stateMasters;
      },
      (err) => {
        console.log('could not fetch state masters');
      }
    );
  }

  submitPortForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.portForm.valid) {
      this.savePortMaster(this.portForm);
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
      console.log(this.portForm);
    }
  }

  savePortMaster(portForm: any) {
    this._portService.savePortMaster(portForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Port Master Created Successfully');
        this._router.navigate(['/default/masters/port-master-list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not create Port!');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
