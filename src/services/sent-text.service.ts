import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface SentMessage {
  sender: string;      // Who sent it
  type: string;        // What kind of message
  payload: any;        // Data
}

@Injectable({
  providedIn: 'root'
})
export class SentTextService {
  private messageSource = new Subject<SentMessage>();
  message$ = this.messageSource.asObservable();

  sendMessage(message: SentMessage) {
    this.messageSource.next(message);
  }
}