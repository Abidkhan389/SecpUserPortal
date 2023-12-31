import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { CourseService } from 'src/app/_services/user/course.service';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.sass']
})
export class LectureComponent implements OnInit {

  title: any;
  collapse: boolean = false;
  innercollapse: boolean = false;
  noLecture: boolean = false;
  courseModel: any
  courseId: any;
  contentList: any;
  lectureList: any;
  trainings: any;
  constructor(private router: Router, private route: ActivatedRoute, protected courseService: CourseService,
    private spinner: NgxSpinnerService) {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.courseId = params.courseId
        if (this.courseId)
          this.GetCourseById();
      }
    })

  }

  ngOnInit(): void {
    //this.courseArr=course;
    this.spinner.show();
    //this.model=this.courseArr.find(x=>x.id==this.courseId)
    //this.title="Leadership Trainings"

  }
  toggle() {
    this.collapse = !this.collapse;
  }
  toggleInner() {
    this.innercollapse = !this.innercollapse;
  }
  GetCourseById() {
    return this.courseService.GetCourseById(this.courseId)
      .pipe(
        finalize(() => {
          this.spinner.hide();
        }))
      .subscribe(result => {
        if (result) {
          this.courseModel = result;
          if (result.lectureList == 0) {
            this.noLecture = true;
          }
          else {
            this.noLecture = false;
          }
        }
      });

  }

  gotograde() {
    this.router.navigate(["/grade"], { queryParams: { lectureHit:"True", courseId: this.courseId }});
  }
  gotoassessment(val) {
    this.router.navigate(["/assessment"], { queryParams: { courseId: val.courseId } });
  }

  goto(val) {
    this.router.navigate(['/course-content'], { queryParams: { lectureId: val.lectureId, courseId: this.courseId } })
  }

}
