import { CfsUserRegistration } from './../../../shared/models/cfsUserRegistration';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface CreditData {
  currentUser: CfsUserRegistration;
}

export interface PaymentData {
  currentUser: CfsUserRegistration;
}

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  public currentUser: CfsUserRegistration;
  public userForm: FormGroup;
  public paymentHistoriesColumns: string[] = [
    '#', 'Outstanding', 'AvailableLimit', 'creditLimit', 'createdOn'
  ];
  public paymentColumns: string[] = [
    '#', 'creditLimit', 'date'
  ];
  public paymentsReceivedColumns: string[] = [
    '#', 'TransactionId', 'Amount', 'paymentMode', 'receivedDate', 'Remarks'
  ];

  constructor(
    private _route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.currentUser = this._route.snapshot.data['userResolver'];
    this.initialiseForm();
  }


  initialiseForm() {
    this.userForm = this.fb.group({
      cfsUserName: [this.currentUser.cfsUserName, Validators.required],
      cfsUserEmail: [this.currentUser.cfsUserEmail, Validators.required],
      cfsUserDepartment: [this.currentUser.cfsUserDepartment, Validators.required],
      cfsUserDesignation: [this.currentUser.cfsUserDesignation, Validators.required],
      cfsUserMobileNumber: [this.currentUser.cfsUserMobileNumber, Validators.required],
      isActive: [this.currentUser.isActive, Validators.required]
    });
  }



  openDialog(ev) {
    if (ev) {
      ev.preventDefault();
    }
    const dialogRef = this.dialog.open(AppCreditModalComponent, {
      width: '350px',
      data: { currentUser: this.currentUser }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }



  openPaymentDialog(ev) {
    if (ev) {
      ev.preventDefault();
    }
    const dialogRef = this.dialog.open(AppPaymentCreditModalComponent, {
      width: '350px',
      data: { currentUser: this.currentUser }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  submitUserForm(ev) {
    console.log(this.userForm);
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}


@Component({
  selector: 'app-credit-modal',
  templateUrl: 'credit-modal.component.html',
})
export class AppCreditModalComponent implements OnInit {
  creditForm: FormGroup;
  currentUser: CfsUserRegistration;
  constructor(
    public dialogRef: MatDialogRef<AppCreditModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: CreditData,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initialiseCreditForm();
  }

  initialiseCreditForm() {
    this.creditForm = this.fb.group({
      creditAmount: ['', Validators.required],
      creditDate: ['', Validators.required],
    });
  }

  submitCreditForm(ev) {
    console.log(this.creditForm.value);
    console.log(this.data.currentUser);

    // Call Credit API here
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  openSnackBarCredit(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}

@Component({
  selector: 'app-payment-credit-modal',
  templateUrl: 'credit-payment-modal.component.html',
})
export class AppPaymentCreditModalComponent {
  paymentForm: FormGroup;
  currentUser: CfsUserRegistration;
  constructor(
    public dialogRef: MatDialogRef<AppPaymentCreditModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: PaymentData,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder) {
    this.initialisePaymentForm();
  }

  submitPaymentForm(ev) {
    console.log(this.paymentForm.value);
    console.log(this.data.currentUser);


    // Call Payment API here
  }

  initialisePaymentForm() {
    this.paymentForm = this.fb.group({
      paymentAmount: ['', Validators.required],
      paymentDate: ['', Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  openSnackBarPayment(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}

