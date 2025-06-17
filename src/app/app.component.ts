import { Component,OnInit } from '@angular/core';
import { ChatContainerComponent } from '../components/chat-container/chat-container.component';
import { SidebarContentComponent } from '../components/sidebar-content/sidebar-content.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CustomPopupComponent } from "../components/custom-popup/custom-popup.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    HttpClientModule, ChatContainerComponent, SidebarComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RAG_BOT';
  isSidebarHidden = false;

  toggleSidebar() {
    console.log("sidebar");
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  
}
