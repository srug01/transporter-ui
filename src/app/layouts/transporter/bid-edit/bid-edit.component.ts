import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bid-edit',
  templateUrl: './bid-edit.component.html',
  styleUrls: ['./bid-edit.component.scss']
})
export class BidEditComponent implements OnInit {

  public bidsdetails: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.bidsdetails = this.route.snapshot.data['bidResolver'];
    console.log(this.bidsdetails);
  }

}
