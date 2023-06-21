import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { filter } from "rxjs/operators";

@Injectable()
export class MessageService {

    private errorSubject = new BehaviorSubject<string[]>([])
    errors$ = this.errorSubject.asObservable().pipe(filter(errors => !!errors?.length))

    setErrors(...errors: string[]) {
        this.errorSubject.next(errors)
    }
}