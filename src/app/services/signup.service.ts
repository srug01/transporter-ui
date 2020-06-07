import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  baseUrl = environment.baseUri;

  constructor(
    private http: HttpClient
  ) { }

  saveUser(user: User): Observable<any> {
    return this.http.post<User>(this.baseUrl + 'users/signup', JSON.stringify(user));
  }
}
