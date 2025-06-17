import { Component,Output, EventEmitter, Input  } from '@angular/core';

@Component({
  selector: 'app-sidebar-header',
  standalone:true,
  imports: [],
  templateUrl: './sidebar-header.component.html',
  styleUrl: './sidebar-header.component.scss'
})
export class SidebarHeaderComponent {
  @Input() toggle = new EventEmitter<void>();
  @Output() toggleSidebar = new EventEmitter<void>();
  isSidebarHidden = false;

  onToggleClick() {
    this.toggleSidebar.emit();
  }
  // toggleSidebar(): void {
  //   console.log("sidebar header");
  //   this.toggle.emit();
  // }
  
}
