import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  public menus: Array<any> = [
    {
      name:'Users',
      icon: 'person_outline',
      url: '/default/settings/user-management'
    },
    {
      name:'Roles',
      icon: 'brightness_high',
      url: '/default/settings/role-management'
    },
    {
      name:'Configurations',
      icon: 'assignment',
      url: '/default/settings/configuration'
    },
    {
      name:'Bid Logic',
      icon: 'assignment_turned_in',
      url: '/default/settings/bidlogic'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
