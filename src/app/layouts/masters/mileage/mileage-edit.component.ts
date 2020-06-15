import { Mileage } from './../../../shared/models/mileage';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mileage-edit',
  templateUrl: './mileage-edit.component.html',
  styleUrls: ['./mileage-edit.component.scss']
})
export class MileageEditComponent implements OnInit {
  public mileage: Mileage;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.mileage = this.route.snapshot.data['mileagesResolver'];
  }

}
