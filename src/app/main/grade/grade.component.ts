import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/_services/user/course.service';
import { GradeService } from 'src/app/_services/user/grade.service';
import { course } from 'src/app/data';
@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.sass']
})
export class GradeComponent implements OnInit {
  // courseArr:any[]=[];
  gradeList: any;
  loading: boolean;
  userId: any;
  noGrade: boolean = false;
  courseId: any;
  LectureId: any;
  LectureHit:boolean=false;
  courseContentHit:boolean=false;
  constructor(protected gradeService: GradeService,private route: ActivatedRoute,private router: Router,) {
    this.route.queryParams.subscribe(params => {
      if (params.lectureHit=="True" &&params.courseId != null ) {
        this.courseId = params.courseId
        this.LectureHit=true;
      }
      else if (params.courseContentHit=="True" &&params.lecture != null ) {
        this.LectureId = params.lecture
        this.courseId = params.courseId
        this.courseContentHit=true;
      }
      else if (params.profileHit=="True") {
        this.LectureId = params.lecture
        this.courseId = params.courseId
        this.courseContentHit=true;
      }
    })
   }

  ngOnInit(): void {
    //this.courseArr=course;
    this.GetUserGrade();
  }
  GetUserGrade() {
    this.loading = true;
    this.userId = localStorage.getItem("userId");
    return this.gradeService.GetUserGrade(this.userId)
      .subscribe(result => {
        if (result) {
          if (result.success) {
            this.gradeList = result.data;
            if (this.gradeList.length <= 0) {
              this.noGrade = true;
            }
          }
          else {

            this.noGrade = true;
          }
        }
      });

  }
  gotoForLecture() {
    this.router.navigate(['/lecture'], { queryParams: { courseId: this.courseId } })
  }
  gotoForcoursecontent(){
    this.router.navigate(['/course-content'], { queryParams: { lectureId: this.LectureId, courseId: this.courseId} })
  }
}
