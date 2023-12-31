import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { QuizService } from 'src/app/_services/user/quiz.service';
import { Alerts } from 'src/app/_common';
import { map } from 'rxjs/operators';
import { IQuizDetails } from 'src/app/interfaces/IQuizDetails';



@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.sass']
})
export class QuizComponent implements OnInit {
  quiz: any[] = []
  attemptedQuiz: any[] = []
  current = 1
  lenth = this.quiz.length
  maxCurrent = false
  modalOptions: NgbModalOptions = {};
  date = new Date()
  user: any;
  lectureId: any;
  courseId: any;
  optionArr: any;
  lectureNumber: any;
  noQuestion: boolean = false;
  grade: any;
  quizDetails: IQuizDetails;
  map: any[] = [];



  constructor(private router: Router, private route: ActivatedRoute, private modalService: NgbModal, private quizService: QuizService
  ) {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.lectureId = params.lecture
        this.courseId = params.course
        if (this.lectureId && this.courseId) {
          this.getQuiz()
        }
      }
    })
    this.quizDetails = {} as IQuizDetails
  }

  ngOnInit(): void {
    let u = localStorage.getItem("user")
    this.user = u.split('@')[0]
    //this.model=course.find(x=>x.id == this.courseId)
    //this.courseName=this.model.title
  }
  getQuiz() {
    return this.quizService.GetquizByLecture(this.courseId, this.lectureId)
      .subscribe(result => {
        if (result) {
          this.quiz = result;
          this.quiz.map((element) => {
            element.question = element.question.replace(/!/gi, "_____");
          });
          this.quiz.map((element) => {
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
    if (i < this.quiz.length) {
      console.log(this.quiz[i].question)
      //this.attemptedQuiz[i].append(this.quiz[i-1].questionId)

      this.current = i + 1
      console.log(this.quiz[i].answerArr)
      this.maxCurrent = this.current == this.quiz.length ? true : false
    } else {
      this.maxCurrent = true
    }
  }

  update(event, i, ind, questionId: any) {
    this.quiz[i].answerArr.forEach(x => x.isChecked = false)
    //this.attemptedQuiz[i].append(this.quiz[i].answerArr[i].answer)
    //this.map.set("SelectedOption",this.quiz[i].answerArr[i].answer);
    let model = {
      questionId: questionId,
      selectedOption: ind + 1
    }
    this.map.push(model)
    this.quiz[i].answerArr[ind].isChecked = event.target.value == 'on' ? true : false
    this.quiz[i].linkID = true


  }
  previous(i) {
    if (i <= this.quiz.length) { this.maxCurrent = false }

    this.current = i - 1
  }


  Submit(content) {
    this.quizDetails.userId = localStorage.getItem('userId');
    this.quizDetails.courseId = this.courseId;
    this.quizDetails.lectureId = this.lectureId;
    this.quizDetails.quizAnswers = this.map;
    //this.map.push(model)
    return this.quizService.GetLectureWiseGrade(this.quizDetails)
      .subscribe(result => {
        if (result) {
          this.grade = result;
          if (result.gradeTemp != "F") {
            Alerts.showSuccessMessage("You are passed this Lecture Quiz");
            this.gotoForLecture()
          }
          else
            Alerts.showInfoMessage("Attempt It Again!")
        }
      });
    console.log(this.map)

    //this.map.set("QuestionId",this.quiz[this.QuestionIndexOfLecture+1].questionId);
    //   this.map.forEach((value: string, key: string) => {
    //     console.log(key, value);
    // });
    //  this.openDetailModal(content);
    // this.router.navigate(['/'])
    // if(this.quiz[this.current-1].lectureNumber == 2)
    // {
    //  
    // }
    // else{
    // Alerts.showSuccessMessage("Congratulation!You cleared this lecture moved next");
    //}

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
  gotoForcoursecontent() {
    this.router.navigate(['/course-content'], { queryParams: { lectureId: this.lectureId, courseId: this.courseId } })
  }



  // OpenImageModel(content) {
  //   this.modalOptions.backdrop = 'static';
  //   this.modalOptions.keyboard = false;
  //   this.modalOptions.size = 'lg';
  //   this.modalOptions.centered = true;
  //   this.modalService.open(content, this.modalOptions);
  // }

}
