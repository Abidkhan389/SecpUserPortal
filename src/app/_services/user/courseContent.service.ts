import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Alerts } from 'src/app/_common';
import { APIPaths } from 'src/app/_common/constant';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseContentService extends ApiService {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }
  GetLectureContentById(Id: any) {
    let params = new HttpParams().set('Id', Id);
    let onSuccess = (value) => {
      let data = value;
      if (data.success) {
        return data;
      } else if(!data.success) {
        Alerts.showInfoMessage(data.message)
        //return data;
      }
    };
    return this.service(this.get(APIPaths.getLectureContentById, params)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
}
