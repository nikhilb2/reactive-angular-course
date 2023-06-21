import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { Observable, throwError } from "rxjs";

import { MatDialog } from "@angular/material/dialog";

import { CourseService } from "../services/courses.service";
import { LoadingService } from "../loading/loading.service";
import { catchError, map } from "rxjs/operators";
import { MessageService } from "../messages/ messages.services";
import { CourseStore } from "../services/courses.store";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(
    private courseStore: CourseStore,
    
  ) {}

  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses() {

    this.beginnerCourses$ = this.courseStore.filterCourses("BEGINNER");
    this.advancedCourses$ = this.courseStore.filterCourses("ADVANCED");
  }
}
