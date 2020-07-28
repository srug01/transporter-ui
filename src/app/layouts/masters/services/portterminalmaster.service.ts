import { PortTerminalMaster } from './../../../shared/models/PortTerminalMaster';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortterminalmasterService {
  baseUrl = environment.baseUri;
  public HttpUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  savePortTerminalMaster(portterminalmaster: PortTerminalMaster): Observable<any> {
    delete portterminalmaster.portTerminalId;
    return this.http.post<PortTerminalMaster>(this.baseUrl + 'port-terminal-masters', JSON.stringify(portterminalmaster),
      this.HttpUploadOptions);
  }

  updatePortTerminalMaster(portterminalmaster: PortTerminalMaster): Observable<any> {
    return this.http.put<PortTerminalMaster>(this.baseUrl + 'port-terminal-masters/' + portterminalmaster.portTerminalId,
      JSON.stringify(portterminalmaster), this.HttpUploadOptions);
  }

  getAllPortTerminalMaster(): Observable<any> {
    return this.http.get(this.baseUrl + 'port-terminal-masters');
  }

  getPortTerminalMasterById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'port-terminal-masters/' + id);
  }

  getPortTerminalMasterByPortMasterId(id: number): Observable<any> {
    const filter = {
      where: {
        or: [
          { portMasterId: id }
        ]
      }
    };
    return this.http.get(this.baseUrl + 'port-terminal-masters?filter=' + JSON.stringify(filter), this.HttpUploadOptions);
  }

  deletePortTerminalMasterById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'port-terminal-masters/' + id);
  }
}
