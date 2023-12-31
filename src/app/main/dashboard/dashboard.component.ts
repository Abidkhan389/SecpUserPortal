import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { DropDownUtils } from "src/app/_common/_helper/dropdownUtils";
import { LookUpService } from "src/app/_services/look-up.service";
import { EnrollmentService } from "src/app/_services/user/enrollment.service";
import { ILearningOverView } from "src/app/interfaces/IEnrollment";
import { MatDialog } from '@angular/material/dialog';
import { EnrollmentComponent } from "../recommendation/enrollment/enrollment.component";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.sass"],
})
export class DashboardComponent extends DropDownUtils implements OnInit {
  @ViewChild('widgetsContent') widgetsContent: ElementRef;
  courseArr: any[] = [];
  categoryArr: any[] = [];
  recommendationArr: any[] = [];
  overviewModel: any;
  userId: any;
  notFound: boolean = false

  constructor(protected lookupService: LookUpService, protected router: Router,
    public enrollmentService: EnrollmentService, private dialog: MatDialog,) {
    super(lookupService, router)
    this.GetAllCategories(data => this.categoryArr = data);
    this.GetAllCourses(data => this.recommendationArr = data);
    let user = localStorage.getItem("userId");
    this.userId = user;
    this.GetCoursesForEnrolledUser(this.userId, data => (this.courseArr = data));
  }
  ngOnInit(): void {
    this.overviewModel = {} as ILearningOverView;
    this.LearningOverViewCount();
  }
  LearningOverViewCount() {
    this.enrollmentService.GetLearningOverViewCount(this.userId).subscribe((result: any) => {
      this.overviewModel = result;
    });

  }
  goto(val) {
    if (val.timeRestriction > 0 || val.disable == 0) {
      const dialogref = this.dialog.open(EnrollmentComponent, {
        disableClose: true,
        autoFocus: false,
        data: {
          courseId: val.courseId,
          title: val.title,
          applyAgain: 1,
        },
      })
    }
    else {
      this.router.navigate(['/lecture'], { queryParams: { courseId: val.courseId } })
    }
  }

  scrollLeft() {
    this.widgetsContent.nativeElement.scrollLeft -= 350;
  }

  scrollRight() {
    this.widgetsContent.nativeElement.scrollLeft += 350;
  }
  Enrollement(Id?: any, title?: any, description?: any) {
    const dialogref = this.dialog.open(EnrollmentComponent, {
      disableClose: true,
      autoFocus: false,
      data: {
        courseId: Id,
        title: title,
        description: description
      },
    })
    dialogref.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          //this.router.navigate(['/lecture'], { queryParams: { courseId: Id } })
        }
      },
    });
  }


}
