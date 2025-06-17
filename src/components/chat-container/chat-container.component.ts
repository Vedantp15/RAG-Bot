import { Component ,Output,EventEmitter,Input} from '@angular/core';
import { ChatHeaderComponent } from '../chat-header/chat-header.component';
import { ChatMessagesComponent } from '../chat-messages/chat-messages.component';
import { ChatInputComponent } from '../chat-input/chat-input.component';

@Component({
  selector: 'app-chat-container',
  imports: [ChatHeaderComponent,ChatMessagesComponent,ChatInputComponent],
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.scss'
})
export class ChatContainerComponent {
@Input() isSidebarHidden: boolean = false;
@Output() showSidebar = new EventEmitter<void>();

handleShowSidebar() {
  this.showSidebar.emit();
}
}
