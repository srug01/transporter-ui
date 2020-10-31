import { MatSort } from '@angular/material/sort';
import { Cfs } from './../../../shared/models/cfs';
import { UserRegistrationService } from './../services/user-registration.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CfsService } from '../../masters/services/cfs.service';
import { User } from 'src/app/shared/models/user';
import { MatTableDataSource } from '@angular/material/table';
import { CfsUserRegistration } from 'src/app/shared/models/cfsUserRegistration';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog.component';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-user-registration-list',
  templateUrl: './user-registration-list.component.html',
  styleUrls: ['./user-registration-list.component.scss']
})
export class UserRegistrationListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'cfsUserRegistrationId', 'cfsUserName', 'roleName',
    'cfsUserDesignation', 'cfsUserDepartment', 'isActive',
    'isVerified', 'action'
  ];
  public users: MatTableDataSource<CfsUserRegistration>;
  public userId = parseInt(localStorage.getItem('userID'), 10);
  public cfsMasters: Cfs[] = [];
  public currentCFSUser: any;
  public cfsUsers: Array<any> = [];
  @ViewChild(MatSort) userSort: MatSort;
  constructor(
    private _userregistrationService: UserRegistrationService,
    private _cfsService: CfsService,
    public dialog: MatDialog,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getAllCfsUsers();
  }

  ngAfterViewInit() {
  }

  getAllCfsUsers() {
    this._userregistrationService.getAllCfsUserRegistration().subscribe(
      (users) => {
        this.cfsUsers = users;
        this.currentCFSUser = this.cfsUsers.filter(a => a.userId == this.userId);
        if (this.currentCFSUser.length > 0) {
          users = users.filter(m => m.cfsMasterId == this.currentCFSUser[0].cfsMasterId)
        }
        this.users = new MatTableDataSource(users);
        this.users.sort = this.userSort;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllCFS() {
    this._cfsService.getAllCfsMasters().subscribe(
      (cfsMasters) => {
        this.cfsMasters = cfsMasters;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  applyUsersFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();
  }

  openDialog(ev, userId: number) {
    if (ev) {
      ev.preventDefault();
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUserById(userId);
      }
    });
  }

  deleteUserById(userId: number) {
    this._userregistrationService.deleteCfsUserById(userId).subscribe(
      (res) => {
        this.alertService.success('User Deleted Successfully', 'User Deleted !');
        this.getAllCfsUsers();
      },
      (err) => {
        this.alertService.success('Could not delete the user', 'Failure !');
      }
    );
  }

}
