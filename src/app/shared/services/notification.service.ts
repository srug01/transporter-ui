import { Where } from './../models/filter';
import { Injectable } from '@angular/core';
import { Notification } from './../models/notification';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  baseUrl = environment.baseUri;
  public HttpUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  saveNotification(notification: Notification): Observable<any> {
    delete notification.notificationId;
    delete notification.assignedToUser;
    return this.http.post<Notification>(this.baseUrl + 'notifications', JSON.stringify(notification), this.HttpUploadOptions);
  }

  updateNotifications(notification: Notification): Observable<any> {
    return this.http.put<Notification>(
      this.baseUrl + 'notifications/' + notification.notificationId,
      JSON.stringify(notification),
      this.HttpUploadOptions
    );
  }

  getAllNotificationss(userTypeCode: number): Observable<any> {
    const filter = {
      where: {
        isRead: false,
        assignToRole: userTypeCode
      }
    };
    return this.http.get(this.baseUrl + 'notifications?filter=' + JSON.stringify(filter));
  }

  getNotificationsById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'notifications/' + id);
  }

  deleteNotificationssById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'notifications/' + id);
  }

}
