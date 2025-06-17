import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Needed for [(ngModel)]

import { AppComponent } from './app.component';
import { CustomPopupComponent } from '../components/custom-popup/custom-popup.component';
import { ChatInputComponent } from '../components/chat-input/chat-input.component';

@NgModule({
  declarations: [
    AppComponent,           // ✅ Add this
    CustomPopupComponent,
    ChatInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,            // ✅ Required for ngModel
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
