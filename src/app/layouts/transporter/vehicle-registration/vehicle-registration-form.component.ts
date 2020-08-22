import { VehicleService } from './../services/vehicle.service';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { Component, OnInit, Input } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StateMasterService } from '../../masters/services/state-master.service';
import { ContainerService } from '../../masters/services/container.service';
import { WeightService } from '../../masters/services/weight.service';
import { State } from 'src/app/shared/models/state';
import { ContainerMaster } from 'src/app/shared/models/ContainerMaster';
import { Weight } from 'src/app/shared/models/weight';
import { VehicleMaster } from 'src/app/shared/models/VehicleMaster';
import { UserService } from './../../../services/user.service';
import { User } from './../../../shared/models/user';

@Component({
  selector: 'app-vehicle-registration-form',
  templateUrl: './vehicle-registration-form.component.html',
  styleUrls: ['./vehicle-registration-form.component.scss']
})
export class VehicleRegistrationFormComponent implements OnInit {

  @Input('vehiclemasterData') vehicleMasterData: VehicleMaster;

  matcher = new FormErrorStateMatcher();

  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public vehicleForm: FormGroup;
  public states: State[];
  public containers: ContainerMaster[];
  public weight: Weight[];

  // public vehicleTypes: Array<any> = [
  //   { value: '10 FT', viewValue: '10 FT' },
  //   { value: '20 FT', viewValue: '20 FT' },
  //   { value: '30 FT', viewValue: '30 FT' }
  // ];
  // public vehicleCapacity: Array<any> = [
  //   { value: '1 TON', viewValue: '1 TON' },
  //   { value: '2 TON', viewValue: '2 TON' },
  //   { value: '3 TON', viewValue: '3 TON' }
  // ];
  // public weight: Array<any> = [];
  public manufactureYear: Array<any> = [];
  public owned = false;
  public currentUser: User;

  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _vehicleService: VehicleService,
    private _router: Router,
    private _stateService: StateMasterService,
    private _containerservice: ContainerService,
    private _weightservice: WeightService,
    private _userService: UserService,
  ) { }
  getUserInfo() {
    this._userService.getUsersInfo().subscribe(
      (loggedUser: User) => {
        this.currentUser = loggedUser;
      }
    );
  }
  ngOnInit(): void {
    this.getAllStates();
    this.getAllContainer();
    this.getAllWeight();
    this.getUserInfo();

    if (this.vehicleMasterData) {
      this.vehicleForm = this.fb.group({
        vehicleMasterId: [this.vehicleMasterData.vehicleMasterId ?
          this.vehicleMasterData.vehicleMasterId : ''],
        vehicleNumber: [this.vehicleMasterData.vehicleNumber ? this.vehicleMasterData.vehicleNumber : '',
        Validators.required],
        vehicleType: [this.vehicleMasterData.vehicleType ? this.vehicleMasterData.vehicleType : '',
        Validators.required],
        vehicleCapacity: [this.vehicleMasterData.vehicleCapacity ? this.vehicleMasterData.vehicleCapacity : '',
        Validators.required],
        weight: [this.vehicleMasterData.weight ? this.vehicleMasterData.weight : '',
        Validators.required],
        manufactureYear: [this.vehicleMasterData.manufactureYear ? this.vehicleMasterData.manufactureYear : '',
        Validators.required],
        stateId: [this.vehicleMasterData.stateId ? this.vehicleMasterData.stateId : '',
        Validators.required],
        owned: [this.vehicleMasterData.owned ? this.vehicleMasterData.owned : '',
        Validators.required],
        isActive: ['', Validators.required]

      });
    }
    else {
      this.vehicleForm = this.fb.group({
        vehicleMasterId: [''],
        vehicleNumber: ['', Validators.required],
        vehicleType: ['', Validators.required],
        vehicleCapacity: ['', Validators.required],
        weight: ['', Validators.required],
        manufactureYear: ['', Validators.required],
        stateId: ['', Validators.required],
        owned: [''],
        isActive: ['', Validators.required]


      });
    }

  }

  getAllWeight() {
    this._weightservice.getAllWeightMasters().subscribe(
      (weight) => {
        this.weight = weight;
      },
      (err) => {
      }
    );
  }
  transformVehicleRegistrationObj(vehicle: VehicleMaster): VehicleMaster {
    return {
      vehicleMasterId: vehicle.vehicleMasterId ? vehicle.vehicleMasterId : 0,
      vehicleNumber: vehicle.vehicleNumber,
      vehicleType: vehicle.vehicleType,
      vehicleCapacity: vehicle.vehicleCapacity,
      weight: vehicle.weight,
      manufactureYear: vehicle.manufactureYear,
      stateId: vehicle.stateId,
      owned: vehicle.owned,
      createdBy: this.currentUser.userId,
      modifiedBy: this.currentUser.userId,
      createdOn: new Date(),
      modifiedOn: new Date(),
      isActive: vehicle.isActive
    } as VehicleMaster;
  }



  getAllContainer() {
    this._containerservice.getAllContainerMasters().subscribe(
      (containers) => {
        this.containers = containers;
      },
      (err) => {
      }
    );
  }

  getAllStates() {
    this._stateService.getAllStateMasters().subscribe(
      (states) => {
        this.states = states;
      },
      (err) => {
      }
    );
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }
  public findInvalidControls() {
    const invalid = [];
    const controls = this.vehicleForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }



  submitVehicleForm(ev) {
    // this.findInvalidControls();
    if (ev) {
      ev.preventDefault();
    }
    if (this.vehicleForm.valid) {
      const vehicle: VehicleMaster =
        this.transformVehicleRegistrationObj(this.vehicleForm.value);
      if (!this.vehicleMasterData) {
        console.log(vehicle);
        this.saveVehicleMaster(vehicle);
      }
      else {
        this.updateVehicleMaster(vehicle);
      }

    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
      console.log(this.vehicleForm);

    }
  }

  saveVehicleMaster(vehicleForm: VehicleMaster) {
    this._vehicleService.saveVehicleMaster(vehicleForm).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Vehicle Master Created Successfully');
        this._router.navigate(['/default/transporter/register-vehicle/list']);
      },
      (err) => {
        console.log(err);
        if (err.error.error.code === 'ER_DUP_ENTRY') {
          this.openSnackBar('Failure !', 'Duplicate Vehicle Number Specified');
        } else {
          this.openSnackBar('Failure !', 'Could not create vehicle');
        }
      }
    );
  }

  updateVehicleMaster(vehicleForm: VehicleMaster) {
    this._vehicleService.updateVehicleMaster(vehicleForm).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Vehicle Master Updated Successfully');
        this._router.navigate(['/default/transporter/register-vehicle/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not create vehicle');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
