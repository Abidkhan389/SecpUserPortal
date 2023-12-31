import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafepipePipe } from '../_pipes/safepipe.pipe';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { PageTitleModule } from '../Layout/Components/page-title/page-title.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PptComponent } from './ppt/ppt.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { HrefPreventDefaultDirective } from '../_common/href-prevent-default.directive';
import { QuizComponent } from './quiz/quiz.component';
import { CoursesComponent } from './courses/courses.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { WatchComponent } from './watch/watch.component';
import { CourseContentComponent } from './course-content/course-content.component';
import { GradeComponent } from './grade/grade.component';
import { CategoryComponent } from './category/category.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { LectureComponent } from './lecture/lecture.component';
import { EnrollmentComponent } from './recommendation/enrollment/enrollment.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AssessmentComponent } from './assessment/assessment.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingComponent } from './setting/setting.component';
import { ResetPasswordComponent } from './setting/reset-password/reset-password.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
@NgModule({
  declarations: [
    MainComponent,
    PptComponent,
    HrefPreventDefaultDirective,
    QuizComponent,
    CoursesComponent,
    DashboardComponent,
    RecommendationComponent,
    WatchComponent,
    SafepipePipe,
    CourseContentComponent,
    GradeComponent,
    CategoryComponent,
    LectureComponent,
    EnrollmentComponent,
    AssessmentComponent,
    ProfileComponent,
    SettingComponent,
    ResetPasswordComponent,
    EditProfileComponent


  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MainRoutingModule,
    NgxDatatableModule,
    NgxDocViewerModule,
    NgbModule,
    MatDialogModule,
    NgxSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class MainModule { }
