import { Port } from './../../../shared/models/port';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-port-edit',
  templateUrl: './port-edit.component.html',
  styleUrls: ['./port-edit.component.scss']
})
export class PortEditComponent implements OnInit {
  public port: Port;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.port = this.route.snapshot.data['portsResolver'];   
  }

}
