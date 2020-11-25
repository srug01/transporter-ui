import { CfsUserRegistration } from './../../../shared/models/cfsUserRegistration';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  public currentUser: CfsUserRegistration;

  constructor(
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.currentUser = this._route.snapshot.data['roleResolver'];
    console.log(this.currentUser);
  }

}
