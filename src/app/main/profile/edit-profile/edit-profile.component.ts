import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Messages, NoWhitespaceValidator, Patterns } from 'src/app/_common/Validators';
import { DropDownUtils } from 'src/app/_common/_helper/dropdownUtils';
import { LookUpService } from 'src/app/_services/look-up.service';
import { ProfileService } from 'src/app/_services/user/profile.service';
import { IEditUser } from 'src/app/interfaces/IEditUser';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.sass']
})
export class EditProfileComponent extends DropDownUtils implements OnInit {
  userForm: FormGroup;
  userId: any;
  userDetails: any;
  editUser: IEditUser;
  validationMessages = Messages.validation_messages;
  myDate: string;
  constructor(protected lookupService: LookUpService,
     protected router: Router, private fb: FormBuilder,
      protected profileService: ProfileService) {
    super(lookupService, router)

  }
  ngOnInit(): void {
    this.validateForm();
    this.GetUserDetails();
  }
  GetUserDetails() {
    this.userId = localStorage.getItem('userId');
    return this.profileService.getUserDetails(this.userId)
      .subscribe(result => {
        if (result) {
          if (result.success) {
            this.userDetails = result.data;
            if (this.userDetails) {
              this.userForm.patchValue(this.userDetails);
            }
          }
        }
      });
  }
  validateForm() {
    this.userForm = this.fb.group({
      firstName: new FormControl('', Validators.compose([
        Validators.required,
        NoWhitespaceValidator,
        Validators.pattern(Patterns.nameRegex),
        Validators.maxLength(50),
      ])),
      lastName: new FormControl('', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.nameRegex), Validators.maxLength(50)])),
      university: new FormControl('', Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.titleRegex)])),
      highestDegree: new FormControl('', Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.titleRegex)])),
      occupation: new FormControl('', Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.titleRegex)])),
      major: new FormControl('', Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.titleRegex)])),
      about: new FormControl('', Validators.compose
        ([NoWhitespaceValidator, Validators.maxLength(1500)])),
      address: new FormControl('', Validators.compose([NoWhitespaceValidator, Validators.required])),
      gender: new FormControl('',),
      dob: new FormControl('',),
      mobileNumber: new FormControl('', Validators.compose([
        NoWhitespaceValidator,
        Validators.pattern(Patterns.Num),
        Validators.maxLength(11),
        Validators.minLength(11),
        Validators.required
      ])),
      cnic: new FormControl('', Validators.compose([
        Validators.required,
        NoWhitespaceValidator,
        Validators.pattern(Patterns.CnicPattern),
      ])),
    })
  }
  EditProfile() {
    this.editUser = this.userForm.getRawValue();
    this.userId = localStorage.getItem('userId');
    this.editUser.userId = this.userId;
    this.profileService.EditProfile(this.editUser).subscribe((data: any) => {
    });
  }
}


