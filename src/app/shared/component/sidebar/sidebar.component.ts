import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {LocalStorageService} from './../../../services/storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public currentUser: any;

  constructor(
    private _userService: UserService,
    private _localstorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.getUsersInfo();
  }

  getUsersInfo() {
    this._userService.getUsersInfo().subscribe(
      (res) => {
        this.currentUser = res;
        // console.log(res.permissions[0].Permissions);
        const userId = localStorage.getItem('userID');
        if(userId === null || userId === 'undefined'){
          localStorage.setItem('userID', JSON.stringify(this.currentUser.userId));
        }
        const roleId = localStorage.getItem('roleID');
        if(roleId === null || roleId === 'undefined'){
          localStorage.setItem('roleID', JSON.stringify(this.currentUser.typeSyscode));
        }
        //console.log(localStorage.getItem('userID'));
        //console.log(localStorage.getItem('roleID'));

      },
      (err) => {
        console.log(err);
      }
    );
  }

}
