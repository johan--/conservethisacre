import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';

@Injectable()
export class ImageUploaderService {

  constructor(private api: ApiService) {
  }

  upload(url: string, data: FormData): Observable<any> {
    return this.api.post(url, data);
  }

  remove(url): Observable<any>{
    return this.api.delete(url);
  }
}
