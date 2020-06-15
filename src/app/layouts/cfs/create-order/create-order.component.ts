import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  errorStateMatcher = new FormErrorStateMatcher();
  public orderForm: FormGroup;

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
    private _router: Router
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
    this.addFormControl();
    this.addFormControl();
    console.log(this.orderForm);

  }

  removeFormControl(i) {
    let containersArray = this.orderForm.controls.containers as FormArray;
    containersArray.removeAt(i);
  }

  addFormControl() {
    let containersArray = this.orderForm.controls.containers as FormArray;
    let arraylen = containersArray.length;

    let containerRow: FormGroup = this.fb.group({
      type: ['', Validators.required],
      weight: ['', Validators.required],
      number_of_trucks: ['', Validators.required],
      container_number: ['', Validators.required]
    });

    containersArray.insert(arraylen, containerRow);
  }

  ngOnInit(): void {
    this.dataSource = [
      {
        position: 1,
        Type: '10 FT',
        Weight: '1 TON',
        NoOfTrucks: '10',
        ContainerNo: '200'
      },
      {
        position: 2,
        Type: '10 FT',
        Weight: '1 TON',
        NoOfTrucks: '10',
        ContainerNo: '200'
      },
      {
        position: 3,
        Type: '10 FT',
        Weight: '1 TON',
        NoOfTrucks: '10',
        ContainerNo: '200'
      },
    ];
    this.initialiseOrderForm();
  }

  submitOrderForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    console.log(this.orderForm);
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

}
