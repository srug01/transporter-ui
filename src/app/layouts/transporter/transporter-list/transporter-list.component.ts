import { Transporter } from 'src/app/shared/models/transporter';
import { TransporterRegistrationService } from './../services/transporter-registration.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-transporter-list',
  templateUrl: './transporter-list.component.html',
  styleUrls: ['./transporter-list.component.scss']
})
export class TransporterListComponent implements OnInit {
  displayedColumns: string[] = [
    'serialnumber', 'transporterEmail', 'transporterName', 'transporterMobileNumber', 'action'
  ];
  public transporters: MatTableDataSource<Transporter>;
  @ViewChild(MatSort) transporterSort: MatSort;
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
        this.transporters = new MatTableDataSource(transporters);
        this.transporters.sort = this.transporterSort;
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
        this.getAllTransporters();
      }
    );
  }

}
