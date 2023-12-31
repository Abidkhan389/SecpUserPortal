import { Injectable } from '@angular/core';
import { Alerts } from 'src/app/_common';
import { IAssessmentDetails } from 'src/app/interfaces/IAssessmentDetails';
import { ApiService } from '../api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { APIPaths } from 'src/app/_common/constant';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService extends ApiService {

  constructor(public httpClient: HttpClient) {
    super(httpClient)
  }
  getAssessmentQuestions(Id: any) {
    let params = new HttpParams().set('Id', Id);
    let onSuccess = (value) => {
      let data = value;
      if (data.success) {
        return data.data;
      } else if (!data.success) {
        Alerts.showInfoMessage(data.message)
      }
    };
    return this.service(this.get(APIPaths.getAsessmentQuestions, params)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  getCourseWiseGrade(model: IAssessmentDetails) {
    let onSuccess = (value) => {
      let data = value;
      if (data.success) {
        return data.data;
      }
      else if (!data.success) {
        Alerts.showInfoMessage(data.message)
      }
    };
    return this.service(this.post(APIPaths.getCourseWiseGrade, model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
}
