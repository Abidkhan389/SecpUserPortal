import { TestBed } from '@angular/core/testing';
import { CourseContentService } from './courseContent.service';



describe('LectureService', () => {
  let service: CourseContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
