import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ILogin, ILoginResponse } from '../interfaces/auth/ILogin';
import { Alerts } from '../_common';
import { APIPaths } from '../_common/constant';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {
  private model: ILogin = null;

  constructor(public httpClient: HttpClient,
    private router: Router) {
    super(httpClient);
  }

  login(credentials: ILogin) {
    this.model = credentials;
    let onSuccess = (data) => {
      if (data.success) {
        return data.data;
      } else {
        Alerts.showErrorMessage(data.message)
        return false;
      }
    };
    return this.service(this.post(APIPaths.login, credentials)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
}


