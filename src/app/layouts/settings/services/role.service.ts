import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ThreeparamObj } from 'src/app/shared/models/threeparamObj';
import { Userrole } from 'src/app/shared/models/userrole';
import { UserRole } from 'aws-sdk/clients/workmail';

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

  getPermissionsbyRoleId(roleId: number) {
    return this.http.get(this.baseUrl + 'getPermissionsbyRoleId' + '/' + roleId);
  }

  saveRolePermissions(saveFilter: ThreeparamObj): Observable<any> {
    // console.log("Filter : " + JSON.stringify(suborderFilter));
    return this.http.post<any>(this.baseUrl + 'savePermissionRole',
      JSON.stringify(saveFilter),
      this.HttpUploadOptions
    );
  }

  getRoleById(roleId: number): Observable<any> {
    return this.http.get(this.baseUrl + 'userroles' + '/' + roleId);
  }

  addUserRole(userRole: Userrole): Observable<any> {
    delete userRole.roleId;
    return this.http.post<Userrole>(this.baseUrl + 'userroles', JSON.stringify(userRole), this.HttpUploadOptions);
  }



}
