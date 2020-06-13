import { State } from './../../../shared/models/state';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-state-edit',
  templateUrl: './state-edit.component.html',
  styleUrls: ['./state-edit.component.scss']
})
export class StateEditComponent implements OnInit {
  public state: State;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.state = this.route.snapshot.data['statesResolver'];   
  }

}
