import { Component, OnInit, OnDestroy,Output,EventEmitter,Input } from '@angular/core';
import { SentTextService } from '../../services/sent-text.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-chat-header',
  imports: [],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss'
})
export class ChatHeaderComponent {
@Input() isSidebarHidden: boolean = false;

@Output() showSidebar = new EventEmitter<void>();

  onShowSidebarClick() {
    this.showSidebar.emit();
  }



placeholderText='Analytics';
private subscription!: Subscription;
constructor(private sentTextService: SentTextService) {}
ngOnInit(): void {
  this.subscription = this.sentTextService.message$.subscribe(message => {
    if (message.sender === 'SidebarComponent' && message.type === 'headerUpdate') {
      this.placeholderText = message.payload;
    }
  });
}


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }



}
