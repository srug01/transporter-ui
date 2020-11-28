import { Setting } from '../../../shared/models/setting';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  baseUrl = environment.baseUri;
  public HttpUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  saveSetting(setting: Setting): Observable<any> {
    console.log(setting);
    delete setting.settingsId;
    return this.http.post<Setting>(this.baseUrl + 'settings', JSON.stringify(setting), this.HttpUploadOptions);
  }

  updateSetting(setting: Setting): Observable<any> {
    return this.http.patch<Setting>(this.baseUrl + 'settings/' + setting.settingsId,
      JSON.stringify(setting), this.HttpUploadOptions);
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
