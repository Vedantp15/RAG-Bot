import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
private popupTrigger = new Subject<string>();
private data = new Subject<any>();

popupTrigger$ = this.popupTrigger.asObservable();
data$ = this.data.asObservable(); // ✅ CORRECT

openPopup(popupId: string, data: any) {
  console.log(data);
  this.popupTrigger.next(popupId.toString());
  this.data.next(data);
}


}
