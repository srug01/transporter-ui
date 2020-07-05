import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import {SignupService} from './../../../services/signup.service';

import { Cfsuserregistration } from '../../../shared/models/user-registration.model';
import {User} from '../../../shared/models/user';
import { environment } from './../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  baseUrl = environment.baseUri;
  public HttpUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient,

    public _signupService : SignupService,
  ) { }



  saveCfsUserRegistration(userregistration: Cfsuserregistration): Observable<any> {
    console.log(userregistration);
    delete userregistration.cfs_user_registration_syscode;
    console.log(userregistration);
    return this.http.post<Cfsuserregistration>(
      this.baseUrl + 'cfs-user-registrations',
      JSON.stringify(userregistration),
      this.HttpUploadOptions
    );
  }

  updateCfsUserRegistration(userregistration: Cfsuserregistration): Observable<any> {
    return this.http.put<Cfsuserregistration>(
      this.baseUrl + 'cfs-user-registrations/' + userregistration.cfs_user_registration_syscode,
      JSON.stringify(userregistration),
      this.HttpUploadOptions
    );
  }

  getAllCfsUserRegistration(): Observable<any> {
    return this.http.get(this.baseUrl + 'cfs-user-registrations', this.HttpUploadOptions);
  }

  getCfsUserRegistrationById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'cfs-user-registrations/' + id, this.HttpUploadOptions);
  }

  getCfsUserData(userid: number,roleid: number): Observable<any> {
    return this.http.get(this.baseUrl + '/MultipleTables/' + userid + "/" + roleid);
  }

  deleteCfsUserRegistrationById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'cfs-user-registrations/' + id, this.HttpUploadOptions);
  }
}
