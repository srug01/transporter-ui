import { PortTerminalMaster } from './../../../shared/models/PortTerminalMaster';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-portterminalmaster-edit',
  templateUrl: './portterminalmaster-edit.component.html',
  styleUrls: ['./portterminalmaster-edit.component.scss']
})
export class PortterminalmasterEditComponent implements OnInit {
public portterminalmaster : PortTerminalMaster;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.portterminalmaster = this.route.snapshot.data['portTermianlaMasterResolver'];   
  }

}
