import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DropDownUtils } from 'src/app/_common/_helper/dropdownUtils';
import { LookUpService } from 'src/app/_services/look-up.service';
import { CourseContentService } from 'src/app/_services/user/courseContent.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.sass']
})
export class WatchComponent extends DropDownUtils implements OnInit {
  src:any;
  lectureId: any;
  contentId: any;
  title: any;
  lectureModel:any;
  contentModel: any;
  CurrentCourseId:any;
  constructor(protected router:Router,protected lookupService: LookUpService, private route: ActivatedRoute, protected contentservice: CourseContentService) {
    super(lookupService, router)
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.lectureId= params.lecture
        if(this.lectureId)
        this.getContent(this.lectureId, data => (this.lectureModel = data));
        this.contentId= params.content
        if(this.contentId)
          this.getLectureContentById();
        this.CurrentCourseId=params.courseId;
      }
    })
   }

  ngOnInit(): void {
  }
  getLectureContentById()
  {
    return this.contentservice.GetLectureContentById(this.contentId).subscribe(result =>
      {
        if(result) {
          this.contentModel = result.data;
          this.src=this.contentModel.link;
          this.title = this.contentModel.lectureTitle;
        }
      })
  }
  gotoForLecture() {
    this.router.navigate(['/lecture'], { queryParams: { courseId: this.CurrentCourseId, } })
  }
  gotoForcoursecontent() {
    this.router.navigate(['/course-content'], { queryParams: { lectureId: this.lectureId, courseId: this.CurrentCourseId} })
  }

}
