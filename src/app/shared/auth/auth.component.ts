import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  @Input() username: string;
  password: string;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    this.authenticationService.login(this.username, this.password)
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate(['default']);
        },
        (error) => {
          alert("Invalid credentials");
        });
    // if (this.username == 'admin' && this.password == 'admin') {
    //   this.router.navigate(['default']);
    //   console.log(this.username);
    // } else {
    //   alert("Invalid credentials");
    // }
  }
}

