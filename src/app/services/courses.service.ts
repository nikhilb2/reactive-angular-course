import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Course } from "../model/course";
import { Lesson } from "../model/lesson";

@Injectable({
    providedIn: "root"
})
export class CourseService {
    constructor(public http: HttpClient) {

    }

    loadCourses(): Observable<Course[]> {
        return this.http.get<Course[]>("/api/courses").pipe(
            map(item => item["payload"]),
            shareReplay()
        )
    }


    getCourseByCourseId(courseId: number): Observable<Course> {
        return this.http.get<Course>(`/api/courses/${courseId}`).pipe(shareReplay())


        
    }

    loadAllCourseLessons(courseId:number): Observable<Lesson[]> {
        return this.http.get<Lesson[]>('/api/lessons', {
            params: {
                pageSize: "10000",
                courseId: courseId.toString()
            }
        })
            .pipe(
                map(res => res["payload"]),
                shareReplay()
            );
    }

    
    saveCourse(courseId: string, course: Partial<Course>): Observable<any> {
        return this.http.put(`/api/courses/${courseId}`, course).pipe(
            shareReplay()
        )
    }
    searchLesson(keyword: string): Observable<Lesson[]> {
        return this.http.get('/api/lessons', {
            params: {
                filter: keyword ? keyword : "",
                pageSize: 100
            }
        }).pipe(map(res=> res['payload']), shareReplay())
    }
}