import { TransporterRegistrationService } from './../services/transporter-registration.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transporter-list',
  templateUrl: './transporter-list.component.html',
  styleUrls: ['./transporter-list.component.scss']
})
export class TransporterListComponent implements OnInit {
  displayedColumns: string[] = [
   'serialnumber','email', 'firstName', 'lastName', 'mobileNumber','is_active'  
  ];
  public transporters: [];


  constructor(
    private _transporterService: TransporterRegistrationService
  ) { }

  ngOnInit(): void {
    this._transporterService.getAllTransporters().subscribe(
      (transporters) => {
        this.transporters = transporters;
      },
      (err) => {
        console.log(err);

      }
    );
  }

}
