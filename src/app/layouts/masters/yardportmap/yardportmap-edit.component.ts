import { YardPortMap } from './../../../shared/models/yardportmap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-yardportmap-edit',
  templateUrl: './yardportmap-edit.component.html',
  styleUrls: ['./yardportmap-edit.component.scss']
})
export class YardportmapEditComponent implements OnInit {
  public yardportmap: YardPortMap;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.yardportmap = this.route.snapshot.data['yardportmapResolver'];
  }

}
