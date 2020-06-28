import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { Cfsuserregistration } from '../../../shared/models/user-registration.model';
import { environment } from './../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  baseUrl = environment.baseUri;
  constructor(
    private http: HttpClient
  ) { }


saveCfsUserRegistration(userregistration: Cfsuserregistration): Observable<any> {
  console.log(userregistration);
  delete userregistration.cfs_user_registration_syscode;
  console.log(userregistration);
  return this.http.post<Cfsuserregistration>(this.baseUrl + 'cfs-user-registrations', JSON.stringify(userregistration));
}

updateCfsUserRegistration(userregistration: Cfsuserregistration): Observable<any> {
  return this.http.put<Cfsuserregistration>(this.baseUrl + 'cfs-user-registrations/'+ userregistration.cfs_user_registration_syscode,
   JSON.stringify(userregistration));
}

getAllCfsUserRegistration(): Observable<any> {
  return this.http.get(this.baseUrl + 'cfs-user-registrations');
}

getCfsUserRegistrationById(id: number): Observable<any> {
  return this.http.get(this.baseUrl + 'cfs-user-registrations/' + id);
}

getCfsUserData(userid: number,roleid: number): Observable<any> {
  return this.http.get(this.baseUrl + '/MultipleTables/' + userid + "/" + roleid);
}


deleteCfsUserRegistrationById(id: number): Observable<any> {
  return this.http.delete(this.baseUrl + 'cfs-user-registrations/' + id);
}
}
