import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';;
import { DropDownUtils } from 'src/app/_common/_helper/dropdownUtils';
import { LookUpService } from 'src/app/_services/look-up.service';
import { CourseService } from 'src/app/_services/user/course.service';
import { EnrollmentComponent } from '../recommendation/enrollment/enrollment.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.sass']
})
export class CoursesComponent extends DropDownUtils implements OnInit {
  coursesArr: any
  loading: boolean = true;
  categoryArr: any;
  courseNotFound: boolean = false;
  categoryNotOnGoing: boolean = false;
  categorydetail: boolean;
  selectedItem: any;
  getCoursesByCategoryList: any;
  changeText: boolean;
  userId: any;
  @ViewChild('widgetsContent') widgetsContent: ElementRef;
  constructor(protected router: Router, protected courseService: CourseService, private dialog: MatDialog,
    protected lookupService: LookUpService) {
    super(lookupService, router)
    let user = localStorage.getItem("userId");
    this.userId = user;
    this.GetCategoriesForEnrolledUser(this.userId, data => (this.categoryArr = data).length == 0 ? this.categoryNotOnGoing = true : this.categoryNotOnGoing = false);
    this.GetCoursesForEnrolledUser(this.userId, data => (this.coursesArr = data).length == 0 ? this.courseNotFound = true : this.courseNotFound = false);
    this.categorydetail = false;
    this.changeText = false;
  }
  ngOnInit(): void {
    // this.categoryArr = this.coursesArr.Cate
  }

  scrollLeft() {
    this.widgetsContent.nativeElement.scrollLeft -= 350;
  }

  scrollRight() {
    this.widgetsContent.nativeElement.scrollLeft += 350;
  }
  GetCoursesByCategory(categoryId: any) {
    this.loading = true;
    this.categorydetail = true;
    this.selectedItem = categoryId;
    this.userId = localStorage.getItem("userId");
    return this.courseService.GetEnrolledUserCoursesByCategoryId(categoryId, this.userId)
      .subscribe(result => {
        if (result) {
          if (result.success) {
            this.courseNotFound = false;
            this.getCoursesByCategoryList = result.data;
          }
          else {

            this.courseNotFound = true;
          }
        }
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
}
