import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { YardCFSRate } from './../../../shared/models/yardcfsrate';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YardCFSRateService {
  baseUrl = environment.baseUri;
  public HttpUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(
    private http: HttpClient
  ) { }

  saveYardcfsrateMaster(yardcfsrate: YardCFSRate): Observable<any> {
    delete yardcfsrate.yardCfsRateMasterId;
    yardcfsrate.createdOn = new Date();
    return this.http.post<YardCFSRate>(this.baseUrl + 'yard-cfs-rate-masters',
      JSON.stringify(yardcfsrate), this.HttpUploadOptions);
  }

  updateYardcfsrateMaster(yardcfsrate: YardCFSRate): Observable<any> {
    return this.http.patch<YardCFSRate>(this.baseUrl + 'yard-cfs-rate-masters/' +
      yardcfsrate.yardCfsRateMasterId, JSON.stringify(yardcfsrate), this.HttpUploadOptions);
  }

  getAllYardcfsrateMasters(): Observable<any> {
    return this.http.get(this.baseUrl + 'yard-cfs-rate-masters');
  }

  getYardcfsrateMasterById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'yard-cfs-rate-masters/' + id);
  }

  deleteYardcfsrateMasterById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'yard-cfs-rate-masters/' + id);
  }
}
