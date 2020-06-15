import { ZoneDay } from './../../../shared/models/zoneday';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZonedayService {
  baseUrl = environment.baseUri;
  constructor(
    private http: HttpClient
  ) { }

  
  saveZoneDaytMaster(zoneday: ZoneDay): Observable<any> {
    console.log(zoneday);
    delete zoneday.zone_day_syscode;
    console.log(zoneday);
    return this.http.post<ZoneDay>(this.baseUrl + 'zone-day-masters',
     JSON.stringify(zoneday));
  }
  updateZoneDayMaster(zoneday: ZoneDay): Observable<any> {
    return this.http.put<ZoneDay>(this.baseUrl + 'zone-day-masters/'+ 
    zoneday.zone_day_syscode, JSON.stringify(zoneday));
  }

  getAllZoneDayMasters(): Observable<any> {
    return this.http.get(this.baseUrl + 'zone-day-masters');
  }

  getZoneDayMastersById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'zone-day-masters/' + id);
  }

  deleteZoneDayMastersById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'zone-day-masters/' + id);
  }


}
