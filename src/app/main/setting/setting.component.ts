import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IResetPassword } from 'src/app/interfaces/IResetPassword';
import { Messages, NoWhitespaceValidator } from 'src/app/_common/Validators';
import { ResetPasswordService } from 'src/app/_services/user/reset-password.service';
import { DropDownUtils } from 'src/app/_common/_helper/dropdownUtils';
import { LookUpService } from 'src/app/_services/look-up.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.sass']
})
export class SettingComponent extends DropDownUtils implements OnInit {
  resetPassword:IResetPassword;
  resetpasswordForm: FormGroup;
  UserDetails: any;
  PasswordButtonClicked:boolean=false;
  userId: any;
  validationMessages = Messages.validation_messages;
  constructor(protected lookupService: LookUpService,protected router:Router,private route: ActivatedRoute,
    protected resetPasswordService:ResetPasswordService,private fb: FormBuilder) {
      super(lookupService, router)
    this.userId = localStorage.getItem('userId');
    this.userProfile(this.userId, data => this.UserDetails = data);
    this.resetPassword= {} as IResetPassword;
    this.PasswordButtonClicked=true;
  }
  ngOnInit(): void {
    this.validateform() 
  }
  Submit() 
  {
    this.userId = localStorage.getItem("userId");
    this.resetPassword=this.resetpasswordForm.value;
    this.resetPassword.userId= this.userId;
    this.resetPasswordService.ResetPassword(this.resetPassword).subscribe((data:any)=>{
    //this.router.navigate(['/recommendation'], { queryParams: { courseId: this.courseId } })
    });
  }
  validateform()
   {
    this.resetpasswordForm = this.fb.group({
      OldPassword: [null, Validators.compose([NoWhitespaceValidator, Validators.required])],
      password: [null, Validators.compose([NoWhitespaceValidator, Validators.required])],
      confirmPassword: [null,Validators.compose([NoWhitespaceValidator, Validators.required])],
    },{ validator: this.checkPasswords });
  }
  checkPasswords(group: FormGroup) 
  {
    let password = group.controls.password.value;
    let confirmPassword = group.controls.confirmPassword.value;

    return password === confirmPassword ? null : { notSame: true };
  }
  ResetPassword()
  {
    this.PasswordButtonClicked=true;
    // this.router.navigate(['/ResetPassword']);
    // const dialogref = this.dialog.open(ResetPasswordComponent, {
    //   disableClose: true,
    //   autoFocus: false,
    //   data: {
    //     userId: this.userId,
    //   },
    // })
    // dialogref.afterClosed().subscribe({
    //   next: (value) => {
    //     if (value) {
    //       //this.GetAllCourses(data => this.recommendationArr = data);
    //       //Alerts.showInfoMessage("After Admin approval! course Will be Show in Continue Learning");
    //       // this.router.navigate(['/lecture'], { queryParams: { courseId: Id } })
    //     }
    //   },
    // });

  }
 

}
