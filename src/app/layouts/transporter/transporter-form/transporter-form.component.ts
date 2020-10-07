import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormErrorStateMatcher } from 'src/app/shared/matchers/error.matcher';
import { User } from 'src/app/shared/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TransporterRegistrationService } from '../services/transporter-registration.service';
import { Router,ActivatedRoute } from '@angular/router';
import { ImageUploadService } from 'src/app/shared/services/image-upload.service';
import { UserService } from 'src/app/services/user.service';
import { Transporter } from 'src/app/shared/models/transporter';


@Component({
  selector: 'app-transporter-form',
  templateUrl: './transporter-form.component.html',
  styleUrls: ['./transporter-form.component.scss']
})
export class TransporterFormComponent implements OnInit {
  @Input() transporterData: Transporter;
  public transporterForm: FormGroup;
  accTypeErrormatcher = new FormErrorStateMatcher();
  confirmAccErrormatcher = new FormErrorStateMatcher();
  currentUser: User;
  files = [];
  public transporterId: number;

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
    private _userService: UserService,
    private _route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this._userService.getUsersInfo().subscribe(
      (user) => {
        this.currentUser = user;
      }
    );
    if (this.transporterData) {
      // the api is not getting all the data for transporter in order to edit
      this.populateForm();
    } else {
      this.intitialiseForm();
    }
    this.gettransporterIdFromRouteParams();
  }

  intitialiseForm() {
    this.transporterForm = this.fb.group({
      transporterName: ['', Validators.required],
      transporterMobileNumber: ['', Validators.required],
      transporterEmail: ['', Validators.required],
      transporterAddress: ['', Validators.required],
      transporterPincode: ['', Validators.required],
      transporterGSTIN: ['', Validators.required],
      transporterPAN: ['', Validators.required],
      transporterPartner: ['', Validators.required],
      transporterPartnerPAN: ['', Validators.required],
      transporterPartnerAddress: ['', Validators.required],
      transporterBankAccNumber: ['', Validators.required],
      transporterBankAccType: ['', Validators.required],
      transporterBankName: ['', Validators.required],
      transporterBankBranch: ['', Validators.required],
      transporterBankIFSC: ['', Validators.required],
      transporterAddressFile: [''],
      transporterGstFile: [''],
      transporterPanFile: [''],
      transporterPermitFile: [''],
      transporterLicenseFile: [''],
      transporterOtherFile: [''],
      isActive: [false],
      isVerified: [false]
    },
      {
        validator: this.checkAccountNumbers
      });
  }

  populateForm() {
    this.transporterForm = this.fb.group({
      transporterName: [this.transporterData.transporterName, Validators.required],
      transporterMobileNumber: [this.transporterData.transporterMobileNumber, Validators.required],
      transporterEmail: [this.transporterData.transporterEmail, Validators.required],
      transporterAddress: [this.transporterData.transporterAddress, Validators.required],
      transporterPincode: [this.transporterData.transporterPincode, Validators.required],
      transporterGSTIN: [this.transporterData.transporterGSTIN, Validators.required],
      transporterPAN: [this.transporterData.transporterPAN, Validators.required],
      transporterPartner: [this.transporterData.transporterPartner, Validators.required],
      transporterPartnerPAN: [this.transporterData.transporterPartnerPAN, Validators.required],
      transporterPartnerAddress: [this.transporterData.transporterPartnerAddress, Validators.required],
      transporterBankAccNumber: [this.transporterData.transporterBankAccNumber, Validators.required],
      transporterConfirmBankAccNumber: [this.transporterData.transporterBankAccNumber, Validators.required],
      transporterBankAccType: [this.transporterData.transporterBankAccType, Validators.required],
      transporterBankName: [this.transporterData.transporterBankName, Validators.required],
      transporterBankBranch: [this.transporterData.transporterBankBranch, Validators.required],
      transporterBankIFSC: [this.transporterData.transporterBankIFSC, Validators.required],
      transporterPanFile: [''],
      transporterPermitFile: [''],
      transporterLicenseFile: [''],
      transporterOtherFile: [''],
      isActive: [this.transporterData.isActive],
      isVerified: [this.transporterData.isVerified]
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
    this.saveTransporter(this.transporterForm);
    // this.uploadFiles(this.transporterForm.get('transporter_pan_card'));
    // if (this.transporterForm.valid) {

    //   this.saveTransporter(this.transporterForm);
    // } else {
    //   this.openSnackBar('Invalid Form !', 'Please Review All Fields');
    // }
  }
  gettransporterIdFromRouteParams() {
    this._route.params.subscribe(
      (params) => {
        this.transporterId = parseInt(params.id,10);
      }
    );
  }

  transformTransporterObj(transporter: any): Transporter {
    return {
      //createdBy: this.currentUser.userId,
      //createdOn: new Date().toString(),
      isActive: transporter.isActive,
      isVerified: transporter.isVerified,
      transporterMobileNumber: transporter.transporterMobileNumber,
      transporterGSTIN: transporter.transporterGSTIN,
      transporterPAN: transporter.transporterPAN,
      transporterBankAccType: transporter.transporterBankAccType,
      transporterAddress: transporter.transporterAddress,
      transporterAddressFile: '',
      transporterBankAccNumber: transporter.transporterBankAccNumber,
      transporterBankBranch: transporter.transporterBankBranch,
      transporterBankIFSC: transporter.transporterBankIFSC,
      transporterBankName: transporter.transporterBankName,
      transporterEmail: transporter.transporterEmail,
      transporterGstFile: '',
      transporterLicenseFile: '',
      transporterName: transporter.transporterName,
      transporterOtherFile: '',
      transporterPanFile: '',
      transporterPartner: transporter.transporterPartner,
      transporterPartnerPAN: transporter.transporterPartnerPAN,
      transporterPartnerAddress: transporter.transporterPartnerAddress,
      transporterPermitFile: '',
      transporterPincode: transporter.transporterPincode,
      transporterId:this.transporterId
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
    const transporterBankAcno = group.get('transporterBankAccNumber').value;
    const confirmTransporterBankAcno = group.get('transporterConfirmBankAccNumber').value;
    return transporterBankAcno === confirmTransporterBankAcno ? null : { notSame: true };
  }

  saveTransporter(transporterForm: any) {
    const panCard: any = transporterForm.get('transporterPanFile');
    const permitCard: any = transporterForm.get('transporterPermitFile');
    const licenseCard: any = transporterForm.get('transporterLicenseFile');
    const otherCard: any = transporterForm.get('transporterOtherFile');
    const transporter = this.transformTransporterObj(transporterForm.value);
    this._transporterService.updateTransporter(transporter).subscribe(
      (res: Transporter) => {
        //this.uploadFiles(panCard);
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
