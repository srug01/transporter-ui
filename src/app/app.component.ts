import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private _authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this._authService.isAuthenticated()) {
      this.router.navigate(['/default']);
    }
  }
}
