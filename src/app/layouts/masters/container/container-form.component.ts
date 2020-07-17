import { ContainerMaster } from '../../../shared/models/containerMaster';
import { Component, OnInit, Input } from '@angular/core';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ContainerService } from '../services/container.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';


@Component({
  selector: 'app-container-form',
  templateUrl: './container-form.component.html',
  styleUrls: ['./container-form.component.scss']
})
export class ContainerFormComponent implements OnInit {
  @Input('containerData') containerData: ContainerMaster;
  matcher = new FormErrorStateMatcher();
  public currentUser: User;
  public containerForm: FormGroup;
  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _containereService: ContainerService,
    private _router: Router,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    if (this.containerData) {
      this.containerForm = this.fb.group({
        containerMasterId: [this.containerData.containerMasterId ? this.containerData.containerMasterId : ''],
        containerMasterName: [this.containerData.containerMasterName ? this.containerData.containerMasterName : '', Validators.required],
        isActive: [this.containerData.isActive ? this.containerData.isActive : '', Validators.required],
        createdBy: [this.containerData.createdBy ? this.containerData.createdBy : ''],
        createdOn: [this.containerData.createdOn ? this.containerData.createdOn : ''],
        modifiedBy: [this.containerData.modifiedBy ? this.containerData.modifiedBy : ''],
        modifiedOn: [this.containerData.modifiedOn ? this.containerData.modifiedOn : '']
      });
    } else {
      this.containerForm = this.fb.group({
        containerMasterId: [''],
        containerMasterName: ['', Validators.required],
        isActive: ['', Validators.required],
        createdBy: [''],
        createdOn: [''],
        modifiedBy: [''],
        modifiedOn: ['']
      });
    }

  }

  getUserInfo() {
    this._userService.getUsersInfo().subscribe(
      (loggedUser: User) => {
        this.currentUser = loggedUser;
      }
    );
  }

  transformContainerObj(container: ContainerMaster): ContainerMaster {
    return {
      containerMasterId: container.containerMasterId,
      containerMasterName: container.containerMasterName,
      createdBy: this.currentUser.userId,
      createdOn: new Date(),
      isActive: container.isActive,
      modifiedBy: this.currentUser.userId,
      modifiedOn: new Date()
    } as ContainerMaster;
  }

  submitcontainerForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.containerForm.valid) {
      const containerMaster: ContainerMaster = this.transformContainerObj(this.containerForm.value);
      if (!this.containerData) {
        this.saveContainerMaster(containerMaster);
      } else {
        this.updateContainerMaster(containerMaster);
      }
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
    }
  }

  saveContainerMaster(containerMaster: ContainerMaster) {
    this._containereService.saveContainerMaster(containerMaster).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Container Master Created Successfully');
        this._router.navigate(['/default/masters/container/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not create Container!');
      }
    );
  }

  updateContainerMaster(containerMaster: ContainerMaster) {
    this._containereService.updateContainerMaster(containerMaster).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Container Master Updated Successfully');
        this._router.navigate(['/default/masters/container/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not update Container!');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
