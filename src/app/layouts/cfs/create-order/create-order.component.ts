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
import { DatePipe, AsyncPipe } from '@angular/common';
import { PortterminalmasterService } from '../../masters/services/portterminalmaster.service';
import { PortTerminalMaster } from 'src/app/shared/models/PortTerminalMaster';
import { async } from 'rxjs/internal/scheduler/async';
import { TimeSlot } from 'src/app/shared/models/timeslot';
import { AlertService } from 'src/app/shared/services/alert.service';
import * as _moment from 'moment';

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
  public currentUser: User = new User();
  public containerNumbers: Array<any> = [];
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
  public timeSlots: Array<any> = [];
  masterTypeSelectedId: number = 0;
  portyardId: number = 0;
  public minDate: Date;
  public maxDate: Date;
  public userId = parseInt(localStorage.getItem('userID'), 10);

  displayedColumns: string[] = [
    'position', 'Type', 'Weight', 'NoOfTrucks', 'ContainerNo'
  ];
  terminals: PortTerminalMaster[] = [];
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
    private _containerService: ContainerService,
    private _portTerminalService: PortterminalmasterService,
    private _alertService: AlertService
  ) { }


  ngOnInit(): void {
    this.minDate = this.addDays(new Date(), 1);
    this.maxDate = this.addDays(new Date(), 15);
    this.currentUser.userId = parseInt(localStorage.getItem('userID'), 10);
    this.currentUser.typeSyscode = parseInt(localStorage.getItem('roleID'), 10);
    this.getAllCFSbyUserId();
    this.getAllCFSPortsbyUserId();
    this.getAllCFSYardsbyUserId();
    this.getMasterTypes();
    this.initialiseOrderForm();
    this.getAllTimeSlots();
  }

  masterTypeSelected(masterTypeId) {
    this.masterTypeSelectedId = masterTypeId;
    this.orderForm.get('portTerminalId').setValue(null);
    this._masterTypeService.getMasterTypeById(masterTypeId).subscribe(
      (masterType: MasterType) => {
        this.selectedMasterType = masterType;
        //this.getAllWeightsForCFS(masterTypeId);
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

  containerTypeSelected(containerRow: FormGroup, i, containerMasterId) {
    containerRow.controls['weightType'].reset();
    const typeId = this.selectedMasterType.masterTypeId;
    this.getAllWeightsForCFS(typeId, containerMasterId, i);
  }

  yardChanged(id, type) {
    if (type == "source") {
      this.orderForm.get('sourceId').setValue(id);
    }
    else if (type == "destination") {
      this.orderForm.get('destinationId').setValue(id);
    }
    this.portyardId = id;
    this.getAllCFSContainersbyUserId(this.masterTypeSelectedId, this.portyardId);

  }

  getCfsMasterByUserId(masterType: string) {
    this._masterTypeService.getAllCFSbyUserId(this.userId).subscribe(
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
            userId: this.userId
          }
        ]
      }
    };
    // this._portService.getAllPortMastersByUserId(filter).subscribe(
    this._masterTypeService.getAllCFSPortsbyUserId(this.userId).subscribe(
      (portMasters: Array<Port>) => {
        this.orderForm.get(masterType).setValue(portMasters[0].portMasterId);
        this.getTerminalsByPortMasterId(portMasters[0].portMasterId);
        this.portyardId = portMasters[0].portMasterId;
        this.getAllCFSContainersbyUserId(this.masterTypeSelectedId, this.portyardId);
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
            userId: this.userId
          }
        ]
      }
    };
    // this._yardService.getAllYardMastersByUserId(filter).subscribe(
    this._masterTypeService.getAllCFSYardsbyUserId(this.userId).subscribe(
      (yardMasters: Array<Yard>) => {
        this.yardMasters = yardMasters;
        this.orderForm.get(masterType).setValue(yardMasters[0].yardMasterId);
        this.getPortMasterByPortMasterId(yardMasters[0].portMasterId);
        this.portyardId = yardMasters[0].yardMasterId;
        this.getAllCFSContainersbyUserId(this.masterTypeSelectedId, this.portyardId);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getTerminalsByPortMasterId(portMasterId: number) {
    this._portTerminalService.getPortTerminalMasterByPortMasterId(portMasterId).subscribe(
      (terminals: PortTerminalMaster[]) => {
        this.terminals = terminals;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getPortMasterByPortMasterId(portMasterId: number) {
    this._portService.getPortMastersById(portMasterId).subscribe(
      (port: Port) => {
        this.getTerminalsByPortMasterId(port.portMasterId);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllTimeSlots() {
    this._masterTypeService.getAllTimeSlotMasters().subscribe(
      (slots: TimeSlot[]) => {
        this.timeSlots = slots;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  timeSlotSelected(slotId) {

  }

  initialiseOrderForm() {
    this.orderForm = this.fb.group({
      orderId: [''],
      orderTypeId: [''],
      orderDate: ['', Validators.required],
      masterTypeId: ['', Validators.required],
      sourceId: ['', Validators.required],
      destinationId: ['', Validators.required],
      sourceType: [''],
      destinationType: [''],
      orderRemarks: [''],
      portTerminalId: [''],
      orderAddress: [''],
      isDeleted: [false, ''],
      isVerified: [false, ''],
      orderStatus: [''],
      // orderStatusId: [''],
      createdBy: [''],
      createdOn: [''],
      modifiedBy: [''],
      modifiedOn: [''],
      totalRate: [''],
      profitRate: [''],
      profitMarginPercentage: [''],
      rateExcludingProfit: [''],
      timeslotMasterId: ['', Validators.required],
      containers: this.fb.array([]),
    });
    this.addFormControl();
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  transformOrderObj(order: any, status: string): Order {
    const containers: Array<Container> = [];
    if (order.containers.length > 0) {
      order.containers.forEach(container => {
        containers.push(this.transformOrderContainerObj(container));
      });
    }
    if (!order.containers[0].containerMasterId) {
      delete order.containers;
    }
    return {
      orderId: null,
      masterTypeId: order.masterTypeId,
      orderDate: order.orderDate,
      orderRemarks: order.orderRemarks,
      orderTypeId: order.masterTypeId,
      orderAddress: order.orderAddress,
      destinationId: order.destinationId,
      sourceId: order.sourceId,
      sourceType: order.sourceType,
      destinationType: order.destinationType,
      isDeleted: order.isDeleted,
      isVerified: order.isVerified,
      createdBy: this.currentUser.userId,
      // createdOn: new Date(),
      modifiedBy: this.currentUser.userId,
      modifiedOn: new Date(),
      orderStatus: status,
      // orderStatusId: order.orderStatusId,
      containers,
      totalRate: 0,
      profitRate: 0,
      profitMarginPercentage: 0,
      rateExcludingProfit: 0,
      portTerminalId: order.portTerminalId ? order.portTerminalId : 0,
      timeslotMasterId: order.timeslotMasterId
    } as Order;
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


  // try to fetch from cache Need to ask Bhushan
  getAllWeightsForCFS(type: number, containerId: any, i) {
    this._masterTypeService.GetAllCFSWeightsbyUserandContainerId(this.currentUser.userId, type, containerId, this.portyardId).subscribe(
      (weightMasters) => {
        this.weights[i] = weightMasters;
      },
      (err) => {
        console.log('could not fetch weight masters');
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
    this._masterTypeService.getAllCFSbyUserId(this.userId).subscribe(
      (cfsMasters) => {
        this.cfsMasters = cfsMasters;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllCFSContainersbyUserId(type: number, portyardid: number) {
    this._masterTypeService.getAllCFSContainersbyUserId(this.userId, type, portyardid).subscribe(
      (containerTypes) => {
        this.containerTypes = containerTypes;
        if (this.containerTypes.length == 0) {
          this._alertService.error('No Containers Found', 'Missing Info!');
        }
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
    this._masterTypeService.getAllCFSPortsbyUserId(this.userId).subscribe(
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
    this._masterTypeService.getAllCFSYardsbyUserId(this.userId).subscribe(
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
      containerMasterId: [''],
      weightType: [''],
      numberOfTrucks: [''],
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
      this._alertService.error('please review all the fields', 'Invalid Form!');
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
      const order = this.transformOrderObj(this.orderForm.value, 'draft');
      this.saveOrderDraft(order);
    } else {
      this._alertService.error('please review all the fields', 'Invalid Form!');
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
    if (container.container_numbers) {
      if (container.container_numbers.length > 0) {
        container.container_numbers.forEach(truck => {
          trucks.push(this.transformTruckObj(truck));
        });
      }
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
        this._alertService.success('Order placed successfully', 'Success!');
        this._router.navigate(['/default/cfs/order-list']);
      },
      (err) => {
        console.log(err);
        this._alertService.error('could not place the order', 'Failure!');
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
        this._alertService.success('Order saved As Draft', 'Success!');
        this._router.navigate(['/default/cfs/order-list']);
      },
      (err) => {
        console.log(err);
        this._alertService.error('could not place the order', 'Failure!');
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
