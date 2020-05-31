import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { Yard } from './../../../shared/models/yard';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YardService {
  baseUrl = environment.baseUri;
  constructor(
    private http: HttpClient
  ) { }

  saveYardMaster(yard: Yard): Observable<any> {
    console.log(yard);
    delete yard.yard_syscode;
    console.log(yard);
    return this.http.post<Yard>(this.baseUrl + 'yard-masters', JSON.stringify(yard));
  }

  updateYardMaster(yard: Yard): Observable<any> {
    return this.http.put<Yard>(this.baseUrl + 'yard-masters/'+ yard.yard_syscode, JSON.stringify(yard));
  }

  getAllYardMasters(): Observable<any> {
    return this.http.get(this.baseUrl + 'yard-masters');
  }

  getYardMasterById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'yard-masters/' + id);
  }

  deleteYardMasterById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'yard-masters/' + id);
  }

}
