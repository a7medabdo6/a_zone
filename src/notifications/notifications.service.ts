// src/notifications/notifications.service.ts
import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class NotificationsService {
  private notificationSubject: Subject<string> = new Subject<string>();

  // Method to push a new notification
  sendNotification(message: string): void {
    console.log(message, 'mmmmmmm');

    this.notificationSubject.next(message);
  }

  // Observable stream for clients to listen to
  getNotifications(): Observable<string> {
    return this.notificationSubject.asObservable();
  }
}
