import { Notification } from './../../models/notification';
import { NotificationService } from './../../services/notification.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user';
import { Transporter } from '../../models/transporter';
import {TransporterRegistrationService} from '../../../layouts/transporter/services/transporter-registration.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  public notifications: Notification[] = [];
  public currentUser: User;
  public transporter: Transporter;
  public iseligible: boolean;
  public userId = parseInt(localStorage.getItem('userID'), 10);

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private _notificationService: NotificationService,
    private _userService: UserService,
    private _transRegistrationService: TransporterRegistrationService
  ) { }

  ngOnInit(): void {
    this._userService.getUsersInfo().subscribe(
      (user)=>{
        this.currentUser = user;
        this.getAllNotifications();
        this.IseligibleforBid();
      }
    );

  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  IseligibleforBid()
  {
    if(this.currentUser.typeSyscode === 5)
    {
      this.iseligible = false;
      this._transRegistrationService.getTransporterByUserId(this.userId).subscribe(
        (transporter: Transporter) => {
          this.transporter = transporter[0];
          if(this.transporter.isVerified === true && this.transporter.isActive === true)
          {
            this.iseligible = true;
          }
        },
        (err) => {
          console.log(err);
        }
      );


    }


  }

  getAllNotifications() {
    this._notificationService.getAllNotificationss(this.currentUser.typeSyscode).subscribe(
      (notifications: Notification[]) => {
        this.notifications = notifications;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  markNotificationAsRead(notification: Notification) {
    notification.isRead = true;
    delete notification.assignedToUser;
    this._notificationService.updateNotifications(notification).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
