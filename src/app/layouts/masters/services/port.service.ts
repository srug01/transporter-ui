import { Port } from './../../../shared/models/port';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortService {

  baseUrl = environment.baseUri;
  public HttpUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  savePortMaster(port: Port): Observable<any> {
    console.log(port);
    delete port.port_syscode;
    console.log(port);
    return this.http.post<Port>(this.baseUrl + 'port-masters', JSON.stringify(port), this.HttpUploadOptions);
  }

  updatePortMaster(port: Port): Observable<any> {
    return this.http.put<Port>(this.baseUrl + 'port-masters/'+ port.port_syscode, JSON.stringify(port), this.HttpUploadOptions);
  }

  getAllPortMasters(): Observable<any> {
    return this.http.get(this.baseUrl + 'port-masters');
  }

  getPortMastersById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'port-masters/' + id);
  }

  deletePortMastersById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'port-masters/' + id);
  }
}