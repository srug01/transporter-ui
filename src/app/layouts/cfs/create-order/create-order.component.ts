import { LocationMaster } from './../../../shared/models/location';
import { PortService } from './../../masters/services/port.service';
import { LocationService } from './../../masters/services/location.service';
import { MasterType } from './../../../shared/models/masterType';
import { Truck } from './../../../shared/models/truck';
import { OrderContainer } from './../../../shared/models/order-container';
import { Order } from './../../../shared/models/order';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { StateMasterService } from '../../masters/services/state-master.service';
import { MasterTypeService } from '../services/master-type.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';
import { YardService } from '../../masters/services/yard.service';
import { CfsService } from '../../masters/services/cfs.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  errorStateMatcher = new FormErrorStateMatcher();
  public orderForm: FormGroup;
  public selectedSimpleItem;
  public containers: [] = [];
  public currentUser: User;
  public containerNumbers: Array<any> = [
  ];
  public cfsMasters: [] = [];
  public yardMasters: [] = [];
  public portMasters: [] = [];
  public sourceLocations: Array<any> = [];
  public destinationLocations: Array<any> = [];
  public masterTypes: MasterType[] = [];
  public locations: LocationMaster[] = [];
  ports: any[] = [
    { value: '1', viewValue: 'Mumbai' },
    { value: '2', viewValue: 'Pune' },
    { value: '3', viewValue: 'Delhi' }
  ];
  types: any[] = [
    { value: '10', viewValue: '10 FT' },
    { value: '20', viewValue: '20 FT' },
    { value: '30', viewValue: '30 FT' }
  ];
  weights: any[] = [
    { value: '1', viewValue: '1 TON' },
    { value: '2', viewValue: '2 TON' },
    { value: '3', viewValue: '3 TON' }
  ];
  displayedColumns: string[] = [
    'position', 'Type', 'Weight', 'NoOfTrucks', 'ContainerNo'
  ];
  public dataSource: any[];

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _orderService: OrderService,
    private _portService: PortService,
    private _locationService: LocationService,
    private _masterTypeService: MasterTypeService,
    private _userService: UserService,
    private _yardService: YardService,
    private _cfsService: CfsService
  ) { }


  ngOnInit(): void {
    this.getUserInfo();
    this.getMasterTypes();
    this.getLocations();
    this.initialiseOrderForm();
  }

  initialiseOrderForm() {
    this.orderForm = this.fb.group({
      masterType: ['', Validators.required],
      date: ['', Validators.required],
      source: ['', Validators.required],
      destination: ['', Validators.required],
      containers: this.fb.array([]),
      remarks: ['', Validators.required]
    });
    this.addFormControl();
  }

  masterTypeSelected(masterTypeId) {
    switch (this.getMasterTypeSource(masterTypeId)) {
      case 'cfs':
        this.getAllCFS();
        break;
      case 'port':
        this.getAllPorts();
        break;
      case 'yard':
        this.getAllYards();
        this.sourceLocations = this.yardMasters;
        break;
      default:
        break;
    }
    switch (this.getMasterTypeDestination(masterTypeId)) {
      case 'cfs':
        this.getAllCFS();
        this.destinationLocations = this.cfsMasters;
        break;
      case 'port':
        this.getAllPorts();
        this.destinationLocations = this.portMasters;
        break;
      case 'yard':
        this.getAllYards();
        this.destinationLocations = this.yardMasters;
        break;
      default:
        break;
    }
  }

  transformCfstoLocations(cfsMasters: Array<any>): Array<any> {
    const cfsLocations: Array<any> = [];
    console.log(cfsMasters);
    if (cfsMasters.length > 0) {
      for (let i = 0; i < cfsMasters.length; i++) {
        const element = cfsMasters[i];
        let locationName: string = '';
        for (let j = 0; j < this.locations.length; j++) {
          if (this.locations[j].locationId === element.location) {
            locationName = this.locations[j].locationName;
          }
        }
        const cfsObj = {
          locationId: element.location,
          locationName
        }
        cfsLocations.push(cfsObj);
      }
    }
    return cfsLocations;
  }
  transformPortstoLocations(portsMasters: Array<any>) {
    const portsLocations: Array<any> = [];
    console.log(portsMasters);
    // console.log(portsLocations);    
    // if (portsLocations.length > 0) {
    //   for (let i = 0; i < portsLocations.length; i++) {
    //     const element = portsLocations[i];
    //     let locationName: string = '';
    //     for (let j = 0; j < this.locations.length; j++) {
    //       if (this.locations[j].locationId === element.location) {
    //         locationName = this.locations[j].locationName;
    //       }
    //     }
    //     const cfsObj = {
    //       locationId: element.location,
    //       locationName
    //     }
    //     cfsLocations.push(cfsObj);
    //   }
    // }
    // console.log(cfsLocations); 
    return portsLocations;
  }
  transformYardsstoLocations(yardsMasters: Array<any>) {

  }

  getAllCFS() {
    this._cfsService.getAllCfsMasters().subscribe(
      (cfsMasters) => {
        this.cfsMasters = cfsMasters;
        this.transformCfstoLocations(this.cfsMasters)
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllPorts() {
    this._portService.getAllPortMasters().subscribe(
      (ports) => {
        this.portMasters = ports;
        this.transformPortstoLocations(this.portMasters);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllYards() {
    this._yardService.getAllYardMasters().subscribe(
      (yards) => {
        this.yardMasters = yards;
        this.transformYardsstoLocations(this.yardMasters);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  changeSourceType() { }
  changeDestinationType() { }

  getMasterTypes() {
    this._masterTypeService.getAllMasterTypes().subscribe(
      (masterTypes) => {
        this.masterTypes = masterTypes;
      },
      (err) => {
        console.log(err);
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


  getLocations() {
    this._locationService.getAllLocationMasters().subscribe(
      (locations) => {
        this.locations = locations;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  removeFormControl(i) {
    const containersArray = this.orderForm.controls.containers as FormArray;
    containersArray.removeAt(i);
  }

  changeContainerNumbers(ev, index) {
    const arr = this.orderForm.get('containers').value;
    arr[index].container_numbers = ev;
  }

  addFormControl() {
    const containersArray = this.orderForm.controls.containers as FormArray;
    const arraylen = containersArray.length;
    const containerRow: FormGroup = this.fb.group({
      type: ['', Validators.required],
      weight: ['', Validators.required],
      number_of_trucks: ['', Validators.required],
      container_numbers: [null]
    });
    containersArray.insert(arraylen, containerRow);
  }

  addCustomContainer = (term) => ({ id: term, value: term });



  submitOrderForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.orderForm.valid) {
      const order = this.transformOrderObj(this.orderForm.value);
      this.saveOrder(order);
    } else {
      this.openSnackBar('Invalid Form !', 'please review all fields');
    }
  }

  transformOrderObj(order: any): Order {
    const containers: Array<OrderContainer> = [];
    if (order.containers.length > 0) {
      order.containers.forEach(container => {
        containers.push(this.transformOrderContainerObj(container));
      });
    }
    return {
      master_type_syscode: order.masterType,
      order_date: order.date,
      order_remarks: order.remarks,
      order_type_syscode: 1,
      order_address: '',
      destination_syscode: Number(order.destination),
      source_syscode: Number(order.source),
      is_delete: false,
      created_by: this.currentUser.id,
      created_on: new Date(),
      modify_by: this.currentUser.id,
      modify_on: new Date(),
      source_type: this.getMasterTypeSource(order.masterType),
      destination_type: this.getMasterTypeDestination(order.masterType),
      containers,
    } as Order;
  }

  getMasterTypeSource(masterTypeId): string {
    const masterType = this.masterTypes.find(m => m.masterTypeId === masterTypeId);
    return masterType.sourceType;
  }

  getMasterTypeDestination(masterTypeId): string {
    const masterType = this.masterTypes.find(m => m.masterTypeId === masterTypeId);
    return masterType.destinationType;
  }

  transformTruckObj(truck): Truck {
    return {
      truckId: null,
      containerId: null,
      created_by: 1,
      modify_by: 1,
      is_delete: false,
      truck_no: truck.text,
      created_on: new Date(),
      modify_on: new Date()
    } as Truck;
  }

  transformOrderContainerObj(container: any): OrderContainer {
    const trucks: Array<Truck> = [];
    if (container.container_numbers.length > 0) {
      container.container_numbers.forEach(truck => {
        trucks.push(this.transformTruckObj(truck));
      });
    }
    return {
      container_type: container.type,
      no_of_trucks: container.number_of_trucks,
      weight_type: container.weight,
      is_delete: false,
      created_by: 1,
      created_on: new Date(),
      modify_by: 1,
      modify_on: new Date(),
      orderId: null,
      trucks
    } as OrderContainer;
  }


  saveOrder(order: Order) {
    this._orderService.saveOrder(order).subscribe(
      (res) => {
        console.log(res);
        this.openSnackBar('Success !', 'Order placed successfully');
        this._router.navigate(['/default/cfs/order-list']);
      },
      (err) => {
        console.log(err);
        this.openSnackBar('Failure !', 'could not place the order');
      }
    );
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
