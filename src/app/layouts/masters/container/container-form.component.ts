import { Container } from './../../../shared/models/container';
import { Component, OnInit, Input } from '@angular/core';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ContianerService } from '../services/contianer.service';


@Component({
  selector: 'app-container-form',
  templateUrl: './container-form.component.html',
  styleUrls: ['./container-form.component.scss']
})
export class ContainerFormComponent implements OnInit {
  @Input('containerData') containerData: Container;
  matcher = new FormErrorStateMatcher();
  public containerForm: FormGroup;
  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _containereService: ContianerService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    if (this.containerData) {
      this.containerForm = this.fb.group({
        container_syscode: [this.containerData.container_syscode ? this.containerData.container_syscode : ''],
        container_name: [this.containerData.container_name ? this.containerData.container_name : '', Validators.required],
        is_active: [this.containerData.is_active ? this.containerData.is_active : '', Validators.required]
      });
    } else {
      this.containerForm = this.fb.group({
        container_syscode: [''],
        container_name: ['', Validators.required],
        is_active: ['', Validators.required]
      });
    }

  }

  submitcontainerForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.containerForm.valid) {
      if (!this.containerData) {
        this.saveContainerMaster(this.containerForm);
      } else {
        this.updateContainerMaster(this.containerForm);
      }
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
    }
  }

  saveContainerMaster(containerForm: any) {
    this._containereService.saveContainerMaster(containerForm.value).subscribe(
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

  updateContainerMaster(containerForm: any) {
    this._containereService.updateContainerMaster(containerForm.value).subscribe(
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
