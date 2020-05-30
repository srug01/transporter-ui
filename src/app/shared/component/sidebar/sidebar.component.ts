import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public currentUser: any;

  constructor(
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsersInfo();
  }

  getUsersInfo() {
    this._userService.getUsersInfo().subscribe(
      (res) => {
        this.currentUser = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
