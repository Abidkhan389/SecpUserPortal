import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Alerts } from 'src/app/_common';
import { APIPaths } from 'src/app/_common/constant';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GradeService extends ApiService {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }
  GetUserGrade(UserId: any) {
    let params = new HttpParams().set('UserId', UserId);
    let onSuccess = (value) => {
      let data = value;
      if (data.success) {
        return data;
      } else {
        // Alerts.showInfoMessage(data.message)
        return data;
      }
    };
    return this.service(this.get(APIPaths.getUserGrades, params)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  GetUserGradeForCourse(userId: any, courseId: any) {
    let params = new HttpParams();
    params = params.append('CourseId', courseId);
    params = params.append('UserId', userId);
    let onSuccess = (value) => {
      let data = value;
      if (data.success) {
        return data.data;
      } else {
        showErrorMessage(data.message)
        return false;
      }
    };
    return this.service(this.get(APIPaths.getUserGradeForCourse, params)).pipe(

      map(value => this.processPayload(value)),

      map(onSuccess)

    );

  }
}
function showErrorMessage(message: any) {
  throw new Error('Function not implemented.');
}

