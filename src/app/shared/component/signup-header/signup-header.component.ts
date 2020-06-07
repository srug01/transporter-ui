import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-header',
  templateUrl: './signup-header.component.html',
  styleUrls: ['./signup-header.component.scss']
})
export class SignupHeaderComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> =new EventEmitter();
  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  toggleSidebar(){
    this.toggleSidebarForMe.emit();
    setTimeout(()=> {
      window.dispatchEvent(
        new Event('resize')
      );
    },300);
  }

}
