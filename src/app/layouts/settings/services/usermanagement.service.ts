import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FourParamObj } from 'src/app/shared/models/FourParamObj';
import { CfsUserRegistration } from 'src/app/shared/models/cfsUserRegistration';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  baseUrl = environment.baseUri;
  public HttpUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public cfsUser: CfsUserRegistration;
  constructor(
    private http: HttpClient,

  ) { }


  getUserLists(searchFilter: FourParamObj): Observable<any> {
    //  console.log("Filter For API : " + JSON.stringify(saveFilter));
    return this.http.post<any>(this.baseUrl + 'getUsersListDetails',
      JSON.stringify(searchFilter),
      this.HttpUploadOptions
    );
  }

  getcfsUserDetailsbyUserId(id: number): Observable<CfsUserRegistration> {
    return this.http.get(this.baseUrl + 'cfs-user-registrationsbyUserId' + '/' + id);
  }


}
