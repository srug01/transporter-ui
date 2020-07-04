import { State } from './../../../shared/models/state';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateMasterService {

  baseUrl = environment.baseUri;
  public HttpUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  saveStateMaster(state: State): Observable<any> {
    delete state.state_syscode;
    return this.http.post<State>(this.baseUrl + 'state-masters', JSON.stringify(state), this.HttpUploadOptions);
  }
  updateStateMaster(state: State): Observable<any> {
    return this.http.put<State>(this.baseUrl + 'state-masters/'+ state.state_syscode,
     JSON.stringify(state), this.HttpUploadOptions);
  }

  getAllStateMasters(): Observable<any> {
    return this.http.get(this.baseUrl + 'state-masters');
  }

  getStateMastersById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'state-masters/' + id);
  }

  deleteStateMastersById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'state-masters/' + id);
  }
}