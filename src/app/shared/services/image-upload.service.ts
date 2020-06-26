
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { map } from  'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  baseUrl = environment.baseUri;

  constructor(private http: HttpClient) {}

  imageUpload(imageForm: FormData) {
    console.log('image uploading');
    return this.http.post(this.baseUrl + 'buckets/srug01/upload', imageForm,
    {reportProgress: true,
      observe: 'events'
    });
  }
}
