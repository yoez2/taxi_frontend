import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  showNotification(message: string): void {
    if (isPlatformBrowser(this.platformId)) {
      alert(message);
    }
  }
} 