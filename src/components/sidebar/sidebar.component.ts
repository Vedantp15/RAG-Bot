import { Component ,Output, EventEmitter } from '@angular/core';
import { SidebarHeaderComponent } from '../sidebar-header/sidebar-header.component';
import { SidebarContentComponent } from '../sidebar-content/sidebar-content.component';
import { SidebarFooterComponent } from '../sidebar-footer/sidebar-footer.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    SidebarHeaderComponent,
    SidebarFooterComponent,
    SidebarContentComponent  // ✅ This is important!
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  handleHeaderToggle() {
    this.toggleSidebar.emit();
  }
}
