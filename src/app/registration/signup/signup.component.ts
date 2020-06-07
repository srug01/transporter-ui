import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SignupService } from 'src/app/services/signup.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _signupService: SignupService,
    private _authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.initializeSignupForm();
  }

  initializeSignupForm() {
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber: ['', Validators.required]
    });
  }

  submitSignupForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.signupForm.valid) {
      this._signupService.saveUser(this.signupForm.value).subscribe(
        (user) => {
          this.openSnackBar('Success !', 'User created successfully');
          this._authService.login(user.email, this.signupForm.value.password)
            .subscribe(
              (data) => {
                this._router.navigate(['default']);
              });
        },
        (err) => {
          console.log(err);
          this.openSnackBar('Server Error !', 'Could not signup the user');
        }
      );
    } else {
      this.openSnackBar('Form Invalid !', 'Please review all the fields');
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
