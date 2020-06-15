import { Mileage } from './../../../shared/models/mileage';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MileageService {
  baseUrl = environment.baseUri;

  constructor(
    private http: HttpClient
  ) { }

  saveMileageMaster(mileage: Mileage): Observable<any> {
    console.log(mileage);
    delete mileage.mileage_syscode;
    console.log(mileage);
    return this.http.post<Mileage>(this.baseUrl + 'mileage-masters', JSON.stringify(mileage));
  }

  updateMileageMaster(mileage: Mileage): Observable<any> {
    return this.http.put<Mileage>(this.baseUrl + 'mileage-masters/'+ mileage.mileage_syscode,
     JSON.stringify(mileage));
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
