import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  public currentUser: User;
  constructor(
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this._userService.getUsersInfo().subscribe(
      (user: User) => {
        this.currentUser = user;
      },
      (err) => {
        console.log(err);

      }
    );
  }

}
