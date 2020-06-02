import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { Weight } from './../../../shared/models/weight';
import { environment } from './../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WeightService {
  baseUrl = environment.baseUri;
  constructor(
    private http: HttpClient
  ) { }

  saveWeightMaster(weight: Weight): Observable<any> {
    console.log(weight);
    delete weight.weight_syscode;
    console.log(weight);
    return this.http.post<Weight>(this.baseUrl + 'weight-masters', JSON.stringify(weight));
  }

  updateWeightMaster(weight: Weight): Observable<any> {
    return this.http.put<Weight>(this.baseUrl + 'weight-masters/'+ weight.weight_syscode, JSON.stringify(weight));
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
