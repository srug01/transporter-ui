import { Injectable } from '@angular/core';
import { CfsYardRateMaster } from '../../../shared/models/cfsyardrate';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CfsYardRateService {
  baseUrl = environment.baseUri;
  public HttpUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(
    private http: HttpClient
  ) { }
  saveCfsYardRateMaster(cfsyardrate: CfsYardRateMaster): Observable<any> {
    delete cfsyardrate.cfsYardRateMasterId;
    return this.http.post<CfsYardRateMaster>(this.baseUrl + 'cfs-yard-rate-masters', JSON.stringify(cfsyardrate), this.HttpUploadOptions);
  }

  updateCfsYardRateMaster(cfsyardrate: CfsYardRateMaster): Observable<any> {
    return this.http.put<CfsYardRateMaster>(
      this.baseUrl + 'cfs-yard-rate-masters/' + cfsyardrate.cfsYardRateMasterId,
      JSON.stringify(cfsyardrate), this.HttpUploadOptions
    );
  }

  getAllCfsYardRateMasters(): Observable<any> {
    return this.http.get(this.baseUrl + 'cfs-yard-rate-masters');
  }

  getCfsYardRateMasterById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'cfs-yard-rate-masters/' + id);
  }

  deleteCfsYardRateMastersById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'cfs-yard-rate-masters/' + id);
  }

}
