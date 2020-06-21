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
  public containerNumbers: Array<any> = [
  ];

  public states: [] = [];

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
    private _stateService: StateMasterService
  ) { }

  initialiseOrderForm() {
    this.orderForm = this.fb.group({
      port_to_cfs: ['', Validators.required],
      date: ['', Validators.required],
      source: ['', Validators.required],
      destination: ['', Validators.required],
      containers: this.fb.array([]),
      remarks: ['', Validators.required]
    });
    this.addFormControl();

  }

  removeFormControl(i) {
    let containersArray = this.orderForm.controls.containers as FormArray;
    containersArray.removeAt(i);
  }

  changeContainerNumbers(ev, index) {
    const arr = this.orderForm.get('containers').value;
    arr[index].container_numbers = ev;
  }

  addFormControl() {
    let containersArray = this.orderForm.controls.containers as FormArray;
    let arraylen = containersArray.length;

    let containerRow: FormGroup = this.fb.group({
      type: ['', Validators.required],
      weight: ['', Validators.required],
      number_of_trucks: ['', Validators.required],
      container_numbers: [null]
    });
    containersArray.insert(arraylen, containerRow);
  }

  addCustomContainer = (term) => ({ id: term, value: term });

  ngOnInit(): void {
    this.getStates();
    this.initialiseOrderForm();
  }

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
      order_date: order.date,
      order_remarks: order.remarks,
      order_type_syscode: 1,
      order_address: '',
      destination_syscode: Number(order.destination),
      source_syscode: Number(order.source),
      is_delete: false,
      created_by: 1,
      created_on: new Date(),
      modify_by: 1,
      modify_on: new Date(),
      destination_type_syscode: Number(order.destination),
      source_type_syscode: Number(order.source),
      containers
    } as Order;
  }

  transformOrderContainerObj(container: any): OrderContainer {
    return {
      container_type: container.type,
      // order_container_numbers: container.container_numbers,
      no_of_trucks: container.number_of_trucks,
      weight_type: container.weight,
      is_delete: false,
      created_by: 1,
      created_on: new Date(),
      modify_by: 1,
      modify_on: new Date(),
      orderId: null
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

  getStates() {
    this._stateService.getAllStateMasters().subscribe(
      (states) => {
        this.states = states;
        console.log(this.states);
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
