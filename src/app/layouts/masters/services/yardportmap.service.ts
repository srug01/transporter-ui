import { YardPortMap } from './../../../shared/models/yardportmap';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YardportmapService {
  baseUrl = environment.baseUri;
  public HttpUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(
    private http: HttpClient
  ) { }

  saveYardPortMapMaster(yardportmap: YardPortMap): Observable<any> {
    console.log(yardportmap);
    delete yardportmap.yard_port_mapping_syscode;
    console.log(yardportmap);
    return this.http.post<YardPortMap>(this.baseUrl + 'yard-port-mappings', JSON.stringify(yardportmap), this.HttpUploadOptions);
  }

  updateYardPortMapMaster(yardportmap: YardPortMap): Observable<any> {
    return this.http.put<YardPortMap>(
      this.baseUrl + 'yard-port-mappings/' + yardportmap.yard_port_mapping_syscode, 
      JSON.stringify(yardportmap), this.HttpUploadOptions
    );
  }

  getAllYardPortMapMasters(): Observable<any> {
    return this.http.get(this.baseUrl + 'yard-port-mappings');
  }

  getYardPortMapMastersById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'yard-port-mappings/' + id);
  }

  deleteYardPortMapMastersById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'yard-port-mappings/' + id);
  }
}
