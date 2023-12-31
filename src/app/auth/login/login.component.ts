import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { ILogin } from 'src/app/interfaces/auth/ILogin';
import { Messages, TokenHelper } from 'src/app/_common';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  LogIndata: ILogin;
  loading: boolean;
  validationMessages = Messages.validation_messages
  constructor(public formBuilder: FormBuilder, public router :Router,public authService: AuthService, private toastr: ToastrService) {
    this.LogIndata = {} as ILogin;
  }

  ngOnInit() {
    this.validateForm();
  }

  onSubmit() {
    this.LogIndata = this.form.value;
    this.authService.login(this.LogIndata).pipe(finalize(() => {
      this.loading = false
    })).subscribe((result: any) => {
      if (result.token) {
        TokenHelper.setToken(result.token);
        localStorage.setItem("user", result.userName);
        localStorage.setItem("userId",result.id);
        this.form.reset();
        this.router.navigateByUrl('/dashboard')
      }
    });
  }

  validateForm() {
    this.form = this.formBuilder.group({
      userName: new FormControl('',Validators.compose([
        Validators.required
      ])),
      password: new FormControl('',Validators.compose([
        Validators.required
      ])),
      remember: new FormControl(),

    })
  }

}

