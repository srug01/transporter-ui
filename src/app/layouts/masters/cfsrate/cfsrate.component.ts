import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cfsrate',
  templateUrl: './cfsrate.component.html',
  styleUrls: ['./cfsrate.component.scss']
})
export class CfsrateComponent implements OnInit {
  foods: any[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
    { value: 'tacos-3', viewValue: 'Tacos' },
    { value: 'tacos-4', viewValue: 'Tacos' },
    { value: 'tacos-5', viewValue: 'Tacos' },
    { value: 'tacos-6', viewValue: 'Tacos' },
    { value: 'tacos-7', viewValue: 'Tacos' },
    { value: 'tacos-8', viewValue: 'Tacos' },

  ];
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    console.log(form);
  }
}
