import { Where } from './../shared/models/filter';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Userrole } from '../shared/models/userrole';

@Injectable({
  providedIn: 'root'
})
export class UserroleService {

  baseUrl = environment.baseUri;
  public HttpUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  constructor(
    private http: HttpClient
  ) { }




  getUserById(userroleId: number): Observable<Userrole> {
    return this.http.get<Userrole>(this.baseUrl + 'userroles/' + userroleId);
  }

  getAllUserRoles(): Observable<Userrole[]> {
    return this.http.get<Userrole[]>(this.baseUrl + 'userroles');
  }

  getAllUserrolesByFilter(filter: any): Observable<Userrole[]> {
    const inFilter: any = {
      where: {
        or: filter
      }
    };
    return this.http.get<Userrole[]>(this.baseUrl + 'userroles?filter=' + JSON.stringify(inFilter));
  }

  getAllCFSUserroles(roleID: number): Observable<Userrole[]> {
    const inFilter: any = {
      where: {
        parentRoleId : roleID
      }
    };
    return this.http.get<Userrole[]>(this.baseUrl + 'userroles?filter=' + JSON.stringify(inFilter));
  }


}
