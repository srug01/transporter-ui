import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-common-confirmdialog',
  templateUrl: './common-confirmdialog.component.html',
  styleUrls: ['./common-confirmdialog.component.scss']
})
export class CommonConfirmdialogComponent implements OnInit {
  title: string;
  message: string;
  constructor(public dialogRef: MatDialogRef<CommonConfirmdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CommonConfirmdialogComponent) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
  }
  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
  ngOnInit(): void {
  }

}
export class ConfirmDialogModel {

  constructor(public title: string, public message: string) {
  }
}
