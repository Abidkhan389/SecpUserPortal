import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alerts } from 'src/app/_common';
import { DropDownUtils } from 'src/app/_common/_helper/dropdownUtils';
import { LookUpService } from 'src/app/_services/look-up.service';
import { MatDialog } from '@angular/material/dialog';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { CourseService } from 'src/app/_services/user/course.service';
@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.sass']
})
export class RecommendationComponent extends DropDownUtils implements OnInit {
  recommendationArr: any;
  loading: boolean = true;
  id: any;
  message: any;
  categoryArr: any;
  OpenModel: boolean = false;
  userId: any;
  selectedItem: any;
  courseList: any;
  courseNotFound: boolean = false;
  categorydetail: boolean;
  @ViewChild('widgetsContent') widgetsContent: ElementRef;
  src = '../../../assets/images/dashboard/recommendation/';
  constructor(protected router: Router, protected lookupService: LookUpService, protected courseService: CourseService, private dialog: MatDialog,
    private route: ActivatedRoute) {
    super(lookupService, router)
    this.GetAllCourses(data => this.recommendationArr = data);
    this.GetAllCategories(data => this.categoryArr = data);
  }


  ngOnInit(): void {
    //this.recommendationArr = recommendationcourse;
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
        description: description,
        applyAgain: 0,
      },
    })
    dialogref.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          //this.GetAllCourses(data => this.recommendationArr = data);
          //Alerts.showInfoMessage("After Admin approval! course Will be Show in Continue Learning");
          // this.router.navigate(['/lecture'], { queryParams: { courseId: Id } })
        }
      },
    });
  }
  GetCoursesByCategoryId(categoryId: any) {
    this.loading = true;
    this.categorydetail = true;
    this.selectedItem = categoryId;
    this.userId = localStorage.getItem("userId");
    return this.courseService.GetCoursesByCategoryId(categoryId, this.userId)
      .subscribe(result => {
        if (result) {
          if (result.success) {
            this.courseNotFound = false;
            this.courseList = result.data;
          }
          else {

            this.courseNotFound = true;
          }
        }
      });

  }
}
