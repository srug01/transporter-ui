import { Component, OnInit } from '@angular/core';

import { Yard } from './../../../shared/models/yard';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-yard-edit',
  templateUrl: './yard-edit.component.html',
  styleUrls: ['./yard-edit.component.scss']
})
export class YardEditComponent implements OnInit {
  public yard: Yard;
  constructor(
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.yard = this.route.snapshot.data['yardsResolver'];
  }

}
