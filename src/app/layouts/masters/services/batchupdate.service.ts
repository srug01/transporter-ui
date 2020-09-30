import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';

import { BatchFilter } from './../../../shared/models/batchFilter';


@Injectable({
  providedIn: 'root'
})
export class BatchUpdateService {
  baseUrl = environment.baseUri;
  public HttpUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  saveBatchRate(batchFilter: BatchFilter): Observable<any> {
    // console.log("Filter : " + JSON.stringify(suborderFilter));
    return this.http.post<any>(this.baseUrl + 'saveBatchUpdate',
    JSON.stringify(batchFilter),
     this.HttpUploadOptions
    );
  }


}
