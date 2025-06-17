import { Component } from '@angular/core';
import { GetChatService } from '../../services/get-chat.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PopupService } from '../../services/popup.service';
import { CustomPopupComponent } from "../custom-popup/custom-popup.component";
import { SentTextService } from '../../services/sent-text.service';

@Component({
  selector: 'app-chat-messages',
  imports: [CommonModule, HttpClientModule, CustomPopupComponent],
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss']
})
export class ChatMessagesComponent {
  welcome: boolean = true;
  currentMessage: string = '';
  messages: any[] = [];

  constructor(private getchatService: GetChatService, private http: HttpClient, private popupService: PopupService,private sentTextService: SentTextService) { }
  fetchMessages(chatId: string): void {
    this.http.get<any[]>(`http://127.0.0.1:5001/get_chat/${chatId}`)
      .subscribe({
        next: (data: any[]) => {
          this.welcome = false;
          this.messages = data;
          sessionStorage.setItem('currentChat', chatId);
        },
        error: (err) => {

          this.welcome = true;
          console.error("Failed to fetch messages:", err);
        }
      });
  }
  ngOnInit() {

    this.getchatService.currentMessage.subscribe(msg => {
      this.currentMessage = msg;
      if (msg !== 'default message') {
        this.fetchMessages(msg);
      }
    });
  }
  getKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }
  dashboards: { name: string, uid: string }[] = [];
  showModal = false;
  showSqlBlock: boolean = false;

toggleSQL() {
  this.showSqlBlock = !this.showSqlBlock;
}
openForm(id: number) {
  const currentChat = sessionStorage.getItem("currentChat");
  this.http.post('http://127.0.0.1:5001/handle_click', { button_id: id, currentChat: currentChat })
    .subscribe(response => {
        this.popupService.openPopup('formModal',this.messages[id]);
    });

}
sendMessage(event: Event): void {
  const id = (event.currentTarget as HTMLElement).id;
  this.sentTextService.sendMessage({
  sender: 'WelcomeMessage',
  type: 'viewMode',
  payload: id
});
}

}
