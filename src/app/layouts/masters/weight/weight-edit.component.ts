import { Component, OnInit } from '@angular/core';

import { Weight } from './../../../shared/models/weight';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-weight-edit',
  templateUrl: './weight-edit.component.html',
  styleUrls: ['./weight-edit.component.scss']
})
export class WeightEditComponent implements OnInit {
  public weight: Weight;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.weight = this.route.snapshot.data['weightsResolver'];
  }

}
