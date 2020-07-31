import { VehicleMaster } from './../../../shared/models/VehicleMaster';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  baseUrl = environment.baseUri;
  public HttpUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }
  constructor(
    private http: HttpClient
  ) { }

  saveVehicleMaster(vehicle: VehicleMaster): Observable<any> {
    console.log(vehicle);
    delete vehicle.vehicleMasterId;
    return this.http.post<VehicleMaster>(this.baseUrl + 'vehicle-masters', JSON.stringify(vehicle), this.HttpUploadOptions);
  }

  updateVehicleMaster(vehicle: VehicleMaster): Observable<any> {
    console.log(vehicle);
    return this.http.put<VehicleMaster>(this.baseUrl + 'vehicle-masters/' + vehicle.vehicleMasterId,
     JSON.stringify(vehicle), this.HttpUploadOptions);
  }

  getAllVehicleMasters(): Observable<any> {
    return this.http.get(this.baseUrl + 'vehicle-masters');
  }

  getVehicleMasterById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'vehicle-masters/' + id);
  }

  deleteVehicleMasterById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'vehicle-masters/' + id);
  }


}
