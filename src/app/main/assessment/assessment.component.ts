import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Alerts } from 'src/app/_common';
import { AssessmentService } from 'src/app/_services/user/assessment.service';
import { IAssessmentDetails } from 'src/app/interfaces/IAssessmentDetails';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.sass']
})
export class AssessmentComponent implements OnInit {

  assessment: any[] = []
  attemptedassessment: any[] = []
  current = 1
  lenth = this.assessment.length
  maxCurrent = false
  modalOptions: NgbModalOptions = {};
  user: any;
  lectureId: any;
  courseId: any;
  optionArr: any;
  lectureNumber: any;
  noQuestion: boolean = false;
  grade: any;
  assessmetDetails: IAssessmentDetails;
  map: any[] = [];



  constructor(private router: Router, private route: ActivatedRoute, private modalService: NgbModal, private assessmentService: AssessmentService
  ) {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.courseId = params.courseId
        if (this.courseId) {
          this.getAssessmentQuestions()
        }
      }
    })
    this.assessmetDetails = {} as IAssessmentDetails
  }

  ngOnInit(): void {
    let u = localStorage.getItem("user")
    this.user = u.split('@')[0]
    //this.model=course.find(x=>x.id == this.courseId)
    //this.courseName=this.model.title
  }
  getAssessmentQuestions() {
    return this.assessmentService.getAssessmentQuestions(this.courseId)
      .subscribe(result => {
        if (result) {
          this.assessment = result;
          this.assessment.map((element) => {
            element.question = element.question.replace(/!/gi, "_____");
          });
          this.assessment.map((element) => {
            this.lectureNumber = element.lectureNumber;
          });
          if (result.length == 0) {
            this.noQuestion = true;
          }
          else {
            this.noQuestion = false;
          }
        }
      });
  }

  next(i) {
    if (i < this.assessment.length) {
      console.log(this.assessment[i].question)
      this.current = i + 1
      console.log(this.assessment[i].answerArr)
      this.maxCurrent = this.current == this.assessment.length ? true : false
    } else {
      this.maxCurrent = true
    }
  }

  update(event, i, ind, assessmentId: any) {
    this.assessment[i].answerArr.forEach(x => x.isChecked = false)
    let model = {
      assessmentId: assessmentId,
      selectedOption: ind + 1
    }
    this.map.push(model)
    this.assessment[i].answerArr[ind].isChecked = event.target.value == 'on' ? true : false
    this.assessment[i].linkID = true


  }
  previous(i) {
    if (i <= this.assessment.length) { this.maxCurrent = false }

    this.current = i - 1
  }


  Submit(content) {
    this.assessmetDetails.userId = localStorage.getItem('userId');
    this.assessmetDetails.courseId = this.courseId;
    this.assessmetDetails.assessmentAns = this.map;
    return this.assessmentService.getCourseWiseGrade(this.assessmetDetails)
      .subscribe(result => {
        if (result) {
          this.grade = result;
          if (result.grade != "F") {
            this.openDetailModal(content);
            this.router.navigate(['/'])
          }
          else
            Alerts.showInfoMessage("Attempt It Again!")
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
      pdf.save('Certificate.pdf');
    }).catch(function (error) {
      console.error('oops, something went wrong!', error);
    });

  }
  gotoForLecture() {
    this.router.navigate(['/lecture'], { queryParams: { courseId: this.courseId, } })
  }
  // OpenImageModel(content) {
  //   this.modalOptions.backdrop = 'static';
  //   this.modalOptions.keyboard = false;
  //   this.modalOptions.size = 'lg';
  //   this.modalOptions.centered = true;
  //   this.modalService.open(content, this.modalOptions);
  // }

}
