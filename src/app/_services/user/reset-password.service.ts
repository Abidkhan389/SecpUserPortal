import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { IResetPassword } from 'src/app/interfaces/IResetPassword';
import { APIPaths } from 'src/app/_common/constant';
import { map } from 'rxjs/operators';
import { Alerts } from 'src/app/_common';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService extends ApiService{

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }
  ResetPassword(resetPassword:IResetPassword) {
    let onSuccess = (value) => {
      let data = value;
      if (data.success) {
        Alerts.showSuccessMessage("Password Update Successfully")
      } else if(!data.success) {
        Alerts.showInfoMessage(data.message)
        return data;
      }
    };
    return this.service(this.post(APIPaths.ResetPassword,resetPassword)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
}
