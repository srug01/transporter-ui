import { Injectable } from '@angular/core';
import { Cfs } from './../../../shared/models/cfs';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CfsService {
  baseUrl = environment.baseUri;
  constructor(
    private http: HttpClient
  ) { }

  saveCfsMaster(cfs: Cfs): Observable<any> {
    console.log(cfs);
    delete cfs.cfs_syscode;
    console.log(cfs);
    return this.http.post<Cfs>(this.baseUrl + 'cfs-masters', JSON.stringify(cfs));
  }

  updateCfsMaster(cfs: Cfs): Observable<any> {
    return this.http.put<Cfs>(this.baseUrl + 'cfs-masters/'+ cfs.cfs_syscode,
     JSON.stringify(cfs));
  }

  getAllCfsMasters(): Observable<any> {
    return this.http.get(this.baseUrl + 'cfs-masters');
  }

  getCfsMasterById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'cfs-masters/' + id);
  }

  deleteCfsMasterById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'cfs-masters/' + id);
  }
  }


