import { Driver } from './../../../shared/models/driver';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  
  baseUrl = environment.baseUri;

  constructor(
    private http: HttpClient
  ) { }

  saveDriverMaster(driver: Driver): Observable<any> {
    console.log(driver);
    delete driver.driversyscode;
    console.log(driver);
    return this.http.post<Driver>(this.baseUrl + 'drivers', JSON.stringify(driver));
  }

  updateDriverMaster(driver: Driver): Observable<any> {
    return this.http.put<Driver>(this.baseUrl + 'drivers/'+ driver.driversyscode,
     JSON.stringify(driver));
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
