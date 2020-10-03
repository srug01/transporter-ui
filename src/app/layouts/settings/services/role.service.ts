import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  baseUrl = environment.baseUri;
  public HttpUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  constructor(
    private http: HttpClient
  ) { }


  getAllRoles(): Observable<any> {
    return this.http.get(this.baseUrl + 'userroles');
  }

  getAllPermissions() {
    return this.http.get(this.baseUrl + 'permissions');
  }
}
