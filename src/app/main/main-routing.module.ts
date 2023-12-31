import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { CourseContentComponent } from './course-content/course-content.component';
import { CoursesComponent } from './courses/courses.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GradeComponent } from './grade/grade.component';
import { LectureComponent } from './lecture/lecture.component';
import { MainComponent } from './main.component';
import { PptComponent } from './ppt/ppt.component';
import { QuizComponent } from './quiz/quiz.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { WatchComponent } from './watch/watch.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingComponent } from './setting/setting.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ResetPasswordComponent } from './setting/reset-password/reset-password.component';

const routes: Routes = [

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'courses',
    component: CoursesComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'presentation',
    component: PptComponent
  },
  {
    path: 'quiz',
    component: QuizComponent
  },
  {
    path: 'recommendation',
    component: RecommendationComponent
  },
  {
    path: 'watch',
    component: WatchComponent
  },
  {
    path: 'course-content',
    component: CourseContentComponent, data: { title: "one" }
  },
  {
    path: 'grade',
    component: GradeComponent
  },
  {
    path: 'category',
    component: CategoryComponent
  },
  {
    path: 'lecture',
    component: LectureComponent
  },
  {
    path: 'assessment',
    component: AssessmentComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'editprofile',
    component: EditProfileComponent
  },
  {
    path: 'setting',
    component: SettingComponent
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
