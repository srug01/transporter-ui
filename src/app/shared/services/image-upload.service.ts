
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

  uploadFile(file, folderName: string) {
    const contentType = file.type;
    // const bucket = new S3(
    //   {
    //     accessKeyId: 'AKIAJXYEMQUEZQIC3TYQ',
    //     secretAccessKey: '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'
    //   }
    // );
    const params = {
      Bucket: 'srug-images',
      Key: folderName + '/' + file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType
    };
    // bucket.upload(params, (err, data) => {
    //   if (err) {
    //     console.log('There was an error uploading your file: ', err);
    //     return false;
    //   }
    //   console.log('Successfully uploaded file.', data);
    //   return true;
    // });
    //for upload progress   
    /*bucket.upload(params).on('httpUploadProgress', function (evt) {
              console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
          }).send(function (err, data) {
              if (err) {
                  console.log('There was an error uploading your file: ', err);
                  return false;
              }
              console.log('Successfully uploaded file.', data);
              return true;
          });*/
  }
}
