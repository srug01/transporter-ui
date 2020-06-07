import { Injectable } from '@angular/core';
import { Container } from './../../../shared/models/container';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContianerService {
  baseUrl = environment.baseUri;
  constructor(
    private http: HttpClient
  ) { }

  saveContainerMaster(container: Container): Observable<any> {
    console.log(container);
    delete container.container_syscode;
    console.log(container);
    return this.http.post<Container>(this.baseUrl + 'container-masters', JSON.stringify(container));
  }

  updateContainerMaster(container: Container): Observable<any> {
    return this.http.put<Container>(this.baseUrl + 'container-masters/'+ container.container_syscode, JSON.stringify(container));
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