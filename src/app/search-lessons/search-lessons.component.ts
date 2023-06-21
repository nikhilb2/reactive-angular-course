import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll, shareReplay
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat} from 'rxjs';
import {Lesson} from '../model/lesson';
import { HttpClient } from '@angular/common/http';
import { CourseService } from '../services/courses.service';


@Component({
  selector: 'course',
  templateUrl: './search-lessons.component.html',
  styleUrls: ['./search-lessons.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchLessonsComponent implements OnInit {

  lessons$:Observable<Lesson[]>
  selectedLesson: Lesson
  constructor(public courseService: CourseService) {
    
    this.search()
  }


  search(keyword?: string) {
    
     this.lessons$ = this.courseService.searchLesson(keyword)
   
  }

  selectLesson(lesson: Lesson) {
    this.selectedLesson = lesson
  }

  unselectLesson() {
    this.selectedLesson = null
  }

  ngOnInit() {

  }

}











