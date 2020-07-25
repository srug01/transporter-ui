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
        
        const userId = localStorage.getItem('userID');
        if(userId === null){
          localStorage.setItem('userID', JSON.stringify(this.currentUser.id));
        }
        const roleId = localStorage.getItem('roleID');
        if(roleId === null){
          localStorage.setItem('roleID', JSON.stringify(this.currentUser.typeSyscode));
        }

      },
      (err) => {
        console.log(err);
      }
    );
  }

}
