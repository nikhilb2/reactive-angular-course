import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { HttpClient } from "@angular/common/http";
import { catchError, map, shareReplay, tap } from "rxjs/operators";
import { LoadingService } from "../loading/loading.service";
import { MessageService } from "../messages/ messages.services";


@Injectable({
    providedIn: "root"
})
export class CourseStore {

    courseSubject$ = new BehaviorSubject<Course[]>([])
    courses$: Observable<Course[]> = this.courseSubject$.asObservable()

    constructor(private http: HttpClient, private loadingService: LoadingService, private messageService: MessageService) {
        
    this.loadAllCourses()
    }

    private loadAllCourses() {
        const loadCourse$ = this.http.get<Course[]>("/api/courses").pipe(
            map(item => item["payload"]),
            catchError(err => {
                const message = "Failed to load message"
                this.messageService.setErrors(message)
                return throwError(message)
            }),
            tap(courses => this.courseSubject$.next(courses))
        )
        this.loadingService.setLoaderUntilComplete(loadCourse$).subscribe()
    }

    filterCourses(category: string) {
        return this.courses$.pipe(map(courses => courses.filter(course => course.category === category).sort(sortCoursesBySeqNo)))
    }

    saveCourse(courseId: string, changes:Partial<Course>) {
        const courses = this.courseSubject$.getValue()
        const courseIndex = courses.findIndex(course => course.id === courseId) 
        if (courseIndex !== -1) {
            const newCourse = {
                ...courses[courseIndex],
                ...changes
            }
            const newCourses = [...courses]
            newCourses[courseIndex] = newCourse
            this.courseSubject$.next(newCourses)
        }
        return this.http.put(`/api/courses/${courseId}`, changes).pipe(
            catchError((err) => {
                const message = "Can not update course"
                this.messageService.setErrors(message)
                this.courseSubject$.next(courses)
                return throwError(err)
            }),
            shareReplay()
        )
    }
}