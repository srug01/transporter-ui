import { NotificationService } from './../../../shared/services/notification.service';
import { Notification } from './../../../shared/models/notification';
import { Port } from './../../../shared/models/port';
import { Yard } from 'src/app/shared/models/yard';
import { Cfs } from './../../../shared/models/cfs';
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
import { MasterTypeService } from '../services/master-type.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';
import { YardService } from '../../masters/services/yard.service';
import { CfsService } from '../../masters/services/cfs.service';
import { WeightService } from '../../masters/services/weight.service';

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
  public cfsMasters: Cfs[] = [];
  public yardMasters: Yard[] = [];
  public portMasters: Port[] = [];
  public sourceLocations: Array<any> = [];
  public destinationLocations: Array<any> = [];
  public masterTypes: MasterType[] = [];
  public locations: LocationMaster[] = [];
  public selectedMasterType: MasterType = null;
  public source: string;
  public destination: string;
  public cfsLocation: Array<any> = [];
  public weights: Array<any> = [];


  types: any[] = [
    { value: '10', viewValue: '10 FT' },
    { value: '20', viewValue: '20 FT' },
    { value: '30', viewValue: '30 FT' }
  ];
  // weights: any[] = [
  //   { value: '1', viewValue: '1 TON' },
  //   { value: '2', viewValue: '2 TON' },
  //   { value: '3', viewValue: '3 TON' }
  // ];

  getAllWeightMasters() {
    this._weightService.getAllWeightMasters().subscribe(
      (weightMasters) => {
        this.weights = weightMasters;
      },
      (err) => {
        console.log('could not fetch weight masters');
      }
    );
  }

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
    private _cfsService: CfsService,
    private _weightService: WeightService,
    private _notificationService: NotificationService
  ) { }


  ngOnInit(): void {
    this.getUserInfo();
    this.getMasterTypes();
    this.getLocations();
    this.getCFSLocation();
    this.initialiseOrderForm();
    this.getAllWeightMasters();
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

  getLocations() {
    this.getAllCFS();
    this.getAllPorts();
    this.getAllYards();
  }

  masterTypeSelected(masterTypeId) {
    this._masterTypeService.getMasterTypeById(masterTypeId).subscribe(
      (masterType: MasterType) => {
        this.selectedMasterType = masterType;
        this.source = this.selectedMasterType.sourceType;
        this.destination = this.selectedMasterType.destinationType;
      },
      (err) => {
        console.log(err);
      }
    );
  }


  getAllCFS() {
    this._cfsService.getAllCfsMasters().subscribe(
      (cfsMasters) => {
        this.cfsMasters = cfsMasters;
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
      },
      (err) => {
        console.log(err);
      }
    );
  }

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
        console.log(this.currentUser);
      }
    );
  }

  getCFSLocation() {
    this._orderService.getCfsLocation(2).subscribe(
      (cfsLocation) => {
        this.cfsLocation = cfsLocation;

        console.log(this.cfsLocation);
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
      const order = this.transformOrderObj(this.orderForm.value, 'submitted');
      this.saveOrder(order);
    } else {
      this.openSnackBar('Invalid Form !', 'please review all fields');
    }
  }

  resetOrderForm() {
    this.orderForm.reset();
    this.orderForm.markAsPristine();
  }

  saveOrderAsDraft(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.orderForm.valid) {
      const order = this.transformOrderObj(this.orderForm.value, 'pending');
      this.saveOrderDraft(order);
    } else {
      this.openSnackBar('Invalid Form !', 'please review all fields');
    }
  }

  transformOrderObj(order: any, status: string): Order {
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
      status,
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
        const notification: Notification = {
          orderId: res.orderId,
          assignToRole: 1,
          assignToUser: null,
          createdBy: this.currentUser.id,
          createdOn: new Date(),
          isRead: false,
          notificationDesc: `${this.currentUser.name} placed a new Order on ${new Date()}!`,
          notificationId: null,
          notificationType: 'orders'
        };
        this.saveNotification(notification);
        this.openSnackBar('Success !', 'Order placed successfully');
        this._router.navigate(['/default/cfs/order-list']);
      },
      (err) => {
        console.log(err);
        this.openSnackBar('Failure !', 'could not place the order');
      }
    );
  }

  saveNotification(notification: Notification) {
    this._notificationService.saveNotification(notification).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  saveOrderDraft(order: Order) {
    this._orderService.saveOrder(order).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Order saved');
      },
      (err) => {
        console.log(err);
        this.openSnackBar('Failure !', 'could not save the order');
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
