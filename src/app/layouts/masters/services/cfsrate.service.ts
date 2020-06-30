import { Injectable } from '@angular/core';
import { Cfsrate } from './../../../shared/models/cfsrate';
import { environment } from './../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CfsrateService {
  baseUrl = environment.baseUri;
  public HttpUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(
    private http: HttpClient
  ) { }

  saveCfsRateMaster(cfsrate: Cfsrate): Observable<any> {
    console.log(cfsrate);
    delete cfsrate.cfs_rate_syscode;
    console.log(cfsrate);
    return this.http.post<Cfsrate>(this.baseUrl + 'cfs-rate-masters', JSON.stringify(cfsrate), this.HttpUploadOptions);
  }

  updateCfsRateMaster(cfsrate: Cfsrate): Observable<any> {
    return this.http.put<Cfsrate>(
      this.baseUrl + 'cfs-rate-masters/' + cfsrate.cfs_rate_syscode,
      JSON.stringify(cfsrate), this.HttpUploadOptions
    );
  }

  getAllCfsRateMasters(): Observable<any> {
    return this.http.get(this.baseUrl + 'cfs-rate-masters');
  }

  getCfsRateMasterById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'cfs-rate-masters/' + id);
  }

  deleteCfsRateMastersById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'cfs-rate-masters/' + id);
  }

}
