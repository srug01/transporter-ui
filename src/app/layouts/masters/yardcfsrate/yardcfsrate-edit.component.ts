import { YardCFSRate } from './../../../shared/models/yardcfsrate';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-yardcfsrate-edit',
  templateUrl: './yardcfsrate-edit.component.html',
  styleUrls: ['./yardcfsrate-edit.component.scss']
})
export class YardcfsrateEditComponent implements OnInit {
  public yardcfsrate: YardCFSRate;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.yardcfsrate = this.route.snapshot.data['YardCFSRatesResolver'];  
  }

}
