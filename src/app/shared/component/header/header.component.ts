import { Notification } from './../../models/notification';
import { NotificationService } from './../../services/notification.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  public notifications: Notification[] = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private _notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getAllNotifications();
   }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  getAllNotifications() {
    this._notificationService.getAllNotificationss().subscribe(
      (notifications: Notification[]) => {
        this.notifications = notifications;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
