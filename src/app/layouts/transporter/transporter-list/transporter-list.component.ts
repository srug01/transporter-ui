import { TransporterRegistrationService } from './../services/transporter-registration.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-transporter-list',
  templateUrl: './transporter-list.component.html',
  styleUrls: ['./transporter-list.component.scss']
})
export class TransporterListComponent implements OnInit {
  displayedColumns: string[] = [
    'serialnumber', 'transporterEmail', 'transporterName', 'transporterMobileNumber', 'action'
  ];
  public transporters: [];


  constructor(
    private _transporterService: TransporterRegistrationService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllTransporters();
  }

  getAllTransporters() {
    this._transporterService.getAllTransporters().subscribe(
      (transporters) => {
        this.transporters = transporters;
      },
      (err) => {
        console.log(err);

      }
    );
  }

  openDialog(ev, transporterId: number) {
    if (ev) {
      ev.preventDefault();
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTransporterById(transporterId);
      }
    });
  }

  deleteTransporterById(transporterId: number) {
    this._transporterService.deleteTransporterById(transporterId).subscribe(
      (res) => {
        console.log(res);
        this.getAllTransporters();
      }
    );
  }

}
