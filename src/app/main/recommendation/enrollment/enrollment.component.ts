import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EnrollmentService } from 'src/app/_services/user/enrollment.service';
import { IEnrollment } from 'src/app/interfaces/IEnrollment';
@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.sass']
})
export class EnrollmentComponent implements OnInit {
  title: any;
  courseId: any;
  description: any;
  applyAgain: any;
  Enrollment: IEnrollment;
  againApproval: boolean = false;
  constructor(private dilog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogref: MatDialogRef<EnrollmentComponent>, protected router: Router, protected enrollmentService: EnrollmentService) {
    this.Enrollment = {} as IEnrollment;
    if (data.applyAgain == 1) {
      this.againApproval = true;
    }
  }

  ngOnInit(): void {
    this.title = this.data.title;
    this.courseId = this.data.courseId;
    this.description = this.data.description;
    this.applyAgain = this.data.applyAgain;
  }
  Submit() {
    this.Enrollment.courseId = this.courseId;
    this.Enrollment.applyAgain = this.applyAgain;
    this.Enrollment.userName = localStorage.getItem('user');
    this.Enrollment.userId = localStorage.getItem('userId');
    this.enrollmentService.Enrollment(this.Enrollment).subscribe((data: any) => {
      //this.router.navigate(['/recommendation'], { queryParams: { courseId: this.courseId } })
      this.dialogref.close(true);
    });
  }
  closeClick() {
    this.dialogref.close();
  }

}
