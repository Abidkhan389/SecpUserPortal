import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Alerts } from 'src/app/_common';
import { APIPaths } from 'src/app/_common/constant';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends ApiService {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }
  GetEnrolledUserCoursesByCategoryId(categoryId: any, userId: any) {
    let params = new HttpParams();
    params = params.append('categoryId', categoryId);
    params = params.append('userId', userId);
    let onSuccess = (value) => {
      let data = value;
      if (data.success) {
        return data;
      } else if (!data.success) {
        //Alerts.showInfoMessage(data.message)
        return data;
      }
    };
    return this.service(this.get(APIPaths.GetEnrolledCoursesByCategoryId, params)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  GetCoursesByCategoryId(categoryId: any, userId: any) {
    let params = new HttpParams();
    params = params.append('categoryId', categoryId);
    params = params.append('userId', userId);
    let onSuccess = (value) => {
      let data = value;
      if (data.success) {
        return data;
      } else if (!data.success) {
        //Alerts.showInfoMessage(data.message)
        return data;
      }
    };
    return this.service(this.get(APIPaths.getCoursesByCategorId, params)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  GetCourseById(Id: any) {
    let params = new HttpParams().set('Id', Id);
    let onSuccess = (value) => {
      let data = value;
      if (data.success) {
        return data.data;
      } else {
        Alerts.showInfoMessage(data.message)
        return false;
      }
    };
    return this.service(this.get(APIPaths.GetCourseById, params)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
}
