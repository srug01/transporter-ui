import { Mileage } from './../../../shared/models/mileage';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MileageService {
  baseUrl = environment.baseUri;
  public HttpUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  saveMileageMaster(mileage: Mileage): Observable<any> {
    delete mileage.mileageId;
    return this.http.post<Mileage>(this.baseUrl + 'mileage-masters', JSON.stringify(mileage), this.HttpUploadOptions);
  }

  updateMileageMaster(mileage: Mileage): Observable<any> {
    return this.http.put<Mileage>(this.baseUrl + 'mileage-masters/'+ mileage.mileageId,
     JSON.stringify(mileage), this.HttpUploadOptions);
  }

  getAllMileageMasters(): Observable<any> {
    return this.http.get(this.baseUrl + 'mileage-masters');
  }

  getMileageMastersById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'mileage-masters/' + id);
  }

  deleteMileageMastersById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'mileage-masters/' + id);
  }


}
