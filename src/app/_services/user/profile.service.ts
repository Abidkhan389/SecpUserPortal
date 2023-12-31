import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { APIPaths } from 'src/app/_common/constant';
import { Alerts } from 'src/app/_common';
import { IEditUser } from 'src/app/interfaces/IEditUser';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends ApiService {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }
  UserProfile(userId: any) {
    let params = new HttpParams();
    params = params.append('UserId', userId);
    let onSuccess = (value) => {
      let data = value;
      if (data.success) {
        return data;
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
  GetUserCertificate(UserId: any) {
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
    return this.service(this.get(APIPaths.getuserCertificate, params)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  EditProfile(model: IEditUser) {
    let onSuccess = (value) => {
      let data = value;
      if (data.success) {
        Alerts.showSuccessMessage(data.message)
        return true;
      } else {
        Alerts.showErrorMessage(data.message)
        return false;
      }
    };
    return this.service(this.post(APIPaths.editProfile, model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  getUserDetails(userId: any) {
    let params = new HttpParams();
    params = params.append('UserId', userId);
    let onSuccess = (value) => {
      let data = value;
      if (data.success) {
        return data;
      } else if (!data.success) {
        Alerts.showErrorMessage(data.message)
        return data;
      }
    };
    return this.service(this.get(APIPaths.getUserDetails, params)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
}
