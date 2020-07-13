
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
//import * as AWS from 'aws-sdk/global';
//import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  baseUrl = environment.baseUri;
  public HttpUploadOptions = {
    headers: new HttpHeaders({ 
    })
  }
  constructor(private http: HttpClient) { }

  imageUpload(formData: any) {
    return this.http.post(this.baseUrl + 'buckets/srug-images/upload', formData, this.HttpUploadOptions);
  }
}
