import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { ContianerService } from '../services/contianer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-container-master-list',
  templateUrl: './container-master-list.component.html',
  styleUrls: ['./container-master-list.component.scss']
})
export class ContainerMasterListComponent implements OnInit {
  displayedColumns: string[] = [
    'container_syscode', 'container_name', 'is_active', 'action'
  ];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public containerMasters: Array<any> = [];
  constructor(
    private _containerService: ContianerService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getAllContainerMasters();
  }
  getAllContainerMasters() {
    this._containerService.getAllContainerMasters().subscribe(
      (containerMasters) => {
        console.log(containerMasters);
        this.containerMasters = containerMasters;
      },
      (err) => {
        console.log('could not fetch container masters');
      }
    );
  }

  deleteContainerById(ev, containerId: number) {
    if (ev) {
      ev.preventDefault();
    }
    this._containerService.deleteContainerMastersById(containerId).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Container Master Deleted Successfully');
        this.getAllContainerMasters();
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
