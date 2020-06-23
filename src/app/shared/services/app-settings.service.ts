import { Injectable } from '@angular/core';
import {Settings} from './../models/settings.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {
  baseUrl = environment.baseUri;
constructor(private http: HttpClient) {}

saveSettings(settings: Settings): Observable<any> {
  console.log(settings);
  delete settings.settings_syscode;
  console.log(settings);
  return this.http.post<Settings>(this.baseUrl + 'settings', JSON.stringify(settings));
}

updateSettings(settings: Settings): Observable<any> {
  return this.http.put<Settings>(this.baseUrl + 'settings/'+ settings.settings_syscode, JSON.stringify(settings));
}

getAllSettingss(): Observable<any> {
  return this.http.get(this.baseUrl + 'settings');
}

getSettingsById(id: number): Observable<any> {
  return this.http.get(this.baseUrl + 'settings/' + id);
}

deleteSettingssById(id: number): Observable<any> {
  return this.http.delete(this.baseUrl + 'settings/' + id);
}

}
