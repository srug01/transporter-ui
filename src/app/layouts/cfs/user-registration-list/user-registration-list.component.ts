import { UserRegistrationService } from './../services/user-registration.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-registration-list',
  templateUrl: './user-registration-list.component.html',
  styleUrls: ['./user-registration-list.component.scss']
})
export class UserRegistrationListComponent implements OnInit {
  displayedColumns: string[] = [
    'cfs_user_registration_syscode', 'cfs_syscode', 'user_type_syscode', 'cfs_user_name',
    'cfs_user_designation', 'cfs_user_department',
     'cfs_user_mobile_no','cfs_user_email','cfs_user_password',
     'cfs_user_confirm_password','cfs_user_is_active',
     'cfs_user_is_verify','action'
  ];
  public users: [];
  constructor(
    private _userregistrationService: UserRegistrationService
  ) { }

  ngOnInit(): void {
    this._userregistrationService.getAllCfsUserRegistration().subscribe(
      (users) => {
        this.users = users;
      },
      (err) => {
        console.log(err);

      }
    );
  }

}
