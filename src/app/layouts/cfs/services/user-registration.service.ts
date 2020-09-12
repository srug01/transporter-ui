import { CfsUserRegistration } from './../../../shared/models/cfsUserRegistration';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignupService } from './../../../services/signup.service';
import { User } from '../../../shared/models/user';
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

    public _signupService: SignupService,
  ) { }



  saveCfsUserRegistration(cfsUserRegistration: CfsUserRegistration): Observable<any> {
    delete cfsUserRegistration.cfsUserRegistrationId;
    return this.http.post<CfsUserRegistration>(
      this.baseUrl + 'cfs-user-registrations',
      JSON.stringify(cfsUserRegistration),
      this.HttpUploadOptions
    );
  }

  updateCfsUserRegistration(cfsUserRegistration: CfsUserRegistration): Observable<any> {
    return this.http.put<CfsUserRegistration>(
      this.baseUrl + 'cfs-user-registrations/' + cfsUserRegistration.cfsUserRegistrationId,
      JSON.stringify(cfsUserRegistration),
      this.HttpUploadOptions
    );
  }

  getAllCfsUserRegistration(): Observable<any> {
    return this.http.get(this.baseUrl + 'cfs-user-registrations', this.HttpUploadOptions);
  }

  getCfsUserRegistrationById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'cfs-user-registrations/' + id, this.HttpUploadOptions);
  }

  getCfsUserData(userid: number, roleid: number): Observable<any> {
    return this.http.get(this.baseUrl + '/MultipleTables/' + userid + "/" + roleid);
  }


  deleteCfsUserRegistrationById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'cfs-user-registrations/' + id, this.HttpUploadOptions);
  }
}
