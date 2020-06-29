import { Transporter } from './../../../shared/models/transporter';
import { ImageUploadService } from './../../../shared/services/image-upload.service';
import { TransporterRegistrationService } from './../services/transporter-registration.service';
import { Component, OnInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';


@Component({
  selector: 'app-transporter-registration',
  templateUrl: './transporter-registration.component.html',
  styleUrls: ['./transporter-registration.component.scss']
})
export class TransporterRegistrationComponent implements OnInit {
  public transporterForm: FormGroup;
  accTypeErrormatcher = new FormErrorStateMatcher();
  confirmAccErrormatcher = new FormErrorStateMatcher();
  currentUser: User;
  files = [];

  public accountTypes: Array<any> = [
    { value: 'saving', viewValue: 'Saving' },
    { value: 'current', viewValue: 'Current' },
    { value: 'budget', viewValue: 'Budget' }
  ];

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _transporterService: TransporterRegistrationService,
    private _router: Router,
    private _imageService: ImageUploadService,
    private _userService: UserService
  ) {
  }

  ngOnInit(): void {
    this._userService.getUsersInfo().subscribe(
      (user) => {
        this.currentUser = user;
      }
    );
    this.transporterForm = this.fb.group({
      transporter_name: ['', Validators.required],
      transporter_mobile_no: ['', Validators.required],
      transporter_email: ['', Validators.required],
      transporter_address: ['', Validators.required],
      transporter_pincode: ['', Validators.required],
      transporter_GSTIN: ['', Validators.required],
      transporter_PAN: ['', Validators.required],
      transporter_partner: ['', Validators.required],
      transporter_partner_PAN: ['', Validators.required],
      transporter_partner_address: ['', Validators.required],
      transporter_bank_acno: ['', Validators.required],
      confirm_transporter_bank_acno: ['', Validators.required],
      transporter_ac_type: ['', Validators.required],
      transporter_bank_name: ['', Validators.required],
      transporter_bank_branch: ['', Validators.required],
      transporter_bank_ifsc: ['', Validators.required],
      transporter_pan_card: [''],
      transporter_permit_card: [''],
      transporter_license_card: [''],
      transporter_other_card: [''],
      transporter_pan_card_file: ['', Validators.required],
      transporter_permit_card_file: ['', Validators.required],
      transporter_license_card_file: ['', Validators.required],
      transporter_other_card_file: ['', Validators.required],
      transporter_is_active: [false],
      transporter_is_verify: [false]
    },
      {
        validator: this.checkAccountNumbers
      });
  }


  submitTransporterForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    console.log(this.transporterForm);
    // this.uploadFiles(this.transporterForm.get('transporter_pan_card'));
    if (this.transporterForm.valid) {

      this.saveTransporter(this.transporterForm);
    } else {
      this.openSnackBar('Invalid Form !', 'Please Review All Fields');
    }
  }


  transformTransporterObj(transporter: any): Transporter {
    return {
      created_by: this.currentUser.id,
      created_on: new Date(),
      transporter_is_active: transporter.transporter_is_active,
      transporter_is_verify: transporter.transporter_is_verify,
      transporter_mobile_no: transporter.transporter_mobile_no,
      modified_by: this.currentUser.id,
      modified_on: new Date(),
      transporter_GSTIN: transporter.transporter_GSTIN,
      transporter_PAN: transporter.transporter_PAN,
      transporter_ac_type: transporter.transporter_ac_type,
      transporter_address: transporter.transporter_address,
      transporter_address_file: '',
      transporter_bank_acno: transporter.transporter_bank_acno,
      transporter_bank_branch: transporter.transporter_bank_branch,
      transporter_bank_ifsc: transporter.transporter_bank_ifsc,
      transporter_bank_name: transporter.transporter_bank_name,
      transporter_email: transporter.transporter_email,
      transporter_gst_file: '',
      transporter_license_card: transporter.transporter_license_card,
      transporter_name: transporter.transporter_name,
      transporter_other_card: transporter.transporter_other_card,
      transporter_pan_card: transporter.transporter_pan_card,
      transporter_partner: transporter.transporter_partner,
      transporter_partner_PAN: transporter.transporter_partner_address,
      transporter_partner_address: transporter.transporter_partner_address,
      transporter_permit_card: transporter.transporter_permit_card,
      transporter_pincode: transporter.transporter_pincode,
      transporter_syscode: null
    } as Transporter;
  }

  uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    this._imageService.imageUpload(formData).subscribe(
      (res) => {
        console.log(res);
      }
    );
  }

  uploadFiles(fileControl: any) {
    this.files.push({ data: fileControl.value.files[0], inProgress: false, progress: 0 });
    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }

  checkAccountNumbers(group: FormGroup) {
    const transporterBankAcno = group.get('transporter_bank_acno').value;
    const confirmTransporterBankAcno = group.get('confirm_transporter_bank_acno').value;
    return transporterBankAcno === confirmTransporterBankAcno ? null : { notSame: true };
  }

  saveTransporter(transporterForm: any) {
    const panCard: any = transporterForm.get('transporter_pan_card_file');
    const permitCard: any = transporterForm.get('transporter_permit_card_file');
    const licenseCard: any = transporterForm.get('transporter_license_card_file');
    const otherCard: any = transporterForm.get('transporter_other_card_file');
    const transporter = this.transformTransporterObj(transporterForm.value);
    this._transporterService.saveTransporter(transporter).subscribe(
      (res: Transporter) => {
        this.uploadFiles(panCard);
        // this.uploadFiles(permitCard, String(res.transporter_syscode));
        // this.uploadFiles(licenseCard, String(res.transporter_syscode));
        // this.uploadFiles(otherCard, String(res.transporter_syscode));
        this.openSnackBar('Success !', 'Transporter Created Successfully');
        this._router.navigate(['/default/transporter/transporter-list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not create Transporter');
      }
    );
  }



  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
