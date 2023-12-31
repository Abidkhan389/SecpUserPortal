
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DropDownUtils } from 'src/app/_common/_helper/dropdownUtils';
import { LookUpService } from 'src/app/_services/look-up.service';
import { CourseContentService } from 'src/app/_services/user/courseContent.service';


@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.sass']
})
export class CourseContentComponent extends DropDownUtils implements OnInit {
  noContent: boolean = false;
  collapse: boolean = false;
  innercollapse: boolean = false;
  contentModel: any;
  lectureId: any;
  trainings: any;
  isattempt: boolean = false;
  CurrentCourseId: any;
  constructor(protected router: Router, private route: ActivatedRoute, protected contentservice: CourseContentService,
    private spinner: NgxSpinnerService, protected lookupService: LookUpService) {
    super(lookupService, router)
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.lectureId = params.lectureId
        if (this.lectureId) {
          this.getContent(this.lectureId, data => {
            this.isattempt = data.isattempt;
            (this.contentModel = data)
            if (this.contentModel.courseContents == 0) {
              this.noContent = true;
            }
            else {
              this.noContent = false;
            }
          });
        }
        this.CurrentCourseId = params.courseId;
      }
    })
  }

  ngOnInit(): void {
    //this.courserr=course;
    this.spinner.show();
    //this.model=this.courseArr.find(x=>x.id==this.courseId)

  }
  toggle() {
    this.collapse = !this.collapse;
  }
  toggleInner() {
    // return this.courseService.GetCourseById(this.courseId)
    //   .pipe(
    //     finalize(() => {
    //         this.spinner.hide();
    //     }))
    //   .subscribe(result => {
    //     if (result) {
    //       this.trainings=result;
    //     }
    //   });
    this.innercollapse = !this.innercollapse;
  }

  gotograde() {
    this.router.navigate(["/grade"], { queryParams: { courseContentHit:"True", lecture: this.lectureId,courseId: this.CurrentCourseId, }});

  }
  gotoQuiz(val) {
    this.router.navigate(["/quiz"], { queryParams: { course: val.courseId, lecture: this.lectureId } })
  }
  goto(val) {
    let path;
    if (val.type == 0) {
      path = "/watch"
    }
    else if (val.type == 1) {
      path = "/presentation"
    }
    // else if(val.type==2){
    //   path="/quiz"
    // }
    this.router.navigate([path], { queryParams: { lecture: val.lectureId, content: val.contentId, courseId: this.CurrentCourseId } });
  }
  gotoForLecture() {
    this.router.navigate(['/lecture'], { queryParams: { courseId: this.CurrentCourseId, } })
  }

}
