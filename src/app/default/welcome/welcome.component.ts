import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  pageTitle: String='welcome to admin dashboar';

  tabLinks = [
    { label: 'Customer', link: 'customer-tab' },
    { label: 'Transorter', link: 'transporter-tab' },
    { label: 'Driver', link: 'driver-tab' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
