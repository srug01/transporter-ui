import { Vehicle } from './../../../shared/models/vehicle';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  baseUrl = environment.baseUri;

  constructor(
    private http: HttpClient
  ) { }

  saveVehicleMaster(vehicle: Vehicle): Observable<any> {
    return this.http.post<Vehicle>(this.baseUrl + 'vehicle-masters', JSON.stringify(vehicle));
  }

  getAllVehicleMasters(): Observable<any> {
    return this.http.get(this.baseUrl + 'vehicle-masters');
  }
}
