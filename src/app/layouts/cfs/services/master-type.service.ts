import { MasterType } from './../../../shared/models/masterType';
import { Cfs } from './../../../shared/models/cfs';
import { Port } from './../../../shared/models/port';
import { Yard } from './../../../shared/models/yard';
import { ContainerMaster } from './../../../shared/models/containerMaster';
import { Weight } from './../../../shared/models/weight';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { TimeSlot } from './../../../shared/models/timeslot';

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

  getMasterTypeById(masterTypeId): Observable<MasterType> {
    return this.http.get<MasterType>(this.baseUrl + 'master-types/' + masterTypeId);
  }

  getAllCFSbyUserId(userId): Observable<Cfs[]> {
    return this.http.get<Cfs[]>(this.baseUrl + 'GetAllCFSbyUserId/' + userId);
  }

  getAllCFSPortsbyUserId(userId): Observable<Port[]> {
    return this.http.get<Port[]>(this.baseUrl + 'GetAllCFSPortsbyUserId/' + userId);
  }

  getAllCFSYardsbyUserId(userId): Observable<Yard[]> {
    return this.http.get<Yard[]>(this.baseUrl + 'GetAllCFSYardsbyUserId/' + userId);
  }

  getAllCFSContainersbyUserId(userId, typeId, portyardId): Observable<ContainerMaster[]> {
    return this.http.get<ContainerMaster[]>(this.baseUrl + 'getAllCFSContainersbyUserId/' + userId + '/' + typeId + '/' + portyardId);
  }

  GetAllCFSWeightsbyUserandContainerId(userId, typeId, containerId,portyardId): Observable<Weight[]> {
    return this.http.get<Weight[]>(this.baseUrl + 'GetAllCFSWeightsbyUserandContainerId/' + userId + '/' + typeId + '/' + containerId + '/' + portyardId);
  }

  getAllTimeSlotMasters(): Observable<any> {
    return this.http.get(this.baseUrl + 'timeslotmasters');
  }

}

