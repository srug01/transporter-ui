import { Component, OnInit } from '@angular/core';
import { Transporter } from 'src/app/shared/models/transporter';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-transporter',
  templateUrl: './edit-transporter.component.html',
  styleUrls: ['./edit-transporter.component.scss']
})
export class EditTransporterComponent implements OnInit {

  public transporter: Transporter;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.transporter = this.route.snapshot.data['transporterResolver'];
  }

}
