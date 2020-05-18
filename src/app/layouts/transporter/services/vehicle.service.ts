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

  saveVehicle(vehicle: Vehicle): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.post<Vehicle>(this.baseUrl + 'vehicles', JSON.stringify(vehicle), { headers: headers });
  }
}