import { Setting } from '../../../shared/models/setting';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  baseUrl = environment.baseUri;

  constructor(
    private http: HttpClient
  ) { }

  saveSetting(setting: Setting): Observable<any> {
    console.log(setting);
    delete setting.settingsId;
   
    return this.http.post<Setting>(this.baseUrl + 'settings', JSON.stringify(setting));
  }

  updateSetting(setting: Setting): Observable<any> {
    return this.http.put<Setting>(this.baseUrl + 'settings/'+ setting.settingsId,
     JSON.stringify(setting));
  }

  getAllSetting(): Observable<any> {
    return this.http.get(this.baseUrl + 'settings');
  }

  getSettingById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'settings/' + id);
  }

  deleteSettingById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'settings/' + id);
  }
}