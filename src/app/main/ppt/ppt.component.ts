import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DropDownUtils } from 'src/app/_common/_helper/dropdownUtils';
import { LookUpService } from 'src/app/_services/look-up.service';
import { CourseContentService } from 'src/app/_services/user/courseContent.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ppt',
  templateUrl: './ppt.component.html',
  styleUrls: ['./ppt.component.sass']
})
export class PptComponent extends DropDownUtils implements OnInit {
  name = 'Angular';
  //doc =  '../../../assets/images/VoiceandAccentTraining.pptx'
  urlSafe: SafeResourceUrl;
  contentId: any;
  contentModel: any;
  doc: any;
  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, protected router: Router, public contentservice: CourseContentService, protected lookupService: LookUpService) {
    super(lookupService, router)
    this.route.queryParams.subscribe(params => {
      if (params) {
        // this.lectureId= params.lecture
        // if(this.lectureId)
        // this.getContent(this.lectureId, data => (this.lectureModel = data));
        this.contentId = params.content
        if (this.contentId)
          this.getLectureContentById();
      }
    })
  }
  ngOnInit(): void {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.doc);
  }

  endPresentation() {
    this.router.navigate(['/quiz'])
  }
  getLectureContentById() {
    return this.contentservice.GetLectureContentById(this.contentId).subscribe(result => {
      if (result) {
        this.contentModel = result.data;
        debugger
        //this.doc = this.contentModel.attachments;
        this.doc =this.contentModel.attachments?  this.contentModel.attachments : this.contentModel.link;
      }
    })
  }

}




