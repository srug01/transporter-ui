import { PortCfsRateMaster } from '../../../shared/models/portcfsrate';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-portcfsrate-edit',
  templateUrl: './portcfsrate-edit.component.html',
  styleUrls: ['./portcfsrate-edit.component.scss']
})
export class PortcfsrateEditComponent implements OnInit {
  public portcfsrate: PortCfsRateMaster;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.portcfsrate = this.route.snapshot.data['portcfsrateResolver'];
  }

}
