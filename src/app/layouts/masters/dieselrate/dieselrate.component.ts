import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dieselrate',
  templateUrl: './dieselrate.component.html',
  styleUrls: ['./dieselrate.component.scss']
})
export class DieselrateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
  }
}
