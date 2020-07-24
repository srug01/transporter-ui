import { Container } from './../../../shared/models/container';
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
import { ContainerService } from '../../masters/services/container.service';
import { DatePipe } from '@angular/common';

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
  public containerTypes: Array<any> = [];


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
    private _notificationService: NotificationService,
    private datePipe: DatePipe,
    private _weightService: WeightService,
    private _containerService: ContainerService
  ) { }


  ngOnInit(): void {
    this.getUserInfo();
    this.getMasterTypes();
    this.getLocations();
    this.initialiseOrderForm();
    //this.getAllWeightMasters();
    //this.getAllContainers();
  }

  getCfsMasterByUserId(masterType: string) {
    const filter = {
      where: {
        or: [
          {
            userId: this.currentUser.userId
            //cfsMasterId: "1"
          }
        ]
      }
    };
    this._cfsService.getAllCfsMastersByUserId(filter).subscribe(
      (cfsMasters: Array<Cfs>) => {
        this.orderForm.get(masterType).setValue(cfsMasters[0].cfsMasterId);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getPortMasterByUserId(masterType: string) {
    const filter = {
      where: {
        or: [
          {
            userId: this.currentUser.userId
          }
        ]
      }
    };
    this._portService.getAllPortMastersByUserId(filter).subscribe(
      (portMasters: Array<Port>) => {
        this.orderForm.get(masterType).setValue(portMasters[0].portMasterId);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getYardMasterByUserId(masterType: string) {
    const filter = {
      where: {
        or: [
          {
            userId: this.currentUser.userId
          }
        ]
      }
    };
    this._yardService.getAllYardMastersByUserId(filter).subscribe(
      (yardMasters: Array<Yard>) => {
        this.orderForm.get(masterType).setValue(yardMasters[0].yardMasterId);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  initialiseOrderForm() {
    this.orderForm = this.fb.group({
      orderId: [''],
      ordeorderTypeId: [''],
      orderDate: ['', Validators.required],
      masterTypeId: ['', Validators.required],
      sourceId: ['', Validators.required],
      destinationId: ['', Validators.required],
      sourceType: [''],
      destinationType: [''],
      orderRemarks: ['', Validators.required],
      orderAddress: [''],
      isDeleted: [false, ''],
      isVerified: [false, ''],
      status: [''],
      createdBy: [''],
      createdOn: [''],
      modifiedBy: [''],
      modifiedOn: [''],
      totalRate: [''],
      profitRate: [''],
      profitMarginPercentage: [''],
      rateExcludingProfit: [''],
      containers: this.fb.array([]),
    });
    this.addFormControl();
  }

  transformOrderObj(order: any, status: string): Order {
    const containers: Array<Container> = [];
    if (order.containers.length > 0) {
      order.containers.forEach(container => {
        containers.push(this.transformOrderContainerObj(container));
      });
    }
    return {
      orderId: null,
      masterTypeId: order.masterTypeId,
      orderDate: order.orderDate,
      orderRemarks: order.orderRemarks,
      orderTypeId: order.orderTypeId,
      orderAddress: order.orderAddress,
      destinationId: order.destinationId,
      sourceId: order.sourceId,
      sourceType: order.sourceType,
      destinationType: order.destinationType,
      isDeleted: order.isDeleted,
      isVerified: order.isVerified,
      createdBy: 1,
      createdOn: new Date(),
      modifiedBy: 1,
      modifiedOn: new Date(),
      status,
      containers,
      totalRate: 0,
      profitRate: 0,
      profitMarginPercentage: 0,
      rateExcludingProfit: 0
    } as Order;
  }

  getLocations() {
    /* this.getAllCFS();
    this.getAllPorts();
    this.getAllYards(); */

    this.getAllCFSbyUserId();
    this.getAllCFSPortsbyUserId();
    this.getAllCFSYardsbyUserId();
  }

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

  getAllWeightsForCFS(type: number) {
    this._masterTypeService.getAllCFSWeightsbyUserId(this.currentUser.userId, type).subscribe(
      (weightMasters) => {
        this.weights = weightMasters;
      },
      (err) => {
        console.log('could not fetch weight masters');
      }
    );
  }

  masterTypeSelected(masterTypeId) {
    this._masterTypeService.getMasterTypeById(masterTypeId).subscribe(
      (masterType: MasterType) => {
        this.selectedMasterType = masterType;

        this.getAllWeightsForCFS(masterTypeId);
        this.getAllCFSContainersbyUserId(masterTypeId);

        this.source = this.selectedMasterType.sourceType;
        this.orderForm.get('sourceType').setValue(this.source);
        this.destination = this.selectedMasterType.destinationType;
        this.orderForm.get('destinationType').setValue(this.destination);
        switch (this.source) {
          case 'CFS':
            this.getCfsMasterByUserId('sourceId');
            break;
          case 'PORT':
            this.getPortMasterByUserId('sourceId');
            break;
          case 'YARD':
            this.getYardMasterByUserId('sourceId');
            break;

          default:
            break;
        }
        switch (this.destination) {
          case 'CFS':
            this.getCfsMasterByUserId('destinationId');
            break;
          case 'PORT':
            this.getPortMasterByUserId('destinationId');
            break;
          case 'YARD':
            this.getYardMasterByUserId('destinationId');
            break;

          default:
            break;
        }
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

  getAllCFSbyUserId() {
    this._masterTypeService.getAllCFSbyUserId(this.currentUser.userId).subscribe(
      (cfsMasters) => {
        this.cfsMasters = cfsMasters;
      },
      (err) => {
        console.log(err);
      }
    );
  }



  getAllContainers() {
    this._containerService.getAllContainerMasters().subscribe(
      (containerTypes) => {
        this.containerTypes = containerTypes;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllCFSContainersbyUserId(type: number) {
    this._masterTypeService.getAllCFSContainersbyUserId(this.currentUser.userId, type).subscribe(
      (containerTypes) => {
        this.containerTypes = containerTypes;
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

  getAllCFSPortsbyUserId() {
    this._masterTypeService.getAllCFSPortsbyUserId(this.currentUser.userId).subscribe(
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

  getAllCFSYardsbyUserId() {
    this._masterTypeService.getAllCFSYardsbyUserId(this.currentUser.userId).subscribe(
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
      containerMasterId: ['', Validators.required],
      weightType: ['', Validators.required],
      numberOfTrucks: ['', Validators.required],
      trucks: [null]
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
      console.log(this.orderForm.value);
      const order = this.transformOrderObj(this.orderForm.value, 'pending');
      console.log(order);
      this.saveOrderDraft(order);
    } else {
      this.openSnackBar('Invalid Form !', 'please review all fields');
    }
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
      createdBy: 1,
      modifiedBy: 1,
      isDeleted: false,
      truckNumber: truck.text,
      createdOn: new Date(),
      modifiedOn: new Date()
    } as Truck;
  }

  transformOrderContainerObj(container: any): Container {
    const trucks: Array<Truck> = [];
    if (container.container_numbers.length > 0) {
      container.container_numbers.forEach(truck => {
        trucks.push(this.transformTruckObj(truck));
      });
    }
    return {
      containerId: null,
      containerMasterId: container.containerMasterId,
      orderId: null,
      numberOfTrucks: container.numberOfTrucks,
      weightType: container.weightType,
      isDeleted: false,
      createdBy: 1,
      createdOn: new Date(),
      modifiedBy: 1,
      modifiedOn: new Date(),
      trucks
    } as Container;
  }


  saveOrder(order: Order) {
    this._orderService.saveOrder(order).subscribe(
      (res) => {
        const notification: Notification = {
          orderId: res.orderId,
          assignedToRole: 1,
          assignedToUser: null,
          createdBy: this.currentUser.userId,
          createdOn: new Date(),
          isRead: false,
          notificationDesc: `${this.currentUser.name} placed a new Order on ${this.datePipe.transform(Date.now(), 'yyyy-MM-dd')}!`,
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
