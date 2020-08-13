import { Injectable } from '@angular/core';
import { CfsPortRateMaster } from '../../../shared/models/cfsportrate';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CfsPortRateService {
  baseUrl = environment.baseUri;
  public HttpUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(
    private http: HttpClient
  ) { }

  saveCfsRateMaster(cfsportrate: CfsPortRateMaster): Observable<any> {
    delete cfsportrate.cfsPortRateMasterId;
    return this.http.post<CfsPortRateMaster>(this.baseUrl + 'cfs-port-rate-masters', JSON.stringify(cfsportrate), this.HttpUploadOptions);
  }

  updateCfsRateMaster(cfsportrate: CfsPortRateMaster): Observable<any> {
    return this.http.put<CfsPortRateMaster>(
      this.baseUrl + 'cfs-port-rate-masters/' + cfsportrate.cfsPortRateMasterId,
      JSON.stringify(cfsportrate), this.HttpUploadOptions
    );
  }

  getAllCfsRateMasters(): Observable<any> {
    return this.http.get(this.baseUrl + 'cfs-port-rate-masters');
  }

  getCfsRateMasterById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'cfs-port-rate-masters/' + id);
  }

  deleteCfsRateMastersById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'cfs-port-rate-masters/' + id);
  }

}
