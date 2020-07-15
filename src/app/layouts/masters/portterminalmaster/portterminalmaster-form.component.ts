import { PortterminalmasterService } from './../services/portterminalmaster.service';
import { PortTerminalMaster } from './../../../shared/models/PortTerminalMaster';
import { Component, OnInit, Input } from '@angular/core';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { PortService } from '../services/port.service';

@Component({
  selector: 'app-portterminalmaster-form',
  templateUrl: './portterminalmaster-form.component.html',
  styleUrls: ['./portterminalmaster-form.component.scss']
})
export class PortterminalmasterFormComponent implements OnInit {
  @Input('portterminalmasterData') portterminalmasterData: PortTerminalMaster;
  matcher = new FormErrorStateMatcher();
  public portterminalmasterForm: FormGroup;
  public portMasters: Array<any> = [];


  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _portterminalMasterService: PortterminalmasterService,
    private _portService: PortService,
   

    private _router: Router
  ) { }




  ngOnInit(): void {
    if (this.portterminalmasterData) {
      this.portterminalmasterForm = this.fb.group({
        portMasterId: [this.portterminalmasterData.portTerminalId ? 
          this.portterminalmasterData.portTerminalId : ''],
          portId: [this.portterminalmasterData.portId ? this.portterminalmasterData.portId : '',
           Validators.required],
        latitude: [this.portterminalmasterData.latitude],
        longitude: [this.portterminalmasterData.longitude],
        terminal: [this.portterminalmasterData.terminal],       
        isActive: [this.portterminalmasterData.isActive ? 
          this.portterminalmasterData.isActive : '', Validators.required]
      });
    } else {
      this.portterminalmasterForm = this.fb.group({
        portMasterId: [''],
        portId: ['', Validators.required],
        latitude: [''],
        longitude: [''], 
        terminal: [''], 
        isActive: ['', Validators.required]
      });
  }
  this.getAllPortMasters();
  }
  getAllPortMasters() {
    this._portService.getAllPortMasters().subscribe(
      (portMasters) => {
        this.portMasters = portMasters;
      },
      (err) => {
      }
    );
  }
  
  submitPortTerminalForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.portterminalmasterForm.valid) {
      if (!this.portterminalmasterData) {
        this.savePorTerminaltMaster(this.portterminalmasterForm);
      } else {
        this.updatePorTerminaltMaster(this.portterminalmasterForm);
      }
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
    }
  }

  savePorTerminaltMaster(portterminalmasterForm: any) {
    this._portterminalMasterService.savePortTerminalMaster(portterminalmasterForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Port Termianl Master Created Successfully');
        this._router.navigate(['/default/masters/portterminalmaster/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not create Port Termianl Master!');
      }
    );
  }

  updatePorTerminaltMaster(portterminalmasterForm: any) {
    this._portterminalMasterService.updatePortTerminalMaster(portterminalmasterForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Port Termianl Master Updated Successfully');
        this._router.navigate(['/default/masters/portterminalmaster/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not update Port Termianl Master!');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}



