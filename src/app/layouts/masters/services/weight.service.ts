import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { Weight } from './../../../shared/models/weight';
import { environment } from './../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WeightService {
  baseUrl = environment.baseUri;
  public HttpUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(
    private http: HttpClient
  ) { }

  saveWeightMaster(weight: Weight): Observable<any> {
    console.log(weight);
    delete weight.weightMasterId;
    console.log(weight);
    return this.http.post<Weight>(this.baseUrl + 'weight-masters', JSON.stringify(weight), this.HttpUploadOptions);
  }

  updateWeightMaster(weight: Weight): Observable<any> {
    return this.http.put<Weight>(this.baseUrl + 'weight-masters/'+ weight.weightMasterId, JSON.stringify(weight), this.HttpUploadOptions);
  }

  getAllWeightMasters(): Observable<any> {
    return this.http.get(this.baseUrl + 'weight-masters');
  }

  getWeightMasterById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'weight-masters/' + id);
  }

  deleteWeightMasterById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'weight-masters/' + id);
  }
}
