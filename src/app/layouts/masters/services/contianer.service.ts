import { Injectable } from '@angular/core';
import { ContainerMaster } from '../../../shared/models/containerMaster';
import { environment } from './../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContianerService {
  baseUrl = environment.baseUri;
  public HttpUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(
    private http: HttpClient
  ) { }

  saveContainerMaster(container: ContainerMaster): Observable<ContainerMaster> {
    delete container.containerMasterId;
    return this.http.post<ContainerMaster>(this.baseUrl + 'container-masters', JSON.stringify(container), this.HttpUploadOptions);
  }

  updateContainerMaster(container: ContainerMaster): Observable<ContainerMaster> {
    return this.http.put<ContainerMaster>(
      this.baseUrl + 'container-masters/' + container.containerMasterId, JSON.stringify(container),
      this.HttpUploadOptions
    );
  }

  getAllContainerMasters(): Observable<any> {
    return this.http.get(this.baseUrl + 'container-masters');
  }

  getContainerMasterById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'container-masters/' + id);
  }

  deleteContainerMastersById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'container-masters/' + id);
  }

}
