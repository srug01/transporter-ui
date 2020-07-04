import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  baseUrl = environment.baseUri;
  public HttpUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  saveUser(user: User): Observable<any> {
    return this.http.post<User>(this.baseUrl + 'users/signup', JSON.stringify(user), this.HttpUploadOptions);
  }
}
