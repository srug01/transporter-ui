import { Injectable } from '@angular/core';
import { PortCfsRateMaster } from '../../../shared/models/portcfsrate';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortCfsRateService {
  baseUrl = environment.baseUri;
  public HttpUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(
    private http: HttpClient
  ) { }
  savePortCfsRateMaster(portcfsrate: PortCfsRateMaster): Observable<any> {
    delete portcfsrate.portCfsRateMasterId;
    return this.http.post<PortCfsRateMaster>(this.baseUrl + 'port-cfs-rate-masters', JSON.stringify(portcfsrate), this.HttpUploadOptions);
  }

  updatePortCfsRateMaster(portcfsrate: PortCfsRateMaster): Observable<any> {
    return this.http.patch<PortCfsRateMaster>(
      this.baseUrl + 'port-cfs-rate-masters/' + portcfsrate.portCfsRateMasterId,
      JSON.stringify(portcfsrate), this.HttpUploadOptions
    );
  }

  getAllPortCfsRateMasters(): Observable<any> {
    return this.http.get(this.baseUrl + 'port-cfs-rate-masters');
  }

  getPortCfsRateMasterById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'port-cfs-rate-masters/' + id);
  }

  deletePortCfsRateMastersById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'port-cfs-rate-masters/' + id);
  }

}
