import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../model/user";
import { map, shareReplay, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";


const AUTH_DATA = "AUTH_DATA"

@Injectable({
    providedIn: "root"
})
export class AuthStore {

    private authSubject$ = new BehaviorSubject<User | null>(null)

    isLoggedIn$:Observable<boolean> = this.authSubject$.asObservable().pipe(map(user => !!user))
    isLoggedOut$: Observable<boolean> = this.authSubject$.asObservable().pipe(map(user => !user))
    constructor( private http: HttpClient ) {
        const user = localStorage.getItem(AUTH_DATA)
        if (user) {
            this.authSubject$.next(JSON.parse(user))
        }
    }

    login(data: {email: string, password: string}) {
        const { email, password } = data
        return this.http.post("/api/login", {email, password}).pipe(map(result => {
            return result as User
        } ), tap(user => {
            localStorage.setItem(AUTH_DATA, JSON.stringify(user))
            this.authSubject$.next(user)
        } ), shareReplay())
    }

    logout() {
        localStorage.removeItem(AUTH_DATA)
        this.authSubject$.next(null)
    }
}