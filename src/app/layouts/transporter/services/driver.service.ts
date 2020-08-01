import { Driver } from '../../../shared/models/driver';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  baseUrl = environment.baseUri;
  public HttpUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  saveDriverMaster(driver: Driver): Observable<any> {
    delete driver.driverId;
    return this.http.post<Driver>(this.baseUrl + 'drivers', JSON.stringify(driver), this.HttpUploadOptions);
  }

  updateDriverMaster(driver: Driver): Observable<any> {
    return this.http.put<Driver>(this.baseUrl + 'drivers/'+ driver.driverId,
     JSON.stringify(driver), this.HttpUploadOptions);
  }

  getAllDriverMasters(): Observable<any> {
    return this.http.get(this.baseUrl + 'drivers');
  }

  getDriverMastersById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'drivers/' + id);
  }

  deleteDriverMastersById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'drivers/' + id);
  }







}
