import { Injectable } from '@angular/core';
import { Mytrip } from './../../../shared/models/mytrip';
import { environment } from './../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TripService {
  baseUrl = environment.baseUri;
  public HttpUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  saveMytripMaster(trip: Mytrip): Observable<any> {
    delete trip.tripId;
    return this.http.post<Mytrip>(this.baseUrl + 'trips', JSON.stringify(trip),
    this.HttpUploadOptions);
  }

  updateMytripMaster(trip: Mytrip): Observable<any> {
    return this.http.put<Mytrip>(this.baseUrl + 'trips/' + trip.tripId,
      JSON.stringify(trip), this.HttpUploadOptions);
  }

  getAllMytripMasters(): Observable<any> {
    return this.http.get(this.baseUrl + 'trips', this.HttpUploadOptions);
  }



  getMytripMasterById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'trips/' + id);
  }

  deleteMytripMasterById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'trips/' + id);
  }

  getAllTripsbyUserId(userId): Observable<Mytrip[]> {
    return this.http.get<Mytrip[]>(this.baseUrl + 'GetTripsByUserId/' + userId);
  }

}
