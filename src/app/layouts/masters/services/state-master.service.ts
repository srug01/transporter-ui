import { State } from './../../../shared/models/state';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateMasterService {

  baseUrl = environment.baseUri;

  constructor(
    private http: HttpClient
  ) { }

  saveStateMaster(state: State): Observable<any> {
    return this.http.post<State>(this.baseUrl + 'state-masters', JSON.stringify(state));
  }

  getAllStateMasters(): Observable<any> {
    return this.http.get(this.baseUrl + 'state-masters');
  }

  deleteStateMastersById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'state-masters/' + id);
  }
}