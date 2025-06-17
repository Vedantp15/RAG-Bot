// your-component.component.ts
import { Component, OnInit } from '@angular/core';
import { PopupService } from '../../services/popup.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-custom-popup',
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './custom-popup.component.html',
  styleUrl: './custom-popup.component.scss',
  standalone: true,
})



export class CustomPopupComponent implements OnInit {

  activePopup: string | null = null;
  currentName: string | null = null;
  dashboards: { name: string; uid: string }[] = [];
  constructor(private popupService: PopupService, private http: HttpClient) { }
  popupSub!: Subscription;
  data:any;
dataSub!: Subscription; // ADD THIS LINE

ngOnInit() {
  this.currentName=this.data;
  this.http.get<{ [key: string]: string }>('http://127.0.0.1:5001/api/dashboards')
    .subscribe(data => {
      this.dashboards = Object.entries(data).map(([name, uid]) => ({
        name,
        uid
      }));
    });
  this.popupSub = this.popupService.popupTrigger$.subscribe(popupId => {
    this.activePopup = popupId;
  });

  this.dataSub = this.popupService.data$.subscribe(data => {
    this.data = data;
  });
}

  selectedUid: string = '';

ngOnDestroy() {
  console.log("popup destroyed");

  this.popupSub.unsubscribe();
  this.dataSub.unsubscribe();
}

close(){
  console.log("popup closed");
    this.activePopup = null;
  this.data = null; 
}

closePopup() {
  this.close();
}


  clearChat() {
    console.log("clear chat");
        this.closePopup();
  }
  
  
  set_panel_code: any = '';
  submitForm() {
    
    console.log("Form Submitted");
    console.log("Data",this.data);
    
    if (!this.selectedUid) {
      Swal.fire('Error', 'Please select a dashboard.', 'warning');
      return;
    }

    this.http.post<any>('http://127.0.0.1:5001/api/add_panel_direct', { uid: this.selectedUid, panel_code: this.set_panel_code }).subscribe({
      next: (res) => {
        this.closePopup();

        if (res.success) {
          Swal.fire({
            title: 'Success',
            text: 'Panel added successfully',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'See Panel',
            cancelButtonText: 'Close'
          }).then((result) => {
            if (result.isConfirmed) {
              const fullURL = `http://localhost:3000/d/${this.selectedUid}`;
              window.open(fullURL, '_blank');
            }
          });
        } else {
          Swal.fire('Error', res.message || 'Something went wrong', 'error');
        }
      },
      error: () => {
        Swal.fire('Error', 'Failed to add panel.', 'error');
      }
    });
  }


  submitRename() {
    this.closePopup();
  }
  confirmDelete() {
    this.closePopup();
  }

}

