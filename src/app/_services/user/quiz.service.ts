import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Alerts } from 'src/app/_common';
import { map } from 'rxjs/operators';
import { APIPaths } from 'src/app/_common/constant';
import { IQuizDetails } from 'src/app/interfaces/IQuizDetails';

@Injectable({
  providedIn: 'root'
})
export class QuizService extends ApiService {

  constructor(public httpClient: HttpClient) {
    super(httpClient)
  }

  GetquizByLecture(courseId: any, lectureId: any) {
    let params = new HttpParams();
    params = params.append('courseId', courseId);
    params = params.append('lectureId', lectureId);

    let onSuccess = (value) => {
      let data = value;
      if (data.success) {
        return data.data;
      } else if (!data.success) {
        Alerts.showInfoMessage(data.message)
      }
    };
    return this.service(this.get(APIPaths.getquizByLecture, params)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  GetLectureWiseGrade(model: IQuizDetails) {
    let onSuccess = (value) => {
      let data = value;
      if (data.success) {
        return data.data;
      }
      else if (!data.success) {
        Alerts.showInfoMessage(data.message)
      }
    };
    return this.service(this.post(APIPaths.getLectureWiseGrade, model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
}
