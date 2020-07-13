import { ContainerMaster } from '../../../shared/models/containerMaster';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-container-edit',
  templateUrl: './container-edit.component.html',
  styleUrls: ['./container-edit.component.scss']
})
export class ContainerEditComponent implements OnInit {
  public container: ContainerMaster;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.container = this.route.snapshot.data['containerResolver'];
  }

}
