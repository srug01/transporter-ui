import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from '../services/role.service';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit {
  displayedColumns: string[] = [
    'SrNo', 'roleName', 'createdBy', 'createdOn',
    'active', 'action'
  ];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  roles: any;

  constructor(
    private roleService: RoleService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles() {
    this.roleService.getAllRoles().subscribe(
      (roles) => {
        this.roles = roles;
        console.log(roles);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openDialog(ev, cfsId: number) {
    if (ev) {
      ev.preventDefault();
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('role deleted');
      }
    });
  }

}
