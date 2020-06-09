import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';

@Component({
  selector: 'app-transporter-registration',
  templateUrl: './transporter-registration.component.html',
  styleUrls: ['./transporter-registration.component.scss']
})
export class TransporterRegistrationComponent implements OnInit {

  public transporterForm: FormGroup;
  cfsTypeErrormatcher = new FormErrorStateMatcher();
  userTypeErrormatcher = new FormErrorStateMatcher();

  public cfsTypes: Array<any> = [
    { value: 'cfs-1', viewValue: 'cfs-1' },
    { value: 'cfs-2', viewValue: 'cfs-2' },
    { value: 'cfs-3', viewValue: 'cfs-3' },
    { value: 'cfs-4', viewValue: 'cfs-4' }
  ];
  public userTypes: Array<any> = [
    { value: 'transporter', viewValue: 'transporter' },
    { value: 'driver', viewValue: 'driver' },
    { value: 'user', viewValue: 'user' }
  ];

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.transporterForm = this.fb.group({
      name: ['', Validators.required],
      mobile_number: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      pincode: ['', Validators.required],
      gstin: ['', Validators.required],
      pan_number: ['', Validators.required],
      pan_of_director: ['', Validators.required],
      director_name: ['', Validators.required],
      director_address: ['', Validators.required],
      account_number: ['', Validators.required],
      confirm_account_number: ['', Validators.required],
      account_type: ['', Validators.required],
      bank_name: ['', Validators.required],
      branch: ['', Validators.required],
      ifsc_code: ['', Validators.required],
      is_active: ['', Validators.required],
      is_verified: ['', Validators.required]
    });
  }

  submitTransporterForm(ev) {
    if(ev){
      ev.preventDefault();
    }
  }

}
