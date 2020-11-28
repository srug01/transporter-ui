import { CfsUserRegistration } from './../../../shared/models/cfsUserRegistration';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface CreditData {
  creditAmount: string;
  creditDate: string;
}

export interface PaymentData {
  paymentAmount: string;
  paymentDate: string;
}

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  public currentUser: CfsUserRegistration;
  public userForm: FormGroup;
  creditAmount: number;
  creditDate: string;
  paymentAmount: number;
  paymentDate: string;
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
    this.creditAmount = 0;
    this.creditDate = "";
    const dialogRef = this.dialog.open(AppCreditModalComponent, {
      width: '350px',
      data: { creditAmount: this.creditAmount, creditDate: this.creditDate }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.creditAmount = result;
      this.creditDate = result;

      if(this.creditAmount ===0)
      {
       // ev.preventDefault();
        //this.openSnackBar('Success !', 'Order placed successfully');
      }

      // Call Credit Saving API here
    });
  }

  openPaymentDialog(ev) {
    if (ev) {
      ev.preventDefault();
    }
    this.paymentDate = "";
    this.paymentAmount = 0;
    const dialogRef = this.dialog.open(AppPaymentCreditModalComponent, {
      width: '350px',
      data: { paymentDate: this.paymentDate, paymentAmount: this.paymentAmount }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.paymentAmount = result;
      this.paymentDate = result;


      // Call Payment Saving APi here
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
export class AppCreditModalComponent {

  constructor(
    public dialogRef: MatDialogRef<AppCreditModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: CreditData,
    private _snackBar: MatSnackBar,) {}

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

  constructor(
    public dialogRef: MatDialogRef<AppPaymentCreditModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: PaymentData,
    private _snackBar: MatSnackBar,) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  openSnackBarPayment(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


}

