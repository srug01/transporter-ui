import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { Yard } from './../../../shared/models/yard';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YardService {
  baseUrl = environment.baseUri;
  public HttpUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(
    private http: HttpClient
  ) { }

  saveYardMaster(yard: Yard): Observable<any> {
    delete yard.yardMasterId;
    return this.http.post<Yard>(this.baseUrl + 'yard-masters', JSON.stringify(yard), this.HttpUploadOptions);
  }

  updateYardMaster(yard: Yard): Observable<any> {
    return this.http.patch<Yard>(this.baseUrl + 'yard-masters/'+ yard.yardMasterId, JSON.stringify(yard), this.HttpUploadOptions);
  }

  getAllYardMasters(): Observable<any> {
    return this.http.get(this.baseUrl + 'yard-masters');
  }

  getAllYardMastersByUserId(filter:any): Observable<any> {
    return this.http.get(this.baseUrl + 'yard-masters?filter=' + JSON.stringify(filter), this.HttpUploadOptions);
  }

  getYardMasterById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'yard-masters/' + id);
  }

  deleteYardMasterById(yard: Yard): Observable<any> {
    // return this.http.delete(this.baseUrl + 'yard-masters/' + id);
    return this.http.patch<Yard>(this.baseUrl + 'yard-masters/'+ yard.yardMasterId, JSON.stringify(yard), this.HttpUploadOptions);
  }

}
