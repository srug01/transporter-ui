import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> =new EventEmitter();

  constructor(
    private router:Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void { }

  toggleSidebar(){
    this.toggleSidebarForMe.emit();
    setTimeout(()=> {
      window.dispatchEvent(
        new Event('resize')
      );
    },300);
  }

  logOut(){
    this.authService.logout();
    this.router.navigate(['']);
  }
}
