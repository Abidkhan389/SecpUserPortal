export interface IEnrollment {
    userId: string;
    userName: string;
    courseId: string;
    applyAgain: bigint;
}
export interface ILearningOverView {
    completedCoursesCount: string;
    onGoingCourseCount: string;
    certificateCount: string;
}