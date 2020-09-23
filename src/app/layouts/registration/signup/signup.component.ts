import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SignupService } from 'src/app/services/signup.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @Input() userType: string;
  public signupForm: FormGroup;
  public type: string;
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private _router: Router,
    private _signupService: SignupService,
    private _authService: AuthenticationService,

  ) { }

  ngOnInit(): void {
    console.log(this.userType);
    this.initializeSignupForm();
  }

  initializeSignupForm() {
    this.signupForm = this.fb.group({
      email: ['', Validators.compose([Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'), Validators.required])],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber: ['', Validators.compose([Validators.pattern('[6-9]\\d{9}'), Validators.required])],
      typeSyscode: []
    });
  }

  submitSignupForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.signupForm.valid) {
      this.signupForm.get('typeSyscode').setValue(Number(this.userType));
      this._signupService.saveUser(this.signupForm.value).subscribe(
        (user) => {
          this.openSnackBar('Success !', 'User created successfully');
          this._authService.login(user.email, this.signupForm.value.password, this.signupForm.get('typeSyscode').value)
            .subscribe(
              (data) => {
                this._router.navigate(['default']);
              });
        },
        (err) => {
          console.log(err);
          if (err.error.error.code === 'ER_DUP_ENTRY') {
            this.openSnackBar('Failure !', 'Duplicate Email Specified');
          } else {
            this.openSnackBar('Server Error !', 'Could not signup the user');
          }
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
