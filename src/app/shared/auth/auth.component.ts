import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isUserAuthenticated: boolean = false;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  roles: any[] = [
    { value: 1, viewValue: 'Administrator' },
    { value: 2, viewValue: 'Import Customer' },
    { value: 3, viewValue: 'Export Customer' },
    { value: 4, viewValue: 'CFS Customer' },
    { value: 5, viewValue: 'Transporter' },
    { value: 6, viewValue: 'Driver' },
    { value: 7, viewValue: 'CFS user Admin' },
    { value: 8, viewValue: 'CFS User Super Admin' },
    { value: 9, viewValue: 'CFS User Viewer' }
  ];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private _alert: AlertService,
    private route: ActivatedRoute
  ) {
    this.isUserAuthenticated = this.route.snapshot.data['authResolver'];
    if (this.isUserAuthenticated) {
      this.router.navigate(['/default']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      role: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { username, password, role } = this.loginForm.value;
      this.authenticationService.login(username.toString().trim(), password.toString().trim(), role)
        .pipe(first())
        .subscribe(
          (data) => {
            this._alert.success('Logged in Successfully.', 'Success');
            if (this.authenticationService.getUserRole() === 'CFS Customer') {
              this.router.navigate(['/default/cfs/create-order']);
            } else {
              this.router.navigate(['default']);
            }
          },
          (error) => {
            console.log(error);
            this._alert.error('Kindly check the credentials!', 'Invalid Creds');
          });
    } else {
      this._alert.error('Empty Form Submitted', 'Invalid Form !');
    }
  }
}

