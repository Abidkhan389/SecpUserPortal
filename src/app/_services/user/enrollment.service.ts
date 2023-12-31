import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Alerts } from 'src/app/_common';
import { APIPaths } from 'src/app/_common/constant';
import { IEnrollment } from 'src/app/interfaces/IEnrollment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService extends ApiService {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }
  Enrollment(model: IEnrollment) {

    let onSuccess = (value) => {
      let data = value;
      if (data.success) {
        Alerts.showInfoMessage(data.message);
        return data;
      } else if (!data.success) {
        Alerts.showInfoMessage(data.message)
        //return data;
      }
    };
    return this.service(this.post(APIPaths.Enrollment, model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  GetLearningOverViewCount(UserId: any) {

    let params = new HttpParams().set('UserId', UserId);
    let onSuccess = (value) => {
      let data = value;
      if (data.success) {
        return data.data;
      } else if (!data.success) {
        Alerts.showInfoMessage(data.message)
      }
    };
    return this.service(this.get(APIPaths.GetLearningOverViewCount, params)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
}
