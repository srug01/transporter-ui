import { Port } from './../../../shared/models/port';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

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
    delete port.portMasterId;
    return this.http.post<Port>(this.baseUrl + 'port-masters', JSON.stringify(port), this.HttpUploadOptions);
  }

  updatePortMaster(port: Port): Observable<any> {
    return this.http.put<Port>(this.baseUrl + 'port-masters/'+ port.portMasterId, JSON.stringify(port), this.HttpUploadOptions);
  }

  getAllPortMasters(): Observable<any> {
    return this.http.get(this.baseUrl + 'port-masters');
  }

  getAllPortMastersByUserId(filter:any): Observable<any> {
    return this.http.get(this.baseUrl + 'port-masters?filter=' + JSON.stringify(filter), this.HttpUploadOptions);
  }

  getPortMastersById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'port-masters/' + id);
  }

  getPortbyId(id: number) {
    return this.http.get(this.baseUrl + 'port-masters/' + id)
               .pipe(map((data: any) => data.result ),
                     catchError(error => { return throwError('Its a Trap!')})
               );
   }

  deletePortMastersById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'port-masters/' + id);
  }
}
