import { CfsUserRegistration } from './../../../shared/models/cfsUserRegistration';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  public currentUser: CfsUserRegistration;
  public userForm: FormGroup;
  public paymentHistoriesColumns: string[] = [
    '#', 'AvailableLimit', 'creditLimit', 'PaymentDate'
  ];
  public paymentColumns: string[] = [
    '#', 'creditLimit', 'date'
  ];
  public paymentsReceivedColumns: string[] = [
    '#', 'TransactionId', 'Amount', 'paymentMode','receivedDate', 'Remarks'
  ];

  constructor(
    private _route: ActivatedRoute,
    private fb: FormBuilder
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

  submitUserForm(ev) {
    console.log(this.userForm);
  }

}
