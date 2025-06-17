import { Component, OnInit, Query } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GetChatService } from '../../services/get-chat.service';
import { PopupService } from '../../services/popup.service';
import { CustomPopupComponent } from '../custom-popup/custom-popup.component';
import { SentTextService } from '../../services/sent-text.service';
import { SrvRecord } from 'node:dns';

@Component({
  selector: 'app-sidebar-content',
  standalone: true,
  imports: [CommonModule, HttpClientModule, CustomPopupComponent],
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.scss']
})

export class SidebarContentComponent implements OnInit {
  isVisible: any | null = null;
  chats: { [key: string]: string } = {};;
  id: any | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(private http: HttpClient, private getchatService: GetChatService, private popupService: PopupService, private sentTextService: SentTextService) { }
  ngOnInit(): void {
    this.fetchData();
    this.isVisible = true;
  }
  fetchData(): void {
    this.http.get<{ [key: string]: string }>('http://127.0.0.1:5001/get_chats')
      .subscribe({
        next: (data) => {
          this.chats = data;
          this.loading = false;
          // console.log(this.chats);
        },
        error: (err) => {
          this.error = err.message || 'An unknown error occurred';
          console.error("Failed to fetch chats:", err);
          this.loading = false;
        }
      });
  }

  trackById(index: number, item: any): string {
    return item.id;
  }

  menuState: { [key: string]: string } = {};
  toggleMenu(event: Event, chatId: string): void {
    console.log(chatId);
    Object.keys(this.menuState).forEach(key => {
      this.menuState[key] = 'none';
    });
    this.menuState[chatId] = this.menuState[chatId] === 'block' ? 'none' : 'block';

    event.stopPropagation(); // Prevent bubbling if needed
  }

  renameChat(id: any): void {
    console.log("Rename", id);
    this.popupService.openPopup('rename-popup', { "Chat Name": id });
  }

  showDeletePopup(id: any): void {
    this.popupService.openPopup('delete-popup', { "Chat Name": id });

  }
  shareChat(id: any): void {
    this.popupService.openPopup('share-popup', { "Chat Name": id });


  }
  clearChat() {
    this.popupService.openPopup('confirmPopup', { "clear Chat": true });
  }

  activeQueryId: boolean = true;
  visibilityMode: string = 'block'
  selectQuery(event: Event): void {
    const id = (event.currentTarget as HTMLElement).id;

    this.activeQueryId = !this.activeQueryId;
    this.visibilityMode = this.visibilityMode === 'block' ? 'none' : 'block';
    const newMode = this.activeQueryId ? 'Analytics' : 'Documents';

    this.sentTextService.sendMessage({
      sender: 'SidebarComponent',
      type: 'headerUpdate',
      payload: newMode
    });
  }

  activeModeId: boolean = true;
  selectMode(event: Event): void {
    const id = (event.currentTarget as HTMLElement).id;
    this.activeModeId = !(this.activeModeId);
    console.log(id);

    const view = (event.currentTarget as HTMLElement).getAttribute('data-view') || 'full';
    this.sentTextService.sendMessage({
      sender: 'SidebarComponent',
      type: 'placeholderUpdate',
      payload: view === 'query'
        ? 'Ask an analytics question (query-only mode)...'
        : 'Ask an analytics question with visualization...'
    });

  }

  activeChatId: string = '';
  selectChat(event: Event): void {
    const id = (event.currentTarget as HTMLElement).id;
    // console.log('Clicked ID:', id);
    this.getchatService.changeMessage(id);
    this.activeChatId = id;
  }

  startNewChat() {
    console.log("new chat");
  }
}
