import { MasterType } from './../../../shared/models/masterType';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MasterTypeService {
  baseUrl = environment.baseUri;

  filter: any = {
    fields: {
      masterTypeId: true,
      masterType: true,
      sourceType: true,
      destinationType: true
    }
  };
  constructor(
    private http: HttpClient
  ) { }

  getAllMasterTypes(): Observable<MasterType[]> {
    return this.http.get<MasterType[]>(this.baseUrl + 'master-types?filter=' + JSON.stringify(this.filter));
  }
}

