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
import { PortterminalmasterService } from '../../masters/services/portterminalmaster.service';
import { PortTerminalMaster } from 'src/app/shared/models/PortTerminalMaster';


@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {
  errorStateMatcher = new FormErrorStateMatcher();
  public orderForm: FormGroup;
  public selectedSimpleItem;
  public containers: [] = [];
  public currentUser: User;
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
    private _portTerminalService: PortterminalmasterService) { }

  ngOnInit(): void {
    this.initialiseOrderForm();
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
      portTerminalId: [''],
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

  
  submitOrderForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.orderForm.valid) {
      const order = this.transformOrderObj(this.orderForm.value, 'submitted');
    //  this.saveOrder(order);
    } else {
      this.openSnackBar('Invalid Form !', 'please review all fields');
    }
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
      rateExcludingProfit: 0,
      portTerminalId: order.portTerminalId
    } as Order;
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
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  containerTypeSelected(containerRow, containerId) {
    containerRow.controls['weightType'].reset();
    console.log(containerId);
    const typeId = this.selectedMasterType.masterTypeId;
    this.getAllWeightsForCFS(typeId,containerId);
  }

  getAllWeightsForCFS(type: number, containerId: number) {
    this._masterTypeService.GetAllCFSWeightsbyUserandContainerId(this.currentUser.userId, type, containerId).subscribe(
      (weightMasters) => {
        this.weights = weightMasters;
      },
      (err) => {
        console.log('could not fetch weight masters');
      }
    );
  }
  saveOrderAsDraft(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.orderForm.valid) {
      const order = this.transformOrderObj(this.orderForm.value, 'draft');
      this.saveOrderDraft(order);
    } else {
      this.openSnackBar('Invalid Form !', 'please review all fields');
    }
  }

  saveOrderDraft(order: Order) {
    this._orderService.saveOrder(order).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Order saved');
        this._router.navigate(['/default/cfs/order-list']);
      },
      (err) => {
        console.log(err);
        this.openSnackBar('Failure !', 'could not save the order');
      }
    );
  }
  removeFormControl(i) {
    const containersArray = this.orderForm.controls.containers as FormArray;
    containersArray.removeAt(i);
  }

}
