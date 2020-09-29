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
    public transporter: Transporter;
    ngOnInit() {}

}
