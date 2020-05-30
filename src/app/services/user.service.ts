import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
