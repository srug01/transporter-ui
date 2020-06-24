import { TransporterRegistrationService } from './../services/transporter-registration.service';
import { Component, OnInit,  ViewChild, ElementRef  } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ImageUploadService } from './../../../shared/services/image-upload.service';


@Component({
  selector: 'app-transporter-registration',
  templateUrl: './transporter-registration.component.html',
  styleUrls: ['./transporter-registration.component.scss']
})
export class TransporterRegistrationComponent implements OnInit {
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];

  public transporterForm: FormGroup;
  accTypeErrormatcher = new FormErrorStateMatcher();
  confirmAccErrormatcher = new FormErrorStateMatcher();

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
    private _imageuploadService: ImageUploadService
  ) { }

  ngOnInit(): void {
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
    if (this.transporterForm.valid) {
      this.saveTransporter(this.transporterForm);
    } else {console.log(this.transporterForm);
      this.openSnackBar('Invalid Form !', 'Please Review All Fields');
    }
  }

  checkAccountNumbers(group: FormGroup) {
    const transporterBankAcno = group.get('transporter_bank_acno').value;
    const confirmTransporterBankAcno = group.get('confirm_transporter_bank_acno').value;
    console.log(transporterBankAcno === confirmTransporterBankAcno);
    return transporterBankAcno === confirmTransporterBankAcno ? null : { notSame: true };
  }

  saveTransporter(transporterForm: any) {
    this._transporterService.saveTransporter(transporterForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Transporter Created Successfully');
        this._router.navigate(['/default/transporter/transporter-list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not create Transporter');
      }
    );
  }

  uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    this._imageuploadService.imageUpload(formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`${file.data.name} upload failed.`);
      })).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          console.log(event.body);
        }
      });
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file);
    });
}

onfileClick() {
  const fileUpload = this.fileUpload.nativeElement;fileUpload.onchange = () => {
  for (let index = 0; index < fileUpload.files.length; index++)
  {
   const file = fileUpload.files[index];
   this.files.push({ data: file, inProgress: false, progress: 0});
  }
    this.uploadFiles();
  };
  fileUpload.click();
}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
