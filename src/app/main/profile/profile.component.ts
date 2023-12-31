import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DropDownUtils } from 'src/app/_common/_helper/dropdownUtils';
import { LookUpService } from 'src/app/_services/look-up.service';
import { GradeService } from 'src/app/_services/user/grade.service';
import { ProfileService } from 'src/app/_services/user/profile.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent extends DropDownUtils implements OnInit {
  UserDetails: any;
  userId: any;
  certificateList: any;
  loading: boolean;
  displayCount: any;
  noGrade: boolean = false;
  userGrade: any;
  user: any;
  username: any;
  LastCourseCompleteId: any;
  modalOptions: NgbModalOptions = {};
  isCollapsed: boolean = true;
  coursename: any;
  constructor(protected lookupService: LookUpService, protected gradeService: GradeService,
    protected router: Router, public profileService: ProfileService, private modalService: NgbModal,) {
    super(lookupService, router)
    this.userId = localStorage.getItem('userId');
    this.userProfile(this.userId, data => this.UserDetails = data);
  }

  ngOnInit(): void {
    this.GetUserCertificate();
  }
  GetUserCertificate() {
    this.loading = true;
    this.userId = localStorage.getItem("userId");
    return this.profileService.GetUserCertificate(this.userId)
      .subscribe(result => {
        if (result) {
          if (result.success) {
            this.noGrade = false;
            this.certificateList = result.data;
            if (this.certificateList.length < 0) {
              this.noGrade = true;
            }
            else {
              //    //this.displayCount= this.certificateList.lectureList.length;
              //  this.LastCourseCompleteId=this.certificateList[this.displayCount-1].date;
            }

          }
          else {

            this.noGrade = true;
          }
        }
      });

  }
  // userProfile(){
  //   let userId= localStorage.getItem('userId');
  //   return this.profileService.UserProfile(userId)
  //   .subscribe(result => {
  //     if (result) {
  //       if(result.success)
  //       {           
  //         this.UserDetails=result.data;     
  //       }     
  //     }
  //   });
  // }
  gotoForResetPassword() {
    this.router.navigate(['/Setting'], {
      queryParams: {
        userId: this.UserDetails.userId, firstName: this.UserDetails.fristName
        , userName: this.UserDetails.userName, cnic: this.UserDetails.cnic, mobNum: this.UserDetails.mobNum, address: this.UserDetails.address
      }
    })
  }
  gotocourse(val: any) {
    this.router.navigate(['/lecture'], { queryParams: { courseId: val } })

  }
  ViewCertificate(content, val) {
    return this.gradeService.GetUserGradeForCourse(localStorage.getItem('userId'), val)
      .subscribe(result => {
        if (result) {
          this.userGrade = result;
          this.coursename = this.userGrade.courseTitle;
          let u = result.userName;
          this.username = result.userName;
          this.user = u.split('@')[0]
          this.openDetailModal(content);
        }
      });

  }
  openDetailModal(content) {
    this.modalOptions.backdrop = 'static';
    this.modalOptions.keyboard = false;
    this.modalOptions.size = 'lg';
    this.modalOptions.centered = true;
    this.modalService.open(content, this.modalOptions);
  }
  onPrint() {
    let data = document.getElementById('print');

    const doc = new jsPDF();
    // let data = document.getElementById('print');
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')

      let pdf = new jsPDF('l', 'cm', 'a4'); //Generates PDF in landscape mode
      // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);
      pdf.save(this.coursename + ' Certificate.pdf');
    }).catch(function (error) {
      console.error('oops, something went wrong!', error);
    });

  }
}
function showInfoMessage(arg0: string) {
  throw new Error('Function not implemented.');
}

