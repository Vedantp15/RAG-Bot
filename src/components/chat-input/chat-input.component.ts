import { Component, OnInit, OnDestroy } from '@angular/core';
import { SentTextService } from '../../services/sent-text.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClient,HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss'
})
export class ChatInputComponent implements OnInit, OnDestroy {
  receivedMessage: string = '';
  placeholderText: string = 'Ask a question about your data...';
  isSqlMode: boolean = true;
  chatHistory: any[] = [];
  isQueryOnlyMode: boolean = false;
  error: string | null = null;

  private subscription!: Subscription;

  constructor(private sentTextService: SentTextService,private http: HttpClient) { }

  ngOnInit(): void {
    this.subscription = this.sentTextService.message$.subscribe(message => {
      console.log(message);
      switch (message.sender) {
        case 'SidebarComponent':
          if (message.type === 'placeholderUpdate') {
            this.placeholderText = message.payload;
            if (message.payload === 'Ask an analytics question (query-only mode)...') {
            this.isQueryOnlyMode = true;
            }
            else {
            this.isQueryOnlyMode = false;
            }


          } else if (message.type === 'viewMode') {
            console.log('View mode changed to:', message.payload);
          }
          else if (message.type==="headerUpdate"){
            if (message.payload === 'Documents') {
              this.isSqlMode = false;
            }
            else {
              this.isSqlMode = true;
            }

          }
          break;

        case 'WelcomeMessage':
          this.receivedMessage = message.payload;
          break;

        default:
          console.warn('Unknown sender:', message.sender);
      }


    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.receivedMessage = input.value;
  }



 onSubmit() {
  if (this.receivedMessage) {
    const endpoint = this.isSqlMode ? '/sql_query' : '/query';
    const payload = {
      query: this.receivedMessage,
      type: this.isSqlMode ? 'sql' : 'document',
      chat_history: this.chatHistory,
      view_mode: this.isQueryOnlyMode ? 'query_only' : 'full'
    };

    console.log("Payload", payload, "Endpoint", endpoint);

    this.http.post(`http://127.0.0.1:5001/${endpoint}`, payload).subscribe({
      next: (data: any) => {
        console.log(data);
        // handle response logic here
      },
      error: (err) => {
        this.error = err.message || 'An unknown error occurred';
        console.error("Failed to fetch chats:", err);
      }
    });
  }
}



}
