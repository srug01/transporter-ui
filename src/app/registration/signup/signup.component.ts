import { Component, OnInit } from '@angular/core';
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
    this.type = this.route.routeConfig.path;
    //console.log(this.route.routeConfig.path);
    this.initializeSignupForm();
  }

  initializeSignupForm() {
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      typeSyscode: [1]
    });
  }

  submitSignupForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.signupForm.valid) {
      if(this.type === "customer")
      {
        this.signupForm.value.typeSyscode = 4;
      }
      else if(this.type === "transporter")
      {
        this.signupForm.value.typeSyscode = 5;
      }
      else if(this.type === "driver")
      {
        this.signupForm.value.typeSyscode = 6;
      }
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
