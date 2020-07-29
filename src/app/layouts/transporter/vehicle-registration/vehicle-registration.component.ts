import { VehicleService } from './../services/vehicle.service';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { Component, OnInit, Input } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {StateMasterService} from '../../masters/services/state-master.service';
import {ContainerService} from '../../masters/services/container.service';
import {WeightService} from '../../masters/services/weight.service';
import { State } from 'src/app/shared/models/state';
import { Container } from 'src/app/shared/models/container';
import { Weight } from 'src/app/shared/models/weight';
import { VehicleMaster } from 'src/app/shared/models/VehicleMaster';

@Component({
  selector: 'app-vehicle-registration',
  templateUrl: './vehicle-registration.component.html',
  styleUrls: ['./vehicle-registration.component.scss']
})
export class VehicleRegistrationComponent implements OnInit {
  @Input('vehiclemasterData') vehicleMasterData: VehicleMaster;

  matcher = new FormErrorStateMatcher();
  displayedColumns: string[] = [
    'position', 'Type', 'Weight', 'NoOfTrucks', 'ContainerNo'
  ];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public vehicleForm: FormGroup;
  public states: State[];
  public container: Container[];
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

  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _vehicleService: VehicleService,
    private _router: Router,
    private _stateService: StateMasterService,
    private _containerservice: ContainerService,
    private _weightservice : WeightService
  ) { }

  ngOnInit(): void {
    this.getAllStates();
    this.getAllContainer();
    this.getAllWeight();

    if(this.vehicleMasterData){
      this.vehicleForm= this.fb.group({
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
        is_active: ['', Validators.required]
      });
    }
    else{
     this.vehicleForm = this.fb.group({
      vehicleMasterId : [''],
      vehicleNumber: ['', Validators.required],
      vehicleType: ['', Validators.required],
      vehicleCapacity: ['', Validators.required],
      weight: ['', Validators.required],
      manufactureYear: ['', Validators.required],
      stateId: ['', Validators.required],
      owned: [''],
      is_active: ['', Validators.required]
  
     });
    }
    //}//

  //   this.vehicleForm = this.fb.group({
  //     vehicle_no: ['', Validators.required],
  //     vehicle_type: ['', Validators.required],
  //     vehicle_capacity: ['', Validators.required],
  //     weight: ['', Validators.required],
  //     manufacture_year: ['', Validators.required],
  //     state_syscode: ['', Validators.required],
  //     owned: [''],
  //     is_active: ['', Validators.required]
  //   });
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


  getAllContainer() {
    this._containerservice.getAllContainerMasters().subscribe(
      (container) => {
        this.container = container;
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
    this.findInvalidControls();
    if (ev) {
      ev.preventDefault();
    }
    if (this.vehicleForm.valid) {
      this.saveVehicleMaster(this.vehicleForm);
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
      console.log(this.vehicleForm);

    }
  }

  saveVehicleMaster(vehicleForm: any) {
    this._vehicleService.saveVehicleMaster(vehicleForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Vehicle Master Created Successfully');
        this._router.navigate(['/default/transporter/vehicle-list']);
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
