import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Alerts } from '../_common';
import { APIPaths } from '../_common/constant';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LookUpService extends ApiService {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }
  getAllCoursesForEnrolledUser(UserId: any) {
    let params = new HttpParams().set('UserId', UserId);
    let onSuccess = (value) => {
      let data = value;
      if (data.success) {
        return data.data;
      } else if (!data.success) {
        Alerts.showInfoMessage(data.message)
        //return data;
      }
    };
    return this.service(this.get(APIPaths.getAllCoursesForEnrolledUser, params)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  getAllCourses() {
    let onSuccess = (value) => {
      let data = value;
      if (data.totalCount != 0) {
        return data.data;
      } else {
        Alerts.showErrorMessage(data.message)
        return false;
      }
    };
    return this.service(this.get(APIPaths.getAllCourses)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  getAllCategories() {
    let onSuccess = (value) => {
      let data = value;
      if (data.totalCount != 0) {
        return data.data;
      } else {
        Alerts.showErrorMessage(data.message)
        return false;
      }
    };
    return this.service(this.get(APIPaths.getAllCategories)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  getEnrolledCategories(UserId: any) {
    let params = new HttpParams().set('UserId', UserId);
    let onSuccess = (value) => {
      let data = value;
      if (data.success) {
        return data.data;
      } else if (!data.success) {
        //Alerts.showInfoMessage("You're not enrolled in any Course Yet, no ongoing Category list found.")
        return data;
      }
    };
    return this.service(this.get(APIPaths.getAllCategoriesForEnrolledUser, params)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  GetLecture(Id: any) {
    let params = new HttpParams().set('Id', Id);
    let onSuccess = (value) => {
      let data = value;
      if (data.success) {
        return data.data;
      } else if (!data.success) {
        Alerts.showInfoMessage(data.message)
        //return data;
      }
    };
    return this.service(this.get(APIPaths.getLetureById, params)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  UserProfile(userId: any) {
    let params = new HttpParams();
    params = params.append('UserId', userId);
    let onSuccess = (value) => {
      let data = value;
      if (data.success) {
        return data.data;
      } else if (!data.success) {
        Alerts.showErrorMessage(data.message)
        return data;
      }
    };
    return this.service(this.get(APIPaths.UserProfile, params)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
}
