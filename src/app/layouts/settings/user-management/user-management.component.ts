import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {


  public menus: Array<any> = [
    {
      name:'Users',
      icon: 'person_outline',
      url: '/default/settings/configuration'
    },
    {
      name:'Roles',
      icon: 'brightness_high',
      url: '/default/settings/configuration'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
