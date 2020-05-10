import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {
  foods: any[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];
  displayedColumns: string[] = [
    'position', 'Type', 'Weight', 'NoOfTrucks', 'ContainerNo'
  ];
  public dataSource: any[];

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(private _ngZone: NgZone) { }

  ngOnInit(): void {
    this.dataSource = [
      {
        position: 1, Type: '10 FT', Weight: '1 TON',
        NoOfTrucks: '10', ContainerNo: '200'
      },
      {
        position: 2, Type: '10 FT', Weight: '1 TON',
        NoOfTrucks: '10', ContainerNo: '200'
      },
      {
        position: 3, Type: '10 FT', Weight: '1 TON',
        NoOfTrucks: '10', ContainerNo: '200'
      },
    ];
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

}
