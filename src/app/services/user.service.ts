import { Where } from './../shared/models/filter';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUri;


  constructor(
    private http: HttpClient
  ) { }


  getUsersInfo(): Observable<any> {
    return this.http.get(this.baseUrl + 'users/me');
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + userId);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users');
  }

  getAllUsersByFilter(filter: any): Observable<User[]> {
    const inFilter: any = {
      where: {
        or: filter
      }
    };
    return this.http.get<User[]>(this.baseUrl + 'users?filter=' + JSON.stringify(inFilter));
  }
}
