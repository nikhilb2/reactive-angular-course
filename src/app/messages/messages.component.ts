import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { MessageService } from './ messages.services';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  errors$: Observable<string[]>
  showError = false
  constructor(public messageService: MessageService) {

  }

  ngOnInit() {
    this.errors$ = this.messageService.errors$.pipe(
      tap(() => this.showError = true )
    )

  }


  onClose() {
    this.showError = false

  }

}
