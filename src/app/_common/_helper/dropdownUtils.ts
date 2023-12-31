import { Router } from "@angular/router";
import { LookUpService } from "src/app/_services/look-up.service";
import { Alerts } from "../alerts";
import { ResultMessages } from "../constant";

export class DropDownUtils {
    constructor(protected lookupService: LookUpService,
        protected router: Router) {
    }
    protected GetAllCourses(callback: (data) => void) {
        this.lookupService.getAllCourses()
            .subscribe(
                result => {
                    if (result)
                        callback(result);
                },
                error => {
                    Alerts.showErrorMessage(ResultMessages.serverError)
                });
    }
    protected GetAllCategories(callback: (data) => void) {
        this.lookupService.getAllCategories()
            .subscribe(
                result => {
                    if (result)
                        callback(result);
                },
                error => {
                    Alerts.showErrorMessage(ResultMessages.serverError)
                });
    }
    protected getContent(val, callback: (data) => void) {
        this.lookupService.GetLecture(val)
            .subscribe(
                result => {
                    if (result) {
                        callback(result);
                    }
                },
                error => {
                    Alerts.showErrorMessage(ResultMessages.serverError)
                });
    }
    protected GetCoursesForEnrolledUser(val, callback: (data) => void) {
        this.lookupService.getAllCoursesForEnrolledUser(val)
            .subscribe(
                result => {
                    if (result) {
                        callback(result);
                    }
                },
                error => {
                    Alerts.showErrorMessage(ResultMessages.serverError)
                });
    }
    protected GetCategoriesForEnrolledUser(val, callback: (data) => void) {
        this.lookupService.getEnrolledCategories(val)
            .subscribe(
                result => {
                    if (result) {
                        callback(result);
                    }
                },
                error => {
                    Alerts.showErrorMessage(ResultMessages.serverError)
                });
    }
    protected userProfile(val, callback: (data) => void) {
        return this.lookupService.UserProfile(val)
            .subscribe(
                result => {
                    if (result) {
                        callback(result);
                    }
                },
                error => {
                    Alerts.showErrorMessage(ResultMessages.serverError)
                });
    }
}