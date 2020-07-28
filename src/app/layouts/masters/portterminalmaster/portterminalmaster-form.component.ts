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
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';

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
  public currentUser: User;


  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _portterminalMasterService: PortterminalmasterService,
    private _portService: PortService,
    private _router: Router,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.getAllPortMasters();
    if (this.portterminalmasterData) {
      this.portterminalmasterForm = this.fb.group({
        portTerminalId: [this.portterminalmasterData.portTerminalId ?
          this.portterminalmasterData.portTerminalId : ''],
        portMasterId: [this.portterminalmasterData.portMasterId ?
          this.portterminalmasterData.portMasterId : '',
        Validators.required],
        latitude: [this.portterminalmasterData.latitude],
        longitude: [this.portterminalmasterData.longitude],
        terminal: [this.portterminalmasterData.terminal],
        isActive: [this.portterminalmasterData.isActive ?
          this.portterminalmasterData.isActive : '', Validators.required],
        createdBy: [],
        createdOn: [],
        modifiedBy: [],
        modifiedOn: []
      });
    } else {
      this.portterminalmasterForm = this.fb.group({
        portTerminalId: [''],
        portMasterId: ['', Validators.required],
        latitude: [''],
        longitude: [''],
        terminal: [''],
        isActive: ['', Validators.required],
        createdBy: [],
        createdOn: [],
        modifiedBy: [],
        modifiedOn: []
      });
    }
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

  getUserInfo() {
    this._userService.getUsersInfo().subscribe(
      (loggedUser: User) => {
        this.currentUser = loggedUser;
      }
    );
  }

  transformTerminalObj(terminal: PortTerminalMaster): PortTerminalMaster {
    return {
      isActive: terminal.isActive,
      createdBy: this.currentUser.userId,
      createdOn: new Date(),
      latitude: terminal.latitude,
      longitude: terminal.longitude,
      modifiedBy: this.currentUser.userId,
      modifiedOn: new Date(),
      portMasterId: terminal.portMasterId,
      portTerminalId: terminal.portTerminalId ? terminal.portTerminalId : 0,
      terminal: terminal.terminal
    } as PortTerminalMaster;
  }

  submitPortTerminalForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.portterminalmasterForm.valid) {
      const terminal: PortTerminalMaster = this.transformTerminalObj(this.portterminalmasterForm.value);
      if (!this.portterminalmasterData) {
        this.savePorTerminaltMaster(terminal);
      } else {
        this.updatePorTerminaltMaster(terminal);
      }
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
    }
  }

  savePorTerminaltMaster(terminal: PortTerminalMaster) {
    this._portterminalMasterService.savePortTerminalMaster(terminal).subscribe(
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

  updatePorTerminaltMaster(terminal: PortTerminalMaster) {
    this._portterminalMasterService.updatePortTerminalMaster(terminal).subscribe(
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



