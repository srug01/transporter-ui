import { Injectable } from '@angular/core';
import { Cfs } from './../../../shared/models/cfs';
import { environment } from './../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CfsService {
  baseUrl = environment.baseUri;

  public HttpUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  saveCfsMaster(cfs: Cfs): Observable<any> {
    console.log(cfs);
    delete cfs.cfsMasterId;
    console.log(cfs);
    return this.http.post<Cfs>(this.baseUrl + 'cfs-masters', JSON.stringify(cfs), this.HttpUploadOptions);
  }

  updateCfsMaster(cfs: Cfs): Observable<any> {
    return this.http.put<Cfs>(this.baseUrl + 'cfs-masters/' + cfs.cfsMasterId,
      JSON.stringify(cfs), this.HttpUploadOptions);
  }

  getAllCfsMasters(): Observable<any> {
    const filter = {
      fields: {
        cfsMasterId: true,
        cfs_name: true,
        contact_no: true,
        email_id: true,
        address: true,
        pincode: true,
        cfs_code_no: true,
        gstn: true,
        pan: true,
        tan: true,
        primary_contact_name: true,
        primary_mobile_no: true,
        additional_contact_name: true,
        additional_mobile_no: true,
        port_syscode: true,
        is_active: true,
        created_by: true,
        created_on: true,
        modified_by: true,
        modified_on: true,
        locationId: true,
        roleId: true,
        userId: true
      }
    }
    return this.http.get(this.baseUrl + 'cfs-masters?filter=' + JSON.stringify(filter));
  }

  getCfsMasterById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'cfs-masters/' + id);
  }

  deleteCfsMasterById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'cfs-masters/' + id);
  }
}


