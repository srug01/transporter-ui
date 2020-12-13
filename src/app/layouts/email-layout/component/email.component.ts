import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgZone, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Email } from '../model/email';

@Component({
  selector: 'email-form',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  public emailForm: FormGroup;
  public Editor = ClassicEditor;

  constructor(
    private fb: FormBuilder,
    private _router: Router
  ) { }

    ngOnInit(): void {
      this.emailForm = this.fb.group({
        toAddress: ['', Validators.required],
        ccAddress: [''],
        emailBody: ['', Validators.required],
        subject: ['', Validators.required]
      });
    }

    submitEmailForm(ev) {
        if (ev) {
            ev.preventDefault();
        }
        if (this.emailForm.valid) {
        const email: Email = this.emailForm.value;
        }
    }
}
