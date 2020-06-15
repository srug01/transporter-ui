import { Container } from './../../../shared/models/container';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-container-edit',
  templateUrl: './container-edit.component.html',
  styleUrls: ['./container-edit.component.scss']
})
export class ContainerEditComponent implements OnInit {
  public container: Container;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.container = this.route.snapshot.data['containerResolver'];
  }

}
