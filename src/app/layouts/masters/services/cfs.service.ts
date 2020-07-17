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
    delete cfs.cfsMasterId;
    return this.http.post<Cfs>(this.baseUrl + 'cfs-masters', JSON.stringify(cfs), this.HttpUploadOptions);
  }

  updateCfsMaster(cfs: Cfs): Observable<any> {
    return this.http.put<Cfs>(this.baseUrl + 'cfs-masters/' + cfs.cfsMasterId,
      JSON.stringify(cfs), this.HttpUploadOptions);
  }

  getAllCfsMasters(): Observable<any> {
    return this.http.get(this.baseUrl + 'cfs-masters', this.HttpUploadOptions);
  }

  getAllCfsMastersByUserId(filter:any): Observable<any> {
    return this.http.get(this.baseUrl + 'cfs-masters?filter=' + JSON.stringify(filter), this.HttpUploadOptions);
  }

  getCfsMasterById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'cfs-masters/' + id);
  }

  deleteCfsMasterById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'cfs-masters/' + id);
  }
}


