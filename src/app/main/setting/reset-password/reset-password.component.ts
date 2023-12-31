import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Messages } from 'src/app/_common';
import { NoWhitespaceValidator, Patterns } from 'src/app/_common/Validators';
import { ResetPasswordService } from 'src/app/_services/user/reset-password.service';
import { IResetPassword } from 'src/app/interfaces/IResetPassword';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent implements OnInit {

  resetPassword:IResetPassword;
  resetpasswordForm: FormGroup;
  userId: any;
  validationMessages = Messages.validation_messages;

  constructor(protected router: Router, protected resetPasswordService:ResetPasswordService
  ,private fb: FormBuilder) {
    this.resetPassword= {} as IResetPassword;
   }

  ngOnInit(): void {
    this.validateform();
  }
  Submit() {
    this.userId = localStorage.getItem("userId");
    this.resetPassword=this.resetpasswordForm.value;
    this.resetPassword.userId= this.userId;
    this.resetPasswordService.ResetPassword(this.resetPassword).subscribe((data:any)=>{
    //this.router.navigate(['/recommendation'], { queryParams: { courseId: this.courseId } })
    });
  }
  closeClick() {
   
  }
  validateform() {
    this.resetpasswordForm = this.fb.group({
      OldPassword: [null, Validators.compose([NoWhitespaceValidator, Validators.required])],
      NewPassword: [null, Validators.compose([NoWhitespaceValidator, Validators.required])],
      CofirmPassword: [null, Validators.compose([NoWhitespaceValidator, Validators.required])],
    });
  }

}
