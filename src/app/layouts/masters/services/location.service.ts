import { LocationMaster } from './../../../shared/models/location';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  baseUrl = environment.baseUri;

  constructor(
    private http: HttpClient
  ) { }

  saveLocationMaster(location: LocationMaster): Observable<any> {
    return this.http.post<LocationMaster>(this.baseUrl + 'location-masters', JSON.stringify(location));
  }

  updateLocationMaster(location: LocationMaster): Observable<any> {
    return this.http.put<LocationMaster>(this.baseUrl + 'location-masters/' + location.locationId, JSON.stringify(location));
  }

  getAllLocationMasters(): Observable<any> {
    return this.http.get(this.baseUrl + 'location-masters');
  }

  getLocationMastersById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'location-masters/' + id);
  }

  deleteLocationMastersById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'location-masters/' + id);
  }
}
